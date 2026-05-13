// ── Product Create / Edit Component ──────────────────────────
// ✅ Angular 21 — uses input() signal for route params,
//    effect() instead of subscribe(), no OnInit/NgZone.

import { Component, computed, inject, signal, input, effect, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  BRAND_OPTIONS, CATEGORY_OPTIONS, DISCOUNT_OPTIONS, IDiscountOption,
  ISelectOption, IStatusOption, Product, PRODUCT_TYPE_OPTIONS,
  STATUS_OPTIONSPRODUCT, TabId, TAX_OPTIONS, TEMPLATE_OPTIONS, UNIT_OPTIONS,
} from '../product';
import { Router } from '@angular/router';
import { ProductDataClient } from '../product-data-client';
import { SearchDropdownComponent } from "../../../shared/components/search-dropdown/search-dropdown";
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

declare var bootstrap: any;

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SearchDropdownComponent,NgxEditorModule,ReactiveFormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
})
export class ProductCreateComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  service = inject(ProductDataClient);

  id = input<string>();

  editMode = computed(() => !!this.id());

  editId = computed(() => {
    const raw = this.id();
    return raw ? +raw : 0;
  });

  descriptionEditor!: Editor;

metaDescriptionEditor!: Editor;

readonly editorForm = new FormGroup({

  description:
    new FormControl(''),

  metaTagDescription:
    new FormControl('')

});


readonly toolbar: Toolbar = [

  ['bold', 'italic', 'underline'],

  ['strike'],

  ['code', 'blockquote'],

  [
    {
      heading: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6'
      ]
    }
  ],

  ['ordered_list', 'bullet_list'],

  ['link', 'image'],

  ['text_color', 'background_color'],

  ['horizontal_rule'],

  ['undo', 'redo']

];
  activeTab = signal<TabId>('general');
  isDragging = signal(false);
  imagePreviews = signal<string[]>([]);
  selectedFiles = signal<File[]>([]);
  currentIndex = signal(0);
  primaryIndex = signal(0);
  dragStartX = signal(0);
  pendingDeleteIndex = signal<number | null>(null);

  readonly maxImages = 5;

  categoryOptions: ISelectOption[] = CATEGORY_OPTIONS;
  brandOptions: ISelectOption[] = BRAND_OPTIONS;
  unitOptions = UNIT_OPTIONS;
  taxOptions: ISelectOption[] = TAX_OPTIONS;
  discountTypes: IDiscountOption[] = DISCOUNT_OPTIONS;
  statusOptions: IStatusOption[] = STATUS_OPTIONSPRODUCT;
  templateOptions: ISelectOption[] = TEMPLATE_OPTIONS;
  ProductType: ISelectOption[] = PRODUCT_TYPE_OPTIONS;

  productForm: FormGroup = this.fb.group({
    productCode: ['', [Validators.required, Validators.maxLength(30)]],
    productName: ['', [Validators.required, Validators.maxLength(200)]],
    categoryId: ['', Validators.required],
    brandId: [''],
    unitId: ['', Validators.required],
    barcode: ['', Validators.maxLength(50)],
    costPrice: [null, [Validators.required, Validators.min(0.01)]],
    sellingPrice: [null, [Validators.required, Validators.min(0.01)]],
    taxId: [''],
    isInclusiveTax: [false],
    discountType: ['none'],
    discountValue: [null],
    reorderLevel: [0],
    maxStockLevel: [0],
    currentStock: [0],
    description: [''],
    metaTagTitle: [''],
    metaTagDescription: [''],
    isPhysical: [false],
    productTemplate: [''],
    ProductType: [''],
    status: ['active'],
    mediaFiles: [[]],
  });

  pageTitle = computed(() => this.editMode() ? 'Product Inventory' : 'Product Inventory');
  pageSubtitle = computed(() =>
    this.editMode()
      ? 'Update existing product details and manage your inventory.'
      : 'Add new products and manage your inventory efficiently from a single place.'
  );
  pageCrumb = computed(() => this.editMode() ? 'Edit' : 'Create');

  sellingPriceWarn = computed(() => {
    const cost = this.productForm.get('costPrice')?.value;
    const sell = this.productForm.get('sellingPrice')?.value;
    return cost && sell && +sell < +cost;
  });

  showDiscountValue = computed(() =>
    this.productForm.get('discountType')?.value !== 'none'
  );

  /**
   * ✅ Constructor replaces ngOnInit().
   *    Uses effect() to react to route param changes,
   *    and another effect() to auto-generate product code.
   */
showEditor =
  signal(false);
  private readonly cdr =
  inject(ChangeDetectorRef);
/* =====================================================
   CONSTRUCTOR
===================================================== */

constructor() {

  afterNextRender(() => {
    requestAnimationFrame(() => {
      this.descriptionEditor = new Editor();  
      this.metaDescriptionEditor = new Editor();  


      // subscribe AFTER editor is created
this.editorForm.controls[
  'description'
].valueChanges.subscribe(value => {

  this.productForm.patchValue({

    description:
      value || ''

  });

});

this.editorForm.controls[
  'metaTagDescription'
].valueChanges.subscribe(value => {

  this.productForm.patchValue({

    metaTagDescription:
      value || ''

  });

});
      this.showEditor.set(true);
      this.cdr.detectChanges();
    });
  });
    // ── effect #1: Load product data in edit mode ──
    effect(() => {
      const routeId = this.id();
      if (routeId) {
        const product = this.service.getById(+routeId);
        if (product) {
          this.productForm.patchValue(product);
          this.productForm.get('currentStock')?.setValue(product.currentStock ?? 0);

          // Restore images for edit mode
          if (Array.isArray(product.images) && product.images.length) {
            const previews = product.images.map(img => img.url);
            this.imagePreviews.set(previews);
            const pIdx = product.images.findIndex(img => img.isPrimary);
            this.primaryIndex.set(pIdx !== -1 ? pIdx : 0);
            this.currentIndex.set(0);
          }
        } else {
          this.router.navigate(['/products']);
        }
      } else {
        this.generateProductCode();
      }
    });

    // ── effect #2: Auto-regenerate product code on category change (create mode only) ──
    // ✅ Using toObservable() isn't needed here; a simple valueChanges listener
    //    inside the constructor is fine since the form lives as long as the component.
    this.productForm.get('categoryId')?.valueChanges.subscribe(() => {
      if (!this.editMode()) {
        this.generateProductCode();
      }
    });
  }

  generateProductCode(): void {
    const categoryId = this.productForm.get('categoryId')?.value;
    const prefixMap: Record<number, string> = {
      1: 'ELEC',
      2: 'CLTH',
      3: 'FOOD',
      4: 'BOOK',
    };
    const prefix = prefixMap[categoryId] ?? 'PROD';
    const existingCount = this.service.products()
      .filter(p => p.categoryId === +categoryId).length;
    const nextNum = String(existingCount + 1).padStart(3, '0');
    this.productForm.get('productCode')?.setValue(`${prefix}${nextNum}`);
  }

  setTab(tab: TabId) {
    this.activeTab.set(tab);
  }

  onMultipleSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    const remaining = this.maxImages - this.imagePreviews().length;

    files.slice(0, remaining).forEach(file => {
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

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log('Dropped files:', input.files);
    }
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

    if (this.currentIndex() >= previews.length) {
      this.currentIndex.set(Math.max(0, previews.length - 1));
    }
    if (index < this.primaryIndex()) {
      this.primaryIndex.update(v => v - 1);
    }
  }

  prev() { if (this.currentIndex() > 0) this.currentIndex.update(v => v - 1); }
  next() { if (this.currentIndex() < this.imagePreviews().length - 1) this.currentIndex.update(v => v + 1); }
  goTo(i: number) { this.currentIndex.set(i); }
  setPrimary() { this.primaryIndex.set(this.currentIndex()); }

  onDragStart(e: MouseEvent) { this.dragStartX.set(e.clientX); }
  onDragEnd(e: MouseEvent) {
    const dx = e.clientX - this.dragStartX();
    if (dx < -50 && this.currentIndex() < this.imagePreviews().length - 1) this.currentIndex.update(v => v + 1);
    else if (dx > 50 && this.currentIndex() > 0) this.currentIndex.update(v => v - 1);
  }

  onDragOver(e: DragEvent) { e.preventDefault(); this.isDragging.set(true); }
  onDragLeave() { this.isDragging.set(false); }
  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging.set(false);

    const files = Array.from(e.dataTransfer?.files ?? []);
    const remaining = this.maxImages - this.imagePreviews().length;

    files.slice(0, remaining).forEach(file => {
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

  hasError(field: string): boolean {
    const c = this.productForm.get(field);
    return !!(c?.invalid && c?.touched);
  }

  buildImagesPayload() {
    return this.imagePreviews().map((img, index) => ({
      id: index + 1,
      url: img,
      isPrimary: index === this.primaryIndex(),
    }));
  }

  onSave() {
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formVal = this.productForm.value;
    const imagesPayload = this.buildImagesPayload();

    if (this.editMode()) {
      const existing = this.service.getById(this.editId())!;
      const updated: Product = {
        ...existing,
        ...formVal,
        status: formVal.status,
        images: imagesPayload,
        updatedAt: new Date().toISOString(),
      };
      this.service.updateProduct(updated);
    } else {
      const newProduct: Product = {
        ...formVal,
        status: formVal.status,
        images: imagesPayload,
        currentStock: formVal.currentStock ?? 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.service.addProduct(newProduct);
    }

    this.router.navigate(['/products']);
  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  categoryDropdownItems = computed(() =>

    this.categoryOptions.map(x => ({

      id: x.value,

      name: x.label

    }))
  );

  brandDropdownItems = computed(() =>

    this.brandOptions.map(x => ({

      id: x.value,

      name: x.label

    }))
  );
}
