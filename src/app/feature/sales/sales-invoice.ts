export type SalesInvoiceStatus   = 'draft' | 'sent' | 'partially_paid' | 'paid' | 'cancelled' | 'overdue';
export type InvoiceType     = 'tax_invoice' | 'proforma' | 'credit_note';
export type PaymentTerms    = 'net30' | 'net15' | 'net60' | 'advance' | 'cod';
export type PaymentMode     = 'neft' | 'upi' | 'cash' | 'cheque' | 'card';
export type PaymentStatus   = 'unpaid' | 'partial' | 'paid' | 'overdue';
export type CurrencyType    = 'INR' | 'USD' | 'EUR';

export interface SILineItem {
  sNo:             number;
  productId:       string;
  productCode:     string;
  itemName:        string;
  hsnSacCode:      string;
  quantity:        number;
  unitOfMeasure:   string;
  unitPrice:       number;
  discountPercent: number;
  taxableAmount:   number;   
  unitId:number;
  gstRate:         number; 
  cgstAmount:      number;  
  sgstAmount:      number; 
    taxPercent:  number;
  igstAmount:      number; 
  lineTotal:       number;  
  batchSerialNo:   string;
  taxId:           string;
    errProduct:  boolean;
  errQty:      boolean;
  errPrice:    boolean;
}

export interface TaxSummary {
  totalTaxableValue: number;
  totalCGST:         number;
  totalSGST:         number;
  totalIGST:         number;
  totalTaxAmount:    number;
  grandTotal:        number;
  roundOff:          number;
  invoiceTotal:      number;
  amountInWords:     string;
  subTotal:          number;
}

export interface PaymentInfo {
  paymentTerms:     PaymentTerms;
  paymentMode:      PaymentMode | '';
  amountPaid:       number;
  paymentDate:      string;
  transactionRefNo: string;
  balanceDue:       number;    
  overdueDays:      number;  
  lateFeeInterest:  number;
  paymentStatus:    PaymentStatus;
}
export interface ProductOption   { value: string; label: string; price: number; taxPct: number; unitId: number; }

export interface SalesInvoice {
  id:              number;
  invoiceNumber:   string;   
  invoiceDate:     string;   
  dueDate:         string;
  invoiceType:     InvoiceType;
  financialYear:   string; 
  referencePONo:   string;
  currency:        CurrencyType;
  exchangeRate:    number;
  status:          SalesInvoiceStatus;
  branchId:        string;
  companyName:    string;
  companyGSTIN:   string;
  companyPAN:     string;
  companyAddress: string;
  companyState:   string;
  companyPhone:   string;
  companyEmail:   string;

  customerId:      string;
  customerName:    string;
  billingAddress:  string;
  shippingAddress: string;
  cityStatePincode: string;
  customerGSTIN:   string;
  customerPAN:     string;
  phoneEmail:      string;
  placeOfSupply:   string;

  lineItems:       SILineItem[];
  taxSummary:      TaxSummary;
  payment:         PaymentInfo;

  notes:           string;
  createdAt:       string;
  updatedAt:       string;
}

export interface ISelectOption { value: string; label: string;   gstin?: string; address?: string;
  mobile?: string;
  email?: string;}

export const INVOICE_TYPE_OPTIONS: ISelectOption[] = [
  { value: 'tax_invoice', label: 'Tax Invoice'    },
  { value: 'proforma',    label: 'Proforma Invoice'},
  { value: 'credit_note', label: 'Credit Note'    },
];

export const INVOICE_STATUS_OPTIONS: ISelectOption[] = [
  { value: 'draft',         label: 'Draft'         },
  { value: 'sent',          label: 'Sent'           },
  { value: 'partially_paid',label: 'Partially Paid' },
  { value: 'paid',          label: 'Paid'           },
  { value: 'cancelled',     label: 'Cancelled'      },
  { value: 'overdue',       label: 'Overdue'        },
];

export const PAYMENT_TERMS_OPTIONS: ISelectOption[] = [
  { value: 'net30',   label: 'Net 30 Days' },
  { value: 'net15',   label: 'Net 15 Days' },
  { value: 'net60',   label: 'Net 60 Days' },
  { value: 'advance', label: 'Advance'     },
  { value: 'cod',     label: 'Cash on Delivery' },
];


 
export const DEMO_PRODUCTS: ProductOption[] = [
  { value: 'P001', label: 'Plywood 18mm BWP Grade',   price: 1850,  taxPct: 18, unitId: 4 },
  { value: 'P002', label: 'Teak Wood — Prime Grade',   price: 12500, taxPct: 18, unitId: 3 },
  { value: 'P003', label: 'MDF Board 12mm',            price: 950,   taxPct: 12, unitId: 4 },
  { value: 'P004', label: 'Hardwood Flooring Strip',   price: 3200,  taxPct: 18, unitId: 3 },
  { value: 'P005', label: 'Veneer Sheet — Natural Oak',price: 580,   taxPct: 12, unitId: 4 },
];
 


export const PAYMENT_MODE_OPTIONS: ISelectOption[] = [
  { value: 'neft',   label: 'NEFT'   },
  { value: 'upi',    label: 'UPI'    },
  { value: 'cash',   label: 'Cash'   },
  { value: 'cheque', label: 'Cheque' },
  { value: 'card',   label: 'Card'   },
];

export const CUSTOMER_OPTIONS: ISelectOption[] = [
  {
    value: 'C001',
    label: 'Arjun Traders Pvt Ltd',
    gstin: '33ABCDE1234F1Z5',
        address: 'T Nagar, Chennai',
    mobile: '9876543210',
    email: 'arjun@traders.com'
  },
  {
    value: 'C002',
    label: 'Lakshmi Constructions',
    gstin: '33FGHIJ5678K1Z2',
        address: 'T Nagar, Chennai',
    mobile: '9876543210',
    email: 'arjun@traders.com'
  },
  {
    value: 'C003',
    label: 'Sri Balaji Enterprises',
    gstin: '33LMNOP9012Q1Z7',
        address: 'T Nagar, Chennai',
    mobile: '9876543210',
    email: 'arjun@traders.com'
  },
  {
    value: 'C004',
    label: 'Chennai Steel Works',
    gstin: '33RSTUV3456W1Z1',
        address: 'T Nagar, Chennai',
    mobile: '9876543210',
    email: 'arjun@traders.com'
  },
  {
    value: 'C005',
    label: 'Kumaran Hardware & Tools',
    gstin: '33XYZAB7890C1Z8',
        address: 'T Nagar, Chennai',
    mobile: '9876543210',
    email: 'arjun@traders.com'
  },
];
export const PLACE_OF_SUPPLY_OPTIONS: ISelectOption[] = [
  { value: 'TN', label: 'Tamil Nadu'    },
  { value: 'KA', label: 'Karnataka'     },
  { value: 'MH', label: 'Maharashtra'   },
  { value: 'DL', label: 'Delhi'         },
  { value: 'GJ', label: 'Gujarat'       },
  { value: 'AP', label: 'Andhra Pradesh'},
];