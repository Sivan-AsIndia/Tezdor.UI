import { Injectable, inject, signal } from '@angular/core';
import { SalesInvoice, SalesInvoiceStatus } from './sales-invoice';
import { SAMPLE_INVOICES } from './sales-invoice.seed';
import { StoreDataClient } from '../store/store-data-client';

@Injectable({
  providedIn: 'root',
})
export class SalesInvoiceDataClient {
  
  private store = inject(StoreDataClient);

  invoices = signal<SalesInvoice[]>([...SAMPLE_INVOICES]);

  getInvoices() {
    return this.invoices;
  }

  getInvoiceById(id: number) {
    return this.invoices().find(invoice => invoice.id === id);
  }

  addInvoice(invoice: SalesInvoice) {
    this.invoices.update(list => [invoice, ...list]);
    this.addStoreOutFromInvoice(invoice);
  }

  updateInvoice(updated: SalesInvoice) {
    const existing = this.invoices().find(inv => inv.id === updated.id);

    this.invoices.update(list =>
      list.map(inv => inv.id === updated.id ? updated : inv)
    );
    if (existing) {
      this.adjustStoreOnUpdate(existing, updated);
    }
  }

  deleteInvoice(id: number) {
    const existing = this.invoices().find(inv => inv.id === id);

    this.invoices.update(list => list.filter(inv => inv.id !== id));
    if (existing) {
      this.revertStoreFromInvoice(existing);
    }
  }

  private addStoreOutFromInvoice(invoice: SalesInvoice): void {
    const today = new Date().toISOString().split('T')[0];

    (invoice.lineItems ?? []).forEach(item => {
      const qty = Number(item.quantity);
      if (qty <= 0 || !item.productCode) return;

      this.store.addTransaction({
        id:          0,
        date:        today,
        vendorCode:  '',
        vendorName:  invoice.customerName ?? '',
        productCode: item.productCode,
        productName: item.itemName ?? item.productCode,
        type:        'OUT',
        quantity:    qty,
      } as any);
    });
  }

  private adjustStoreOnUpdate(
    existing: SalesInvoice,
    updated:  SalesInvoice
  ): void {
    const today = new Date().toISOString().split('T')[0];

    (updated.lineItems ?? []).forEach(updatedItem => {
      const existingItem = (existing.lineItems ?? []).find(
        x => x.productCode === updatedItem.productCode
      );

      const prevQty = Number(existingItem?.quantity ?? 0);
      const newQty  = Number(updatedItem.quantity);
      const diff    = newQty - prevQty;

      if (diff === 0 || !updatedItem.productCode) return;

      this.store.addTransaction({
        id:          0,
        date:        today,
        vendorCode:  '',
        vendorName:  updated.customerName ?? '',
        productCode: updatedItem.productCode,
        productName: updatedItem.itemName ?? updatedItem.productCode,
        type:        diff > 0 ? 'OUT' : 'IN',
        quantity:    Math.abs(diff),
      } as any);
    });

    (existing.lineItems ?? []).forEach(existingItem => {
      const stillExists = (updated.lineItems ?? []).find(
        x => x.productCode === existingItem.productCode
      );
      if (!stillExists && existingItem.productCode) {
        this.store.addTransaction({
          id:          0,
          date:        today,
          vendorCode:  '',
          vendorName:  updated.customerName ?? '',
          productCode: existingItem.productCode,
          productName: existingItem.itemName ?? existingItem.productCode,
          type:        'IN',
          quantity:    Number(existingItem.quantity),
        } as any);
      }
    });
  }

  private revertStoreFromInvoice(invoice: SalesInvoice): void {
    const today = new Date().toISOString().split('T')[0];

    (invoice.lineItems ?? []).forEach(item => {
      const qty = Number(item.quantity);
      if (qty <= 0 || !item.productCode) return;

      this.store.addTransaction({
        id:          0,
        date:        today,
        vendorCode:  '',
        vendorName:  invoice.customerName ?? '',
        productCode: item.productCode,
        productName: item.itemName ?? item.productCode,
        type:        'IN',
        quantity:    qty,
      } as any);
    });
  }
}