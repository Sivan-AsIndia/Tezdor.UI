import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  SUPPLIER_OPTIONS, PO_OPTIONS, INVOICE_STATUS_OPTIONS,
  InvoiceStatus, PILineItem, SUPPLIER_MAP
} from '../purchase-invoice';
import { UNIT_OPTIONS, TAX_OPTIONS } from '../../../product/product';
import { PurchaseInvoiceDataClient } from '../purchase-invoice-data-client';
import { ToastNotifier } from '../../../../core/services/toast';
import { CommonModule } from '@angular/common';
import { ProductDataClient } from '../../../product/product-data-client';

@Component({
  selector: 'app-purchase-invoice-create',
  imports: [CommonModule],
  templateUrl: './purchase-invoice-create.html',
  styleUrl: './purchase-invoice-create.css',
})
export class PurchaseInvoiceCreateComponent implements OnInit {

  private readonly toast   = inject(ToastNotifier);
  private readonly router  = inject(Router);
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(PurchaseInvoiceDataClient);
  product                  = inject(ProductDataClient);

  supplierOptions      = SUPPLIER_OPTIONS;
  unitOptions          = UNIT_OPTIONS;
  taxOptions           = TAX_OPTIONS;
  poOptions            = PO_OPTIONS;
  invoiceStatusOptions = INVOICE_STATUS_OPTIONS;

  editId: number | null = null;
  get isEditMode(): boolean { return this.editId !== null; }
  get pageTitle():  string  { return this.isEditMode ? 'Edit Purchase Invoice' : 'Create Purchase Invoice'; }

  invoiceNo         = signal('');
  supplierInvNo     = signal('');
  invoiceDate       = signal(new Date().toISOString().split('T')[0]);
  supplierId        = signal('');
  poRef             = signal('');
  invoiceStatus     = signal<InvoiceStatus | ''>('');
  notes             = signal('');
  amountPaid        = signal<number>(0);
  paymentDueDate    = signal('');

  submitted = signal(false);
  touched   = signal<Record<string, boolean>>({});

  touch(key: string) {
    this.touched.update(t => ({ ...t, [key]: true }));
  }

  touchRow(id: number, field: string) {
    this.touch(`row_${id}_${field}`);
  }

  isInvalid(key: string, value: any): boolean {
    if (!this.submitted() && !this.touched()[key]) return false;
    return !value || (typeof value === 'string' && !value.trim());
  }

  isRowInvalid(id: number, field: string, value: any): boolean {
    const key = `row_${id}_${field}`;
    if (!this.submitted() && !this.touched()[key]) return false;
    if (field === 'productCode') return !value || !String(value).trim();
    if (field === 'qty')         return !value || +value <= 0;
    return false;
  }

  private nextId = 1;
  lineItems = signal<PILineItem[]>([this.newRow()]);

  newRow(): PILineItem {
    return {
      id: this.nextId++,
      productId: '', productCode: '', productName: '',
      unitId: 1, unitName: 'Pcs',
      qty: 1, unitCost: 0, taxPercent: 18, lineTotal: 0,
    };
  }

  addRow(): void { this.lineItems.update(rows => [...rows, this.newRow()]); }

  removeRow(id: number): void {
    if (this.lineItems().length === 1) {
      this.toast.error('At least one line item is required.');
      return;
    }
    this.lineItems.update(rows => rows.filter(r => r.id !== id));
  }

  updateRow(id: number, field: keyof PILineItem, rawValue: any): void {
    this.lineItems.update(rows =>
      rows.map(r => {
        if (r.id !== id) return r;
        const value = (['qty', 'unitCost', 'taxPercent', 'unitId'].includes(field as string))
          ? +rawValue
          : rawValue;
        const updated: PILineItem = { ...r, [field]: value };
        if (field === 'unitId') updated.unitName = this.getUnitName(+value);
        updated.lineTotal = this.calcLineTotal(updated);
        return updated;
      })
    );
    this.touch(`row_${id}_${field}`);
  }

  calcLineTotal(row: PILineItem): number {
    const base = row.qty * row.unitCost;
    const tax  = base * (row.taxPercent / 100);
    return +(base + tax).toFixed(2);
  }

  grandTotal    = computed(() => this.lineItems().reduce((s, r) => s + this.calcLineTotal(r), 0));
  balanceDue    = computed(() => Math.max(0, this.grandTotal() - this.amountPaid()));
  paymentStatus = computed(() => this.service.computePaymentStatus(this.grandTotal(), this.amountPaid()));

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      // EDIT MODE — load existing invoice first, then set invoiceNo from it
      const id  = +idParam;
      const inv = this.service.getById(id);
      if (!inv) {
        this.toast.error('Invoice not found.');
        this.router.navigate(['/purchaseinvoice-list']);
        return;
      }

      this.editId = id;
      // FIX: In original code, nextInvoiceNo() was called unconditionally at
      // the top of ngOnInit, which could increment the counter even in edit
      // mode. Now we only call it in create mode (below).
      this.invoiceNo.set(inv.invoiceNo);
      this.supplierInvNo.set(inv.supplierInvoiceNo);
      this.invoiceDate.set(this.toDateInput(inv.invoiceDate));
      this.supplierId.set(inv.supplierId);
      this.poRef.set(inv.poRef ?? '');
      this.invoiceStatus.set(inv.invoiceStatus);
      this.notes.set(inv.notes ?? '');
      this.amountPaid.set(inv.amountPaid);
      this.paymentDueDate.set(this.toDateInput(inv.paymentDueDate));

      const reIdedItems = inv.lineItems.map(item => ({ ...item, id: this.nextId++ }));
      this.lineItems.set(reIdedItems);
    } else {
      // CREATE MODE — generate a new invoice number
      this.invoiceNo.set(this.service.nextInvoiceNo());
    }
  }

  private toDateInput(raw: string | undefined): string {
    if (!raw) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
    if (raw.includes('T')) return raw.split('T')[0];
    return raw;
  }

  saveInvoice(): void {
    this.submitted.set(true);

    if (!this.supplierId())           { this.toast.error('Please select a supplier.');                    return; }
    if (!this.supplierInvNo().trim()) { this.toast.error('Supplier Invoice No is required.');             return; }
    if (!this.invoiceDate())          { this.toast.error('Invoice date is required.');                    return; }
    if (!this.invoiceStatus())        { this.toast.error('Invoice status is required.');                  return; }

    const hasNoProduct = this.lineItems().some(r => !r.productCode || !r.productCode.trim());
    if (hasNoProduct)                 { this.toast.error('Please select a product for all line items.');  return; }

    const hasZeroQty = this.lineItems().some(r => r.qty <= 0);
    if (hasZeroQty)                   { this.toast.error('Quantity must be > 0 for all items.');          return; }

    const supplier = SUPPLIER_MAP[this.supplierId()];

    const invData = {
      invoiceNo:         this.invoiceNo(),
      supplierInvoiceNo: this.supplierInvNo(),
      invoiceDate:       this.invoiceDate(),
      supplierId:        this.supplierId(),
      supplierCode:      supplier?.code ?? '',
      supplierName:      supplier?.name ?? '',
      poRef:             this.poRef(),
      lineItems:         this.lineItems().map(r => ({ ...r, lineTotal: this.calcLineTotal(r) })),
      grandTotal:        this.grandTotal(),
      amountPaid:        this.amountPaid(),
      balanceDue:        this.balanceDue(),
      paymentDueDate:    this.paymentDueDate(),
      paymentStatus:     this.paymentStatus(),
      invoiceStatus:     this.invoiceStatus() as InvoiceStatus,
      notes:             this.notes(),
    };

    if (this.isEditMode) {
      this.service.updateInvoice(this.editId!, { ...invData, updatedAt: new Date().toISOString() });
      this.toast.success('Invoice updated successfully!');
    } else {
      this.service.addInvoice({ ...invData, createdAt: new Date().toISOString() });
      this.toast.success('Invoice created successfully!');
    }

    // FIX: consistent route name across all files
    this.router.navigate(['/purchaseinvoice-list']);
  }

  cancel(): void { this.router.navigate(['/purchaseinvoice-list']); }

  activeTab = signal<'items' | 'supplier' | 'payment'>('items');

  get supplierLabel(): string {
    return this.supplierOptions.find(v => v.value === this.supplierId())?.label ?? '—';
  }
  get supplierName(): string {
    return SUPPLIER_MAP[this.supplierId()]?.name ?? '—';
  }

  trackById(_: number, item: PILineItem): number { return item.id; }

  getUnitName(id: number): string {
    return this.unitOptions.find(u => +u.value === id)?.label ?? 'Pcs';
  }

  capitalize(val: string): string {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  payStatusClass(s: string): string {
    const map: Record<string, string> = {
      unpaid:  'text-error',
      partial: 'text-warning',
      paid:    'text-success',
    };
    return map[s] ?? '';
  }

  getProductName(code: string): string {
    return this.product.products().find(p => p.productCode === code)?.productName ?? '';
  }

  onProductSelect(row: PILineItem, code: string): void {
    const prod = this.product.products().find(p => p.productCode === code);
    this.lineItems.update(rows =>
      rows.map(r =>
        r.id === row.id
          ? { ...r, productCode: code, productName: prod?.productName ?? '' }
          : r
      )
    );
    this.touch(`row_${row.id}_productCode`);
  }
}
