import { PaymentTerms } from "../../sales/sales-invoice";

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

export const VENDOR_OPTIONS = [
  { code: '1', name: 'Krishna Timber'  },
  { code: '2', name: 'Metro Steel'     },
  { code: '3', name: 'PipeMart Co'     },
  { code: '4', name: 'BuildMart'       },
  { code: '5', name: 'Apex Hardware'   },
  { code: '6', name: 'Global Supplies' },
];

export const VENDOR_MAP: Record<string, { code: string; name: string }> = {
  '1': { code: 'VEN001', name: 'Krishna Timber'  },
  '2': { code: 'VEN002', name: 'Metro Steel'     },
  '3': { code: 'VEN003', name: 'PipeMart Co'     },
  '4': { code: 'VEN004', name: 'BuildMart'       },
  '5': { code: 'VEN005', name: 'Apex Hardware'   },
  '6': { code: 'VEN006', name: 'Global Supplies' },
};

export const TAX_OPTIONS: ISelectOption[] = [
  { value: '0',  label: 'None (0%)'  },
  { value: '5',  label: 'GST 5%'    },
  { value: '12', label: 'GST 12%'   },
  { value: '18', label: 'GST 18%'   },
  { value: '28', label: 'GST 28%'   },
];


export const PAYMENT_TERMS_OPTIONS: ISelectOption[] = [
  { value: 'immediate', label: 'Immediate'    },
  { value: 'net15',     label: 'Net 15 Days'  },
  { value: 'net30',     label: 'Net 30 Days'  },
  { value: 'net45',     label: 'Net 45 Days'  },
  { value: 'net60',     label: 'Net 60 Days'  },
];

export const DELIVERY_OPTIONS: ISelectOption[] = [
  { value: 'pickup',   label: 'Self Pickup'         },
  { value: 'delivery', label: 'Vendor Delivery'     },
  { value: 'courier',  label: 'Courier / Transport' },
];

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


export const WAREHOUSE_OPTIONS: ISelectOption[] = [
  { value: '1', label: 'Main Warehouse'      },
  { value: '2', label: 'Secondary Warehouse' },
  { value: '3', label: 'Retail Warehouse'    },
];


export const CURRENCY_OPTIONS: ISelectOption[] = [
  { value: 'INR', label: 'Indian Rupee' },
  { value: 'USD', label: 'US Dollar'    },
  { value: 'AED', label: 'UAE Dirham'   },
];