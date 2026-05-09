// ── Petty Cash Detail Print Template ────────────────────────
// Generates the HTML content for printing a Petty Cash Voucher.
// Design follows the teacher_detail.html reference template.

import { PettyCash } from '../../feature/employee/petty-cash/petty-cash';
import { PettyCashLine } from '../../feature/employee/petty-cash/petty-cash-line';
import { COMPANY_INFO } from './company-info';
import { PROFILE_PRINT_CSS } from './profile-print-styles';
import { amountToWords, formatIndianNumber, formatPrintDate } from './number-to-words';

/** Helper: resolve employee name from ID using a lookup map. */
type EmployeeNameResolver = (id: string) => string;

/**
 * Builds the full HTML document string for a Petty Cash Voucher print page.
 *
 * @param pc        - The PettyCash header data.
 * @param lines     - The PettyCash line items.
 * @param empNameFn - Function to resolve employee ID → display name.
 * @returns         A complete HTML document string.
 */
export function buildPettyCashPrintHtml(
  pc: PettyCash,
  lines: PettyCashLine[],
  empNameFn: EmployeeNameResolver
): string {

  const company = COMPANY_INFO;
  const today = formatPrintDate(new Date().toISOString());

  // Status badge
  const statusClass = pc.pettyCashStatus === 'Approved' ? 'badge-active'
    : pc.pettyCashStatus === 'Draft' ? 'badge-dark'
    : pc.pettyCashStatus === 'Posted' ? 'badge-info'
    : pc.pettyCashStatus === 'Cancelled' ? 'badge-danger'
    : pc.pettyCashStatus === 'Rejected' ? 'badge-danger'
    : 'badge-dept';

  // Line rows
  const lineRows = lines.map((line, idx) => {
    const net = (line.disbursedAmount || 0)
      + (line.replenishmentAmount || 0)
      - (line.expenseAmount || 0)
      - (line.returnedAmount || 0);

    return `
      <tr>
        <td class="center">${idx + 1}</td>
        <td class="num">₹${formatIndianNumber(line.requestedAmount ?? 0, 2)}</td>
        <td class="num">₹${formatIndianNumber(line.approvedAmount ?? 0, 2)}</td>
        <td class="num">₹${formatIndianNumber(line.disbursedAmount ?? 0, 2)}</td>
        <td class="num">₹${formatIndianNumber(line.expenseAmount ?? 0, 2)}</td>
        <td class="num">₹${formatIndianNumber(line.taxAmount ?? 0, 2)}</td>
        <td class="num">₹${formatIndianNumber(line.returnedAmount ?? 0, 2)}</td>
        <td class="num">₹${formatIndianNumber(line.replenishmentAmount ?? 0, 2)}</td>
        <td class="num" style="font-weight:600;">₹${formatIndianNumber(net, 2)}</td>
      </tr>`;
  }).join('');

  // Totals
  const totalRequested = lines.reduce((s, l) => s + (l.requestedAmount || 0), 0);
  const totalApproved  = lines.reduce((s, l) => s + (l.approvedAmount || 0), 0);
  const totalDisbursed = lines.reduce((s, l) => s + (l.disbursedAmount || 0), 0);
  const totalExpense   = lines.reduce((s, l) => s + (l.expenseAmount || 0), 0);
  const totalTax       = lines.reduce((s, l) => s + (l.taxAmount || 0), 0);
  const totalReturned  = lines.reduce((s, l) => s + (l.returnedAmount || 0), 0);
  const totalReplenish = lines.reduce((s, l) => s + (l.replenishmentAmount || 0), 0);
  const netTotal       = totalDisbursed + totalReplenish - totalExpense - totalReturned;

  // Closing balance
  const closingBal = (pc.openingCashBalance || 0) + netTotal;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Petty Cash Voucher - ${pc.pettyCashCode}</title>
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
      <div class="report-title">Petty Cash Voucher</div>
      <div class="report-date">${today}</div>
    </div>
  </div>

  <!-- ═══ Hero ═══ -->
  <div class="hero">
    <div class="avatar" style="background:#FFF3E0;color:#E65100;">
      <span style="font-size:24px;">🏦</span>
    </div>
    <div>
      <div class="name">${pc.pettyCashName}</div>
      <div class="meta">
        <span class="code">${pc.pettyCashCode}</span>
        <span class="dot"></span>
        <span class="role">${pc.pettyCashTransactionType ?? '—'}</span>
        <span class="dot"></span>
        <span class="badge badge-dept">${pc.pettyCashMode}</span>
        <span class="badge ${statusClass}">${pc.pettyCashStatus}</span>
      </div>
    </div>
  </div>

  <!-- ═══ Summary Stats ═══ -->
  <div class="stat-cards">
    <div class="stat-card">
      <div class="stat-card-label">Opening Balance</div>
      <div class="stat-card-value">₹${formatIndianNumber(pc.openingCashBalance ?? 0, 2)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Closing Balance</div>
      <div class="stat-card-value accent">₹${formatIndianNumber(closingBal, 2)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Float Limit</div>
      <div class="stat-card-value">₹${formatIndianNumber(pc.floatLimitAmount ?? 0, 2)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Fund Type</div>
      <div class="stat-card-value green">${pc.fundType ?? '—'}</div>
    </div>
  </div>

  <!-- ═══ Fund Details ═══ -->
  <div class="section-title">Fund Details</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Petty Cash Code</div><div class="field-value mono">${pc.pettyCashCode}</div></div>
    <div class="field"><div class="field-label">Fund Name</div><div class="field-value">${pc.pettyCashName}</div></div>
    <div class="field"><div class="field-label">Mode</div><div class="field-value">${pc.pettyCashMode}</div></div>
    <div class="field"><div class="field-label">Fund Type</div><div class="field-value">${pc.fundType}</div></div>
    <div class="field"><div class="field-label">Effective From</div><div class="field-value">${formatPrintDate(pc.effectiveFromDate)}</div></div>
    <div class="field"><div class="field-label">Effective To</div><div class="field-value">${formatPrintDate(pc.effectiveToDate)}</div></div>
    <div class="field"><div class="field-label">Min Threshold</div><div class="field-value">₹${formatIndianNumber(pc.minimumThresholdAmount ?? 0, 2)}</div></div>
    <div class="field"><div class="field-label">Currency</div><div class="field-value">${pc.currencyId ?? 'INR'}</div></div>
  </div>

  <!-- ═══ Transaction Details ═══ -->
  <div class="section-title">Transaction Details</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Transaction Type</div><div class="field-value">${pc.pettyCashTransactionType}</div></div>
    <div class="field"><div class="field-label">Transaction Date</div><div class="field-value">${formatPrintDate(pc.transactionDate)}</div></div>
    <div class="field"><div class="field-label">Purpose</div><div class="field-value">${pc.purposeTitle ?? '—'}</div></div>
    <div class="field"><div class="field-label">Description</div><div class="field-value">${pc.purposeDescription ?? '—'}</div></div>
    <div class="field"><div class="field-label">Custodian</div><div class="field-value">${empNameFn(pc.custodianEmployeeId)}</div></div>
    <div class="field"><div class="field-label">Alternate Custodian</div><div class="field-value">${pc.alternateCustodianEmployeeId ? empNameFn(pc.alternateCustodianEmployeeId) : '—'}</div></div>
  </div>

  <!-- ═══ Approval & Verification ═══ -->
  <div class="section-title">Approval & Verification</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Approval Status</div><div class="field-value">${pc.approvalStatus}</div></div>
    <div class="field"><div class="field-label">Submitted On</div><div class="field-value">${formatPrintDate(pc.submittedOn)}</div></div>
    <div class="field"><div class="field-label">Approved On</div><div class="field-value">${formatPrintDate(pc.approvedOn)}</div></div>
    <div class="field"><div class="field-label">Receipt Verification</div><div class="field-value">${pc.receiptVerificationStatus}</div></div>
    <div class="field"><div class="field-label">Finance Verification</div><div class="field-value">${pc.financeVerificationStatus}</div></div>
    <div class="field"><div class="field-label">Posting Status</div><div class="field-value">${pc.postingStatus}</div></div>
  </div>

  ${lines.length > 0 ? `
  <!-- ═══ Line Items ═══ -->
  <div class="section-title">Line Items</div>
  <table class="detail-table">
    <thead>
      <tr>
        <th class="center" style="width:35px">S.No</th>
        <th class="num">Requested</th>
        <th class="num">Approved</th>
        <th class="num">Disbursed</th>
        <th class="num">Expense</th>
        <th class="num">Tax</th>
        <th class="num">Returned</th>
        <th class="num">Replenish</th>
        <th class="num">Net</th>
      </tr>
    </thead>
    <tbody>${lineRows}</tbody>
    <tfoot>
      <tr>
        <td class="text-right"><strong>Totals</strong></td>
        <td class="num">₹${formatIndianNumber(totalRequested, 2)}</td>
        <td class="num">₹${formatIndianNumber(totalApproved, 2)}</td>
        <td class="num">₹${formatIndianNumber(totalDisbursed, 2)}</td>
        <td class="num">₹${formatIndianNumber(totalExpense, 2)}</td>
        <td class="num">₹${formatIndianNumber(totalTax, 2)}</td>
        <td class="num">₹${formatIndianNumber(totalReturned, 2)}</td>
        <td class="num">₹${formatIndianNumber(totalReplenish, 2)}</td>
        <td class="num" style="color:#993C1D;">₹${formatIndianNumber(netTotal, 2)}</td>
      </tr>
    </tfoot>
  </table>` : ''}

  <!-- ═══ Balance Summary ═══ -->
  <div class="section-title">Balance Summary</div>
  <div class="stat-cards-3">
    <div class="stat-card">
      <div class="stat-card-label">Opening Balance</div>
      <div class="stat-card-value">₹${formatIndianNumber(pc.openingCashBalance ?? 0, 2)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Net Movement</div>
      <div class="stat-card-value">${netTotal >= 0 ? '+' : ''}₹${formatIndianNumber(netTotal, 2)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Closing Balance</div>
      <div class="stat-card-value accent">₹${formatIndianNumber(closingBal, 2)}</div>
    </div>
  </div>

  ${pc.notes ? `
  <div style="font-size:11px;color:#333;margin-bottom:12px;border:1px solid #eee;padding:8px 12px;border-radius:4px;">
    <strong>Notes:</strong> ${pc.notes}
  </div>` : ''}

  <!-- ═══ Signatures ═══ -->
  <div class="signature-section">
    <div class="signature-label">Custodian</div>
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
