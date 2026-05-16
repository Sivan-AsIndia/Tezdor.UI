import {
  Component, computed, inject, signal, input, effect,
  afterNextRender, ChangeDetectorRef
} from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl,
  AbstractControl, ValidationErrors, ValidatorFn
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  BRAND_OPTIONS, CATEGORY_OPTIONS, DISCOUNT_OPTIONS, IDiscountOption,
  ISelectOption, IStatusOption, Product, PRODUCT_TYPE_OPTIONS,
  STATUS_OPTIONSPRODUCT, TabId, TAX_OPTIONS, TEMPLATE_OPTIONS, UNIT_OPTIONS,
} from '../product';
import { Router, RouterLink } from '@angular/router';
import { ProductDataClient } from '../product-data-client';
import { BomDataClient } from '../bom-data-client';         // ← NEW
import { SearchDropdownComponent } from '../../../shared/components/search-dropdown/search-dropdown';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { BomNode } from '../bom';

declare var bootstrap: any;

function stockLevelValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const min = +(group.get('minStockLevel')?.value ?? 0);
    const max = +(group.get('maxStockLevel')?.value ?? 0);
    return max > 0 && min > 0 && max < min ? { maxLessThanMin: true } : null;
  };
}

function hsnPatternValidator(): ValidatorFn {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    const v: string = ctrl.value ?? '';
    if (!v) return null;
    return /^[A-Za-z0-9]{4,8}$/.test(v) ? null : { hsnPattern: true };
  };
}

function productCodePatternValidator(): ValidatorFn {
  return (ctrl: AbstractControl): ValidationErrors | null => {
    const v: string = ctrl.value ?? '';
    if (!v) return null;
    return /^[A-Za-z0-9\-]+$/.test(v) ? null : { productCodePattern: true };
  };
}

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SearchDropdownComponent, NgxEditorModule, RouterLink],
  templateUrl: './product-create.html',
  styleUrl:    './product-create.css',
})
export class ProductCreateComponent {

  private fb         = inject(FormBuilder);
  private router     = inject(Router);
  private cdr        = inject(ChangeDetectorRef);
  service            = inject(ProductDataClient);
  private bomService = inject(BomDataClient);   // ← NEW

  id       = input<string>();
  editMode = computed(() => !!this.id());
  editId   = computed(() => { const raw = this.id(); return raw ? +raw : 0; });

  descriptionEditor!:     Editor;
  metaDescriptionEditor!: Editor;
  showEditor              = signal(false);

  readonly editorForm = new FormGroup({
    description:        new FormControl(''),
    metaTagDescription: new FormControl(''),
  });

  readonly toolbar: Toolbar = [
    ['bold', 'italic', 'underline'], ['strike'],
    ['code', 'blockquote'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['ordered_list', 'bullet_list'], ['link', 'image'],
    ['text_color', 'background_color'], ['horizontal_rule'], ['undo', 'redo'],
  ];

  activeTab          = signal<TabId>('general');
  isDragging         = signal(false);
  imagePreviews      = signal<string[]>([]);
  selectedFiles      = signal<File[]>([]);
  currentIndex       = signal(0);
  primaryIndex       = signal(0);
  dragStartX         = signal(0);
  pendingDeleteIndex = signal<number | null>(null);
  readonly maxImages = 5;

  bomNodes            = signal<BomNode[]>([]); 
  selectedBomNodeId   = signal<number | null>(null);
  pendingDeleteBomId  = signal<number | null>(null);
  showBomDeletePrompt = signal(false);
  private nextBomId   = 1;

  rolledUpBomCost = computed(() => {
    const nodes     = this.bomNodes();
    const parentIds = new Set(nodes.filter(n => n.parentId !== null).map(n => n.parentId!));
    const leaves    = nodes.filter(n => !parentIds.has(n.id));
    return leaves.reduce((sum, n) =>
      sum + (+(n.quantity ?? 0)) * (+(n.costPerUnit ?? 0)) * (1 + (+(n.wastagePercent ?? 0)) / 100),
    0);
  });

  bomLineCount = computed(() => this.bomNodes().length);
  bomDepth     = computed(() =>
    this.bomNodes().length ? Math.max(...this.bomNodes().map(n => n.level)) : 0
  );

  categoryOptions: ISelectOption[]   = CATEGORY_OPTIONS;
  brandOptions:    ISelectOption[]   = BRAND_OPTIONS;
  unitOptions                        = UNIT_OPTIONS;
  taxOptions:      ISelectOption[]   = TAX_OPTIONS;
  discountTypes:   IDiscountOption[] = DISCOUNT_OPTIONS;
  statusOptions:   IStatusOption[]   = STATUS_OPTIONSPRODUCT;
  templateOptions: ISelectOption[]   = TEMPLATE_OPTIONS;
  ProductType:     ISelectOption[]   = PRODUCT_TYPE_OPTIONS;

  private selectedCategoryId = signal<number | string>('');

  subCategoryOptions = computed(() => {
    const catId = +this.selectedCategoryId();
    if (!catId) return [];
    const seen   = new Set<number>();
    const result: { value: string; label: string }[] = [];
    for (const p of this.service.products()) {
      if (p.categoryId === catId && p.subCategoryId && !seen.has(p.subCategoryId)) {
        seen.add(p.subCategoryId);
        result.push({ value: String(p.subCategoryId), label: p.subCategoryName ?? '' });
      }
    }
    return result;
  });

  productForm: FormGroup = this.fb.group(
    {
      productCode:    ['', [Validators.required, Validators.maxLength(50), productCodePatternValidator()]],
      productName:    ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200), Validators.pattern(/\S/)]],
      categoryId:     ['', Validators.required],
      subCategoryId:  [''],
      brandId:        [''],
      productType:    [''],
      hsnCode:        ['', [Validators.maxLength(8), hsnPatternValidator()]],
      unitId:         ['', Validators.required],
      barcode:        ['', Validators.maxLength(50)],
      warrantyMonths: [null, [Validators.min(0)]],
      costPrice:      [null, [Validators.min(0)]],
      sellingPrice:   [null, [Validators.min(0)]],
      taxId:          [''],
      isInclusiveTax: [false],
      discountType:   ['none'],
      discountValue:  [null, [Validators.min(0)]],
      reorderLevel:   [0, [Validators.min(0)]],
      minStockLevel:  [0, [Validators.min(0)]],
      maxStockLevel:  [0, [Validators.min(0)]],
      leadTimeDays:   [0, [Validators.min(0)]],
      currentStock:   [{ value: 0, disabled: true }],
      weightKg:       [null, [Validators.min(0)]],
      dimensions:     ['', Validators.maxLength(100)],
      isPhysical:     [false],
      autoExpandBom:  [false],
      description:        [''],
      metaTagTitle:       [''],
      metaTagDescription: [''],
      productTemplate: [''],
      status:          ['active'],
      mediaFiles:      [[]],
    },
    { validators: [stockLevelValidator()] }
  );

  pageTitle    = computed(() => 'Product Inventory');
  pageSubtitle = computed(() =>
    this.editMode()
      ? 'Update existing product details and manage your inventory.'
      : 'Add new products and manage your inventory efficiently from a single place.'
  );
  pageCrumb = computed(() => (this.editMode() ? 'Edit' : 'Create'));

  sellingPriceWarn = computed(() => {
    const cost = this.productForm.get('costPrice')?.value;
    const sell = this.productForm.get('sellingPrice')?.value;
    return cost != null && sell != null && +sell < +cost;
  });

  showDiscountValue = computed(() =>
    this.productForm.get('discountType')?.value !== 'none'
  );

  categoryDropdownItems = computed(() =>
    this.categoryOptions.map(x => ({ id: x.value, name: x.label }))
  );
  brandDropdownItems = computed(() =>
    this.brandOptions.map(x => ({ id: x.value, name: x.label }))
  );

  get stockLevelError(): boolean {
    return !!(
      this.productForm.errors?.['maxLessThanMin'] &&
      (this.productForm.get('minStockLevel')?.touched ||
       this.productForm.get('maxStockLevel')?.touched)
    );
  }

  constructor() {

    afterNextRender(() => {
      requestAnimationFrame(() => {
        this.descriptionEditor     = new Editor();
        this.metaDescriptionEditor = new Editor();
        this.editorForm.controls['description'].valueChanges.subscribe(v =>
          this.productForm.patchValue({ description: v ?? '' })
        );
        this.editorForm.controls['metaTagDescription'].valueChanges.subscribe(v =>
          this.productForm.patchValue({ metaTagDescription: v ?? '' })
        );
        this.showEditor.set(true);
        this.cdr.detectChanges();
      });
    });

    effect(() => {
      const routeId = this.id();

      if (routeId) {
        const product = this.service.getById(+routeId);
        if (product) {
          this.productForm.patchValue(product);
          this.productForm.get('currentStock')?.setValue(product.currentStock ?? 0);
          this.selectedCategoryId.set(product.categoryId);
          this.editorForm.patchValue({
            description:        product.description        ?? '',
            metaTagDescription: product.metaTagDescription ?? '',
          });

          // Restore images
          if (Array.isArray(product.images) && product.images.length) {
            this.imagePreviews.set(product.images.map(img => img.url));
            const pIdx = product.images.findIndex(img => img.isPrimary);
            this.primaryIndex.set(pIdx !== -1 ? pIdx : 0);
            this.currentIndex.set(0);
          }

          this._loadBomForProduct(+routeId);

        } else {
          this.router.navigate(['/products']);
        }

      } else {
        this.generateProductCode();
        this.bomNodes.set([]);   
        this.nextBomId = this.bomService.getNextId();
      }
    });

    this.productForm.get('categoryId')?.valueChanges.subscribe(catId => {
      this.selectedCategoryId.set(catId ?? '');
      this.productForm.get('subCategoryId')?.setValue('');
    });
  }

  private _loadBomForProduct(productId: number): void {
    const nodes = this.bomService.getByProductId(productId);

    if (nodes.length) {
      const cloned: BomNode[] = nodes.map(n => ({
        ...n,
        isExpanded: true,
        isEditing:  false,
        hasError:   false,
      }));
      this.bomNodes.set(cloned);

      const maxId = Math.max(...cloned.map(n => n.id));
      this.nextBomId = maxId + 1;
    } else {
      this.bomNodes.set([]);
      this.nextBomId = this.bomService.getNextId();
    }
  }
  get flatBomTree(): BomNode[] {
    const nodes  = this.bomNodes();
    const result: BomNode[] = [];

    const visit = (parentId: number | null) => {
      nodes
        .filter(n => n.parentId === parentId)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .forEach(node => {
          result.push(node);
          if (node.isExpanded) visit(node.id);
        });
    };

    visit(null);
    return result;
  }

  hasChildren(id: number): boolean {
    return this.bomNodes().some(n => n.parentId === id);
  }

  addComponent(): void {
    const siblings = this.bomNodes().filter(n => n.parentId === null);
    const node: BomNode = {
      id:             this.nextBomId++,
      productId:      this.editId() || 0,  
      parentId:       null,
      level:          1,
      itemName:       '',
      itemCode:       '',
      rawMaterialId:  null,
      rawMaterialName:null,
      quantity:       1,
      unitId:         '',
      unitName:       '',
      wastagePercent: 0,
      costPerUnit:    null,
      isOptional:     false,
      processingNotes:'',
      sortOrder:      siblings.length,
      isExpanded:     true,
      isEditing:      true,
      hasError:       false,
    };
    this.bomNodes.update(arr => [...arr, node]);
    this.selectedBomNodeId.set(node.id);
  }

  addSubComponent(parentId?: number): void {
    const pid    = parentId ?? this.selectedBomNodeId();
    if (pid === null || pid === undefined) return;
    const parent = this.bomNodes().find(n => n.id === pid);
    if (!parent) return;
    const siblings = this.bomNodes().filter(n => n.parentId === pid);
    const node: BomNode = {
      id:              this.nextBomId++,
      productId:       parent.productId,
      parentId:        pid,
      level:           parent.level + 1,
      itemName:        '',
      itemCode:        '',
      rawMaterialId:   null,
      rawMaterialName: null,
      quantity:        1,
      unitId:          '',
      unitName:        '',
      wastagePercent:  0,
      costPerUnit:     null,
      isOptional:      false,
      processingNotes: '',
      sortOrder:       siblings.length,
      isExpanded:      true,
      isEditing:       true,
      hasError:        false,
    };
    this.bomNodes.update(arr => [...arr, node]);
    this.updateBomNode(pid, { isExpanded: true });
    this.selectedBomNodeId.set(node.id);
  }

  updateBomNode(id: number, changes: Partial<BomNode>): void {
    this.bomNodes.update(arr =>
      arr.map(n => (n.id === id ? { ...n, ...changes } : n))
    );
  }

  commitBomNode(id: number): void {
    const n = this.bomNodes().find(n => n.id === id);
    if (!n) return;
    const hasError =
      !n.itemName.trim()   ||
      !n.quantity          ||
      +n.quantity <= 0     ||
      !n.unitId            ||
      (n.costPerUnit !== null && +n.costPerUnit < 0) ||
      +n.wastagePercent < 0;
    this.updateBomNode(id, { isEditing: hasError, hasError });
  }

  toggleEdit(id: number): void {
    const n = this.bomNodes().find(n => n.id === id);
    if (!n) return;
    if (n.isEditing) { this.commitBomNode(id); return; }
    this.updateBomNode(id, { isEditing: true });
  }

  toggleExpand(id: number): void {
    const n = this.bomNodes().find(n => n.id === id);
    if (n) this.updateBomNode(id, { isExpanded: !n.isExpanded });
  }

  selectBomNode(id: number): void { this.selectedBomNodeId.set(id); }

  requestDeleteBomNode(id: number): void {
    if (this.hasChildren(id)) {
      this.pendingDeleteBomId.set(id);
      this.showBomDeletePrompt.set(true);
    } else {
      this.cascadeDeleteBomNode(id);
    }
  }

  cascadeDeleteBomNode(id: number): void {
    const toDelete = new Set<number>();
    const collect  = (nid: number) => {
      toDelete.add(nid);
      this.bomNodes()
        .filter(n => n.parentId === nid)
        .forEach(c => collect(c.id));
    };
    collect(id);
    this.bomNodes.update(arr => arr.filter(n => !toDelete.has(n.id)));
    if (this.selectedBomNodeId() === id) this.selectedBomNodeId.set(null);
    this.closeBomDeletePrompt();
  }

  promoteChildrenAndDelete(id: number): void {
    const node = this.bomNodes().find(n => n.id === id);
    if (!node) return;
    this.bomNodes.update(arr =>
      arr
        .map(n =>
          n.parentId === id
            ? { ...n, parentId: node.parentId, level: node.level }
            : n
        )
        .filter(n => n.id !== id)
    );
    if (this.selectedBomNodeId() === id) this.selectedBomNodeId.set(null);
    this.closeBomDeletePrompt();
  }

  closeBomDeletePrompt(): void {
    this.showBomDeletePrompt.set(false);
    this.pendingDeleteBomId.set(null);
  }

  generateProductCode(): void {
    const count = this.service.products().length;
    this.productForm.get('productCode')?.setValue(
      `PRD-${String(count + 1).padStart(5, '0')}`
    );
  }

  setTab(tab: TabId) { this.activeTab.set(tab); }

  hasError(field: string): boolean {
    const c = this.productForm.get(field);
    return !!(c?.invalid && c?.touched);
  }

  getError(field: string, error: string): boolean {
    const c = this.productForm.get(field);
    return !!(c?.touched && c?.errors?.[error]);
  }

  onMultipleSelect(e: Event) {
    const input     = e.target as HTMLInputElement;
    if (!input.files) return;
    const remaining = this.maxImages - this.imagePreviews().length;
    Array.from(input.files).slice(0, remaining).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      this.selectedFiles.update(arr => [...arr, file]);
      const reader = new FileReader();
      reader.onload = ev => {
        this.imagePreviews.update(arr => [...arr, ev.target?.result as string]);
        this.currentIndex.set(this.imagePreviews().length - 1);
      };
      reader.readAsDataURL(file);
    });
    input.value = '';
  }

  removeImage(index: number, event: Event) {
    event.stopPropagation();
    if (index === this.primaryIndex()) {
      this.pendingDeleteIndex.set(index);
      const modal = new bootstrap.Modal(document.getElementById('primaryDeleteModal'));
      modal.show();
      return;
    }
    this.deleteImageAt(index);
  }

  confirmDeletePrimary() {
    const index = this.pendingDeleteIndex();
    if (index === null) return;
    this.deleteImageAt(index);
    this.pendingDeleteIndex.set(null);
    this.primaryIndex.set(0);
    this.currentIndex.set(0);
  }

  private deleteImageAt(index: number) {
    const previews = [...this.imagePreviews()];
    previews.splice(index, 1);
    this.imagePreviews.set(previews);
    const files = [...this.selectedFiles()];
    files.splice(index, 1);
    this.selectedFiles.set(files);
    if (this.currentIndex() >= previews.length)
      this.currentIndex.set(Math.max(0, previews.length - 1));
    if (index < this.primaryIndex())
      this.primaryIndex.update(v => v - 1);
  }

  prev()   { if (this.currentIndex() > 0) this.currentIndex.update(v => v - 1); }
  next()   { if (this.currentIndex() < this.imagePreviews().length - 1) this.currentIndex.update(v => v + 1); }
  goTo(i: number) { this.currentIndex.set(i); }
  setPrimary()    { this.primaryIndex.set(this.currentIndex()); }

  onDragStart(e: MouseEvent)   { this.dragStartX.set(e.clientX); }
  onDragEnd(e: MouseEvent) {
    const dx = e.clientX - this.dragStartX();
    if (dx < -50 && this.currentIndex() < this.imagePreviews().length - 1)
      this.currentIndex.update(v => v + 1);
    else if (dx > 50 && this.currentIndex() > 0)
      this.currentIndex.update(v => v - 1);
  }
  onDragOver(e: DragEvent)  { e.preventDefault(); this.isDragging.set(true); }
  onDragLeave()             { this.isDragging.set(false); }
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging.set(false);
    const remaining = this.maxImages - this.imagePreviews().length;
    Array.from(e.dataTransfer?.files ?? []).slice(0, remaining).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      this.selectedFiles.update(arr => [...arr, file]);
      const reader = new FileReader();
      reader.onload = ev => {
        this.imagePreviews.update(arr => [...arr, ev.target?.result as string]);
        this.currentIndex.set(this.imagePreviews().length - 1);
      };
      reader.readAsDataURL(file);
    });
  }

  buildImagesPayload() {
    return this.imagePreviews().map((img, i) => ({
      id:        i + 1,
      url:       img,
      isPrimary: i === this.primaryIndex(),
    }));
  }

  onSave() {
    this.productForm.markAllAsTouched();
    this.bomNodes().forEach(n => { if (n.isEditing) this.commitBomNode(n.id); });

    const bomHasErrors = this.bomNodes().some(n => n.hasError);
    if (!this.productForm.valid || bomHasErrors) {
      const firstInvalid = document.querySelector(
        '.form-control.ng-invalid, .form-select.ng-invalid, .bom-row--error'
      );
      firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const formVal = this.productForm.getRawValue();
    const images  = this.buildImagesPayload();
    const bom     = this.bomNodes();

    if (this.editMode()) {
      const existing = this.service.getById(this.editId())!;
      const updated  = {
        ...existing,
        ...formVal,
        images,
        updatedAt: new Date().toISOString(),
      };
      this.service.updateProduct(updated as any);
      this.bomService.saveBomForProduct(this.editId(), bom);

    } else {
      const newProduct = {
        ...formVal,
        images,
        currentStock: 0,
        createdAt:    new Date().toISOString(),
        updatedAt:    new Date().toISOString(),
      };
      this.service.addProduct(newProduct as any);
      const savedProduct = this.service.products().at(-1);
      if (savedProduct?.id) {
        this.bomService.saveBomForProduct(savedProduct.id, bom);
      }
    }

    this.router.navigate(['/products']);
  }

  onCancel() { this.router.navigate(['/products']); }
}