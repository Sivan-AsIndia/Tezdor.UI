// ── Print Service ────────────────────────────────────────────
// A reusable, injectable service that handles print functionality.
// It generates the appropriate HTML for the document type,
// opens it in a new browser window, and triggers the print dialog.
//
// Usage (from any component):
//   private printService = inject(PrintService);
//   this.printService.printPurchaseOrder(poData);
//   this.printService.printPurchaseInvoice(invoiceData);

import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../../feature/purchase/purchase-order/purchase-order';
import { PurchaseInvoice } from '../../feature/purchase/purchase-invoice/purchase-invoice';
import { buildPurchaseOrderPrintHtml } from './purchase-order-template';
import { buildPurchaseInvoicePrintHtml } from './purchase-invoice-template';

@Injectable({
  providedIn: 'root',
})
export class PrintService {

  /**
   * Prints a Purchase Order document.
   * Opens a new browser window with the formatted PO template
   * and triggers the native print dialog.
   *
   * @param po - The PurchaseOrder data object to print.
   */
  printPurchaseOrder(po: PurchaseOrder): void {
    const html = buildPurchaseOrderPrintHtml(po);
    this.openPrintWindow(html, `PO_${po.poNumber}`);
  }

  /**
   * Prints a Purchase Invoice (Tax Invoice) document.
   * Opens a new browser window with the formatted invoice template
   * and triggers the native print dialog.
   *
   * @param invoice - The PurchaseInvoice data object to print.
   */
  printPurchaseInvoice(invoice: PurchaseInvoice): void {
    const html = buildPurchaseInvoicePrintHtml(invoice);
    this.openPrintWindow(html, `INV_${invoice.invoiceNo}`);
  }

  /**
   * Opens a new browser window, writes the provided HTML content,
   * and triggers the print dialog via the onload handler embedded
   * in the HTML template.
   *
   * The window is automatically closed after the user completes
   * or cancels the print dialog.
   *
   * @param html  - Complete HTML document string.
   * @param title - Window title (used for the tab name).
   */
  private openPrintWindow(html: string, title: string): void {
    const printWindow = window.open('', '_blank', 'width=900,height=700');

    if (!printWindow) {
      // If popup is blocked, fall back to current window print
      console.warn('Print popup blocked. Falling back to window.print().');
      window.print();
      return;
    }

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.document.title = title;

    // Close the print window after the user finishes printing or cancels
    printWindow.onafterprint = () => {
      printWindow.close();
    };
  }
}
