// ── Petty Cash Print Component ───────────────────────────────
// Standalone Angular component placeholder for the petty cash print template.
// Primary print flow uses PrintService (opens new window).

import { Component, input } from '@angular/core';
import { PettyCash } from '../../../feature/employee/petty-cash/petty-cash';

@Component({
  selector: 'app-petty-cash-print',
  standalone: true,
  template: `
    <div class="print-preview-placeholder text-center text-muted p-4">
      <i class="ti ti-printer" style="font-size:48px;"></i>
      <p class="mt-2">Petty cash voucher print uses a dedicated print window.</p>
      <p>Click the <strong>Print</strong> button on the detail page to generate the document.</p>
    </div>
  `,
})
export class PettyCashPrintComponent {
  /** The PettyCash data to be printed. */
  pettyCash = input.required<PettyCash>();
}
