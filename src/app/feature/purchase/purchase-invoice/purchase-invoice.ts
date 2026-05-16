import { DropdownOption } from "../../product/product";
import {
  MASTER_VENDORS, MASTER_VENDOR_MAP, MASTER_UNITS,
  SelectOption, VendorOption, UnitOption
} from '../../../core/services/master-data';

export type InvoiceStatus = 'draft' | 'posted' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid';
export interface PILineItem {
  id: number;
  productId: string;
  productCode: string;
  productName: string;
  unitId: number;
  unitName: string;
  qty: number;
  unitCost: number;
  taxPercent: number;
  lineTotal: number;
}
export interface PurchaseInvoice {
  id: number;
  invoiceNo: string;
  supplierInvoiceNo: string;
  invoiceDate: string;
  supplierId: string;
  supplierCode: string;
  supplierName: string;
  poRef: string;
  lineItems: PILineItem[];
  grandTotal: number;
  amountPaid: number;
  balanceDue: number;
  paymentDueDate: string;
  paymentStatus: PaymentStatus;
  invoiceStatus: InvoiceStatus;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  freightCharges?: number;
  customDuty?: number;
  freightLabel?: string;
  customDutyLabel?: string;
}

export interface ISelectOption {
  value: string;
  label: string;
}


  export const  invoiceStatusOptions: DropdownOption[] = [
    { value: 'draft',     label: 'Draft' },
    { value: 'pending',   label: 'Pending Approval' },
    { value: 'approved',  label: 'Approved' },
    { value: 'cancelled', label: 'Cancelled' },
  ];


  // NOTE: PO options are now loaded dynamically from PurchaseOrderDataClient
  // in the purchase-invoice-create component instead of being hardcoded here.
  export const  poOptions: DropdownOption[] = [];


  export const  taxOptions: DropdownOption[] = [
    { value: 0,    label: '0% (Exempt)' },
    { value: 0.05, label: '5% GST' },
    { value: 0.12, label: '12% GST' },
    { value: 0.18, label: '18% GST' },
    { value: 0.28, label: '28% GST' },
  ];



// ═══════════════════════════════════════════════════════
// Re-exported from centralized master-data.ts
// ═══════════════════════════════════════════════════════
export const SUPPLIER_OPTIONS: ISelectOption[] = MASTER_VENDORS.map((v: VendorOption) => ({
  value: v.id,
  label: `${v.name} (${v.code})`
}));

export const SUPPLIER_MAP: Record<string, { code: string; name: string }> = MASTER_VENDOR_MAP;

export const UNIT_OPTIONS: ISelectOption[] = MASTER_UNITS.map((u: UnitOption) => ({
  value: String(u.value),
  label: u.label
}));



export const INVOICE_STATUS_OPTIONS: ISelectOption[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'posted', label: 'Posted' },
  { value: 'cancelled', label: 'Cancelled' },
];

// NOTE: PO reference options are now loaded dynamically from
// PurchaseOrderDataClient.orders() in the purchase-invoice-create component.
export const PO_OPTIONS: ISelectOption[] = [];
export interface LineItem {
  id: number;
  productCode: string;
  productName: string;
  unitId: number;
  qty: number;
  unitCost: number;
  taxPercent: number;
}
