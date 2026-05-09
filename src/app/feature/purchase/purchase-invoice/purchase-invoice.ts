// ── IPurchaseInvoice.ts ────────────────────────────────────

export type InvoiceStatus  = 'draft' | 'posted' | 'cancelled';
export type PaymentStatus  = 'unpaid' | 'partial' | 'paid';

// ── Line Item ─────────────────────────────────────────────
export interface PILineItem {
  id:          number;
  productId:   string;
  productCode: string;
  productName: string;
  unitId:      number;
  unitName:    string;
  qty:         number;
  unitCost:    number;
  taxPercent:  number;
  lineTotal:   number;   // qty × unitCost + tax
}

// ── Purchase Invoice ──────────────────────────────────────
export interface PurchaseInvoice {
  id:               number;
  invoiceNo:        string;      
  supplierInvoiceNo: string;  
  invoiceDate:      string;    
  supplierId:       string;     
  supplierCode:     string;
  supplierName:     string;
  poRef:            string;    
  lineItems:        PILineItem[];
  grandTotal:       number;   
  amountPaid:       number;
  balanceDue:       number;      
  paymentDueDate:   string;
  paymentStatus:    PaymentStatus; 
  invoiceStatus:    InvoiceStatus;
  notes?:           string;
  createdAt?:       string;
  updatedAt?:       string;
    freightCharges?:   number;
      customDuty?:       number;
        freightLabel?:    string;   // ← NEW
  customDutyLabel?: string;  
}

// ── Select Options ────────────────────────────────────────
export interface ISelectOption {
  value: string;
  label: string;
}

export const SUPPLIER_OPTIONS: ISelectOption[] = [
  { value: '1', label: 'Krishna Timber (VEN001)'  },
  { value: '2', label: 'Metro Steel (VEN002)'     },
  { value: '3', label: 'PipeMart Co (VEN003)'     },
  { value: '4', label: 'Apex Hardware (VEN004)'   },
  { value: '5', label: 'Global Supplies (VEN005)' },
  { value: '6', label: 'Sun Electricals (VEN006)' },
];

export const SUPPLIER_MAP: Record<string, { code: string; name: string }> = {
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
  { value: '5',  label: 'GST 5%'    },
  { value: '12', label: 'GST 12%'   },
  { value: '18', label: 'GST 18%'   },
  { value: '28', label: 'GST 28%'   },
];

export const INVOICE_STATUS_OPTIONS: ISelectOption[] = [
  { value: 'draft',     label: 'Draft'     },
  { value: 'posted',    label: 'Posted'    },
  { value: 'cancelled', label: 'Cancelled' },
];

// PO Reference options (from existing POs)
export const PO_OPTIONS: ISelectOption[] = [
  { value: '',            label: '-- None --'       },
  { value: 'PO-2026-001', label: 'PO-2026-001 · Krishna Timber' },
  { value: 'PO-2026-002', label: 'PO-2026-002 · Metro Steel'    },
  { value: 'PO-2026-003', label: 'PO-2026-003 · PipeMart Co'    },
  { value: 'PO-2026-004', label: 'PO-2026-004 · Krishna Timber' },
  { value: 'PO-2026-006', label: 'PO-2026-006 · Metro Steel'    },
  { value: 'PO-2026-007', label: 'PO-2026-007 · Global Supplies'},
];
export interface LineItem {
  id         : number;
  productCode: string;
  productName: string;
  unitId     : number;
  qty        : number;
  unitCost   : number;
  taxPercent : number;
}
