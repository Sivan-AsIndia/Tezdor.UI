// purchase-order-data-client.ts

import { Injectable, signal } from '@angular/core';
import { POStatus, PurchaseOrder } from './purchase-order';
import { SAMPLE_ORDERS } from './purchase-order.seed';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderDataClient {

  // =========================================================
  // STATE
  // =========================================================

  orders = signal<PurchaseOrder[]>([
    ...SAMPLE_ORDERS
  ]);

  // =========================================================
  // GET ALL
  // =========================================================

  getAll(): PurchaseOrder[] {
    return this.orders();
  }

  // =========================================================
  // GET BY ID
  // =========================================================

  getById(id: number): PurchaseOrder | undefined {

    return this.orders()
      .find(x => x.id === id);
  }

  // =========================================================
  // ADD
  // =========================================================

  addPO(po: Omit<PurchaseOrder, 'id'>): void {

    const currentOrders = this.orders();

    const newId =
      currentOrders.length > 0
        ? Math.max(...currentOrders.map(x => x.id)) + 1
        : 1;

    const payload: PurchaseOrder = {
      id: newId,
      ...po,
    };

    this.orders.update(list => [
      ...list,
      payload
    ]);
  }

  // =========================================================
  // UPDATE
  // =========================================================

  updatePO(
    id: number,
    changes: Partial<PurchaseOrder>
  ): void {

    this.orders.update(list =>
      list.map(order => {

        if (order.id !== id) {
          return order;
        }

        return {
          ...order,
          ...changes,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }

  // =========================================================
  // DELETE
  // =========================================================

  deletePO(id: number): void {

    this.orders.update(list =>
      list.filter(x => x.id !== id)
    );
  }

  // =========================================================
  // SEARCH
  // =========================================================

  search(term: string): PurchaseOrder[] {

    const value = term
      .trim()
      .toLowerCase();

    if (!value) {
      return this.orders();
    }

    return this.orders().filter(po =>

      po.poNumber
        ?.toLowerCase()
        .includes(value)

      ||

      po.vendorName
        ?.toLowerCase()
        .includes(value)

      ||

      po.status
        ?.toLowerCase()
        .includes(value)
    );
  }

  // =========================================================
  // FILTER BY STATUS
  // =========================================================

  filterByStatus(status: string): PurchaseOrder[] {

    if (!status) {
      return this.orders();
    }

    return this.orders()
      .filter(x => x.status === status);
  }

  // =========================================================
  // TOTALS
  // =========================================================

  getTotalAmount(): number {

    return this.orders()
      .reduce(
        (sum, po) => sum + po.grandTotal,
        0
      );
  }

  getPendingOrders(): PurchaseOrder[] {

    return this.orders()
      .filter(x =>
        x.status === 'pending'
      );
  }

  getApprovedOrders(): PurchaseOrder[] {

    return this.orders()
      .filter(x =>
        x.status === 'approved'
      );
  }

  getCancelledOrders(): PurchaseOrder[] {

    return this.orders()
      .filter(x =>
        x.status === 'cancelled'
      );
  }

  // =========================================================
  // CHANGE STATUS
  // =========================================================

updateStatus(
  id: number,
  status: POStatus
): void {

  this.orders.update(list =>
    list.map(order => {

      if (order.id !== id) {
        return order;
      }

      return {
        ...order,
        status,
        updatedAt: new Date().toISOString(),
      };
    })
  );
}

  // =========================================================
  // APPROVE
  // =========================================================

  approvePO(
    id: number,
    approvedBy: string
  ): void {

    this.orders.update(list =>
      list.map(order => {

        if (order.id !== id) {
          return order;
        }

        return {
          ...order,

          status: 'approved',

          approvedBy,

          approvedOn:
            new Date().toISOString(),

          updatedAt:
            new Date().toISOString(),
        };
      })
    );
  }

  // =========================================================
  // CANCEL
  // =========================================================

  cancelPO(
    id: number,
    reason: string
  ): void {

    this.orders.update(list =>
      list.map(order => {

        if (order.id !== id) {
          return order;
        }

        return {

          ...order,

          status: 'cancelled',

          cancelledOn:
            new Date().toISOString(),

          cancellationReason:
            reason,

          updatedAt:
            new Date().toISOString(),
        };
      })
    );
  }

  // =========================================================
  // RECEIVE GOODS
  // =========================================================

  receiveItem(
    poId: number,
    lineId: number,
    qty: number
  ): void {

    this.orders.update(list =>
      list.map(order => {

        if (order.id !== poId) {
          return order;
        }

        const updatedLines =
          order.lineItems.map(line => {

            if (line.id !== lineId) {
              return line;
            }

            const received =
              (line.receivedQuantity || 0)
              + qty;

            return {

              ...line,

              receivedQuantity:
                received,

              pendingQuantity:
                line.quantity - received,
            };
          });

        return {
          ...order,
          lineItems: updatedLines,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }
}