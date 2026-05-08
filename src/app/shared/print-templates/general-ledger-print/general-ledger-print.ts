// ── General Ledger Print Component ───────────────────────────
// Standalone Angular component placeholder for the GL entry print template.
// Primary print flow uses PrintService (opens new window).

import { Component, input } from '@angular/core';
import { GeneralLedgerEntry } from '../../../feature/ledger/general-ledger-entry';

@Component({
  selector: 'app-general-ledger-print',
  standalone: true,
  template: `
    <div class="print-preview-placeholder text-center text-muted p-4">
      <i class="ti ti-printer" style="font-size:48px;"></i>
      <p class="mt-2">General ledger entry print uses a dedicated print window.</p>
      <p>Click the <strong>Print</strong> button on the detail page to generate the document.</p>
    </div>
  `,
})
export class GeneralLedgerPrintComponent {
  /** The GeneralLedgerEntry data to be printed. */
  entry = input.required<GeneralLedgerEntry>();
}
