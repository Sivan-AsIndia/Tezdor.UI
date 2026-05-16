import { PaymentTerms } from "../../sales/sales-invoice";
import {
  MASTER_VENDORS, MASTER_VENDOR_MAP, MASTER_TAX_OPTIONS,
  MASTER_PAYMENT_TERMS, MASTER_DELIVERY_OPTIONS,
  MASTER_WAREHOUSES, MASTER_CURRENCY_OPTIONS,
  SelectOption, VendorOption
} from '../../../core/services/master-data';

export type POStatus =
  | 'draft'
  | 'approved'
  | 'sent_to_supplier'
  | 'partial'
  | 'received'
  | 'cancelled';

export type DeliveryMethod =
  | 'pickup'
  | 'delivery'
  | 'courier';


export interface POLineItem {
  id: number;
  productCode: string;
  productName: string;
  description?: string;
  unitId: number;
  unitName: string;
  quantity: number;
  receivedQuantity?: number;
  pendingQuantity?: number;
  unitPrice: number;
  unitCost?: number;
  taxId?: number;
  taxPercent: number;
  taxAmount?: number;
  discount: number;
  total: number;
  itemId: number;
}

export interface PurchaseOrder {
  id: number;
  poNumber: string;
  status: POStatus;
  tenantId?: string;
  companyId?: string;
  branchId?: string;
  vendorId: string;
  vendorCode: string;
  vendorName: string;
  vendorAddress?: string;
  vendorGst?: string;
  orderDate: string;
  expectedDate: string;
  currencyId?: string;
  exchangeRate?: number;
  referenceNumber?: string;
  deliveryMethod: DeliveryMethod;
  paymentTerms: PaymentTerms;
  shippingAddress?: string;
  warehouseId?: string;
  incoterms?: string;
  notes?: string;
  remarks?: string;
  approvedBy?: string;
  approvedOn?: string;
  cancelledOn?: string;
  cancellationReason?: string;
  lineItems: POLineItem[];
  subTotal: number;
  discountAmount: number;
  taxAmount: number;
  roundingAmount?: number;
  shippingCharge: number;
  grandTotal: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISelectOption {
  value: string;
  label: string;
}

export interface IStatusOption extends ISelectOption {
  hint: string;
}

// ═══════════════════════════════════════════════════════
// Re-exported from centralized master-data.ts
// ═══════════════════════════════════════════════════════
export const VENDOR_OPTIONS = MASTER_VENDORS.map((v: VendorOption) => ({ code: v.id, name: v.name }));
export const VENDOR_MAP = MASTER_VENDOR_MAP;
export const TAX_OPTIONS: ISelectOption[] = MASTER_TAX_OPTIONS as ISelectOption[];
export const PAYMENT_TERMS_OPTIONS: ISelectOption[] = MASTER_PAYMENT_TERMS as ISelectOption[];
export const DELIVERY_OPTIONS: ISelectOption[] = MASTER_DELIVERY_OPTIONS as ISelectOption[];

export const STATUS_OPTIONS: IStatusOption[] = [
  {
    value: 'draft',
    label: 'Draft',
    hint:  'Saved but not submitted'
  },
  {
    value: 'approved',
    label: 'Approved',
    hint:  'Approved but not sent'
  },
  {
    value: 'sent_to_supplier',
    label: 'Sent to Supplier',
    hint:  'PO sent, awaiting delivery'
  },
  {
    value: 'partial',
    label: 'Partial',
    hint:  'Partially received'
  },
  {
    value: 'received',
    label: 'Received',
    hint:  'Fully received'
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
    hint:  'Order cancelled'
  },
];


export const WAREHOUSE_OPTIONS: ISelectOption[] = MASTER_WAREHOUSES as ISelectOption[];
export const CURRENCY_OPTIONS: ISelectOption[] = MASTER_CURRENCY_OPTIONS as ISelectOption[];