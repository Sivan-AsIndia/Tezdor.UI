// ── Salary Detail Print Component ────────────────────────────
// Standalone Angular component placeholder for the salary print template.
// Primary print flow uses PrintService (opens new window).

import { Component, input } from '@angular/core';
import { Salary } from '../../../feature/employee/salary/salary';

@Component({
  selector: 'app-salary-detail-print',
  standalone: true,
  template: `
    <div class="print-preview-placeholder text-center text-muted p-4">
      <i class="ti ti-printer" style="font-size:48px;"></i>
      <p class="mt-2">Salary statement print uses a dedicated print window.</p>
      <p>Click the <strong>Print</strong> button on the detail page to generate the document.</p>
    </div>
  `,
})
export class SalaryDetailPrintComponent {
  /** The Salary data to be printed. */
  salary = input.required<Salary>();
}
