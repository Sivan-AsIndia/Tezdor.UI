// ── Print Styles ────────────────────────────────────────────
// Common CSS used across all print templates (Purchase Order, Invoice, etc.)

export const PRINT_COMMON_CSS = `
  /* ── Reset & Page Setup ─────────────────────────────── */
  * { margin: 0; padding: 0; box-sizing: border-box; }

  @page {
    size: A4 portrait;
    margin: 10mm 12mm 10mm 12mm;
  }

  body {
    font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
    font-size: 12px;
    color: #222;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── Document Container ─────────────────────────────── */
  .print-page {
    width: 100%;
    max-width: 210mm;
    margin: 0 auto;
    padding: 0;
  }

  /* ── Document Title ─────────────────────────────────── */
  .doc-title {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    padding: 8px 0 4px;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #333;
    margin-bottom: 0;
  }

  .doc-copy-label {
    text-align: right;
    font-style: italic;
    font-size: 11px;
    color: #555;
    padding: 2px 4px 0 0;
  }

  /* ── Header Section (Company + Doc Meta) ────────────── */
  .header-section {
    display: flex;
    justify-content: space-between;
    border: 1px solid #333;
    border-top: none;
    padding: 0;
  }

  .company-block {
    padding: 8px 12px;
    flex: 1;
  }

  .company-name {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 2px;
  }

  .company-detail {
    font-size: 11px;
    color: #444;
    line-height: 1.5;
  }

  /* ── Meta Block: 2-Column Grid (no box, unified borders) ── */
  .meta-block {
    border-left: 1px solid #333;
    padding: 0;
    min-width: 380px;
    max-width: 420px;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 100%;
  }

  .meta-cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid #333;
    border-right: 1px solid #333;
    font-size: 11px;
    min-height: 28px;
  }

  .meta-cell:nth-child(even) {
    border-right: none;
  }

  .meta-cell--full {
    grid-column: 1 / -1;
    border-right: none;
  }

  /* Remove bottom border from the last row of cells */
  .meta-grid > .meta-cell:nth-last-child(1),
  .meta-grid > .meta-cell:nth-last-child(2):nth-child(odd) {
    border-bottom: none;
  }

  .meta-label {
    font-weight: 600;
    color: #333;
    white-space: nowrap;
    margin-right: 8px;
    font-size: 10.5px;
  }

  .meta-value {
    font-weight: 700;
    color: #111;
    text-align: right;
    font-size: 11px;
  }

  .meta-value.amount {
    color: #c0392b;
    font-size: 12px;
    font-weight: 800;
  }

  .meta-value.highlight {
    color: #1a5276;
    font-weight: 800;
  }

  /* ── Party Section (Buyer / Consignee / Ship To) ────── */
  .party-section {
    display: flex;
    border: 1px solid #333;
    border-top: none;
  }

  .party-block {
    flex: 1;
    padding: 8px 12px;
    font-size: 11px;
    line-height: 1.6;
  }

  .party-block + .party-block {
    border-left: 1px solid #333;
  }

  .party-title {
    font-weight: 600;
    font-size: 11.5px;
    color: #555;
    margin-bottom: 2px;
  }

  .party-name {
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 1px;
  }

  .party-gstin {
    font-weight: 600;
  }

  /* ── Line Items Table ───────────────────────────────── */
  .items-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #333;
    border-top: none;
    font-size: 11px;
  }

  .items-table thead {
    background: #f0f0f0;
  }

  .items-table th {
    padding: 6px 8px;
    text-align: left;
    font-weight: 700;
    font-size: 11px;
    border: 1px solid #333;
    color: #222;
  }

  .items-table td {
    padding: 5px 8px;
    border: 1px solid #ccc;
    vertical-align: top;
  }

  .items-table td.num,
  .items-table th.num {
    text-align: right;
  }

  .items-table td.center,
  .items-table th.center {
    text-align: center;
  }

  .items-table tbody tr:nth-child(even) {
    background: #fafafa;
  }

  /* Empty rows to fill the table */
  .items-table .empty-row td {
    height: 22px;
    border-color: #ddd;
  }

  /* Footer row (totals) */
  .items-table tfoot td {
    padding: 6px 8px;
    font-weight: 700;
    border: 1px solid #333;
    background: #f7f7f7;
  }

  /* ── Totals Summary Block ───────────────────────────── */
  .totals-section {
    border: 1px solid #333;
    border-top: none;
    padding: 8px 12px;
  }

  .totals-grid {
    display: flex;
    justify-content: flex-end;
  }

  .totals-table {
    width: 320px;
    border-collapse: collapse;
    font-size: 12px;
  }

  .totals-table td {
    padding: 4px 8px;
  }

  .totals-table td:first-child {
    text-align: right;
    font-weight: 600;
    padding-right: 16px;
  }

  .totals-table td:last-child {
    text-align: right;
    font-weight: 700;
  }

  .totals-table .grand-row td {
    font-size: 13px;
    color: #c0392b;
    border-top: 2px solid #333;
    padding-top: 6px;
  }

  .amount-words {
    font-size: 11px;
    font-style: italic;
    color: #333;
    margin-top: 4px;
  }

  /* ── Tax Breakdown Table ────────────────────────────── */
  .tax-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #333;
    border-top: none;
    font-size: 11px;
  }

  .tax-table th,
  .tax-table td {
    padding: 4px 8px;
    border: 1px solid #ccc;
    text-align: right;
  }

  .tax-table th {
    background: #f0f0f0;
    font-weight: 700;
    border-color: #333;
    text-align: center;
  }

  .tax-table td:first-child {
    text-align: left;
  }

  /* ── Bank Details & Declaration ─────────────────────── */
  .footer-section {
    display: flex;
    border: 1px solid #333;
    border-top: none;
    font-size: 11px;
  }

  .declaration-block {
    flex: 1;
    padding: 8px 12px;
    line-height: 1.6;
  }

  .bank-block {
    flex: 1;
    padding: 8px 12px;
    border-left: 1px solid #333;
  }

  .bank-title {
    font-weight: 700;
    margin-bottom: 4px;
    font-size: 11.5px;
  }

  .bank-row {
    display: flex;
    gap: 6px;
    margin-bottom: 1px;
  }

  .bank-label {
    color: #555;
    min-width: 120px;
  }

  .bank-value {
    font-weight: 600;
  }

  /* ── Signature Section ──────────────────────────────── */
  .signature-section {
    display: flex;
    justify-content: space-between;
    border: 1px solid #333;
    border-top: none;
    padding: 40px 20px 10px;
    font-size: 11px;
  }

  .signature-label {
    border-top: 1px solid #999;
    padding-top: 4px;
    font-weight: 600;
    text-align: center;
    min-width: 180px;
  }

  /* ── Computer Generated Notice ──────────────────────── */
  .generated-notice {
    text-align: center;
    font-size: 10px;
    font-style: italic;
    color: #777;
    padding: 6px 0 0;
  }

  /* ── Invoice-specific extras ────────────────────────── */
  .invoice-meta-grid {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #333;
    border-top: none;
    font-size: 11px;
  }

  .invoice-meta-grid td {
    padding: 4px 10px;
    border: 1px solid #ccc;
    width: 25%;
  }

  .invoice-meta-grid .label {
    color: #555;
    font-size: 10.5px;
  }

  .invoice-meta-grid .value {
    font-weight: 600;
    font-size: 11px;
  }

  /* ── Utility ────────────────────────────────────────── */
  .text-right { text-align: right; }
  .text-center { text-align: center; }
  .fw-bold { font-weight: 700; }
  .text-danger { color: #c0392b; }
  .text-success { color: #27ae60; }
  .text-muted { color: #888; }
  .mt-2 { margin-top: 8px; }
`;
