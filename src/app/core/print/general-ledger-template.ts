// ── General Ledger Entry Print Template ──────────────────────
// Generates the HTML content for printing a General Ledger Entry.
// Design follows the teacher_detail.html reference template.

import { GeneralLedgerEntry } from '../../feature/ledger/general-ledger-entry';
import { COMPANY_INFO } from './company-info';
import { PROFILE_PRINT_CSS } from './profile-print-styles';
import { formatIndianNumber, formatPrintDate } from './number-to-words';

/**
 * Builds the full HTML document string for a General Ledger Entry print page.
 *
 * @param entry - The GeneralLedgerEntry data object to print.
 * @returns     A complete HTML document string.
 */
export function buildGeneralLedgerPrintHtml(entry: GeneralLedgerEntry): string {

  const company = COMPANY_INFO;
  const today = formatPrintDate(new Date().toISOString());

  const netAmount = (entry.debitAmount ?? 0) - (entry.creditAmount ?? 0);
  const isDebit = netAmount >= 0;

  // Entry type badge
  const typeBadge = entry.isReversal
    ? '<span class="badge badge-warning">Reversal</span>'
    : '<span class="badge badge-active">Standard</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GL Entry - ${entry.entryNo ?? entry.id}</title>
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
      <div class="report-title">General Ledger Entry</div>
      <div class="report-date">${today}</div>
    </div>
  </div>

  <!-- ═══ Hero ═══ -->
  <div class="hero">
    <div class="avatar" style="background:#E3F2FD;color:#1565C0;">
      <span style="font-size:24px;">📒</span>
    </div>
    <div>
      <div class="name">${entry.accountNameSnapshot ?? entry.accountName ?? '—'}</div>
      <div class="meta">
        <span class="code">${entry.entryNo ?? entry.id}</span>
        <span class="dot"></span>
        <span class="role">${entry.sourceType ?? '—'}</span>
        <span class="dot"></span>
        <span class="badge badge-dept">${entry.accountCodeSnapshot ?? entry.accountCode ?? '—'}</span>
        ${typeBadge}
      </div>
    </div>
  </div>

  <!-- ═══ Summary Stats ═══ -->
  <div class="stat-cards">
    <div class="stat-card">
      <div class="stat-card-label">Debit Amount</div>
      <div class="stat-card-value accent">₹${formatIndianNumber(entry.debitAmount ?? 0, 2)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Credit Amount</div>
      <div class="stat-card-value green">₹${formatIndianNumber(entry.creditAmount ?? 0, 2)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Net Amount</div>
      <div class="stat-card-value ${isDebit ? 'accent' : 'green'}">₹${formatIndianNumber(Math.abs(netAmount), 2)} ${isDebit ? 'Dr' : 'Cr'}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Posting Seq #</div>
      <div class="stat-card-value">${entry.postingSequenceNumber ?? '—'}</div>
    </div>
  </div>

  <!-- ═══ Entry Details ═══ -->
  <div class="section-title">Entry Details</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Entry Date</div><div class="field-value">${formatPrintDate(entry.entryDate)}</div></div>
    <div class="field"><div class="field-label">Posting Date</div><div class="field-value">${formatPrintDate(entry.postingDate)}</div></div>
    <div class="field"><div class="field-label">Source Type</div><div class="field-value">${entry.sourceType ?? '—'}</div></div>
    <div class="field"><div class="field-label">Source Document No.</div><div class="field-value mono">${entry.sourceDocumentNumber ?? '—'}</div></div>
    <div class="field"><div class="field-label">Journal Entry No.</div><div class="field-value mono">${entry.journalEntryNumber ?? '—'}</div></div>
    <div class="field"><div class="field-label">Journal Line No.</div><div class="field-value">${entry.journalLineNumber ?? '—'}</div></div>
  </div>

  <!-- ═══ Account & Ledger ═══ -->
  <div class="section-title">Account & Ledger Information</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Account Code</div><div class="field-value mono">${entry.accountCodeSnapshot ?? entry.accountCode ?? '—'}</div></div>
    <div class="field"><div class="field-label">Account Name</div><div class="field-value">${entry.accountNameSnapshot ?? entry.accountName ?? '—'}</div></div>
    <div class="field"><div class="field-label">Ledger Code</div><div class="field-value mono">${entry.ledgerCode ?? '—'}</div></div>
    <div class="field"><div class="field-label">Ledger Name</div><div class="field-value">${entry.ledgerName ?? '—'}</div></div>
    <div class="field"><div class="field-label">Base Currency</div><div class="field-value">${entry.baseCurrencyCode ?? entry.baseCurrencyName ?? '—'}</div></div>
    <div class="field"><div class="field-label">External Ref No.</div><div class="field-value mono">${entry.externalReferenceNumber ?? '—'}</div></div>
  </div>

  <!-- ═══ Organization ═══ -->
  <div class="section-title">Organization Context</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Company</div><div class="field-value">${entry.companyName ?? entry.companyCode ?? '—'}</div></div>
    <div class="field"><div class="field-label">Branch</div><div class="field-value">${entry.branchNameSnapshot ?? entry.branchName ?? '—'}</div></div>
    <div class="field"><div class="field-label">Branch Code</div><div class="field-value mono">${entry.branchCodeSnapshot ?? entry.branchCode ?? '—'}</div></div>
    <div class="field"><div class="field-label">Fiscal Year</div><div class="field-value">${entry.fiscalYearName ?? entry.fiscalYearCode ?? '—'}</div></div>
    <div class="field"><div class="field-label">Accounting Period</div><div class="field-value">${entry.accountingPeriodName ?? entry.accountingPeriodCode ?? '—'}</div></div>
    <div class="field"><div class="field-label">Posting Batch</div><div class="field-value mono">${entry.postingBatchId ?? '—'}</div></div>
  </div>

  <!-- ═══ Narration ═══ -->
  ${entry.narration || entry.lineNarration ? `
  <div class="section-title">Narration</div>
  <div class="field-grid mb-0">
    ${entry.narration ? `<div class="field"><div class="field-label">Header Narration</div><div class="field-value">${entry.narration}</div></div>` : ''}
    ${entry.lineNarration ? `<div class="field"><div class="field-label">Line Narration</div><div class="field-value">${entry.lineNarration}</div></div>` : ''}
  </div>
  <div style="margin-bottom:22px;"></div>
  ` : ''}

  <!-- ═══ Reversal Info ═══ -->
  ${entry.isReversal ? `
  <div class="section-title">Reversal Information</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Is Reversal</div><div class="field-value" style="color:#c0392b;font-weight:600;">Yes</div></div>
    <div class="field"><div class="field-label">Reversal Group ID</div><div class="field-value mono">${entry.reversalGroupId ?? '—'}</div></div>
    <div class="field"><div class="field-label">Reverses Document</div><div class="field-value mono">${entry.reversesSourceDocumentId ?? '—'}</div></div>
    <div class="field"><div class="field-label">Deleted</div><div class="field-value">${entry.isDeleted ? 'Yes' : 'No'}</div></div>
  </div>
  ` : ''}

  <!-- ═══ Audit ═══ -->
  <div class="section-title">Audit Trail</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Created At</div><div class="field-value">${formatPrintDate(entry.createdAt)}</div></div>
    <div class="field"><div class="field-label">Created By</div><div class="field-value">${entry.createdBy ?? '—'}</div></div>
  </div>

  <!-- ═══ Signatures ═══ -->
  <div class="signature-section">
    <div class="signature-label">Prepared By</div>
    <div class="signature-label">Verified By</div>
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
