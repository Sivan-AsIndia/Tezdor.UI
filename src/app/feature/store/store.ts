// ── IStore.ts ──────────────────────────────────────────────
export interface StoreMaintain {
  id: number;
  sNo?: number;           // display serial number
  date: string;           // 'YYYY-MM-DD'
  vendorCode: string;
  vendorName: string;
  productCode: string;
  productName: string;
  type: 'IN' | 'OUT';     // IN = Received, OUT = Issued
  quantity: number;
}

// Computed ledger row (what the table actually shows)
export interface StockLedgerRow {
  sNo: number;
  date: string;
  vendorCode: string;
  vendorName: string;
  productCode: string;
  productName: string;
  oldStock: number;
  received: number;   // qty when type=IN
  total: number;      // oldStock + received
  issued: number;     // qty when type=OUT
  closing: number;    // total - issued
}
