import { Injectable, signal } from '@angular/core';
import { PurchaseOrder } from './purchase-order';
import { SAMPLE_ORDERS } from './purchase-order.seed';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderDataClient {

  orders = signal<PurchaseOrder[]>(SAMPLE_ORDERS);

  getById(id: number): PurchaseOrder | undefined {
    return this.orders().find(o => o.id === id);
  }

  addPO(po: Omit<PurchaseOrder, 'id'>): void {
    const newId = Math.max(0, ...this.orders().map(o => o.id)) + 1;
    this.orders.update(list => [...list, { id: newId, ...po }]);
  }

  updatePO(id: number, changes: Partial<PurchaseOrder>): void {
    this.orders.update(list =>
      list.map(o =>
        o.id === id ? { ...o, ...changes, updatedAt: new Date().toISOString() } : o
      )
    );
  }

  deletePO(id: number): void {
    this.orders.update(list => list.filter(o => o.id !== id));
  }
}
