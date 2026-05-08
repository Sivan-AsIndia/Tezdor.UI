// ── Profile Print Styles ─────────────────────────────────────
// Common CSS used for profile/detail print templates
// (Employee, Product, Salary, Petty Cash, General Ledger).
// Design is based on the teacher_detail.html reference template.

export const PROFILE_PRINT_CSS = `
  /* ── Reset & Page Setup ─────────────────────────────── */
  * { margin: 0; padding: 0; box-sizing: border-box; }

  @page {
    size: A4 portrait;
    margin: 10mm 12mm 10mm 12mm;
  }

  body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    font-size: 12px;
    color: #222;
    background: #fff;
    display: flex;
    justify-content: center;
    padding: 20px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── Page Container ─────────────────────────────────── */
  .page {
    width: 780px;
    background: #fff;
    padding: 32px 36px;
  }

  /* ── Header ─────────────────────────────────────────── */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 3px solid #993C1D;
    padding-bottom: 14px;
    margin-bottom: 24px;
  }

  .company-name {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .company-sub {
    font-size: 10.5px;
    color: #777;
    margin-top: 3px;
    line-height: 1.5;
  }

  .report-title {
    font-size: 14px;
    font-weight: 600;
    color: #993C1D;
    text-align: right;
  }

  .report-date {
    font-size: 10.5px;
    color: #777;
    text-align: right;
    margin-top: 4px;
  }

  /* ── Hero Section ───────────────────────────────────── */
  .hero {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 20px;
    background: #FAECE7;
    color: #993C1D;
  }

  .name {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
    flex-wrap: wrap;
  }

  .code {
    font-size: 12px;
    color: #888;
  }

  .role {
    font-size: 12px;
    color: #888;
  }

  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #ccc;
    display: inline-block;
  }

  .badge {
    padding: 3px 12px;
    border-radius: 12px;
    font-size: 10.5px;
    font-weight: 500;
  }

  .badge-active   { background: #EAF3DE; color: #27500A; }
  .badge-dept     { background: #FAECE7; color: #712B13; }
  .badge-warning  { background: #FFF3CD; color: #856404; }
  .badge-info     { background: #D1ECF1; color: #0C5460; }
  .badge-danger   { background: #F8D7DA; color: #721C24; }
  .badge-dark     { background: #E2E3E5; color: #383D41; }

  /* ── Section Title ──────────────────────────────────── */
  .section-title {
    font-size: 12px;
    font-weight: 600;
    color: #712B13;
    margin: 0 0 10px;
    padding-bottom: 6px;
    border-bottom: 1px solid #eee;
  }

  /* ── Field Grid ─────────────────────────────────────── */
  .field-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    margin-bottom: 22px;
  }

  .field-grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0;
    margin-bottom: 22px;
  }

  .field-grid-4 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0;
    margin-bottom: 22px;
  }

  .field {
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .field-label {
    font-size: 10px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .field-value {
    font-size: 12px;
    color: #333;
    margin-top: 2px;
  }

  .field-value.mono {
    font-family: 'Consolas', 'Courier New', monospace;
  }

  .field-value.link {
    color: #185FA5;
  }

  .field-value.accent {
    color: #993C1D;
    font-weight: 600;
  }

  /* ── Stat Cards ─────────────────────────────────────── */
  .stat-cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 12px;
    margin-bottom: 22px;
  }

  .stat-cards-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    margin-bottom: 22px;
  }

  .stat-card {
    background: #f8f8f6;
    border-radius: 6px;
    padding: 12px;
  }

  .stat-card-label {
    font-size: 10px;
    color: #888;
  }

  .stat-card-value {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin-top: 3px;
  }

  .stat-card-value.accent { color: #993C1D; }
  .stat-card-value.green  { color: #0F6E56; }
  .stat-card-value.red    { color: #c0392b; }

  /* ── Tables ─────────────────────────────────────────── */
  .detail-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
    margin-bottom: 22px;
  }

  .detail-table th {
    text-align: left;
    padding: 8px 10px;
    font-weight: 500;
    color: #712B13;
    background: #FAECE7;
    border-bottom: 1px solid #F5C4B3;
    font-size: 10.5px;
  }

  .detail-table td {
    padding: 7px 10px;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
  }

  .detail-table td.center,
  .detail-table th.center { text-align: center; }

  .detail-table td.num,
  .detail-table th.num { text-align: right; }

  .detail-table td.muted { color: #999; }

  .detail-table tfoot td {
    font-weight: 700;
    border-top: 2px solid #ddd;
    background: #fafafa;
  }

  /* ── Two Column Layout ──────────────────────────────── */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 22px;
  }

  /* ── Amount Words ───────────────────────────────────── */
  .amount-words {
    font-size: 11px;
    font-style: italic;
    color: #333;
    margin-top: 6px;
    padding: 6px 0;
  }

  /* ── Footer ─────────────────────────────────────────── */
  .footer {
    border-top: 1px solid #eee;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: #aaa;
    margin-top: 16px;
  }

  /* ── Signature ──────────────────────────────────────── */
  .signature-section {
    display: flex;
    justify-content: space-between;
    padding: 36px 20px 8px;
    font-size: 11px;
    margin-top: 12px;
  }

  .signature-label {
    border-top: 1px solid #999;
    padding-top: 4px;
    font-weight: 600;
    text-align: center;
    min-width: 160px;
  }

  /* ── Progress Bar ───────────────────────────────────── */
  .progress-bar {
    height: 6px;
    border-radius: 3px;
    background: #f0f0f0;
    overflow: hidden;
    margin-bottom: 2px;
  }

  .progress-fill {
    height: 100%;
    border-radius: 3px;
  }

  .fill-green { background: #5DCAA5; }
  .fill-amber { background: #EF9F27; }
  .fill-red   { background: #E74C3C; }

  /* ── Utility ────────────────────────────────────────── */
  .text-right  { text-align: right; }
  .text-center { text-align: center; }
  .fw-bold     { font-weight: 700; }
  .text-accent { color: #993C1D; }
  .text-muted  { color: #888; }
  .mb-0        { margin-bottom: 0; }
`;
