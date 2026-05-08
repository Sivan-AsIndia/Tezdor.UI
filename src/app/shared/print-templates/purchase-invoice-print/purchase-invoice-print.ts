// ── Purchase Invoice Print Component ─────────────────────────
// Standalone Angular component that wraps the PI print template
// for use as an inline preview if needed.
//
// Primary print flow uses PrintService (opens new window).
// This component exists for potential inline print-preview scenarios.

import { Component, input } from '@angular/core';
import { PurchaseInvoice } from '../../../feature/purchase/purchase-invoice/purchase-invoice';

@Component({
  selector: 'app-purchase-invoice-print',
  standalone: true,
  template: `
    <div class="print-preview-placeholder text-center text-muted p-4">
      <i class="ti ti-printer" style="font-size:48px;"></i>
      <p class="mt-2">Purchase Invoice print uses a dedicated print window.</p>
      <p>Click the <strong>Print</strong> button on the detail page to generate the document.</p>
    </div>
  `,
})
export class PurchaseInvoicePrintComponent {
  /** The PurchaseInvoice data to be printed. */
  invoice = input.required<PurchaseInvoice>();
}
