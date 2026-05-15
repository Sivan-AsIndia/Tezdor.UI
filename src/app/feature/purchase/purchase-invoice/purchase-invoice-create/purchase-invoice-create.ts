import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, signal, computed, ChangeDetectorRef, afterNextRender } from "@angular/core";
import { Router, ActivatedRoute, RouterLink } from "@angular/router";
import { FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { InvoiceStatus, LineItem, PaymentStatus, poOptions, SUPPLIER_OPTIONS } from "../purchase-invoice";
import { ToastNotifier } from "../../../../core/services/toast";
import { PurchaseInvoiceDataClient } from "../purchase-invoice-data-client";
import { ProductDataClient } from "../../../product/product-data-client";
import { DropdownOption, UNIT_OPTIONS } from "../../../product/product";
import { TAX_OPTIONS } from "../../purchase-order/purchase-order";
import { SearchDropdownComponent } from "../../../../shared/components/search-dropdown/search-dropdown";
import { Editor, NgxEditorModule, Toolbar } from "ngx-editor";

@Component({
  selector: 'app-purchase-invoice-create',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SearchDropdownComponent,
    NgxEditorModule,RouterLink
  ],
  templateUrl: './purchase-invoice-create.html',
  styleUrl: './purchase-invoice-create.css',
})
export class PurchaseInvoiceCreateComponent implements OnInit {

  private router = inject(Router);
  private readonly toast = inject(ToastNotifier);
  private readonly route = inject(ActivatedRoute);
  service = inject(PurchaseInvoiceDataClient);
  product = inject(ProductDataClient);

  private nextId = 1;
  private _nextId = 1;
  editId: number | null = null;

  get isEditMode(): boolean { return this.editId !== null; }
  get pageTitle(): string { return this.isEditMode ? 'Purchase Invoice' : 'Purchase Invoice'; }

  invoiceNo = signal('PINV-2026-00045');
  supplierInvNo = signal('');
  invoiceDate = signal(new Date().toISOString().slice(0, 10));
  invoiceStatus = signal<InvoiceStatus | ''>('draft');
  supplierId = signal<string | number | null>(null);
  poRef = signal<string | null>(null);
  notes = signal('');

  amountPaid = signal(0);
  paymentDueDate = signal('');
  freightCharges = signal(0);
  customDuty = signal(0);

  showFreight = signal(false);
  freightLabel = signal('Freight Charges');
  showCustomDuty = signal(false);
  customDutyLabel = signal('Custom Duty');

  lineItems = signal<LineItem[]>([this._blankRow()]);

  private readonly cdr =
  inject(ChangeDetectorRef);


notesEditor!: Editor;


showNotesEditor =
  signal(false);


readonly notesControl =
  new FormControl('');

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

  constructor() {

  afterNextRender(() => {

    requestAnimationFrame(() => {

      /* INIT */
      this.notesEditor =
        new Editor();

      /* INITIAL */
      this.notesControl.setValue(
        this.notes() || '',
        {
          emitEvent: false
        }
      );

      /* VALUE CHANGES */
      this.notesControl
        .valueChanges
        .subscribe(value => {

          this.notes.set(
            value || ''
          );

        });

      /* SHOW */
      this.showNotesEditor
        .set(true);

      this.cdr.detectChanges();

    });

  });

}

  // Datepicker FormControls
  invoiceDateControl = new FormControl<Date | null>(new Date());
  paymentDueDateControl = new FormControl<Date | null>(null);

  // Row FormControls Maps
  private productControls = new Map<number, FormControl>();
  private unitControls = new Map<number, FormControl>();
  private taxControls = new Map<number, FormControl>();

  getProductControl(row: LineItem): FormControl {
    if (!this.productControls.has(row.id)) {
      this.productControls.set(row.id, new FormControl(row.productCode || null));
    }
    return this.productControls.get(row.id)!;
  }

  getUnitControl(row: LineItem): FormControl {
    if (!this.unitControls.has(row.id)) {
      this.unitControls.set(row.id, new FormControl(row.unitId));
    }
    return this.unitControls.get(row.id)!;
  }

  getTaxControl(row: LineItem): FormControl {
    if (!this.taxControls.has(row.id)) {
      this.taxControls.set(row.id, new FormControl(row.taxPercent || null));
    }
    return this.taxControls.get(row.id)!;
  }

  setInvoiceStatus(value: string) {

  this.invoiceStatus.set(value as InvoiceStatus);

  this.touch('invoiceStatus');
}

  readonly invoiceStatusOptions: DropdownOption[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'approved', label: 'Approved' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  supplierOptions = SUPPLIER_OPTIONS;
  poOptions = poOptions;
  unitOptions = UNIT_OPTIONS;
  taxOptions = TAX_OPTIONS;

  cgst = computed(() => this.totalTax() / 2);
  sgst = computed(() => this.totalTax() / 2);
  igst = computed(() => this.totalTax());

  gstType = signal<'gst' | 'igst'>('gst');

  subTotal = computed(() =>
    this.lineItems().reduce((s, r) => s + r.qty * r.unitCost, 0)
  );

  totalTax = computed(() =>
    this.lineItems().reduce((s, r) => s + r.qty * r.unitCost * r.taxPercent, 0)
  );

  grandTotal = computed(() =>
    this.subTotal() + this.totalTax() + this.freightCharges() + this.customDuty()
  );

  balanceDue = computed(() =>
    Math.max(0, this.grandTotal() - this.amountPaid())
  );

  paymentStatus = computed<PaymentStatus>(() => {
    if (this.amountPaid() <= 0) return 'unpaid';
    if (this.amountPaid() >= this.grandTotal()) return 'paid';
    return 'partial';
  });

  selectedSupplierName = computed(() =>
    this.supplierOptions.find(s => s.value === this.supplierId())?.label ?? ''
  );

  private _touched = new Set<string>();
  private _rowTouched = new Map<number, Set<string>>();

  touch(field: string) { this._touched.add(field); }

  touchRow(id: number, f: string) {
    if (!this._rowTouched.has(id)) this._rowTouched.set(id, new Set());
    this._rowTouched.get(id)!.add(f);
  }

  isInvalid(field: string, val: any): boolean {
    return this._touched.has(field) && (!val || val === '');
  }

  isRowInvalid(id: number, field: string, val: any): boolean {
    return !!(this._rowTouched.get(id)?.has(field)) && (!val || +val <= 0);
  }

  rowHasError(id: number): boolean {
    const row = this.lineItems().find(r => r.id === id);
    if (!row) return false;
    return (
      this.isRowInvalid(id, 'productCode', row.productCode) ||
      this.isRowInvalid(id, 'qty', row.qty) ||
      this.isRowInvalid(id, 'unitCost', row.unitCost)
    );
  }

  private _blankRow(): LineItem {
    return {
      id: this._nextId++,
      productCode: '',
      productName: '',
      unitId: 1,
      qty: 0,
      unitCost: 0,
      taxPercent: 0,
    };
  }

  addRow() {
    this.lineItems.update(list => [...list, this._blankRow()]);
  }

  removeRow(id: number) {
    this.productControls.delete(id);
    this.unitControls.delete(id);
    this.taxControls.delete(id);
    this.lineItems.update(list => list.filter(r => r.id !== id));
  }

  updateRow(id: number, field: keyof LineItem, val: any) {
    this.lineItems.update(list =>
      list.map(r => r.id === id ? { ...r, [field]: val } : r)
    );
  }

  onProductSelect(row: LineItem, productCode: string) {
    const prod = this.product.products().find(p => p.productCode === productCode);
    this.lineItems.update(list =>
      list.map(r => r.id === row.id ? {
        ...r,
        productCode,
        productName: prod?.productName ?? '',
        unitId: prod?.unitId ?? 1,
      } : r)
    );
  }

  toggleFreight(checked: boolean) {
    this.showFreight.set(checked);
    if (!checked) {
      this.freightCharges.set(0);
      this.freightLabel.set('Freight Charges');
    }
  }

  toggleCustomDuty(checked: boolean) {
    this.showCustomDuty.set(checked);
    if (!checked) {
      this.customDuty.set(0);
      this.customDutyLabel.set('Custom Duty');
    }
  }

  calcTaxAmt(row: LineItem): number { return row.qty * row.unitCost * row.taxPercent; }
  calcLineTotal(row: LineItem): number { return row.qty * row.unitCost * (1 + row.taxPercent); }
  capitalize(s: string) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

  private toDateInput(raw: string | undefined): string {
    if (!raw) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
    if (raw.includes('T')) return raw.split('T')[0];
    return raw;
  }

  private stringToDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = +idParam;
      const inv = this.service.getById(id);
      if (!inv) {
        this.toast.error('Invoice not found.');
        this.router.navigate(['/purchase-invoice']);
        return;
      }

      this.editId = id;
      this.invoiceNo.set(inv.invoiceNo);
      this.supplierInvNo.set(inv.supplierInvoiceNo);
      this.invoiceDate.set(this.toDateInput(inv.invoiceDate));
      this.invoiceDateControl.setValue(this.stringToDate(inv.invoiceDate));
      this.supplierId.set(inv.supplierId);
      this.poRef.set(inv.poRef ?? '');
      this.invoiceStatus.set(inv.invoiceStatus);
      this.notes.set(inv.notes ?? '');
      this.amountPaid.set(inv.amountPaid);
      this.paymentDueDate.set(this.toDateInput(inv.paymentDueDate));
      this.paymentDueDateControl.setValue(this.stringToDate(inv.paymentDueDate));

      this.freightCharges.set(inv.freightCharges ?? 0);
      this.customDuty.set(inv.customDuty ?? 0);

      if ((inv.freightCharges ?? 0) > 0) {
        this.showFreight.set(true);
        this.freightLabel.set(inv.freightLabel ?? 'Freight Charges');
      }
      if ((inv.customDuty ?? 0) > 0) {
        this.showCustomDuty.set(true);
        this.customDutyLabel.set(inv.customDutyLabel ?? 'Custom Duty');
      }

      const reIdedItems = inv.lineItems.map((item: any) => ({
        ...item,
        id: this.nextId++
      }));
      this.lineItems.set(reIdedItems);

    } else {
      this.invoiceNo.set(this.service.nextInvoiceNo());
    }
  }

  saveDraft() { console.log('Draft saved'); }

  saveInvoice() {
    ['supplierInvNo', 'invoiceDate', 'invoiceStatus', 'supplierId'].forEach(f =>
      this._touched.add(f)
    );
    this.lineItems().forEach(row => {
      this.touchRow(row.id, 'productCode');
      this.touchRow(row.id, 'qty');
      this.touchRow(row.id, 'unitCost');
    });

    const valid =
      this.supplierInvNo() &&
      this.invoiceDate() &&
      this.invoiceStatus() &&
      this.supplierId() &&
      this.lineItems().length > 0 &&
      this.lineItems().every(r => r.productCode && r.qty > 0 && r.unitCost > 0);

    if (!valid) return;

    const payload = {
      invoiceNo: this.invoiceNo(),
      supplierInvNo: this.supplierInvNo(),
      invoiceDate: this.invoiceDate(),
      invoiceStatus: this.invoiceStatus(),
      supplierId: this.supplierId(),
      poRef: this.poRef(),
      notes: this.notes(),
      lineItems: this.lineItems(),
      amountPaid: this.amountPaid(),
      paymentDueDate: this.paymentDueDate(),
      freightCharges: this.freightCharges(),
      freightLabel: this.freightLabel(),
      customDuty: this.customDuty(),
      customDutyLabel: this.customDutyLabel(),
      grandTotal: this.grandTotal(),
      balanceDue: this.balanceDue(),
    };

    this.service.add(payload);
    this.router.navigate(['/purchase-invoice']);
  }

  cancel() { this.router.navigate(['/purchase-invoice']); }



  // --------- Dropdown Items --------------
  supplierDropdownItems = computed(() =>

    this.supplierOptions.map(x => ({

      id: String(x.value),

      name: x.label

    }))
  );

  poDropdownItems = computed(() =>

    this.poOptions.map(x => ({

      id: String(x.value),

      name: x.label

    }))
  );

  productDropdownItems = computed(() =>

    this.product.products().map(x => ({

      id: x.productCode,

      name: x.productName

    }))
  );

  unitDropdownItems = computed(() =>

    this.unitOptions.map(x => ({

      id: String(x.value),

      name: x.label

    }))
  );

  taxDropdownItems = computed(() =>

    this.taxOptions.map(x => ({

      id: String(x.value),

      name: x.label

    }))
  );

  invoiceStatusDropdownItems = computed(() =>

    this.invoiceStatusOptions.map(x => ({

      id: String(x.value),

      name: x.label

    }))
  );
}