// ── Core Print Module — Public API ───────────────────────────
// Re-exports all print-related services, templates, and utilities
// so consumers can import from a single path:
//   import { PrintService } from '../../core/print';

export { PrintService } from './print.service';
export { COMPANY_INFO } from './company-info';
export type { CompanyInfo } from './company-info';
export { buildPurchaseOrderPrintHtml } from './purchase-order-template';
export { buildPurchaseInvoicePrintHtml } from './purchase-invoice-template';
export { buildSalesInvoicePrintHtml } from './sales-invoice-template';
export { buildEmployeePrintHtml } from './employee-template';
export { buildProductPrintHtml } from './product-template';
export { buildSalaryPrintHtml } from './salary-template';
export { buildPettyCashPrintHtml } from './petty-cash-template';
export { buildGeneralLedgerPrintHtml } from './general-ledger-template';
export { amountToWords, formatIndianNumber, formatPrintDate } from './number-to-words';
export { PROFILE_PRINT_CSS } from './profile-print-styles';
