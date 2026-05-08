// ── Sales Invoice Print Component ────────────────────────────
// Standalone Angular component that wraps the SI print template
// for use as an inline preview if needed.
//
// Primary print flow uses PrintService (opens new window).
// This component exists for potential inline print-preview scenarios.

import { Component, input } from '@angular/core';
import { SalesInvoice } from '../../../feature/sales/sales-invoice';

@Component({
  selector: 'app-sales-invoice-print',
  standalone: true,
  template: `
    <div class="print-preview-placeholder text-center text-muted p-4">
      <i class="ti ti-printer" style="font-size:48px;"></i>
      <p class="mt-2">Sales Invoice print uses a dedicated print window.</p>
      <p>Click the <strong>Print</strong> button on the detail page to generate the document.</p>
    </div>
  `,
})
export class SalesInvoicePrintComponent {
  /** The SalesInvoice data to be printed. */
  invoice = input.required<SalesInvoice>();
}
