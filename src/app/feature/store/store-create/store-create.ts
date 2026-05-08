import { Component, computed, inject, signal } from '@angular/core';
import { StoreDataClient } from '../store-data-client';
import { Router, RouterLink } from '@angular/router';
import { UNIT_OPTIONS } from '../../product/product';
import { VENDOR_OPTIONS } from '../../purchase/purchase-order/purchase-order';
import { ADJUSTMENT_REASONS, REFERENCE_TYPES, ReferenceType, StepId, StockLineItem, StoreProduct, StoreWarehouse, TRANSACTION_TYPES, TransactionType, TYPE_FIELD_CONFIG, TypeFieldConfig, VALUATION_METHODS, WAREHOUSE_OPTIONS } from '../store';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-store-create',
  imports:     [CommonModule, RouterLink, DatePipe, DecimalPipe],
  templateUrl: './store-create.html',
  styleUrl: './store-create.css',
})
export class StoreCreateComponent {
  
  service    = inject(StoreDataClient);
  router     = inject(Router);
  unitOptions = UNIT_OPTIONS;

  editId: number | null = null;
  get isEditMode() { return this.editId !== null; }
  get pageTitle()  { return this.isEditMode ? 'Edit Stock Transaction' : 'Create Stock Transaction'; }

  currentStep = signal<StepId>(1);
  steps = [
    { id: 1 as StepId, label: 'Transaction Type',    sub: 'Select movement type'  },
    { id: 2 as StepId, label: 'Transaction Details', sub: 'Header & line items'   },
    { id: 3 as StepId, label: 'Review & Submit',     sub: 'Confirm & post'        },
  ];

  tnDate          = signal(new Date().toISOString().substring(0, 10));
  selectedType    = signal<TransactionType | ''>('IN');
  warehouseId     = signal('');
  toWarehouseId   = signal('');    // TRANSFER destination
  referenceType   = signal<ReferenceType>(null);
  referenceDoc    = signal('');
  valuationMethod = signal('weighted_avg');
  remarks         = signal('');

  autoTnCode = computed(() => this.service.generateTnCode());

  typeConfig = computed<TypeFieldConfig | null>(() => {
    const t = this.selectedType();
    return t ? TYPE_FIELD_CONFIG[t] ?? null : null;
  });

  transactionTypes  = TRANSACTION_TYPES;
  valuationMethods  = VALUATION_METHODS;
  referenceTypes    = REFERENCE_TYPES;
  adjustmentReasons = ADJUSTMENT_REASONS;
  vendorOptions     = VENDOR_OPTIONS;
  products:   StoreProduct[]   = [];
  warehouses: StoreWarehouse[] = [];

  private rowCounter = 1;
  lineItems = signal<StockLineItem[]>([this.blankRow()]);

  blankRow(): StockLineItem {
    return {
      rowId:        this.rowCounter++,
      productCode:  '',
      productName:  '',
      warehouseId:  '',
      unitName:     '',
      unitId:       null,
      qty:          null,
      unitCost:     null,
      batchNo:      '',
      expiry:       '',
      balanceAfter: null,
      errProduct:   false,
      errQty:       false,
      adjustReason :'',
      vendorCode :'',
      errCost:      false,
    };
  
  }

  addRow()    { this.lineItems.update(r => [...r, this.blankRow()]); }
  removeRow(rowId: number) {
    if (this.lineItems().length === 1) return;
    this.lineItems.update(r => r.filter(x => x.rowId !== rowId));
  }

 onProductSelect(rowId: number, productCode: string) {
    const prod = this.service.getProductUnit(productCode);

    const matchedUnit = this.unitOptions.find(
      u => u.label.trim().toLowerCase() === (prod?.unitName ?? '').trim().toLowerCase()
    );

    this.lineItems.update(rows =>
      rows.map(r => {
        if (r.rowId !== rowId) return r;

        const cur = productCode
          ? this.service.getCurrentBalance(productCode)
          : null;

        const bal =
          cur !== null && r.qty !== null && r.qty > 0
            ? this.computeBalance(cur, r.qty, this.selectedType() as TransactionType)
            : null;

        return {
          ...r,
          productCode,
          productName: prod?.name ?? '',
          unitName: prod?.unitName ?? '',
          unitId: matchedUnit?.value ?? null,
          balanceAfter: bal,
          errProduct: false
        };
      })
    );
  }

  onQtyChange(rowId: number, rawVal: string) {
    const qty = rawVal === '' ? null : parseFloat(rawVal);
    this.lineItems.update(rows => rows.map(r => {
      if (r.rowId !== rowId) return r;
      const cur = r.productCode ? this.service.getCurrentBalance(r.productCode) : null;
      const bal = (cur !== null && qty !== null && qty > 0)
        ? this.computeBalance(cur, qty, this.selectedType() as TransactionType)
        : null;
      return { ...r, qty, balanceAfter: bal, errQty: false };
    }));
  }

  onCostChange(rowId: number, rawVal: string) {
    const cost = rawVal === '' ? null : parseFloat(rawVal);
    this.lineItems.update(rows => rows.map(r =>
      r.rowId === rowId ? { ...r, unitCost: cost, errCost: false } : r
    ));
  }

  updateRow<K extends keyof StockLineItem>(rowId: number, field: K, value: StockLineItem[K]) {
    this.lineItems.update(rows => rows.map(r =>
      r.rowId === rowId ? { ...r, [field]: value } : r
    ));
  }

  computeBalance(current: number, qty: number, type: TransactionType): number {
    return (type === 'IN' || type === 'RETURN') ? current + qty : current - qty;
  }

  filledLines = computed(() =>
    this.lineItems().filter(r => r.productCode && r.qty && r.qty > 0)
  );
  totalLines = computed(() => this.filledLines().length);
  totalQty   = computed(() => this.filledLines().reduce((s, r) => s + (r.qty ?? 0), 0));
  totalCost  = computed(() => this.filledLines().reduce((s, r) => s + (r.qty ?? 0) * (r.unitCost ?? 0), 0));

  negativeBalanceRows = computed(() =>
    this.filledLines().filter(r => r.balanceAfter !== null && r.balanceAfter < 0)
  );

  getTypeMeta(v: string) { return this.transactionTypes.find(t => t.value === v); }
  get selectedTypeMeta() { return this.getTypeMeta(this.selectedType()); }
  get costRequired()     {
    const cfg = this.typeConfig();
    return cfg?.showCostPrice ?? false;
  }

  getWarehouseName(id: string): string {
    return this.warehouses.find(w => w.id === id)?.name ?? id;
  }

  submitted      = false;
  step2Submitted = false;
  saveSuccess    = false;

  get step1Valid(): boolean { return !!this.selectedType(); }
  get step2Valid(): boolean {
    const dateOk  = !!this.tnDate() && this.tnDate() <= this.todayStr();
    const whOk    = !!this.warehouseId();
    const linesOk = this.filledLines().length > 0;
    const costOk  = !this.costRequired ||
      this.filledLines().every(r => r.unitCost != null && r.unitCost > 0);
    return dateOk && whOk && linesOk && costOk;
  }

  get errDate():      boolean { return this.step2Submitted && (!this.tnDate() || this.tnDate() > this.todayStr()); }
  get errWarehouse(): boolean { return this.step2Submitted && !this.warehouseId(); }
  get errNoLines():   boolean { return this.step2Submitted && this.filledLines().length === 0; }

  private markLineErrors() {
    this.lineItems.update(rows => rows.map(r => ({
      ...r,
      errProduct: !r.productCode,
      errQty:     !r.qty || r.qty <= 0,
      errCost:    this.costRequired && (!r.unitCost || r.unitCost <= 0),
    })));
  }

  goStep(step: StepId) {
    if (step < this.currentStep()) { this.currentStep.set(step); return; }
    if (step === 2 && !this.step1Valid) { this.submitted = true; return; }
    if (step === 3 && !this.step2Valid) { this.step2Submitted = true; this.markLineErrors(); return; }
    this.submitted = false; this.step2Submitted = false;
    this.currentStep.set(step);
  }
  nextStep() { this.goStep((this.currentStep() + 1) as StepId); }
  prevStep() { const s = this.currentStep(); if (s > 1) this.currentStep.set((s - 1) as StepId); }

  selectType(type: TransactionType) {
    this.selectedType.set(type);
    this.submitted = false;
    this.rowCounter = 1;
    this.lineItems.set([this.blankRow()]);
  }

  ngOnInit() {
 this.warehouses = WAREHOUSE_OPTIONS;
     this.products   = this.service.getProducts();
    if (this.warehouses.length) this.warehouseId.set(this.warehouses[0].id);
  }
  onSubmit() {
    this.submitted      = true;
    this.step2Submitted = true;
    this.markLineErrors();
    if (!this.step1Valid || !this.step2Valid) return;

    this.filledLines().forEach(row => {
      this.service.addTransaction({
        date:          this.tnDate(),
        type:          this.selectedType() as TransactionType,
        vendorCode:    '',
        vendorName:    '',
        productCode:   row.productCode,
        productName:   row.productName,
        warehouseId:   row.warehouseId || this.warehouseId(),
        quantity:      row.qty ?? 0,
        costPrice:     row.unitCost,
        referenceType: this.referenceType(),
        referenceId:   this.referenceDoc(),
        remarks:       this.remarks(),
      } as any);
    });

    this.saveSuccess = true;
    setTimeout(() => this.router.navigate(['/store']), 1600);
  }
  onReset() {
    this.submitted = false; this.saveSuccess = false; this.step2Submitted = false;
    this.selectedType.set(''); this.remarks.set('');
    this.referenceDoc.set(''); this.referenceType.set(null);
    this.rowCounter = 1; this.lineItems.set([this.blankRow()]);
    this.currentStep.set(1);
  }

  todayStr() { return new Date().toISOString().substring(0, 10); }

  balanceColor(val: number | null): string {
    if (val === null) return '';
    if (val < 0)      return '#c62828';
    if (val <= 10)    return '#e65100';
    return '#2e7d32';
  }
}
