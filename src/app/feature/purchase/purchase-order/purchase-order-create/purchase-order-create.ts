// purchaseordercreate.component.ts

import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import {
  DELIVERY_OPTIONS,
  PAYMENT_TERMS_OPTIONS,
  POLineItem,
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

@Component({
  selector: 'app-purchaseordercreate',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
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
  product = inject(ProductDataClient);

  editMode = false;
  editId!: number;

  vendorOptions = VENDOR_OPTIONS;
  unitOptions = UNIT_OPTIONS;
  taxOptions = TAX_OPTIONS;
  paymentTermsOptions = PAYMENT_TERMS_OPTIONS;
  deliveryOptions = DELIVERY_OPTIONS;
  statusOptions = STATUS_OPTIONS;
warehouseOptions =WAREHOUSE_OPTIONS
  private nextRowId = 1;

  isSubmitted = signal(false);

  lineItems = signal<POLineItem[]>([
    this.newRow()
  ]);

  poForm: FormGroup = this.fb.group({

    // ===== ORDER =====
    poNumber: ['', Validators.required],
    vendorId: ['', Validators.required],

    orderDate: ['', Validators.required],
    expectedDate: ['', Validators.required],

    status: ['', Validators.required],

    // ===== DELIVERY =====
    paymentTerms: ['net30'],
    deliveryMethod: ['delivery'],
    shippingAddress: [''],
    notes: [''],

    // ===== NEW =====
    warehouseId: ['', Validators.required],
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
    this.editMode
      ? 'Edit Purchase Order'
      : 'Create Purchase Order'
  );

  pageSubtitle = computed(() =>
    this.editMode
      ? 'Update purchase order details.'
      : 'Create new purchase order.'
  );

  pageCrumb = computed(() =>
    this.editMode
      ? 'Edit'
      : 'Create'
  );

  // =========================================================
  // TOTALS
  // =========================================================

  subTotal = computed(() =>
    this.lineItems().reduce(
      (sum, row) => sum + (row.quantity * row.unitPrice),
      0
    )
  );

  totalDiscount = computed(() =>
    this.lineItems().reduce(
      (sum, row) => sum + row.discount,
      0
    )
  );

  totalTax = computed(() =>
    this.lineItems().reduce(
      (sum, row) => sum + (row.taxAmount || 0),
      0
    )
  );

  grandTotal = computed(() =>
    this.subTotal()
    - this.totalDiscount()
    + this.totalTax()
    + (+this.poForm.get('shippingCharge')?.value || 0)
    + (+this.poForm.get('roundingAmount')?.value || 0)
  );

  // =========================================================
  // INIT
  // =========================================================

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
        vendorId: po.vendorId,

        orderDate: po.orderDate,
        expectedDate: po.expectedDate,

        paymentTerms: po.paymentTerms,
        deliveryMethod: po.deliveryMethod,

        shippingAddress: po.shippingAddress,
        notes: po.notes,

        shippingCharge: po.shippingCharge,

        status: po.status,

        warehouseId: po.warehouseId,
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

      const today = new Date()
        .toISOString()
        .split('T')[0];

      this.poForm.patchValue({
        poNumber: this.generatePONumber(),
        orderDate: today,
      });
    }
  }

  // =========================================================
  // GENERATE PO
  // =========================================================

  private generatePONumber(): string {

    const year = new Date().getFullYear();

    const count =
      this.service.orders().length + 1;

    return `PO-${year}-${String(count).padStart(3, '0')}`;
  }

  // =========================================================
  // NEW ROW
  // =========================================================

  newRow(): POLineItem {

    return {

      id: this.nextRowId++,

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

  // =========================================================
  // ROW METHODS
  // =========================================================

  addRow(): void {

    this.lineItems.update(rows => [
      ...rows,
      this.newRow()
    ]);
  }

  removeRow(rowId: number): void {

    if (this.lineItems().length === 1) {

      this.toast.error(
        'At least one line item required'
      );

      return;
    }

    this.lineItems.update(rows =>
      rows.filter(x => x.id !== rowId)
    );
  }

  updateRow(
    rowId: number,
    field: keyof POLineItem,
    rawValue: any
  ): void {

    const numericFields: (keyof POLineItem)[] = [
      'quantity',
      'unitPrice',
      'discount',
      'taxPercent',
      'unitId',
      'receivedQuantity'
    ];

    const value =
      numericFields.includes(field)
        ? +rawValue
        : rawValue;

    this.lineItems.update(rows =>
      rows.map(r => {

        if (r.id !== rowId) {
          return r;
        }

        const updated = {
          ...r,
          [field]: value
        };

        if (field === 'unitId') {

          updated.unitName =
            this.unitOptions.find(
              u => +u.value === +value
            )?.label || 'Pcs';
        }

        updated.taxAmount =
          (
            (updated.quantity * updated.unitPrice)
            - updated.discount
          ) * (updated.taxPercent / 100);

        updated.pendingQuantity =
          updated.quantity
          - (updated.receivedQuantity || 0);

        updated.unitCost =
          updated.unitPrice;

        updated.total =
          this.calcRowTotal(updated);

        return updated;
      })
    );
  }

  // =========================================================
  // PRODUCT SELECT
  // =========================================================

  onProductSelect(
    row: POLineItem,
    code: string
  ): void {

    const product =
      this.product.products()
        .find(x => x.productCode === code);

    this.lineItems.update(rows =>
      rows.map(r => {

        if (r.id !== row.id) {
          return r;
        }

        return {
          ...r,
          productCode: code,
          productName: product?.productName || '',
        };
      })
    );
  }

  // =========================================================
  // TOTAL
  // =========================================================

  calcRowTotal(row: POLineItem): number {

    const base =
      row.quantity * row.unitPrice;

    const afterDiscount =
      base - row.discount;

    const tax =
      afterDiscount * (row.taxPercent / 100);

    return +(afterDiscount + tax)
      .toFixed(2);
  }

  // =========================================================
  // SAVE
  // =========================================================

  savePO(): void {

    this.isSubmitted.set(true);

    if (this.poForm.invalid) {

      this.poForm.markAllAsTouched();

      this.toast.error(
        'Please fill required fields'
      );

      return;
    }

    const fv = this.poForm.value;

    // VALIDATION

    if (fv.expectedDate < fv.orderDate) {

      this.toast.error(
        'Expected date must be after order date'
      );

      return;
    }

    const invalidProduct =
      this.lineItems().some(
        x => !x.productName.trim()
      );

    if (invalidProduct) {

      this.toast.error(
        'Select product for all rows'
      );

      return;
    }

    const invalidQty =
      this.lineItems().some(
        x => x.quantity <= 0
      );

    if (invalidQty) {

      this.toast.error(
        'Quantity must be greater than 0'
      );

      return;
    }

    const vendorInfo =
      VENDOR_MAP[fv.vendorId]
      || { code: '', name: '' };

    const lineItems =
      this.lineItems().map((r, i) => ({
        ...r,
        id: i + 1,
        total: this.calcRowTotal(r)
      }));

    const payload: PurchaseOrder = {

      id :fv.id,
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

      status: fv.status,

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

    if (this.editMode) {

      this.service.updatePO(
        this.editId,
        payload
      );

      this.toast.success(
        'Purchase order updated'
      );

    } else {

      this.service.addPO(payload);

      this.toast.success(
        'Purchase order created'
      );
    }

    this.router.navigate([
      '/purchase-order'
    ]);
  }

  // =========================================================
  // HELPERS
  // =========================================================

  onCancel(): void {

    this.router.navigate([
      '/purchase-order'
    ]);
  }

  hasError(controlName: string): boolean {

    const control =
      this.poForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      control.touched
    );
  }

  isInvalidProduct(row: POLineItem): boolean {

    return this.isSubmitted()
      && !row.productName?.trim();
  }

  trackById(
    _: number,
    item: POLineItem
  ): number {

    return item.id;
  }

  getVendorName(): string {

    const id =
      this.poForm.get('vendorId')?.value;

    return VENDOR_MAP[id]?.name || '—';
  }

  getUnitName(id: number): string {

    return this.unitOptions.find(
      x => +x.value === id
    )?.label || 'Pcs';
  }
}