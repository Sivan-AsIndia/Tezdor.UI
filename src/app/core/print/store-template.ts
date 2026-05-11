// ── Store / Stock Ledger Print Template ──────────────────────
// Generates the HTML content for printing a Stock Ledger Report.
// Uses PROFILE_PRINT_CSS for header, hero, and footer styling,
// and custom table styles matching the store-view ledger layout.

import { COMPANY_INFO } from './company-info';
import { PROFILE_PRINT_CSS } from './profile-print-styles';
import { formatPrintDate, formatIndianNumber } from './number-to-words';

/** Minimal product summary needed by the template. */
export interface StorePrintProduct {
  productCode: string;
  productName: string;
  vendorName?: string;
}

/** A single stock-ledger row for the template. */
export interface StorePrintLedgerRow {
  sNo: number;
  date: string;
  vendorCode: string;
  vendorName: string;
  productCode: string;
  productName: string;
  oldStock: number;
  received: number;
  total: number;
  issued: number;
  closing: number;
}

/** Additional CSS specific to the store ledger table. */
const STORE_TABLE_CSS = `
  /* ── Stock Ledger Table ─────────────────────────────── */
  .ledger-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10.5px;
    margin-bottom: 18px;
  }

  .ledger-table th {
    background: #f5f5f5;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 9.5px;
    letter-spacing: 0.3px;
    color: #555;
    padding: 7px 8px;
    border: 1px solid #d0d0d0;
  }

  .ledger-table td {
    padding: 6px 8px;
    border: 1px solid #e0e0e0;
    vertical-align: middle;
  }

  .ledger-table tbody tr:nth-child(even) {
    background: #fafafa;
  }

  .ledger-table .num {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .ledger-table .center {
    text-align: center;
  }

  .ledger-table .val-in {
    color: #2e7d32;
    font-weight: 600;
  }

  .ledger-table .val-out {
    color: #c62828;
    font-weight: 600;
  }

  .ledger-table .closing-ok    { color: #2e7d32; font-weight: 600; }
  .ledger-table .closing-warn  { color: #e65100; font-weight: 600; }
  .ledger-table .closing-danger { color: #c62828; font-weight: 700; }

  .ledger-table .type-badge {
    display: inline-block;
    font-size: 9px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 3px;
    letter-spacing: 0.3px;
  }

  .ledger-table .type-in {
    background: #e8f5e9;
    color: #2e7d32;
  }

  .ledger-table .type-out {
    background: #ffebee;
    color: #c62828;
  }

  /* ── Totals Footer Row ──────────────────────────────── */
  .ledger-table tfoot td {
    background: #f0f0f0;
    font-weight: 700;
    border-top: 2px solid #999;
  }

  /* ── Summary Note ───────────────────────────────────── */
  .summary-note {
    font-size: 11px;
    color: #666;
    margin-top: 12px;
    font-style: italic;
  }
`;

/**
 * Builds the full HTML document string for a Stock Ledger print page.
 *
 * @param product  - Product summary (code, name, vendor).
 * @param rows     - Array of stock ledger rows.
 * @param totalIn  - Aggregated total received.
 * @param totalOut - Aggregated total issued.
 * @param closing  - Final closing stock.
 * @returns A complete HTML document string.
 */
export function buildStoreLedgerPrintHtml(
  product: StorePrintProduct,
  rows: StorePrintLedgerRow[],
  totalIn: number,
  totalOut: number,
  closing: number,
): string {

  const company = COMPANY_INFO;
  const today = formatPrintDate(new Date().toISOString());

  // ── KPI stats ──────────────────────────────────────────────
  const entries = rows.length;

  // ── Closing stock health ───────────────────────────────────
  const closingClass = closing <= 0
    ? 'closing-danger'
    : closing <= 20
    ? 'closing-warn'
    : 'closing-ok';

  // ── Build ledger rows ──────────────────────────────────────
  const ledgerRowsHtml = rows.map((r, idx) => {
    const dateStr = formatPrintDate(r.date);
    const isIn = r.received > 0;

    const typeHtml = isIn
      ? '<span class="type-badge type-in">↑ IN</span>'
      : '<span class="type-badge type-out">↓ OUT</span>';

    const receivedHtml = r.received > 0
      ? `<span class="val-in">+${formatIndianNumber(r.received)}</span>`
      : '—';

    const issuedHtml = r.issued > 0
      ? `<span class="val-out">${formatIndianNumber(r.issued)}</span>`
      : '—';

    const rowClosingClass = r.closing <= 0
      ? 'closing-danger'
      : r.closing <= 20
      ? 'closing-warn'
      : 'closing-ok';

    return `
      <tr>
        <td class="center">${idx + 1}</td>
        <td>${dateStr}</td>
        <td>${r.vendorName || '—'}</td>
        <td>${r.productName}</td>
        <td class="center">${typeHtml}</td>
        <td class="num">${formatIndianNumber(r.oldStock)}</td>
        <td class="num">${receivedHtml}</td>
        <td class="num"><strong>${formatIndianNumber(r.total)}</strong></td>
        <td class="num">${issuedHtml}</td>
        <td class="num"><span class="${rowClosingClass}">${formatIndianNumber(r.closing)}</span></td>
      </tr>`;
  }).join('');

  // ── Empty rows padding (min 6 rows for visual consistency) ─
  const minRows = 6;
  const emptyCount = Math.max(0, minRows - rows.length);
  const emptyRows = Array(emptyCount).fill(
    `<tr>
      <td>&nbsp;</td><td></td><td></td><td></td><td></td>
      <td></td><td></td><td></td><td></td><td></td>
    </tr>`,
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Stock Ledger - ${product.productCode}</title>
  <style>
    ${PROFILE_PRINT_CSS}
    ${STORE_TABLE_CSS}
  </style>
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
      <div class="report-title">Stock Ledger Report</div>
      <div class="report-date">${today}</div>
    </div>
  </div>

  <!-- ═══ Hero ═══ -->
  <div class="hero">
    <div class="avatar" style="background:#E8F5E9;color:#2E7D32;">
      <span style="font-size:24px;">📦</span>
    </div>
    <div>
      <div class="name">${product.productName}</div>
      <div class="meta">
        <span class="code">${product.productCode}</span>
        ${product.vendorName ? `<span class="dot"></span><span class="role">${product.vendorName}</span>` : ''}
      </div>
    </div>
  </div>

  <!-- ═══ KPI Stats ═══ -->
  <div class="stat-cards">
    <div class="stat-card">
      <div class="stat-card-label">Total IN</div>
      <div class="stat-card-value green">${formatIndianNumber(totalIn)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Total OUT</div>
      <div class="stat-card-value" style="color:#c62828;">${formatIndianNumber(totalOut)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Closing Stock</div>
      <div class="stat-card-value ${closingClass}">${formatIndianNumber(closing)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Total Entries</div>
      <div class="stat-card-value">${entries}</div>
    </div>
  </div>

  <!-- ═══ Stock Ledger Table ═══ -->
  <div class="section-title">Stock Ledger</div>
  <table class="ledger-table">
    <thead>
      <tr>
        <th class="center" style="width:35px;">S.No</th>
        <th>Date</th>
        <th>Vendor</th>
        <th>Product</th>
        <th class="center">Type</th>
        <th class="num">Old Stock</th>
        <th class="num">Received</th>
        <th class="num">Total</th>
        <th class="num">Issued</th>
        <th class="num">Closing</th>
      </tr>
    </thead>
    <tbody>
      ${ledgerRowsHtml}
      ${emptyRows}
    </tbody>
    ${rows.length > 0 ? `
    <tfoot>
      <tr>
        <td colspan="5" style="text-align:right;">TOTALS</td>
        <td class="num">—</td>
        <td class="num"><span class="val-in">+${formatIndianNumber(totalIn)}</span></td>
        <td class="num">—</td>
        <td class="num"><span class="val-out">${formatIndianNumber(totalOut)}</span></td>
        <td class="num"><span class="${closingClass}">${formatIndianNumber(closing)}</span></td>
      </tr>
    </tfoot>` : ''}
  </table>

  ${rows.length === 0 ? '<p class="summary-note">No transactions recorded for this product.</p>' : ''}

  <!-- ═══ Audit Information ═══ -->
  <div class="section-title">Report Information</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Product Code</div><div class="field-value mono">${product.productCode}</div></div>
    <div class="field"><div class="field-label">Product Name</div><div class="field-value">${product.productName}</div></div>
    <div class="field"><div class="field-label">Report Date</div><div class="field-value">${today}</div></div>
    <div class="field"><div class="field-label">Total Transactions</div><div class="field-value">${entries}</div></div>
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
