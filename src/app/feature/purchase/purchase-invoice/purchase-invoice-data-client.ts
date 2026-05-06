import { Injectable, signal } from '@angular/core';
import { SAMPLE_INVOICES } from './purchase-invoice.seed';
import { PurchaseInvoice, PaymentStatus } from './purchase-invoice';

@Injectable({
  providedIn: 'root',
})
export class PurchaseInvoiceDataClient {
  
  invoices = signal<PurchaseInvoice[]>(SAMPLE_INVOICES);

  getById(id: number): PurchaseInvoice | undefined {
    return this.invoices().find(i => i.id === id);
  }

  computePaymentStatus(grandTotal: number, amountPaid: number): PaymentStatus {
    if (amountPaid <= 0)              return 'unpaid';
    if (amountPaid >= grandTotal)     return 'paid';
    return 'partial';
  }

  add(data: any) {
   const newId = Math.max(0, ...this.invoices().map(i => i.id)) + 1;
    this.invoices.update(list => [...list, { id: newId, ...data }]);
  }


  updateInvoice(id: number, changes: Partial<PurchaseInvoice>): void {
    this.invoices.update(list =>
      list.map(i => i.id === id
        ? { ...i, ...changes, updatedAt: new Date().toISOString() }
        : i
      )
    );
  }

  postInvoice(id: number): void {
    this.updateInvoice(id, { invoiceStatus: 'posted' });
  }

  deleteInvoice(id: number): void {
    this.invoices.update(list => list.filter(i => i.id !== id));
  }

  recordPayment(id: number, amount: number): void {
    const inv = this.getById(id);
    if (!inv) return;
    const newPaid   = inv.amountPaid + amount;
    const newBal    = Math.max(0, inv.grandTotal - newPaid);
    const newStatus = this.computePaymentStatus(inv.grandTotal, newPaid);
    this.updateInvoice(id, {
      amountPaid:    newPaid,
      balanceDue:    newBal,
      paymentStatus: newStatus,
    });
  }

  nextInvoiceNo(): string {
    const max = Math.max(0, ...this.invoices().map(i => {
      const parts = i.invoiceNo.split('-');
      return +(parts[parts.length - 1]) || 0;
    }));
    return `PINV-2026-${String(max + 1).padStart(3, '0')}`;
  }
}
