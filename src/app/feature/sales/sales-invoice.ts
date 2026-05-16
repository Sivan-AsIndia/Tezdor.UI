import {
  MASTER_CUSTOMERS, MASTER_PAYMENT_TERMS, MASTER_PLACE_OF_SUPPLY,
  MASTER_DEMO_PRODUCTS, SelectOption
} from '../../core/services/master-data';

export type SalesInvoiceStatus =
  | 'draft'
  | 'sent'
  | 'partially_paid'
  | 'paid'
  | 'cancelled'
  | 'overdue';

export type InvoiceType =
  | 'tax_invoice'
  | 'proforma'
  | 'credit_note';

export type PaymentTerms =
  | 'net30'
  | 'net15'
  | 'net60'
  | 'advance'
  | 'cod';

export type PaymentMode =
  | 'neft'
  | 'upi'
  | 'cash'
  | 'cheque'
  | 'card';

export type PaymentStatus =
  | 'unpaid'
  | 'partial'
  | 'paid'
  | 'overdue';

export type CurrencyType =
  | 'INR'
  | 'USD'
  | 'EUR';

export type InvoiceCopyType =
  | 'original'
  | 'duplicate'
  | 'triplicate';

export interface CompanyBankDetails {
  bankName: string;
  branch: string;
  ifscCode: string;
  accountNumber: string;
  upiId: string;
}

export interface SILineItem {
  sNo: number;
  productId: string;
  productCode: string;

  itemName: string;
  hsnSacCode: string;

  quantity: number;
  unitOfMeasure: string;
  unitPrice: number;

  discountPercent: number;
  taxableAmount: number;

  unitId: number;

  gstRate: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;

  taxPercent: number;

  lineTotal: number;

  batchSerialNo: string;
  taxId: string;

  errProduct: boolean;
  errQty: boolean;
  errPrice: boolean;
}

export interface HsnWiseTaxSummary {
  hsnSacCode: string;

  taxableValue: number;

  cgstRate: number;
  cgstAmount: number;

  sgstRate: number;
  sgstAmount: number;

  igstRate: number;
  igstAmount: number;

  totalTaxAmount: number;
}

export interface TaxSummary {
  subTotal: number;

  totalTaxableValue: number;

  totalCGST: number;
  totalSGST: number;
  totalIGST: number;

  totalTaxAmount: number;

  grandTotal: number;

  taxAmountInWords?: string;

  roundOff: number;

  invoiceTotal: number;

  amountInWords: string;
}

export interface PaymentInfo {
  paymentTerms: PaymentTerms;

  paymentMode: PaymentMode | '';

  amountPaid: number;

  paymentDate: string;

  transactionRefNo: string;

  balanceDue: number;

  overdueDays: number;

  lateFeeInterest: number;

  paymentStatus: PaymentStatus;
}

export interface SalesInvoice {
  id: number;

  invoiceNumber: string;

  invoiceDate: string;

  dueDate: string | null;

  invoiceType: InvoiceType;

  invoiceCopyType?: InvoiceCopyType;

  companyBankDetails?: CompanyBankDetails;

  financialYear: string;

  referencePONo: string;

  currency: CurrencyType;

  exchangeRate: number;

  status: SalesInvoiceStatus;

  eWayBillNo?: string;

  deliveryNote?: string;

  modeTermsOfPayment?: string;

  buyerOrderNo?: string;

  buyerOrderDate?: string;

  otherReferences?: string;

  dispatchDocNo?: string;

  deliveryNoteDate?: string;

  dispatchedThrough?: string;

  destination?: string;

  billOfLadingNo?: string;

  motorVehicleNo?: string;

  termsOfDelivery?: string;

  branchId: string;

  companyName: string;

  companyGSTIN: string;

  companyPAN: string;

  companyAddress: string;

  companyState: string;

  companyPhone: string;

  companyEmail: string;

  customerId: string;

  customerName: string;

  billingAddress: string;

  shippingAddress: string;

  cityStatePincode: string;

  customerGSTIN: string;

  customerPAN: string;

  phoneEmail: string;

  placeOfSupply: string;

  lineItems: SILineItem[];

  hsnWiseTaxSummary?: HsnWiseTaxSummary[];

  taxSummary: TaxSummary;

  payment: PaymentInfo;

  declaration?: string;

  notes: string;

  createdAt: string;

  updatedAt: string;
}

export interface ProductOption {
  value: string;
  label: string;
  price: number;
  taxPct: number;
  unitId: number;
}

export interface ISelectOption {
  value: string;
  label: string;

  gstin?: string;

  address?: string;

  mobile?: string;

  email?: string;
}

export const INVOICE_TYPE_OPTIONS: ISelectOption[] = [
  { value: 'tax_invoice', label: 'Tax Invoice' },
  { value: 'proforma', label: 'Proforma Invoice' },
  { value: 'credit_note', label: 'Credit Note' },
];

export const INVOICE_STATUS_OPTIONS: ISelectOption[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'partially_paid', label: 'Partially Paid' },
  { value: 'paid', label: 'Paid' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'overdue', label: 'Overdue' },
];

// ═══════════════════════════════════════════════════════
// Re-exported from centralized master-data.ts
// ═══════════════════════════════════════════════════════
export const PAYMENT_TERMS_OPTIONS: ISelectOption[] = MASTER_PAYMENT_TERMS as ISelectOption[];

export const PAYMENT_MODE_OPTIONS: ISelectOption[] = [
  { value: 'neft', label: 'NEFT' },
  { value: 'upi', label: 'UPI' },
  { value: 'cash', label: 'Cash' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'card', label: 'Card' },
];

export const DEMO_PRODUCTS: ProductOption[] = MASTER_DEMO_PRODUCTS as ProductOption[];

// ═══════════════════════════════════════════════════════
// Customers and Place of Supply from master-data
// ═══════════════════════════════════════════════════════
export const CUSTOMER_OPTIONS: ISelectOption[] = MASTER_CUSTOMERS as ISelectOption[];

export const PLACE_OF_SUPPLY_OPTIONS: ISelectOption[] = MASTER_PLACE_OF_SUPPLY as ISelectOption[];