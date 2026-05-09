import { Injectable, inject, signal } from '@angular/core';
import { POStatus, PurchaseOrder } from './purchase-order';
import { SAMPLE_ORDERS } from './purchase-order.seed';
import { StoreDataClient } from '../../store/store-data-client';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderDataClient {

  private store = inject(StoreDataClient);

  orders = signal<PurchaseOrder[]>([...SAMPLE_ORDERS]);

  getAll(): PurchaseOrder[] {
    return this.orders();
  }

  getById(id: number): PurchaseOrder | undefined {
    return this.orders().find(x => x.id === id);
  }

  addPO(po: Omit<PurchaseOrder, 'id'>): void {
    const currentOrders = this.orders();
    const newId = currentOrders.length > 0
      ? Math.max(...currentOrders.map(x => x.id)) + 1
      : 1;

    const payload: PurchaseOrder = { id: newId, ...po };

    this.orders.update(list => [...list, payload]);
    if (po.status === 'received') {
      this.store.addFromPO(payload);
    }
  }

  updatePO(id: number, changes: Partial<PurchaseOrder>): void {

    const existingOrder = this.orders().find(o => o.id === id);
    this.orders.update(list =>
      list.map(order => {
        if (order.id !== id) return order;
        return {
          ...order,
          ...changes,
          updatedAt: new Date().toISOString(),
        };
      })
    );

    const updatedOrder = this.orders().find(o => o.id === id)!;
    if (
      changes.status === 'received' &&
      existingOrder?.status !== 'received'
    ) {
      this.store.addFromPO(updatedOrder);
    }
    if (
      changes.status === 'partial' &&
      existingOrder?.status !== 'received'
    ) {
      changes.lineItems?.forEach(updatedItem => {
        const prevItem = existingOrder?.lineItems.find(x => x.id === updatedItem.id);
        const prevReceived = prevItem?.receivedQuantity ?? 0;
        const newReceived = updatedItem.receivedQuantity ?? 0;
        const diff = newReceived - prevReceived;

        if (diff > 0 && existingOrder) {
          const po = { ...existingOrder, ...changes, id } as PurchaseOrder;
          this.store.addPartialReceive(po, updatedItem, diff);
        }
      });
    }
    if (
      changes.status === 'cancelled' &&
      existingOrder?.status === 'received'
    ) {
      this.store.revertFromPO(existingOrder);
    }
  }

  deletePO(id: number): void {
    this.orders.update(list => list.filter(x => x.id !== id));
  }


  search(term: string): PurchaseOrder[] {
    const value = term.trim().toLowerCase();
    if (!value) return this.orders();
    return this.orders().filter(po =>
      po.poNumber?.toLowerCase().includes(value) ||
      po.vendorName?.toLowerCase().includes(value) ||
      po.status?.toLowerCase().includes(value)
    );
  }

  filterByStatus(status: string): PurchaseOrder[] {
    if (!status) return this.orders();
    return this.orders().filter(x => x.status === status);
  }

  getTotalAmount(): number {
    return this.orders().reduce((sum, po) => sum + po.grandTotal, 0);
  }

  getDraftOrders(): PurchaseOrder[] {
    return this.orders().filter(x => x.status === 'draft');
  }

  getApprovedOrders(): PurchaseOrder[] {
    return this.orders().filter(x => x.status === 'approved');
  }

  getCancelledOrders(): PurchaseOrder[] {
    return this.orders().filter(x => x.status === 'cancelled');
  }

  updateStatus(id: number, status: POStatus): void {
    const existingOrder = this.orders().find(o => o.id === id);

    this.orders.update(list =>
      list.map(order => {
        if (order.id !== id) return order;
        return { ...order, status, updatedAt: new Date().toISOString() };
      })
    );

    const updatedOrder = this.orders().find(o => o.id === id)!;

    if (status === 'received' && existingOrder?.status !== 'received') {
      this.store.addFromPO(updatedOrder);
    }

    if (status === 'cancelled' && existingOrder?.status === 'received') {
      this.store.revertFromPO(existingOrder);
    }
  }

  approvePO(id: number, approvedBy: string): void {
    this.orders.update(list =>
      list.map(order => {
        if (order.id !== id) return order;
        return {
          ...order,
          status: 'approved' as POStatus,
          approvedBy,
          approvedOn: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }

  cancelPO(id: number, reason: string): void {
    const existingOrder = this.orders().find(o => o.id === id);

    this.orders.update(list =>
      list.map(order => {
        if (order.id !== id) return order;
        return {
          ...order,
          status: 'cancelled' as POStatus,
          cancelledOn: new Date().toISOString(),
          cancellationReason: reason,
          updatedAt: new Date().toISOString(),
        };
      })
    );

    if (existingOrder?.status === 'received') {
      this.store.revertFromPO(existingOrder);
    }
  }

  receiveItem(poId: number, lineId: number, qty: number): void {

    const existingOrder = this.orders().find(o => o.id === poId);
    const existingLine = existingOrder?.lineItems.find(l => l.id === lineId);

    this.orders.update(list =>
      list.map(order => {
        if (order.id !== poId) return order;

        const updatedLines = order.lineItems.map(line => {
          if (line.id !== lineId) return line;

          const received = (line.receivedQuantity ?? 0) + qty;
          return {
            ...line,
            receivedQuantity: received,
            pendingQuantity: line.quantity - received,
          };
        });

        const allReceived = updatedLines.every(
          l => (l.receivedQuantity ?? 0) >= l.quantity
        );
        const anyReceived = updatedLines.some(
          l => (l.receivedQuantity ?? 0) > 0
        );

        return {
          ...order,
          lineItems: updatedLines,
          status: allReceived
            ? ('received' as POStatus)
            : anyReceived
              ? ('partial' as POStatus)
              : order.status,
          updatedAt: new Date().toISOString(),
        };
      })
    );

    if (existingLine && existingOrder) {
      this.store.addPartialReceive(existingOrder, existingLine, qty);
    }
  }
}