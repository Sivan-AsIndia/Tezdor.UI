import { inject, Injectable, signal } from '@angular/core';
import { SAMPLE_INVOICES } from './purchase-invoice.seed';
import { PurchaseInvoice, PaymentStatus } from './purchase-invoice';
import { StoreDataClient } from '../../store/store-data-client';
import { StoreMaintain } from '../../store/store';

@Injectable({
  providedIn: 'root',
})
export class PurchaseInvoiceDataClient {


  storeClient=inject(StoreDataClient)

  invoices = signal<PurchaseInvoice[]>(SAMPLE_INVOICES);


private pushStoreEntries(inv: PurchaseInvoice, type: 'IN' | 'OUT'): void {
  const today = new Date().toISOString().split('T')[0];

  inv.lineItems.forEach(item => {
    const qty = Number(item.qty);   
    if (qty <= 0) return;

    this.storeClient.addTransaction({
      id:            0,
      date:          today,
      vendorCode:    inv.supplierCode,   
      vendorName:    inv.supplierName,  
      productCode:   item.productCode,
      productName:   item.productName,
      type,
      quantity:      qty,
      referenceType: 'Purchase Invoice',
      referenceId:   inv.id,
    } as StoreMaintain);
  });
}

  getById(id: number): PurchaseInvoice | undefined {
    return this.invoices().find(i => i.id === id);
  }

  computePaymentStatus(grandTotal: number, amountPaid: number): PaymentStatus {
    if (amountPaid <= 0)          return 'unpaid';
    if (amountPaid >= grandTotal) return 'paid';
    return 'partial';
  }

  add(data: any): void {
    const newId = Math.max(0, ...this.invoices().map(i => i.id)) + 1;
    const newInv: PurchaseInvoice = { id: newId, ...data };

    this.invoices.update(list => [...list, newInv]);
    this.pushStoreEntries(newInv, 'IN');    
  }

  updateInvoice(id: number, changes: Partial<PurchaseInvoice>): void {
    const old = this.getById(id);

    if (old && changes.lineItems) {
      this.pushStoreEntries(old, 'OUT');    
    }

    this.invoices.update(list =>
      list.map(i => i.id === id
        ? { ...i, ...changes, updatedAt: new Date().toISOString() }
        : i
      )
    );

    if (old && changes.lineItems) {
      const updated = this.getById(id)!;
      this.pushStoreEntries(updated, 'IN');
    }
  }

  postInvoice(id: number): void {
    this.updateInvoice(id, { invoiceStatus: 'posted' });
  }

  deleteInvoice(id: number): void {
    const inv = this.getById(id);
    if (inv) {
      this.pushStoreEntries(inv, 'OUT');   
    }
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