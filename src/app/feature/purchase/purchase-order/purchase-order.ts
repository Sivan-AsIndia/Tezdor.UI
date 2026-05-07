export type POStatus       = 'pending' | 'approved' | 'received' | 'partial' | 'cancelled';
export type PaymentTerms   = 'immediate' | 'net15' | 'net30' | 'net45' | 'net60';
export type DeliveryMethod = 'pickup' | 'delivery' | 'courier';

export interface POLineItem {
  id:          number;
  productCode: string;
  productName: string;
  unitId:      number;
  unitName:    string;
  quantity:    number;
  unitPrice:   number;
  taxPercent:  number;
  discount:    number;
  total:       number;
}

export interface PurchaseOrder {
  id:              number;
  poNumber:        string;
  vendorId:        string;    
  vendorCode:      string;
  vendorName:      string;
  vendorAddress?:  string;
  vendorGst?:      string;
  orderDate:       string;  
  expectedDate:    string;      
  deliveryMethod:  DeliveryMethod;
  paymentTerms:    PaymentTerms;
  shippingAddress?: string;
  notes?:          string;
  lineItems:       POLineItem[];
  subTotal:        number;
  taxAmount:       number;
  discountAmount:  number;
  shippingCharge:  number;
  grandTotal:      number;
  status:          POStatus;
  createdAt?:      string;
  updatedAt?:      string;
}

export interface ISelectOption {
  value: string;
  label: string;
}

export interface IStatusOption extends ISelectOption {
  hint: string;
}

export const VENDOR_OPTIONS= [
    { code: 'VEN001', name: 'Krishna Timber'  },
  { code: 'VEN002', name: 'Metro Steel'     },
  { code: 'VEN003', name: 'PipeMart Co'     },
  { code: 'VEN004', name: 'BuildMart'       },
];

export const VENDOR_MAP: Record<string, { code: string; name: string }> = {
  '1': { code: 'VEN001', name: 'Krishna Timber'  },
  '2': { code: 'VEN002', name: 'Metro Steel'     },
  '3': { code: 'VEN003', name: 'PipeMart Co'     },
  '4': { code: 'VEN004', name: 'Apex Hardware'   },
  '5': { code: 'VEN005', name: 'Global Supplies' },
  '6': { code: 'VEN006', name: 'Sun Electricals' },
};

export const UNIT_OPTIONS: ISelectOption[] = [
  { value: '1', label: 'Pcs'   },
  { value: '2', label: 'Kg'    },
  { value: '3', label: 'Litre' },
  { value: '4', label: 'Box'   },
  { value: '5', label: 'Dozen' },
  { value: '6', label: 'Mtr'   },
];

export const TAX_OPTIONS: ISelectOption[] = [
  { value: '0',  label: 'None (0%)'  },
  { value: '5',  label: 'GST 5%'     },
  { value: '12', label: 'GST 12%'    },
  { value: '18', label: 'GST 18%'    },
  { value: '28', label: 'GST 28%'    },
];

export const PAYMENT_TERMS_OPTIONS: ISelectOption[] = [
  { value: 'immediate', label: 'Immediate'   },
  { value: 'net15',     label: 'Net 15 Days' },
  { value: 'net30',     label: 'Net 30 Days' },
  { value: 'net45',     label: 'Net 45 Days' },
  { value: 'net60',     label: 'Net 60 Days' },
];

export const DELIVERY_OPTIONS: ISelectOption[] = [
  { value: 'pickup',   label: 'Self Pickup'         },
  { value: 'delivery', label: 'Vendor Delivery'     },
  { value: 'courier',  label: 'Courier / Transport' },
];

export const STATUS_OPTIONS: IStatusOption[] = [
  { value: 'pending',   label: 'Pending',   hint: 'Awaiting approval'         },
  { value: 'approved',  label: 'Approved',  hint: 'Approved, not yet received' },
  { value: 'received',  label: 'Received',  hint: 'Fully received'             },
  { value: 'partial',   label: 'Partial',   hint: 'Partially received'         },
  { value: 'cancelled', label: 'Cancelled', hint: 'Order cancelled'            },
];
