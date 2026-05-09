import { Injectable, signal } from '@angular/core';
import { SalesInvoice, SalesInvoiceStatus } from './sales-invoice';
import { SAMPLE_INVOICES } from './sales-invoice.seed';


@Injectable({
  providedIn: 'root',
})
export class SalesInvoiceDataClient {
 
  invoices = signal<SalesInvoice[]>([
    ...SAMPLE_INVOICES
  ]);

  getInvoices() {
    return this.invoices;
  }

  addInvoice(invoice: SalesInvoice) {
    this.invoices.update(list => [
      invoice,
      ...list
    ]);
  }

    getInvoiceById(id: number) {

    return this.invoices()
      .find(invoice => invoice.id === id);
  }

  updateInvoice(updated: SalesInvoice) {
    this.invoices.update(list =>
      list.map(inv =>
        inv.id === updated.id ? updated : inv
      )
    );
  }

  deleteInvoice(id: number) {
    this.invoices.update(list =>
      list.filter(inv => inv.id !== id)
    );
  }
}