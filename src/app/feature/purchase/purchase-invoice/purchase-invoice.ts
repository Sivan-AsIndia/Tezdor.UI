import { DropdownOption } from "../../product/product";

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


  export const  poOptions: DropdownOption[] = [
    { value: 'PO-2026-0021', label: 'PO-2026-0021 — Krishna Timber' },
    { value: 'PO-2026-0019', label: 'PO-2026-0019 — Ramco Cements' },
    { value: 'PO-2026-0017', label: 'PO-2026-0017 — Tata Steel' },
  ];


  export const  taxOptions: DropdownOption[] = [
    { value: 0,    label: '0% (Exempt)' },
    { value: 0.05, label: '5% GST' },
    { value: 0.12, label: '12% GST' },
    { value: 0.18, label: '18% GST' },
    { value: 0.28, label: '28% GST' },
  ];



export const SUPPLIER_OPTIONS: ISelectOption[] = [
  { value: '1', label: 'Krishna Timber (VEN001)' },
  { value: '2', label: 'Metro Steel (VEN002)' },
  { value: '3', label: 'PipeMart Co (VEN003)' },
  { value: '4', label: 'Apex Hardware (VEN004)' },
  { value: '5', label: 'Global Supplies (VEN005)' },
  { value: '6', label: 'Sun Electricals (VEN006)' },
];

export const SUPPLIER_MAP: Record<string, { code: string; name: string }> = {
  '1': { code: 'VEN001', name: 'Krishna Timber' },
  '2': { code: 'VEN002', name: 'Metro Steel' },
  '3': { code: 'VEN003', name: 'PipeMart Co' },
  '4': { code: 'VEN004', name: 'Apex Hardware' },
  '5': { code: 'VEN005', name: 'Global Supplies' },
  '6': { code: 'VEN006', name: 'Sun Electricals' },
};

export const UNIT_OPTIONS: ISelectOption[] = [
  { value: '1', label: 'Pcs' },
  { value: '2', label: 'Kg' },
  { value: '3', label: 'Litre' },
  { value: '4', label: 'Box' },
  { value: '5', label: 'Dozen' },
  { value: '6', label: 'Mtr' },
];



export const INVOICE_STATUS_OPTIONS: ISelectOption[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'posted', label: 'Posted' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const PO_OPTIONS: ISelectOption[] = [
  { value: '', label: '-- None --' },
  { value: 'PO-2026-001', label: 'PO-2026-001 · Krishna Timber' },
  { value: 'PO-2026-002', label: 'PO-2026-002 · Metro Steel' },
  { value: 'PO-2026-003', label: 'PO-2026-003 · PipeMart Co' },
  { value: 'PO-2026-004', label: 'PO-2026-004 · Krishna Timber' },
  { value: 'PO-2026-006', label: 'PO-2026-006 · Metro Steel' },
  { value: 'PO-2026-007', label: 'PO-2026-007 · Global Supplies' },
];
export interface LineItem {
  id: number;
  productCode: string;
  productName: string;
  unitId: number;
  qty: number;
  unitCost: number;
  taxPercent: number;
}
