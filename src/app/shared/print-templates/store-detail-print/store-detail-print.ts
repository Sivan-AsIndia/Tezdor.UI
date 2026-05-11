// ── Store Detail Print Component ─────────────────────────────
// Standalone Angular component placeholder for the store print template.
// Primary print flow uses PrintService (opens new window).

import { Component, input } from '@angular/core';
import { StockLedgerRow } from '../../../feature/store/store';

@Component({
  selector: 'app-store-detail-print',
  standalone: true,
  template: `
    <div class="print-preview-placeholder text-center text-muted p-4">
      <i class="ti ti-printer" style="font-size:48px;"></i>
      <p class="mt-2">Stock Ledger print uses a dedicated print window.</p>
      <p>Click the <strong>Print</strong> button on the detail page to generate the document.</p>
    </div>
  `,
})
export class StoreDetailPrintComponent {
  /** The stock ledger rows to be printed. */
  ledgerRows = input.required<StockLedgerRow[]>();
}
