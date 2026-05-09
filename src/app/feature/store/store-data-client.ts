// ── store.service.ts ───────────────────────────────────────
import { Injectable, signal, computed } from '@angular/core';
import { StoreMaintain, StockLedgerRow, StoreProduct, StoreWarehouse, WAREHOUSE_OPTIONS } from './store';
import { STORE_MAINTAIN } from './store.seed';
import { ProductSummary } from '../product/product';



@Injectable({ providedIn: 'root' })
export class StoreDataClient {

  private _transactions = signal<StoreMaintain[]>(STORE_MAINTAIN);
  transactions = this._transactions.asReadonly();

  productSummaries = computed<ProductSummary[]>(() => {
    const map = new Map<string, ProductSummary>();

    for (const t of this._transactions()) {
      if (!map.has(t.productCode)) {
        map.set(t.productCode, {
          productCode: t.productCode,
          productName: t.productName,
          vendorCode:  t.vendorCode,
          vendorName:  t.vendorName,
          totalIn:     0,
          unitId: 0,
          totalOut:    0,
          closingStock: 0,
          transactionCount: 0,
        });
      }
      const s = map.get(t.productCode)!;
      if (t.type === 'IN')  s.totalIn  += t.quantity;
      else                  s.totalOut += t.quantity;
      s.transactionCount++;
    }

    for (const [, s] of map) {
      s.closingStock = s.totalIn - s.totalOut;
    }

    return [...map.values()];
  });



getProducts(): StoreProduct[] {
  return this.productSummaries().map(p => ({
    code: p.productCode,
    name: p.productName,
    unitName: 'Nos',
    unitId : 0
  }));
}

getProductUnit(code: string): { name: string; unitName: string } | undefined {
  return this.getProducts().find(p => p.code === code);
}

getCurrentBalance(productCode: string): number {
  return this.productSummaries().find(p => p.productCode === productCode)?.closingStock ?? 0;
}

generateTnCode(): string {
  const n = this._transactions().length + 1;
  return `TN-${new Date().getFullYear()}-${String(n).padStart(4, '0')}`;
}

  getLedgerRows(productCode: string): StockLedgerRow[] {
    const rows = this._transactions()
      .filter(t => t.productCode === productCode)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let runningStock = 0;
    return rows.map((t, index) => {
      const oldStock = runningStock;
      const received = t.type === 'IN'  ? t.quantity : 0;
      const issued   = t.type === 'OUT' ? t.quantity : 0;
      const total    = oldStock + received;
      const closing  = total - issued;

      runningStock = closing; 

      return {
        sNo:         index + 1,
        date:        t.date,
        vendorCode:  t.vendorCode,
        vendorName:  t.vendorName,
        productCode: t.productCode,
        productName: t.productName,
        oldStock,
        received,
        total,
        issued,
        closing,
      } as StockLedgerRow;
    });
  }

  addTransaction(t: StoreMaintain): void {
    this._transactions.update(list => [
      ...list,
      { ...t, id: Math.max(0, ...list.map(x => x.id)) + 1 },
    ]);
  }

  deleteTransaction(id: number): void {
    this._transactions.update(list => list.filter(t => t.id !== id));
  }
}
