// ── Employee Detail Print Component ──────────────────────────
// Standalone Angular component placeholder for the employee print template.
// Primary print flow uses PrintService (opens new window).

import { Component, input } from '@angular/core';
import { Employee } from '../../../feature/employee/employee';

@Component({
  selector: 'app-employee-detail-print',
  standalone: true,
  template: `
    <div class="print-preview-placeholder text-center text-muted p-4">
      <i class="ti ti-printer" style="font-size:48px;"></i>
      <p class="mt-2">Employee profile print uses a dedicated print window.</p>
      <p>Click the <strong>Print</strong> button on the detail page to generate the document.</p>
    </div>
  `,
})
export class EmployeeDetailPrintComponent {
  /** The Employee data to be printed. */
  employee = input.required<Employee>();
}
