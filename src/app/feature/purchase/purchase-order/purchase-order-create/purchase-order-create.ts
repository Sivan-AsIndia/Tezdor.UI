import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import {
  DELIVERY_OPTIONS,
  PAYMENT_TERMS_OPTIONS,
  POLineItem,
  POStatus,
  PurchaseOrder,
  VENDOR_MAP,
  VENDOR_OPTIONS,
  WAREHOUSE_OPTIONS
} from '../purchase-order';

import {
  STATUS_OPTIONS,
  TAX_OPTIONS,
  UNIT_OPTIONS
} from '../../../product/product';

import { ToastNotifier } from '../../../../core/services/toast';
import { PurchaseOrderDataClient } from '../purchase-order-data-client';
import { ProductDataClient } from '../../../product/product-data-client';
import { StoreDataClient } from '../../../store/store-data-client';
import { NgSelectModule } from '@ng-select/ng-select';
  import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-purchaseordercreate',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,FormsModule,
    ReactiveFormsModule,NgSelectModule,MatDatepickerModule
  ],
  templateUrl: './purchase-order-create.html',
  styleUrl: './purchase-order-create.css',
})
export class PurchaseOrderCreateComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastNotifier);

  service = inject(PurchaseOrderDataClient);
  service1 = inject(StoreDataClient);

  product = inject(ProductDataClient);

  editMode = false;
  editId!: number;

  vendorOptions = VENDOR_OPTIONS;
  unitOptions = UNIT_OPTIONS;
  taxOptions = TAX_OPTIONS;
  paymentTermsOptions = PAYMENT_TERMS_OPTIONS;
  deliveryOptions = DELIVERY_OPTIONS;
  statusOptions = STATUS_OPTIONS;
  warehouseOptions = WAREHOUSE_OPTIONS;

  private nextRowId = 1;

  isSubmitted = signal(false);

  lineItems = signal<POLineItem[]>([
    this.newRow()
  ]);

  poForm: FormGroup = this.fb.group({
    poNumber: ['', Validators.required],
    vendorId: [null, Validators.required],
    orderDate: ['', Validators.required],
    expectedDate: ['', Validators.required],
    status: ['draft', Validators.required],
    paymentTerms: ['net30'],
    deliveryMethod: ['delivery'],
    shippingAddress: [''],
    notes: [''],
    warehouseId: [null, Validators.required],
    exchangeRate: [1],
    referenceNumber: [''],
    incoterms: [''],
    roundingAmount: [0],
    shippingCharge: [0],
    approvedBy: [''],
    approvedOn: [''],
    cancelledOn: [''],
    cancellationReason: [''],
    remarks: ['', Validators.maxLength(500)],
  });


  pageTitle = computed(() =>
    this.editMode ? 'Purchase Order' : 'Purchase Order'
  );

  pageSubtitle = computed(() =>
    this.editMode ? 'Update purchase order details.' : 'Create new purchase order.'
  );

  pageCrumb = computed(() =>
    this.editMode ? 'Edit' : 'Create'
  );

  subTotal = computed(() =>
    this.lineItems().reduce(
      (sum, row) => sum + (row.quantity * row.unitPrice), 0
    )
  );

  totalDiscount = computed(() =>
    this.lineItems().reduce((sum, row) => sum + row.discount, 0)
  );

  totalTax = computed(() =>
    this.lineItems().reduce((sum, row) => sum + (row.taxAmount || 0), 0)
  );

  private productControls = new Map<number, FormControl>();


getProductControl(row: POLineItem): FormControl {
  if (!this.productControls.has(row.id)) {
    this.productControls.set(row.id, new FormControl(row.productCode||null));
  }
  return this.productControls.get(row.id)!;
}
private unitControls = new Map<number, FormControl>();

getUnitControl(row: POLineItem): FormControl {
  if (!this.unitControls.has(row.id)) {
    this.unitControls.set(row.id, new FormControl(row.unitId));
  }
  return this.unitControls.get(row.id)!;
}

private taxControls = new Map<number, FormControl>();

getTaxControl(row: POLineItem): FormControl {
  if (!this.taxControls.has(row.id)) {
    this.taxControls.set(row.id, new FormControl(row.taxPercent||null));
  }
  return this.taxControls.get(row.id)!;
}


  grandTotal = computed(() =>
    this.subTotal()
    - this.totalDiscount()
    + this.totalTax()
    + (+this.poForm.get('shippingCharge')?.value || 0)
    + (+this.poForm.get('roundingAmount')?.value || 0)
  );

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.editMode = true;
      this.editId = +id;

      const po = this.service.getById(+id);

      if (!po) {
        this.toast.error('Purchase order not found');
        this.router.navigate(['/purchase-order']);
        return;
      }

      this.poForm.patchValue({
        poNumber: po.poNumber,
        vendorId: po.vendorId ||null,
        orderDate: po.orderDate,
        expectedDate: po.expectedDate,
        paymentTerms: po.paymentTerms,
        deliveryMethod: po.deliveryMethod,
        shippingAddress: po.shippingAddress,
        notes: po.notes,
        shippingCharge: po.shippingCharge,
        status: po.status,
        warehouseId: po.warehouseId||null,
        exchangeRate: po.exchangeRate,
        referenceNumber: po.referenceNumber,
        incoterms: po.incoterms,
        roundingAmount: po.roundingAmount,
        approvedBy: po.approvedBy,
        approvedOn: po.approvedOn,
        cancelledOn: po.cancelledOn,
        cancellationReason: po.cancellationReason,
        remarks: po.remarks,
      });

      this.nextRowId = 1;

      this.lineItems.set(
        po.lineItems.map(item => ({
          ...item,
          id: this.nextRowId++
        }))
      );

    } else {

      const today = new Date().toISOString().split('T')[0];

      this.poForm.patchValue({
        poNumber: this.generatePONumber(),
        orderDate: today,
        status: 'draft',
      });
    }
  }

  private generatePONumber(): string {
    const year = new Date().getFullYear();
    const count = this.service.orders().length + 1;
    return `PO-${year}-${String(count).padStart(3, '0')}`;
  }

  newRow(): POLineItem {
    return {
      id: this.nextRowId++,
      itemId: 0,
      productCode: '',
      productName: '',
      description: '',
      unitId: 1,
      unitName: 'Pcs',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      taxId: 0,
      taxPercent: 0,
      taxAmount: 0,
      unitCost: 0,
      receivedQuantity: 0,
      pendingQuantity: 1,
      total: 0,
    };
  }


  addRow(): void {
    this.lineItems.update(rows => [...rows, this.newRow()]);
  }

removeRow(rowId: number): void {
  if (this.lineItems().length === 1) {
    this.toast.error('At least one line item required');
    return;
  }
  this.productControls.delete(rowId); 
  this.unitControls.delete(rowId);  
  this.taxControls.delete(rowId); 
  this.lineItems.update(rows => rows.filter(x => x.id !== rowId));
}
  updateRow(rowId: number, field: keyof POLineItem, rawValue: any): void {

    const numericFields: (keyof POLineItem)[] = [
      'quantity', 'unitPrice', 'discount',
      'taxPercent', 'unitId', 'receivedQuantity'
    ];

    const value = numericFields.includes(field) ? +rawValue : rawValue;

    this.lineItems.update(rows =>
      rows.map(r => {
        if (r.id !== rowId) return r;

        const updated = { ...r, [field]: value };

        if (field === 'unitId') {
          updated.unitName =
            this.unitOptions.find(u => +u.value === +value)?.label || 'Pcs';
        }

        updated.taxAmount =
          ((updated.quantity * updated.unitPrice) - updated.discount)
          * (updated.taxPercent / 100);

        updated.pendingQuantity =
          updated.quantity - (updated.receivedQuantity || 0);

        updated.unitCost = updated.unitPrice;
        updated.total = this.calcRowTotal(updated);

        return updated;
      })
    );
  }

onProductSelect(row: POLineItem, event: any): void {
  const code = event?.productCode ?? event;
  const product = this.product.products().find(x => x.productCode === code);

  this.lineItems.update(rows =>
    rows.map(r => {
      if (r.id !== row.id) return r;
      return {
        ...r,
        productCode: code,
        productName: product?.productName || '',
        itemId: product?.id || 0,
        unitPrice: product?.sellingPrice || product?.costPrice || r.unitPrice,
      };
    })
  );
}

  calcRowTotal(row: POLineItem): number {
    const base = row.quantity * row.unitPrice;
    const afterDiscount = base - row.discount;
    const tax = afterDiscount * (row.taxPercent / 100);
    return +(afterDiscount + tax).toFixed(2);
  }


  savePO(): void {

    this.isSubmitted.set(true);

    if (this.poForm.invalid) {
      this.poForm.markAllAsTouched();
      this.toast.error('Please fill required fields');
      return;
    }

    const fv = this.poForm.value;

    if (fv.expectedDate < fv.orderDate) {
      this.toast.error('Expected date must be after order date');
      return;
    }

    if (this.lineItems().some(x => !x.productName.trim())) {
      this.toast.error('Select product for all rows');
      return;
    }

    if (this.lineItems().some(x => x.quantity <= 0)) {
      this.toast.error('Quantity must be greater than 0');
      return;
    }

    if (this.lineItems().some(x => !x.itemId || x.itemId === 0)) {
      this.toast.error('Product selection incomplete — itemId missing');
      return;
    }

    const vendorInfo = VENDOR_MAP[fv.vendorId] || { code: '', name: '' };

    const lineItems = this.lineItems().map((r, i) => ({
      ...r,
      id: i + 1,
      total: this.calcRowTotal(r),
    }));

    const payload: Omit<PurchaseOrder, 'id'> = {
      poNumber: fv.poNumber,
      vendorId: fv.vendorId,
      vendorCode: vendorInfo.code,
      vendorName: vendorInfo.name,
      orderDate: fv.orderDate,
      expectedDate: fv.expectedDate,
      paymentTerms: fv.paymentTerms,
      deliveryMethod: fv.deliveryMethod,
      shippingAddress: fv.shippingAddress,
      notes: fv.notes,
      status: fv.status as POStatus,
      warehouseId: fv.warehouseId,
      exchangeRate: fv.exchangeRate,
      referenceNumber: fv.referenceNumber,
      incoterms: fv.incoterms,
      roundingAmount: fv.roundingAmount,
      shippingCharge: fv.shippingCharge,
      approvedBy: fv.approvedBy,
      approvedOn: fv.approvedOn,
      cancelledOn: fv.cancelledOn,
      cancellationReason: fv.cancellationReason,
      remarks: fv.remarks,
      lineItems,
      subTotal: this.subTotal(),
      taxAmount: this.totalTax(),
      discountAmount: this.totalDiscount(),
      grandTotal: this.grandTotal(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const storeBefore = this.service1.transactions().length;
    if (this.editMode) {

      this.service.updatePO(this.editId, payload);
      this.toast.success('Purchase order updated');

    } else {

      this.service.addPO(payload);
      this.toast.success('Purchase order created');
    }

    const storeAfter = this.service1.transactions().length;
    const addedCount = storeAfter - storeBefore;

    if (addedCount > 0) {
      this.toast.success(`Stock updated! ${addedCount} item(s) added to store`);
      console.log(addedCount);

    } else {
      this.toast.success(this.editMode ? 'Purchase order updated' : 'Purchase order created');
    }

    this.router.navigate(['/purchase-order']);
  }


  onCancel(): void {
    this.router.navigate(['/purchase-order']);
  }


  hasError(controlName: string): boolean {
    const control = this.poForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  isInvalidProduct(row: POLineItem): boolean {
    return this.isSubmitted() && !row.productName?.trim();
  }

  trackById(_: number, item: POLineItem): number {
    return item.id;
  }

  getVendorName(): string {
    const id = this.poForm.get('vendorId')?.value;
    return VENDOR_MAP[id]?.name || '—';
  }

  getUnitName(id: number): string {
    return this.unitOptions.find(x => +x.value === id)?.label || 'Pcs';
  }




  
}