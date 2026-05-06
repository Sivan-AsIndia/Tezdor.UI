// purchaseordercreate.component.ts
import { Component, computed, inject, signal } from '@angular/core';
import {
  VENDOR_OPTIONS, PAYMENT_TERMS_OPTIONS, DELIVERY_OPTIONS,
  POLineItem, DeliveryMethod, PaymentTerms, POStatus,
  PurchaseOrder,
  VENDOR_MAP,
} from '../purchase-order';
import { UNIT_OPTIONS, TAX_OPTIONS, STATUS_OPTIONS } from '../../../product/product';
import { ToastNotifier }         from '../../../../core/services/toast';
import { CommonModule }         from '@angular/common';
import { ActivatedRoute, Router, RouterModule }               from '@angular/router';
import { PurchaseOrderDataClient } from '../purchase-order-data-client';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductDataClient } from '../../../product/product-data-client';

@Component({
  selector:    'app-purchaseordercreate',
  standalone:  true,
 imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './purchase-order-create.html',
  styleUrl:    './purchase-order-create.css',
})
export class PurchaseOrderCreateComponent {

  private fb      = inject(FormBuilder);
  private router  = inject(Router);
  private route   = inject(ActivatedRoute);
  private toast   = inject(ToastNotifier);
  service         = inject(PurchaseOrderDataClient);
  product         = inject(ProductDataClient);

  editMode = false;
  editId!: number;

  vendorOptions       = VENDOR_OPTIONS;
  unitOptions         = UNIT_OPTIONS;
  taxOptions          = TAX_OPTIONS;
  paymentTermsOptions = PAYMENT_TERMS_OPTIONS;
  deliveryOptions     = DELIVERY_OPTIONS;
  statusOptions       = STATUS_OPTIONS;

  private nextRowId = 1;
  lineItems = signal<POLineItem[]>([this.newRow()]);

  poForm: FormGroup = this.fb.group({
    poNumber:        ['', Validators.required],
    vendorId:        ['', Validators.required],   
    orderDate:       ['', Validators.required],  
    expectedDate:    ['', Validators.required],  
    paymentTerms:    ['net30'],
    deliveryMethod:  ['delivery'],
    shippingAddress: [''],
    notes:           [''],
    shippingCharge:  [0],
    status:          ['',Validators.required],
  });

  pageTitle    = computed(() => this.editMode ? 'Edit Purchase Order'   : 'Create Purchase Order');
  pageSubtitle = computed(() => this.editMode
    ? 'Update purchase order details and line items.'
    : 'Define vendor, items, pricing and delivery details.');
  pageCrumb    = computed(() => this.editMode ? 'Edit' : 'Create');

  subTotal = computed(() =>
    this.lineItems().reduce((s, r) => s + r.quantity * r.unitPrice, 0)
  );
  totalDiscount = computed(() =>
    this.lineItems().reduce((s, r) => s + r.discount, 0)
  );
  totalTax = computed(() =>
    this.lineItems().reduce((s, r) => {
      const base = r.quantity * r.unitPrice - r.discount;
      return s + base * (r.taxPercent / 100);
    }, 0)
  );
  grandTotal = computed(() =>
    this.subTotal() - this.totalDiscount() + this.totalTax()
    + (+this.poForm.get('shippingCharge')?.value || 0)
  );

  isSubmitted = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editMode = true;
      this.editId   = +id;

      const po = this.service.getById(+id);

      if (!po) {
        this.toast.error('Purchase Order not found.');
        this.router.navigate(['/purchase-order-list']);
        return;
      }

      this.poForm.patchValue({
        poNumber:        po.poNumber,
        vendorId:        po.vendorId,     
        orderDate:       po.orderDate,       
        expectedDate:    po.expectedDate,    
        paymentTerms:    po.paymentTerms,
        deliveryMethod:  po.deliveryMethod,
        shippingAddress: po.shippingAddress ?? '',
        notes:           po.notes ?? '',
        shippingCharge:  po.shippingCharge,
        status:          po.status,
      });

      this.nextRowId = 1;
      this.lineItems.set(
        po.lineItems.map(item => ({ ...item, id: this.nextRowId++ }))
      );

    } else {
      const today = new Date().toISOString().split('T')[0];
      this.poForm.patchValue({
        poNumber:  this.generatePONumber(),
        orderDate: today,
      });
    }
  }

  private generatePONumber(): string {
    const year  = new Date().getFullYear();
    const count = this.service.orders().length + 1;
    return `PO-${year}-${String(count).padStart(3, '0')}`;
  }

  newRow(): POLineItem {
    return {
      id:          this.nextRowId++,
      productCode: '',
      productName: '',
      unitId:      1,
      unitName:    'Pcs',
      quantity:    1,
      unitPrice:   0,
      taxPercent:  0,
      discount:    0,
      total:       0,
    };
  }

  addRow(): void {
    this.lineItems.update(rows => [...rows, this.newRow()]);
  }

  removeRow(rowId: number): void {
    if (this.lineItems().length === 1) {
      this.toast.error('At least one line item is required.');
      return;
    }
    this.lineItems.update(rows => rows.filter(r => r.id !== rowId));
  }

  updateRow(rowId: number, field: keyof POLineItem, rawValue: any): void {
    const numericFields: (keyof POLineItem)[] =
      ['quantity', 'unitPrice', 'taxPercent', 'discount', 'unitId'];
    const value = numericFields.includes(field) ? +rawValue : rawValue;

    this.lineItems.update(rows =>
      rows.map(r => {
        if (r.id !== rowId) return r;
        const updated = { ...r, [field]: value };

        if (field === 'unitId') {
          updated.unitName = this.unitOptions.find(u => +u.value === +value)?.label ?? 'Pcs';
        }

        updated.total = this.calcRowTotal(updated);
        return updated;
      })
    );
  }

  calcRowTotal(row: POLineItem): number {
    const base      = row.quantity * row.unitPrice;
    const afterDisc = base - row.discount;
    const tax       = afterDisc * (row.taxPercent / 100);
    return +(afterDisc + tax).toFixed(2);
  }

  savePO(): void {
     this.isSubmitted.set(true);
    if (this.poForm.invalid) {
      this.poForm.markAllAsTouched();
      this.toast.error('Please fill all required fields.');
      return;
    }

    const hasEmpty = this.lineItems().some(r => !r.productName.trim());
    if (hasEmpty) {
      this.toast.error('Please fill product name for all line items.');
      return;
    }

    const fv           = this.poForm.value;
    const vendorInfo   = VENDOR_MAP[fv.vendorId] ?? { code: '', name: '' };
    const lineItems    = this.lineItems().map((r, i) => ({
      ...r, id: i + 1, total: this.calcRowTotal(r),
    }));
    const shippingCharge = +fv.shippingCharge || 0;

    const payload = {
      poNumber:        fv.poNumber,
      vendorId:        fv.vendorId,
      vendorCode:      vendorInfo.code,
      vendorName:      vendorInfo.name,
      orderDate:       fv.orderDate,
      expectedDate:    fv.expectedDate,
      paymentTerms:    fv.paymentTerms,
      deliveryMethod:  fv.deliveryMethod,
      shippingAddress: fv.shippingAddress,
      notes:           fv.notes,
      status:          fv.status,
      lineItems,
      subTotal:        this.subTotal(),
      taxAmount:       this.totalTax(),
      discountAmount:  this.totalDiscount(),
      shippingCharge,
      grandTotal:      this.grandTotal(),
    };

    if (this.editMode) {
      const existing = this.service.getById(this.editId)!;
      const updated: PurchaseOrder = {
        ...existing,    
        ...payload,
        updatedAt: new Date().toISOString(),
      };
      this.service.updatePO(this.editId, updated);
      this.toast.success('Purchase Order updated successfully!');

    } else {
      this.service.addPO({
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      this.toast.success('Purchase Order created successfully!');
    }

    this.router.navigate(['/purchase-order-list']);
  }

  onCancel(): void {
    this.router.navigate(['/purchase-order-list']);
  }

  hasError(controlName: string) {
  const control = this.poForm.get(controlName);
  return control?.invalid && control?.touched;
}
isInvalidProduct(row: POLineItem): boolean {
  return this.isSubmitted() && (!row.productName || !row.productName.trim());
}

  trackById(_: number, item: POLineItem): number { return item.id; }

  getVendorName(): string {
    const id = this.poForm.get('vendorId')?.value;
    return VENDOR_MAP[id]?.name ?? '—';
  }
  getProductName(code: string): string {
  return this.product.products().find(p => p.productCode === code)?.productCode || '';
}

  getUnitName(id: number): string {
    return this.unitOptions.find(u => +u.value === id)?.label ?? 'Pcs';
  }

  onProductSelect(row: POLineItem, code: string) {
  const product = this.product.products()
    .find(p => p.productCode === code);

  this.lineItems.update(rows =>
    rows.map(r =>
      r.id === row.id
        ? {
            ...r,
            productCode: code,
            productName: product?.productName || ''
          }
        : r
    )
  );
}
}
