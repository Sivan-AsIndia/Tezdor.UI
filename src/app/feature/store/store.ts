import {
  MASTER_VENDORS, MASTER_UNITS, VendorOption, UnitOption
} from '../../core/services/master-data';

export interface StoreMaintain {
  id: number;
  sNo?: number;
  date: string;
  vendorCode: string;
  vendorName: string;
  productCode: string;
  productName: string;
  type: TransactionType; 
  quantity: number;
  referenceType?: ReferenceType; 
  referenceId?:   number | string; 
  notes?:         string;
}
export interface StockLedgerRow {
  sNo: number;
  date: string;
  vendorCode: string;
  vendorName: string;
  productCode: string;
  productName: string;
  oldStock: number;
  received: number;   
  total: number;      
  issued: number;  
  closing: number;  
}

export interface StockLineItem {
  rowId:        number;
  productCode:  string;
  productName:  string;
  warehouseId:  string;
  unitName:     string;
  unitId:       number | null;
  qty:          number | null;
  unitCost:     number | null;
  batchNo:      string;
  expiry:       string;
  balanceAfter: number | null;
  errProduct:   boolean;
  errQty:       boolean;
  errCost:      boolean;
  adjustReason:string
  vendorCode:string
}

export interface ITransactionOption {
  value: TransactionType;
  label: string;
  desc: string;
  icon: string;
  color: string;
}
export const WAREHOUSE_OPTIONS: StoreWarehouse[] = [
  { id: 'WH01', name: 'Main Warehouse' },
  { id: 'WH02', name: 'Secondary Store' }
];

export const TRANSACTION_TYPES: ITransactionOption[] = [
  {
    value: 'ADJUSTMENT',
    label: 'Adjustment',
    desc: 'Damage / expiry correction',
    icon: 'ti-settings',
    color: '#e65100'
  },
  {
    value: 'RETURN',
    label: 'Return',
    desc: 'Returned from customer',
    icon: 'ti-refresh',
    color: '#1565c0'
  },
  {
    value: 'TRANSFER',
    label: 'Transfer',
    desc: 'Between warehouses',
    icon: 'ti-exchange',
    color: '#6a1b9a'
  }
];
export type TransactionType = 'IN' | 'OUT' | 'ADJUSTMENT' | 'RETURN' | 'TRANSFER';
export type ReferenceType = 'Invoice' | 'Purchase Invoice' | 'Purchase Order' | 'Manual' | null;
export interface StoreProduct  { code: string; name: string; unitName: string; }
export interface StoreWarehouse { id: string; name: string; }

// ═══════════════════════════════════════════════════════
// Re-exported from centralized master-data.ts (no hardcoded data)
// ═══════════════════════════════════════════════════════
export const UNIT_OPTIONS: { value: number; label: string }[] = MASTER_UNITS;

export type StepId = 1 | 2 | 3;

export const VALUATION_METHODS = [
  { value: 'weighted_avg', label: 'Weighted Average' },
  { value: 'fifo',         label: 'FIFO'             },
  { value: 'lifo',         label: 'LIFO'             },
];

export const REFERENCE_TYPES: Exclude<ReferenceType, null>[] = [
  'Invoice', 'Purchase Invoice', 'Purchase Order', 'Manual',
];
export interface TypeFieldConfig {
  showVendor:       boolean; 
  showCostPrice:    boolean;
  showBatch:        boolean;
  showExpiry:       boolean; 
  showToWarehouse:  boolean; 
  showAdjustReason: boolean; 
  movementLabel:    string;   
  bannerBg:         string;
  bannerBorder:     string;
  bannerText:       string;
}

export const TYPE_FIELD_CONFIG: Record<string, TypeFieldConfig> = {
  IN: {
    showVendor: true, showCostPrice: true, showBatch: true,
    showExpiry: true, showToWarehouse: false, showAdjustReason: false,
    movementLabel: 'IN',
    bannerBg: '#e8f5e9', bannerBorder: '#2e7d32', bannerText: '#1b5e20',
  },
  OUT: {
    showVendor: false, showCostPrice: false, showBatch: false,
    showExpiry: false, showToWarehouse: false, showAdjustReason: false,
    movementLabel: 'OUT',
    bannerBg: '#ffebee', bannerBorder: '#c62828', bannerText: '#b71c1c',
  },
  ADJUSTMENT: {
    showVendor: false, showCostPrice: false, showBatch: false,
    showExpiry: false, showToWarehouse: false, showAdjustReason: true,
    movementLabel: 'ADJ',
    bannerBg: '#fff3e0', bannerBorder: '#e65100', bannerText: '#bf360c',
  },
  RETURN: {
    showVendor: true, showCostPrice: true, showBatch: false,
    showExpiry: false, showToWarehouse: false, showAdjustReason: false,
    movementLabel: 'RETURN',
    bannerBg: '#e3f2fd', bannerBorder: '#1565c0', bannerText: '#0d47a1',
  },
  TRANSFER: {
    showVendor: false, showCostPrice: false, showBatch: false,
    showExpiry: false, showToWarehouse: true, showAdjustReason: false,
    movementLabel: 'TRANSFER',
    bannerBg: '#f3e5f5', bannerBorder: '#6a1b9a', bannerText: '#4a148c',
  },
};

export const ADJUSTMENT_REASONS = [
  { value: 'damage',   label: 'Damaged Goods'       },
  { value: 'expired',  label: 'Expired Stock'        },
  { value: 'shortage', label: 'Physical Count Short' },
  { value: 'excess',   label: 'Physical Count Excess'},
  { value: 'other',    label: 'Other'                },
];

// Vendor options now come from centralized master-data (all 6 vendors)
export const VENDOR_OPTIONS = MASTER_VENDORS.map((v: VendorOption) => ({
  code: v.code,
  name: v.name
}));
