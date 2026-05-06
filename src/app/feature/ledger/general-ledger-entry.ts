export interface GeneralLedgerEntry {

  // Section 1: Core Identity & Ledger Context
  id: string;
  tenantId: string;

  companyId: string;
  companyCode?: string;
  companyName?: string;

  branchId: string;
  branchCode?: string;
  branchName?: string;

  ledgerId: string;
  ledgerCode?: string;
  ledgerName?: string;

  accountId: string;
  accountCode?: string;
  accountName?: string;

  // Section 2: Period & Date Context
  fiscalYearId: string;
  fiscalYearCode?: string;
  fiscalYearName?: string;

  accountingPeriodId: string;
  accountingPeriodCode?: string;
  accountingPeriodName?: string;

  entryDate: string;        // ISO date string
  postingDate: string;      // ISO date string

  postingSequenceNumber: number;

  // Section 3: Amounts
  debitAmount: number;
  creditAmount: number;

  baseCurrencyId: string;
  baseCurrencyCode?: string;
  baseCurrencyName?: string;

  // Section 4: Source Traceability
  sourceType: string;
  sourceDocumentId: string;
  sourceDocumentNumber?: string;

  journalEntryId?: string;
  journalEntryNumber?: string;

  journalLineId?: string;
  journalLineNumber?: number;

  // Section 5: Description & References
  narration?: string;
  lineNarration?: string;
  externalReferenceNumber?: string;

  // Section 6: Snapshot Fields
  accountCodeSnapshot: string;
  accountNameSnapshot: string;

  branchCodeSnapshot: string;
  branchNameSnapshot: string;

  // Section 7: Reversal & Correction
  isReversal: boolean;
  reversalGroupId?: string;
  reversesSourceDocumentId?: string;

  // Section 8: System Audit Fields
  createdAt: string;
  createdBy?: string;
  postingBatchId?: string;

  isDeleted: boolean;

  // Display Helpers (optional in UI)
  entryNo?: string;
  formattedDebit?: string;
  formattedCredit?: string;
  netAmount?: number;
}