// ── Company Info ─────────────────────────────────────────────
// Central configuration for company details shown on print templates.
// Update these values to match your actual company information.

export interface CompanyInfo {
  name: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  gstin: string;
  bankName: string;
  bankAccountNo: string;
  bankIfsc: string;
}

export const COMPANY_INFO: CompanyInfo = {
  name: 'THRONE RECLINERS & SOFAS',
  addressLine1: 'No 7/42A, Kalan Pannai St, Kattuvalavu,',
  addressLine2: 'Karumapuram, Salem, Tamil Nadu (TN-33) 636106, IN',
  phone: '+918883804379',
  gstin: '33AZHPJ5401A1Z4',
  bankName: 'Throne Recliners & Sofas',
  bankAccountNo: '120036001419',
  bankIfsc: 'CNRB0002397',
};
