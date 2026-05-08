// ── Print Service ────────────────────────────────────────────
// A reusable, injectable service that handles print functionality.
// It generates the appropriate HTML for the document type,
// opens it in a new browser window, and triggers the print dialog.
//
// Usage (from any component):
//   private printService = inject(PrintService);
//   this.printService.printPurchaseOrder(poData);
//   this.printService.printEmployee(empData);

import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../../feature/purchase/purchase-order/purchase-order';
import { PurchaseInvoice } from '../../feature/purchase/purchase-invoice/purchase-invoice';
import { SalesInvoice } from '../../feature/sales/sales-invoice';
import { Employee } from '../../feature/employee/employee';
import { Product } from '../../feature/product/product';
import { Salary } from '../../feature/employee/salary/salary';
import { PettyCash } from '../../feature/employee/petty-cash/petty-cash';
import { PettyCashLine } from '../../feature/employee/petty-cash/petty-cash-line';
import { GeneralLedgerEntry } from '../../feature/ledger/general-ledger-entry';
import { buildPurchaseOrderPrintHtml } from './purchase-order-template';
import { buildPurchaseInvoicePrintHtml } from './purchase-invoice-template';
import { buildSalesInvoicePrintHtml } from './sales-invoice-template';
import { buildEmployeePrintHtml } from './employee-template';
import { buildProductPrintHtml } from './product-template';
import { buildSalaryPrintHtml } from './salary-template';
import { buildPettyCashPrintHtml } from './petty-cash-template';
import { buildGeneralLedgerPrintHtml } from './general-ledger-template';

@Injectable({
  providedIn: 'root',
})
export class PrintService {

  /**
   * Prints a Purchase Order document.
   */
  printPurchaseOrder(po: PurchaseOrder): void {
    const html = buildPurchaseOrderPrintHtml(po);
    this.openPrintWindow(html, `PO_${po.poNumber}`);
  }

  /**
   * Prints a Purchase Invoice (Tax Invoice) document.
   */
  printPurchaseInvoice(invoice: PurchaseInvoice): void {
    const html = buildPurchaseInvoicePrintHtml(invoice);
    this.openPrintWindow(html, `INV_${invoice.invoiceNo}`);
  }

  /**
   * Prints a Sales Invoice (Tax Invoice) document.
   */
  printSalesInvoice(invoice: SalesInvoice): void {
    const html = buildSalesInvoicePrintHtml(invoice);
    this.openPrintWindow(html, `SI_${invoice.invoiceNumber}`);
  }

  /**
   * Prints an Employee Profile document.
   *
   * @param emp - The Employee data object to print.
   */
  printEmployee(emp: Employee): void {
    const html = buildEmployeePrintHtml(emp);
    this.openPrintWindow(html, `EMP_${emp.employeeCode}`);
  }

  /**
   * Prints a Product Detail document.
   *
   * @param product - The Product data object to print.
   */
  printProduct(product: Product): void {
    const html = buildProductPrintHtml(product);
    this.openPrintWindow(html, `PRD_${product.productCode}`);
  }

  /**
   * Prints a Salary Statement document.
   *
   * @param salary     - The Salary data object to print.
   * @param empNameFn  - Function to resolve employee ID to display name.
   */
  printSalary(salary: Salary, empNameFn: (id: string) => string): void {
    const html = buildSalaryPrintHtml(salary, empNameFn);
    this.openPrintWindow(html, `SAL_${salary.salaryNumber ?? salary.salaryId}`);
  }

  /**
   * Prints a Petty Cash Voucher document.
   *
   * @param pc         - The PettyCash header data object.
   * @param lines      - The PettyCash line items array.
   * @param empNameFn  - Function to resolve employee ID to display name.
   */
  printPettyCash(
    pc: PettyCash,
    lines: PettyCashLine[],
    empNameFn: (id: string) => string
  ): void {
    const html = buildPettyCashPrintHtml(pc, lines, empNameFn);
    this.openPrintWindow(html, `PC_${pc.pettyCashCode}`);
  }

  /**
   * Prints a General Ledger Entry document.
   *
   * @param entry - The GeneralLedgerEntry data object to print.
   */
  printGeneralLedgerEntry(entry: GeneralLedgerEntry): void {
    const html = buildGeneralLedgerPrintHtml(entry);
    this.openPrintWindow(html, `GL_${entry.entryNo ?? entry.id}`);
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
