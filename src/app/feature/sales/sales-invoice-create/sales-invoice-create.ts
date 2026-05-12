import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CUSTOMER_OPTIONS, DEMO_PRODUCTS,
  INVOICE_STATUS_OPTIONS, INVOICE_TYPE_OPTIONS, PAYMENT_MODE_OPTIONS,
  PAYMENT_TERMS_OPTIONS,
  PaymentMode,
  PLACE_OF_SUPPLY_OPTIONS,
  SalesInvoice,
  SalesInvoiceStatus,
  SILineItem,
} from '../sales-invoice';
import { UNIT_OPTIONS } from '../../purchase/purchase-invoice/purchase-invoice';
import { CommonModule } from '@angular/common';
import { SalesInvoiceDataClient } from '../sales-invoice-data-client';
import { ToastNotifier } from '../../../core/services/toast';
import { TAX_MAP, TAX_OPTIONS } from '../../product/product';
import { INITIAL_PRODUCTS } from '../../product/product.seed';

export interface SILineItemEx extends SILineItem {
  errDiscount: boolean;
}
@Component({
  selector: 'app-sales-invoice-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-invoice-create.html',
  styleUrl: './sales-invoice-create.css',
})
export class SalesInvoiceCreateComponent implements OnInit {

  router = inject(Router);
  route = inject(ActivatedRoute);
  private siSvc = inject(SalesInvoiceDataClient);
  private toast = inject(ToastNotifier);

  editId = signal<number | null>(null);
  isEditMode = computed(() => this.editId() !== null);
  get pageTitle() { return this.isEditMode() ? 'Invoice' : 'New Invoice'; }

  customerOptions = CUSTOMER_OPTIONS;
productOptions = INITIAL_PRODUCTS.map(p => ({
  value:  p.productCode,
  label:  `${p.productCode} — ${p.productName}`,
  price:  p.costPrice,
  taxPct: TAX_MAP[p.taxId ?? 0] ?? 18,  
  unitId: p.unitId,
  hsn:    '',
}));

  unitOptions = UNIT_OPTIONS;
  taxOptions = TAX_OPTIONS;
  statusOptions = INVOICE_STATUS_OPTIONS;
  paymentModeOptions = PAYMENT_MODE_OPTIONS;
  invoiceTypeOptions = INVOICE_TYPE_OPTIONS;
  paymentTermOptions = PAYMENT_TERMS_OPTIONS;
  placeOfSupplyOptions = PLACE_OF_SUPPLY_OPTIONS;

  invoiceNo = signal('');
  invoiceDate = signal(new Date().toISOString().substring(0, 10));
  dueDate = signal('');
  invoiceType = signal('tax_invoice');
  invoiceStatus = signal('draft');
  financialYear = signal(this.getFinancialYear());
  placeOfSupply = signal('TN');
  poReference = signal('');
  currency = signal('INR');
  branchId = signal('BR01');
  notes = signal('');
  termsConditions = signal('');
  gstType = signal<'gst' | 'igst'>('gst');
  deliveryAddress = signal('');
  paymentDueDate = signal('');

  customerId = signal('');
  customerName = signal('');
  customerGSTIN = signal('');
  customerPAN = signal('');
  billingAddress = signal('');
  shippingAddress = signal('');
  phoneEmail = signal('');

  selectedCustomer = computed(() =>
    this.customerOptions.find(c => c.value === this.customerId()) ?? null
  );

  onCustomerChange(id: string) {
    this.customerId.set(id);
    const c = this.customerOptions.find(x => x.value === id);
    if (c) {
      this.customerName.set(c.label ?? '');
      this.customerGSTIN.set((c as any).gstin ?? '');
      this.customerPAN.set((c as any).pan ?? '');
      this.billingAddress.set((c as any).address ?? '');
      this.shippingAddress.set((c as any).address ?? '');
      this.phoneEmail.set((c as any).email ?? '');
    } else {
      this.customerName.set('');
      this.customerGSTIN.set('');
      this.customerPAN.set('');
      this.billingAddress.set('');
      this.shippingAddress.set('');
      this.phoneEmail.set('');
    }
  }

  paymentTerms = signal('net30');
  paymentMode = signal<PaymentMode | ''>('');
  paymentDate = signal('');
  transactionRef = signal('');
  amountPaid = signal(0);
  lateFeeInterest = signal(0);

  showFreight = signal(false);
  freightCharges = signal(0);
  showCustomDuty = signal(false);
  customDuty = signal(0);

  toggleFreight(v: boolean) { this.showFreight.set(v); if (!v) this.freightCharges.set(0); }
  toggleCustomDuty(v: boolean) { this.showCustomDuty.set(v); if (!v) this.customDuty.set(0); }

  private rowCounter = 1;
  lineItems = signal<SILineItemEx[]>([this.blankRow()]);

  blankRow(): SILineItemEx {
    return {
      sNo: this.rowCounter++,
      productId: '', productCode: '', itemName: '',
      hsnSacCode: '', quantity: 1, unitOfMeasure: '',
      unitPrice: 0, discountPercent: 0, taxableAmount: 0,
      unitId: 1, gstRate: 18, taxPercent: 18,
      cgstAmount: 0, sgstAmount: 0, igstAmount: 0,
      lineTotal: 0, batchSerialNo: '', taxId: '',
      errProduct: false, errQty: false,
      errPrice: false, errDiscount: false,
    };
  }

  addRow() { this.lineItems.update(r => [...r, this.blankRow()]); }

  removeRow(sNo: number) {
    if (this.lineItems().length === 1) return;
    this.lineItems.update(r => r.filter(x => x.sNo !== sNo));
  }

  onProductSelect(sNo: number, code: string) {
    const prod = this.productOptions.find(p => p.value === code);
    this.lineItems.update(rows => rows.map(r =>
      r.sNo === sNo ? {
        ...r,
        productCode: code,
        itemName: prod?.label ?? '',
        unitPrice: prod?.price ?? 0,
        taxPercent: prod?.taxPct ?? 18,
        gstRate: prod?.taxPct ?? 18,
        unitId: prod?.unitId ?? 1,
        hsnSacCode: (prod as any)?.hsn ?? '',
        errProduct: false,
      } : r
    ));
  }

  updateRow<K extends keyof SILineItemEx>(sNo: number, field: K, value: SILineItemEx[K]) {
    this.lineItems.update(rows => rows.map(r =>
      r.sNo === sNo ? { ...r, [field]: value } : r
    ));
  }

  lineSubTotal(r: SILineItemEx): number {
    const base = r.quantity * r.unitPrice;
    return base - (base * r.discountPercent / 100);
  }
  lineTax(r: SILineItemEx): number {
    return this.lineSubTotal(r) * (r.taxPercent / 100);
  }
  lineTotal(r: SILineItemEx): number {
    return this.lineSubTotal(r) + this.lineTax(r);
  }

  subTotal = computed(() => this.lineItems().reduce((s, r) => s + this.lineSubTotal(r), 0));
  totalTax = computed(() => this.lineItems().reduce((s, r) => s + this.lineTax(r), 0));
  cgst = computed(() => this.totalTax() / 2);
  sgst = computed(() => this.totalTax() / 2);
  igst = computed(() => this.gstType() === 'igst' ? this.totalTax() : 0);
  grandTotal = computed(() =>
    this.subTotal() + this.totalTax()
    + (this.showFreight() ? this.freightCharges() : 0)
    + (this.showCustomDuty() ? this.customDuty() : 0)
  );
  roundOff = computed(() => Math.round(this.grandTotal()) - this.grandTotal());
  invoiceTotal = computed(() => Math.round(this.grandTotal()));
  balanceDue = computed(() => Math.max(0, this.invoiceTotal() - this.amountPaid()));

  paymentStatus = computed<'unpaid' | 'partial' | 'paid'>(() => {
    const paid = this.amountPaid();
    const total = this.invoiceTotal();
    if (paid <= 0) return 'unpaid';
    if (paid >= total) return 'paid';
    return 'partial';
  });

  submitted = false;
  saveSuccess = false;

  get filledLines() {
    return this.lineItems().filter(r => r.productCode && r.quantity > 0 && r.unitPrice > 0);
  }

  get errCustomer(): boolean { return this.submitted && !this.customerId(); }
  get errDate(): boolean { return this.submitted && !this.invoiceDate(); }
  get errStatus(): boolean { return this.submitted && !this.invoiceStatus(); }
  get errDueDate(): boolean {
    return this.submitted && !!this.dueDate() && !!this.invoiceDate()
      && this.dueDate() < this.invoiceDate();
  }
  get errNoLines(): boolean { return this.submitted && this.filledLines.length === 0; }
  get errAmountPaid(): boolean {
    return this.submitted && this.amountPaid() > this.invoiceTotal();
  }
  get errPaymentMode(): boolean {
    return this.submitted && this.amountPaid() > 0 && !this.paymentMode();
  }
  get errFreight(): boolean {
    return this.submitted && this.showFreight() && this.freightCharges() < 0;
  }
  get errCustomDuty(): boolean {
    return this.submitted && this.showCustomDuty() && this.customDuty() < 0;
  }
  private calcDueDate(date: string, terms: string): string {
    if (!date) return '';
    const d = new Date(date);
    const days: Record<string, number> = {
      net15: 15, net30: 30, net60: 60, immediate: 0, advance: 0,
    };
    d.setDate(d.getDate() + (days[terms] ?? 30));
    return d.toISOString().substring(0, 10);
  }


  setPaymentTerms(val: string) {
    this.paymentTerms.set(val);
    this.dueDate.set(this.calcDueDate(this.invoiceDate(), val));
  }

  setInvoiceDate(val: string) {
    this.invoiceDate.set(val);
    if (!this.dueDate() || this.dueDate() === this.calcDueDate(this.invoiceDate(), this.paymentTerms())) {
      this.dueDate.set(this.calcDueDate(val, this.paymentTerms()));
    }
  }
  get formValid(): boolean {
    return !!this.customerId()
      && !!this.invoiceDate()
      && !!this.invoiceStatus()
      && this.filledLines.length > 0
      && !this.errDueDate
      && !this.errAmountPaid
      && !this.errPaymentMode
      && !this.errFreight
      && !this.errCustomDuty;
  }

  private markLineErrors() {
    this.lineItems.update(rows => rows.map(r => ({
      ...r,
      errProduct: !r.productCode,
      errQty: r.quantity <= 0,
      errPrice: r.unitPrice <= 0,
      errDiscount: r.discountPercent < 0 || r.discountPercent > 100,
    })));
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.invoiceNo.set(
        `SI-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`
      );
      this.dueDate.set(this.calcDueDate(this.invoiceDate(), this.paymentTerms()));
      this.lineItems.set([this.blankRow()]);
      return;
    }
    this.editId.set(id);
    const inv = this.siSvc.getInvoiceById(id);
    if (!inv) {
      this.toast.error('Invoice not found');
      this.router.navigate(['/sales-invoice']);
      return;
    }
    this.bindInvoice(inv);
  }

  private bindInvoice(inv: SalesInvoice): void {
    this.invoiceNo.set(inv.invoiceNumber);
    this.invoiceDate.set(inv.invoiceDate);
    this.dueDate.set(inv.dueDate ?? '');
    this.invoiceType.set((inv as any).invoiceType ?? 'tax_invoice');
    this.invoiceStatus.set(inv.status ?? 'draft');
    this.financialYear.set((inv as any).financialYear ?? this.getFinancialYear());
    this.placeOfSupply.set((inv as any).placeOfSupply ?? 'TN');
    this.poReference.set((inv as any).referencePONo ?? '');
    this.currency.set((inv as any).currency ?? 'INR');
    this.branchId.set((inv as any).branchId ?? 'BR01');
    this.notes.set(inv.notes ?? '');
    this.deliveryAddress.set((inv as any).deliveryAddress ?? '');

    this.customerId.set(inv.customerId ?? '');
    this.customerName.set((inv as any).customerName ?? '');
    this.customerGSTIN.set((inv as any).customerGSTIN ?? '');
    this.customerPAN.set((inv as any).customerPAN ?? '');
    this.billingAddress.set((inv as any).billingAddress ?? '');
    this.shippingAddress.set((inv as any).shippingAddress ?? '');
    this.phoneEmail.set((inv as any).phoneEmail ?? '');

    const pmt = inv.payment as any;
    this.paymentTerms.set(pmt?.paymentTerms ?? 'net30');
    this.paymentMode.set(pmt?.paymentMode ?? '');
    this.paymentDate.set(pmt?.paymentDate ?? '');
    this.paymentDueDate.set(pmt?.paymentDueDate ?? '');
    this.transactionRef.set(pmt?.transactionRefNo ?? '');
    this.amountPaid.set(Number(pmt?.amountPaid) || 0);
    this.lateFeeInterest.set(Number(pmt?.lateFeeInterest) || 0);
    this.rowCounter = 1;
    this.lineItems.set(
      (inv.lineItems ?? []).map((row, i) => ({
        ...row,
        sNo: i + 1,
        taxPercent: row.gstRate ?? 18,
        errProduct: false,
        errQty: false,
        errPrice: false,
        errDiscount: false,
      }))
    );
    this.rowCounter = (inv.lineItems?.length ?? 0) + 1;
  }

  onSave() {
    this.submitted = true;
    this.markLineErrors();
    if (!this.formValid) return;

    const payload: SalesInvoice = {
      id: this.editId() ?? Date.now(),
      invoiceNumber: this.invoiceNo(),
      invoiceDate: this.invoiceDate(),
      dueDate: this.dueDate(),
      status: this.invoiceStatus() as SalesInvoiceStatus,
      customerId: this.customerId(),
      customerName: this.customerName(),
      customerGSTIN: this.customerGSTIN(),
      customerPAN: this.customerPAN(),
      billingAddress: this.billingAddress(),
      shippingAddress: this.shippingAddress(),
      phoneEmail: this.phoneEmail(),
      invoiceType: this.invoiceType() as any,
      financialYear: this.financialYear(),
      placeOfSupply: this.placeOfSupply(),
      referencePONo: this.poReference(),
      currency: this.currency(),
      branchId: this.branchId(),
      notes: this.notes(),
      lineItems: this.lineItems(),
      taxSummary: {
        subTotal: this.subTotal(),
        totalTaxableValue: this.subTotal(),
        totalCGST: this.cgst(),
        totalSGST: this.sgst(),
        totalIGST: this.igst(),
        totalTaxAmount: this.totalTax(),
        grandTotal: this.grandTotal(),
        roundOff: this.roundOff(),
        invoiceTotal: this.invoiceTotal(),
        amountInWords: '',
      } as any,
      payment: {
        paymentTerms: this.paymentTerms(),
        paymentMode: this.paymentMode(),
        paymentDate: this.paymentDate(),
        transactionRefNo: this.transactionRef(),
        amountPaid: this.amountPaid(),
        balanceDue: this.balanceDue(),
        overdueDays: 0,
        lateFeeInterest: this.lateFeeInterest(),
        paymentStatus: this.paymentStatus(),
      } as any,
      createdAt: new Date().toISOString().substring(0, 10),
      updatedAt: new Date().toISOString().substring(0, 10),
    } as any;

    if (this.isEditMode()) {
      this.siSvc.updateInvoice(payload);
      this.toast.success('Invoice updated successfully');
    } else {
      this.siSvc.addInvoice(payload);
      this.toast.success('Invoice created successfully');
    }

    this.saveSuccess = true;
    setTimeout(() => this.router.navigate(['/sales-invoice']), 1200);
  }

  onCancel() { this.router.navigate(['/sales-invoice']); }

  todayStr() { return new Date().toISOString().substring(0, 10); }

  capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  private getFinancialYear(): string {
    const now = new Date();
    const year = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
    return `FY ${year}-${String(year + 1).slice(2)}`;
  }
}