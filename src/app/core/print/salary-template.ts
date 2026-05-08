// ── Salary Detail Print Template ─────────────────────────────
// Generates the HTML content for printing a Salary Statement.
// Design follows the teacher_detail.html reference template.

import { Salary, SalaryStatus } from '../../feature/employee/salary/salary';
import { COMPANY_INFO } from './company-info';
import { PROFILE_PRINT_CSS } from './profile-print-styles';
import { amountToWords, formatIndianNumber, formatPrintDate } from './number-to-words';

/** Helper: resolve employee name from ID using a lookup map. */
type EmployeeNameResolver = (id: string) => string;

/**
 * Builds the full HTML document string for a Salary Statement print page.
 *
 * @param sal         - The Salary data object to print.
 * @param empNameFn   - Function to resolve employee ID → display name.
 * @returns           A complete HTML document string.
 */
export function buildSalaryPrintHtml(
  sal: Salary,
  empNameFn: EmployeeNameResolver
): string {

  const company = COMPANY_INFO;
  const today = formatPrintDate(new Date().toISOString());

  // Status label
  const statusLabel = SalaryStatus[sal.status] ?? String(sal.status);
  const statusClass = sal.status === SalaryStatus.Paid ? 'badge-active'
    : sal.status === SalaryStatus.Approved ? 'badge-info'
    : sal.status === SalaryStatus.Draft ? 'badge-dark'
    : 'badge-dept';

  // Build salary line rows
  const lineRows = (sal.salaryLines ?? []).map((line, idx) => {
    const empName = empNameFn(line.employeeId);
    return `
      <tr>
        <td class="center">${idx + 1}</td>
        <td>${empName}</td>
        <td class="center">${line.totalDays ?? 0}</td>
        <td class="center">${line.payableDays ?? 0}</td>
        <td class="center">${line.lossOfPayDays ?? 0}</td>
        <td class="num">₹${formatIndianNumber(line.basicSalary ?? 0, 2)}</td>
        <td class="num">₹${formatIndianNumber(line.grossEarnings ?? 0, 2)}</td>
        <td class="num">₹${formatIndianNumber(line.totalDeductions ?? 0, 2)}</td>
        <td class="num" style="font-weight:600;">₹${formatIndianNumber(line.netSalary ?? 0, 2)}</td>
      </tr>`;
  }).join('');

  // Compute totals
  const totalGross = sal.totalGrossAmount ?? 0;
  const totalDeduction = sal.totalDeductionAmount ?? 0;
  const totalNet = sal.totalNetSalary ?? 0;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Salary Statement - ${sal.salaryNumber ?? sal.salaryId}</title>
  <style>${PROFILE_PRINT_CSS}</style>
</head>
<body onload="window.print();">
<div class="page">

  <!-- ═══ Header ═══ -->
  <div class="header">
    <div>
      <div class="company-name">${company.name}</div>
      <div class="company-sub">${company.addressLine1}</div>
      <div class="company-sub">${company.addressLine2} | Ph: ${company.phone}</div>
    </div>
    <div>
      <div class="report-title">Salary Statement</div>
      <div class="report-date">${today}</div>
    </div>
  </div>

  <!-- ═══ Hero ═══ -->
  <div class="hero">
    <div class="avatar" style="background:#E8F5E9;color:#2E7D32;">
      <span style="font-size:24px;">💰</span>
    </div>
    <div>
      <div class="name">${sal.salaryNumber ?? sal.salaryId}</div>
      <div class="meta">
        <span class="code">${sal.salaryMonth ?? '—'}</span>
        <span class="dot"></span>
        <span class="role">Branch: ${sal.branchId}</span>
        <span class="dot"></span>
        <span class="badge ${statusClass}">${statusLabel}</span>
      </div>
    </div>
  </div>

  <!-- ═══ Summary Stats ═══ -->
  <div class="stat-cards">
    <div class="stat-card">
      <div class="stat-card-label">Total Employees</div>
      <div class="stat-card-value accent">${sal.totalEmployees ?? (sal.salaryLines?.length ?? 0)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Gross Amount</div>
      <div class="stat-card-value">₹${formatIndianNumber(totalGross, 2)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Total Deductions</div>
      <div class="stat-card-value red">₹${formatIndianNumber(totalDeduction, 2)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Net Salary</div>
      <div class="stat-card-value green">₹${formatIndianNumber(totalNet, 2)}</div>
    </div>
  </div>

  <!-- ═══ Period Information ═══ -->
  <div class="section-title">Period Information</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Salary Number</div><div class="field-value mono">${sal.salaryNumber ?? '—'}</div></div>
    <div class="field"><div class="field-label">Salary Month</div><div class="field-value">${sal.salaryMonth ?? '—'}</div></div>
    <div class="field"><div class="field-label">From Date</div><div class="field-value">${formatPrintDate(sal.fromDate)}</div></div>
    <div class="field"><div class="field-label">To Date</div><div class="field-value">${formatPrintDate(sal.toDate)}</div></div>
    <div class="field"><div class="field-label">Processing Date</div><div class="field-value">${formatPrintDate(sal.salaryDate)}</div></div>
    <div class="field"><div class="field-label">Payment Date</div><div class="field-value">${formatPrintDate(sal.paymentDate)}</div></div>
  </div>

  ${(sal.salaryLines?.length ?? 0) > 0 ? `
  <!-- ═══ Employee Salary Lines ═══ -->
  <div class="section-title">Employee Salary Breakdown</div>
  <table class="detail-table">
    <thead>
      <tr>
        <th class="center" style="width:35px">S.No</th>
        <th>Employee Name</th>
        <th class="center">Total Days</th>
        <th class="center">Payable Days</th>
        <th class="center">LOP Days</th>
        <th class="num">Basic</th>
        <th class="num">Gross</th>
        <th class="num">Deductions</th>
        <th class="num">Net Salary</th>
      </tr>
    </thead>
    <tbody>${lineRows}</tbody>
    <tfoot>
      <tr>
        <td colspan="6" class="text-right"><strong>Totals</strong></td>
        <td class="num">₹${formatIndianNumber(totalGross, 2)}</td>
        <td class="num">₹${formatIndianNumber(totalDeduction, 2)}</td>
        <td class="num" style="color:#993C1D;">₹${formatIndianNumber(totalNet, 2)}</td>
      </tr>
    </tfoot>
  </table>` : ''}

  <!-- ═══ Amount in Words ═══ -->
  <div class="amount-words">
    <strong>Net Salary (in words):</strong> ${amountToWords(totalNet)}
  </div>

  <!-- ═══ Posting Details ═══ -->
  <div class="section-title">Posting & Accounts</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Expense Account</div><div class="field-value mono">${sal.expenseAccountId ?? '—'}</div></div>
    <div class="field"><div class="field-label">Payable Account</div><div class="field-value mono">${sal.payableAccountId ?? '—'}</div></div>
    <div class="field"><div class="field-label">Posted</div><div class="field-value">${sal.isPosted ? 'Yes' : 'No'}</div></div>
    <div class="field"><div class="field-label">Posted By</div><div class="field-value">${sal.postedBy ?? '—'}</div></div>
  </div>

  <!-- ═══ Signatures ═══ -->
  <div class="signature-section">
    <div class="signature-label">Prepared By</div>
    <div class="signature-label">Approved By</div>
    <div class="signature-label">Finance Head</div>
  </div>

  <!-- ═══ Footer ═══ -->
  <div class="footer">
    <span>Printed by: Admin | SofaCraft ERP</span>
    <span>Confidential — For internal use only</span>
  </div>

</div>
</body>
</html>`;
}
