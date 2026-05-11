import { GeneralLedgerEntry } from "./general-ledger-entry";

export const GENERAL_LEDGER_ENTRIES_SEED: GeneralLedgerEntry[] = [

  // ────────────────────────────────────────────────────────────────────
  // JE-001 · Cash Sales Revenue
  // ────────────────────────────────────────────────────────────────────
  {
    id: '11111111-0001-0000-0000-000000000001',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-001',
    ledgerCode: 'LED01',
    ledgerName: 'Cash Ledger',

    accountId: 'acc-001',
    accountCode: 'CASH',
    accountName: 'Cash Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'jan-2026',
    accountingPeriodCode: 'JAN',
    accountingPeriodName: 'January 2026',

    entryDate: '2026-01-10',
    postingDate: '2026-01-10',

    postingSequenceNumber: 1,

    debitAmount: 35000,
    creditAmount: 0,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-001',
    sourceDocumentNumber: 'JV-001',

    journalEntryId: 'je-001',
    journalEntryNumber: 'JE-001',

    journalLineId: 'jl-001',
    journalLineNumber: 1,

    narration: 'Cash sales for January 2026',
    lineNarration: 'Cash received from sales',

    externalReferenceNumber: 'EXT-001',

    accountCodeSnapshot: 'CASH',
    accountNameSnapshot: 'Cash Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-01-10T10:00:00',
    createdBy: 'admin',

    isDeleted: false
  },
  {
    id: '11111111-0002-0000-0000-000000000002',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-006',
    ledgerCode: 'LED06',
    ledgerName: 'Revenue Ledger',

    accountId: 'acc-009',
    accountCode: 'SALES',
    accountName: 'Sales Revenue Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'jan-2026',
    accountingPeriodCode: 'JAN',
    accountingPeriodName: 'January 2026',

    entryDate: '2026-01-10',
    postingDate: '2026-01-10',

    postingSequenceNumber: 2,

    debitAmount: 0,
    creditAmount: 35000,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-001',
    sourceDocumentNumber: 'JV-001',

    journalEntryId: 'je-001',
    journalEntryNumber: 'JE-001',

    journalLineId: 'jl-002',
    journalLineNumber: 2,

    narration: 'Cash sales for January 2026',
    lineNarration: 'Sales revenue credited',

    externalReferenceNumber: 'EXT-002',

    accountCodeSnapshot: 'SALES',
    accountNameSnapshot: 'Sales Revenue Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-01-10T10:05:00',
    createdBy: 'admin',

    isDeleted: false
  },

  // ────────────────────────────────────────────────────────────────────
  // JE-002 · Rent Expense Paid
  // ────────────────────────────────────────────────────────────────────
  {
    id: '11111111-0003-0000-0000-000000000003',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-002',
    ledgerCode: 'LED02',
    ledgerName: 'Expense Ledger',

    accountId: 'acc-003',
    accountCode: 'RENT',
    accountName: 'Rent Expense Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'feb-2026',
    accountingPeriodCode: 'FEB',
    accountingPeriodName: 'February 2026',

    entryDate: '2026-02-05',
    postingDate: '2026-02-05',

    postingSequenceNumber: 3,

    debitAmount: 25000,
    creditAmount: 0,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-002',
    sourceDocumentNumber: 'JV-002',

    journalEntryId: 'je-002',
    journalEntryNumber: 'JE-002',

    journalLineId: 'jl-003',
    journalLineNumber: 1,

    narration: 'Rent paid for February 2026',
    lineNarration: 'Rent expense debited',

    externalReferenceNumber: 'EXT-003',

    accountCodeSnapshot: 'RENT',
    accountNameSnapshot: 'Rent Expense Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-02-05T09:00:00',
    createdBy: 'admin',

    isDeleted: false
  },
  {
    id: '11111111-0004-0000-0000-000000000004',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-003',
    ledgerCode: 'LED03',
    ledgerName: 'Bank Ledger',

    accountId: 'acc-005',
    accountCode: 'BANK',
    accountName: 'Bank Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'feb-2026',
    accountingPeriodCode: 'FEB',
    accountingPeriodName: 'February 2026',

    entryDate: '2026-02-05',
    postingDate: '2026-02-05',

    postingSequenceNumber: 4,

    debitAmount: 0,
    creditAmount: 25000,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-002',
    sourceDocumentNumber: 'JV-002',

    journalEntryId: 'je-002',
    journalEntryNumber: 'JE-002',

    journalLineId: 'jl-004',
    journalLineNumber: 2,

    narration: 'Rent paid for February 2026',
    lineNarration: 'Bank credited for rent payment',

    externalReferenceNumber: 'EXT-004',

    accountCodeSnapshot: 'BANK',
    accountNameSnapshot: 'Bank Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-02-05T09:05:00',
    createdBy: 'admin',

    isDeleted: false
  },

  // ────────────────────────────────────────────────────────────────────
  // JE-003 · Office Supplies Purchase
  // ────────────────────────────────────────────────────────────────────
  {
    id: '11111111-0005-0000-0000-000000000005',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-002',
    ledgerCode: 'LED02',
    ledgerName: 'Expense Ledger',

    accountId: 'acc-004',
    accountCode: 'OFFSUP',
    accountName: 'Office Supplies Expense',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'mar-2026',
    accountingPeriodCode: 'MAR',
    accountingPeriodName: 'March 2026',

    entryDate: '2026-03-12',
    postingDate: '2026-03-12',

    postingSequenceNumber: 5,

    debitAmount: 8500,
    creditAmount: 0,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-003',
    sourceDocumentNumber: 'JV-003',

    journalEntryId: 'je-003',
    journalEntryNumber: 'JE-003',

    journalLineId: 'jl-005',
    journalLineNumber: 1,

    narration: 'Office supplies purchased via bank',
    lineNarration: 'Supplies expense debited',

    externalReferenceNumber: 'EXT-005',

    accountCodeSnapshot: 'OFFSUP',
    accountNameSnapshot: 'Office Supplies Expense',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-03-12T11:00:00',
    createdBy: 'admin',

    isDeleted: false
  },
  {
    id: '11111111-0006-0000-0000-000000000006',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-003',
    ledgerCode: 'LED03',
    ledgerName: 'Bank Ledger',

    accountId: 'acc-005',
    accountCode: 'BANK',
    accountName: 'Bank Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'mar-2026',
    accountingPeriodCode: 'MAR',
    accountingPeriodName: 'March 2026',

    entryDate: '2026-03-12',
    postingDate: '2026-03-12',

    postingSequenceNumber: 6,

    debitAmount: 0,
    creditAmount: 8500,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-003',
    sourceDocumentNumber: 'JV-003',

    journalEntryId: 'je-003',
    journalEntryNumber: 'JE-003',

    journalLineId: 'jl-006',
    journalLineNumber: 2,

    narration: 'Office supplies purchased via bank',
    lineNarration: 'Bank credited for supplies payment',

    externalReferenceNumber: 'EXT-006',

    accountCodeSnapshot: 'BANK',
    accountNameSnapshot: 'Bank Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-03-12T11:05:00',
    createdBy: 'admin',

    isDeleted: false
  },

  // ────────────────────────────────────────────────────────────────────
  // JE-004 · Salary Expense
  // ────────────────────────────────────────────────────────────────────
  {
    id: '11111111-0007-0000-0000-000000000007',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-002',
    ledgerCode: 'LED02',
    ledgerName: 'Expense Ledger',

    accountId: 'acc-006',
    accountCode: 'SAL',
    accountName: 'Salary Expense Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'apr-2026',
    accountingPeriodCode: 'APR',
    accountingPeriodName: 'April 2026',

    entryDate: '2026-04-30',
    postingDate: '2026-04-30',

    postingSequenceNumber: 7,

    debitAmount: 150000,
    creditAmount: 0,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-004',
    sourceDocumentNumber: 'JV-004',

    journalEntryId: 'je-004',
    journalEntryNumber: 'JE-004',

    journalLineId: 'jl-007',
    journalLineNumber: 1,

    narration: 'Salary paid for April 2026',
    lineNarration: 'Salary expense debited',

    externalReferenceNumber: 'EXT-007',

    accountCodeSnapshot: 'SAL',
    accountNameSnapshot: 'Salary Expense Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-04-30T18:00:00',
    createdBy: 'admin',

    isDeleted: false
  },
  {
    id: '11111111-0008-0000-0000-000000000008',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-003',
    ledgerCode: 'LED03',
    ledgerName: 'Bank Ledger',

    accountId: 'acc-005',
    accountCode: 'BANK',
    accountName: 'Bank Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'apr-2026',
    accountingPeriodCode: 'APR',
    accountingPeriodName: 'April 2026',

    entryDate: '2026-04-30',
    postingDate: '2026-04-30',

    postingSequenceNumber: 8,

    debitAmount: 0,
    creditAmount: 150000,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-004',
    sourceDocumentNumber: 'JV-004',

    journalEntryId: 'je-004',
    journalEntryNumber: 'JE-004',

    journalLineId: 'jl-008',
    journalLineNumber: 2,

    narration: 'Salary paid for April 2026',
    lineNarration: 'Bank credited for salary disbursement',

    externalReferenceNumber: 'EXT-008',

    accountCodeSnapshot: 'BANK',
    accountNameSnapshot: 'Bank Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-04-30T18:05:00',
    createdBy: 'admin',

    isDeleted: false
  },

  // ────────────────────────────────────────────────────────────────────
  // JE-005 · Customer Receipt (AR Cleared)
  // ────────────────────────────────────────────────────────────────────
  {
    id: '11111111-0009-0000-0000-000000000009',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-003',
    ledgerCode: 'LED03',
    ledgerName: 'Bank Ledger',

    accountId: 'acc-005',
    accountCode: 'BANK',
    accountName: 'Bank Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'may-2026',
    accountingPeriodCode: 'MAY',
    accountingPeriodName: 'May 2026',

    entryDate: '2026-05-03',
    postingDate: '2026-05-03',

    postingSequenceNumber: 9,

    debitAmount: 50000,
    creditAmount: 0,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'CustomerPayment',
    sourceDocumentId: 'doc-005',
    sourceDocumentNumber: 'CP-001',

    journalEntryId: 'je-005',
    journalEntryNumber: 'JE-005',

    journalLineId: 'jl-009',
    journalLineNumber: 1,

    narration: 'Receipt from customer XYZ Traders',
    lineNarration: 'Bank debited on customer receipt',

    externalReferenceNumber: 'EXT-009',

    accountCodeSnapshot: 'BANK',
    accountNameSnapshot: 'Bank Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-05-03T10:00:00',
    createdBy: 'admin',

    isDeleted: false
  },
  {
    id: '11111111-0010-0000-0000-000000000010',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-004',
    ledgerCode: 'LED04',
    ledgerName: 'Receivables Ledger',

    accountId: 'acc-007',
    accountCode: 'AR',
    accountName: 'Accounts Receivable',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'may-2026',
    accountingPeriodCode: 'MAY',
    accountingPeriodName: 'May 2026',

    entryDate: '2026-05-03',
    postingDate: '2026-05-03',

    postingSequenceNumber: 10,

    debitAmount: 0,
    creditAmount: 50000,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'CustomerPayment',
    sourceDocumentId: 'doc-005',
    sourceDocumentNumber: 'CP-001',

    journalEntryId: 'je-005',
    journalEntryNumber: 'JE-005',

    journalLineId: 'jl-010',
    journalLineNumber: 2,

    narration: 'Receipt from customer XYZ Traders',
    lineNarration: 'AR cleared on receipt',

    externalReferenceNumber: 'EXT-010',

    accountCodeSnapshot: 'AR',
    accountNameSnapshot: 'Accounts Receivable',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-05-03T10:05:00',
    createdBy: 'admin',

    isDeleted: false
  },

  // ────────────────────────────────────────────────────────────────────
  // JE-006 · Petty Cash Replenishment
  // ────────────────────────────────────────────────────────────────────
  {
    id: '11111111-0011-0000-0000-000000000011',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-005',
    ledgerCode: 'LED05',
    ledgerName: 'Petty Cash Ledger',

    accountId: 'acc-008',
    accountCode: 'PC',
    accountName: 'Petty Cash Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'may-2026',
    accountingPeriodCode: 'MAY',
    accountingPeriodName: 'May 2026',

    entryDate: '2026-05-10',
    postingDate: '2026-05-10',

    postingSequenceNumber: 11,

    debitAmount: 9000,
    creditAmount: 0,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'PettyCash',
    sourceDocumentId: 'doc-006',
    sourceDocumentNumber: 'PC-2026-0001',

    journalEntryId: 'je-006',
    journalEntryNumber: 'JE-006',

    journalLineId: 'jl-011',
    journalLineNumber: 1,

    narration: 'Petty cash replenishment - May 2026',
    lineNarration: 'Petty cash account debited',

    externalReferenceNumber: 'EXT-011',

    accountCodeSnapshot: 'PC',
    accountNameSnapshot: 'Petty Cash Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-05-10T14:00:00',
    createdBy: 'admin',

    isDeleted: false
  },
  {
    id: '11111111-0012-0000-0000-000000000012',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-003',
    ledgerCode: 'LED03',
    ledgerName: 'Bank Ledger',

    accountId: 'acc-005',
    accountCode: 'BANK',
    accountName: 'Bank Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'may-2026',
    accountingPeriodCode: 'MAY',
    accountingPeriodName: 'May 2026',

    entryDate: '2026-05-10',
    postingDate: '2026-05-10',

    postingSequenceNumber: 12,

    debitAmount: 0,
    creditAmount: 9000,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'PettyCash',
    sourceDocumentId: 'doc-006',
    sourceDocumentNumber: 'PC-2026-0001',

    journalEntryId: 'je-006',
    journalEntryNumber: 'JE-006',

    journalLineId: 'jl-012',
    journalLineNumber: 2,

    narration: 'Petty cash replenishment - May 2026',
    lineNarration: 'Bank credited for replenishment',

    externalReferenceNumber: 'EXT-012',

    accountCodeSnapshot: 'BANK',
    accountNameSnapshot: 'Bank Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-05-10T14:05:00',
    createdBy: 'admin',

    isDeleted: false
  },

  // ────────────────────────────────────────────────────────────────────
  // JE-007 · Utility Expense - Electricity
  // ────────────────────────────────────────────────────────────────────
  {
    id: '11111111-0013-0000-0000-000000000013',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-002',
    ledgerCode: 'LED02',
    ledgerName: 'Expense Ledger',

    accountId: 'acc-010',
    accountCode: 'UTIL',
    accountName: 'Utilities Expense',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'jun-2026',
    accountingPeriodCode: 'JUN',
    accountingPeriodName: 'June 2026',

    entryDate: '2026-06-08',
    postingDate: '2026-06-08',

    postingSequenceNumber: 13,

    debitAmount: 12000,
    creditAmount: 0,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-007',
    sourceDocumentNumber: 'JV-007',

    journalEntryId: 'je-007',
    journalEntryNumber: 'JE-007',

    journalLineId: 'jl-013',
    journalLineNumber: 1,

    narration: 'Electricity bill for June 2026',
    lineNarration: 'Utility expense debited',

    externalReferenceNumber: 'EXT-013',

    accountCodeSnapshot: 'UTIL',
    accountNameSnapshot: 'Utilities Expense',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-06-08T16:00:00',
    createdBy: 'admin',

    isDeleted: false
  },
  {
    id: '11111111-0014-0000-0000-000000000014',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-003',
    ledgerCode: 'LED03',
    ledgerName: 'Bank Ledger',

    accountId: 'acc-005',
    accountCode: 'BANK',
    accountName: 'Bank Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'jun-2026',
    accountingPeriodCode: 'JUN',
    accountingPeriodName: 'June 2026',

    entryDate: '2026-06-08',
    postingDate: '2026-06-08',

    postingSequenceNumber: 14,

    debitAmount: 0,
    creditAmount: 12000,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-007',
    sourceDocumentNumber: 'JV-007',

    journalEntryId: 'je-007',
    journalEntryNumber: 'JE-007',

    journalLineId: 'jl-014',
    journalLineNumber: 2,

    narration: 'Electricity bill for June 2026',
    lineNarration: 'Bank credited for utility payment',

    externalReferenceNumber: 'EXT-014',

    accountCodeSnapshot: 'BANK',
    accountNameSnapshot: 'Bank Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-06-08T16:05:00',
    createdBy: 'admin',

    isDeleted: false
  },

  // ────────────────────────────────────────────────────────────────────
  // JE-008 · Insurance Premium
  // ────────────────────────────────────────────────────────────────────
  {
    id: '11111111-0015-0000-0000-000000000015',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-002',
    ledgerCode: 'LED02',
    ledgerName: 'Expense Ledger',

    accountId: 'acc-011',
    accountCode: 'INS',
    accountName: 'Insurance Expense',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'jul-2026',
    accountingPeriodCode: 'JUL',
    accountingPeriodName: 'July 2026',

    entryDate: '2026-07-15',
    postingDate: '2026-07-15',

    postingSequenceNumber: 15,

    debitAmount: 18000,
    creditAmount: 0,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-008',
    sourceDocumentNumber: 'JV-008',

    journalEntryId: 'je-008',
    journalEntryNumber: 'JE-008',

    journalLineId: 'jl-015',
    journalLineNumber: 1,

    narration: 'Quarterly insurance premium paid',
    lineNarration: 'Insurance expense debited',

    externalReferenceNumber: 'EXT-015',

    accountCodeSnapshot: 'INS',
    accountNameSnapshot: 'Insurance Expense',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-07-15T13:00:00',
    createdBy: 'admin',

    isDeleted: false
  },
  {
    id: '11111111-0016-0000-0000-000000000016',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-003',
    ledgerCode: 'LED03',
    ledgerName: 'Bank Ledger',

    accountId: 'acc-005',
    accountCode: 'BANK',
    accountName: 'Bank Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'jul-2026',
    accountingPeriodCode: 'JUL',
    accountingPeriodName: 'July 2026',

    entryDate: '2026-07-15',
    postingDate: '2026-07-15',

    postingSequenceNumber: 16,

    debitAmount: 0,
    creditAmount: 18000,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-008',
    sourceDocumentNumber: 'JV-008',

    journalEntryId: 'je-008',
    journalEntryNumber: 'JE-008',

    journalLineId: 'jl-016',
    journalLineNumber: 2,

    narration: 'Quarterly insurance premium paid',
    lineNarration: 'Bank credited for insurance payment',

    externalReferenceNumber: 'EXT-016',

    accountCodeSnapshot: 'BANK',
    accountNameSnapshot: 'Bank Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-07-15T13:05:00',
    createdBy: 'admin',

    isDeleted: false
  },

  // ────────────────────────────────────────────────────────────────────
  // JE-009 · Equipment Purchase
  // ────────────────────────────────────────────────────────────────────
  {
    id: '11111111-0017-0000-0000-000000000017',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-007',
    ledgerCode: 'LED07',
    ledgerName: 'Asset Ledger',

    accountId: 'acc-012',
    accountCode: 'EQUIP',
    accountName: 'Equipment Asset',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'aug-2026',
    accountingPeriodCode: 'AUG',
    accountingPeriodName: 'August 2026',

    entryDate: '2026-08-20',
    postingDate: '2026-08-20',

    postingSequenceNumber: 17,

    debitAmount: 75000,
    creditAmount: 0,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-009',
    sourceDocumentNumber: 'JV-009',

    journalEntryId: 'je-009',
    journalEntryNumber: 'JE-009',

    journalLineId: 'jl-017',
    journalLineNumber: 1,

    narration: 'Purchase of office equipment',
    lineNarration: 'Equipment asset debited',

    externalReferenceNumber: 'EXT-017',

    accountCodeSnapshot: 'EQUIP',
    accountNameSnapshot: 'Equipment Asset',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-08-20T11:00:00',
    createdBy: 'admin',

    isDeleted: false
  },
  {
    id: '11111111-0018-0000-0000-000000000018',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-003',
    ledgerCode: 'LED03',
    ledgerName: 'Bank Ledger',

    accountId: 'acc-005',
    accountCode: 'BANK',
    accountName: 'Bank Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'aug-2026',
    accountingPeriodCode: 'AUG',
    accountingPeriodName: 'August 2026',

    entryDate: '2026-08-20',
    postingDate: '2026-08-20',

    postingSequenceNumber: 18,

    debitAmount: 0,
    creditAmount: 75000,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-009',
    sourceDocumentNumber: 'JV-009',

    journalEntryId: 'je-009',
    journalEntryNumber: 'JE-009',

    journalLineId: 'jl-018',
    journalLineNumber: 2,

    narration: 'Purchase of office equipment',
    lineNarration: 'Bank credited for equipment purchase',

    externalReferenceNumber: 'EXT-018',

    accountCodeSnapshot: 'BANK',
    accountNameSnapshot: 'Bank Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-08-20T11:05:00',
    createdBy: 'admin',

    isDeleted: false
  },

  // ────────────────────────────────────────────────────────────────────
  // JE-010 · Vendor Payment (AP Cleared)
  // ────────────────────────────────────────────────────────────────────
  {
    id: '11111111-0019-0000-0000-000000000019',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-008',
    ledgerCode: 'LED08',
    ledgerName: 'Payables Ledger',

    accountId: 'acc-013',
    accountCode: 'AP',
    accountName: 'Accounts Payable',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'sep-2026',
    accountingPeriodCode: 'SEP',
    accountingPeriodName: 'September 2026',

    entryDate: '2026-09-12',
    postingDate: '2026-09-12',

    postingSequenceNumber: 19,

    debitAmount: 42000,
    creditAmount: 0,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'VendorPayment',
    sourceDocumentId: 'doc-010',
    sourceDocumentNumber: 'VP-001',

    journalEntryId: 'je-010',
    journalEntryNumber: 'JE-010',

    journalLineId: 'jl-019',
    journalLineNumber: 1,

    narration: 'Payment to vendor ABC Supplies',
    lineNarration: 'AP cleared on payment',

    externalReferenceNumber: 'EXT-019',

    accountCodeSnapshot: 'AP',
    accountNameSnapshot: 'Accounts Payable',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-09-12T15:00:00',
    createdBy: 'admin',

    isDeleted: false
  },
  {
    id: '11111111-0020-0000-0000-000000000020',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-003',
    ledgerCode: 'LED03',
    ledgerName: 'Bank Ledger',

    accountId: 'acc-005',
    accountCode: 'BANK',
    accountName: 'Bank Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'sep-2026',
    accountingPeriodCode: 'SEP',
    accountingPeriodName: 'September 2026',

    entryDate: '2026-09-12',
    postingDate: '2026-09-12',

    postingSequenceNumber: 20,

    debitAmount: 0,
    creditAmount: 42000,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'VendorPayment',
    sourceDocumentId: 'doc-010',
    sourceDocumentNumber: 'VP-001',

    journalEntryId: 'je-010',
    journalEntryNumber: 'JE-010',

    journalLineId: 'jl-020',
    journalLineNumber: 2,

    narration: 'Payment to vendor ABC Supplies',
    lineNarration: 'Bank credited for vendor payment',

    externalReferenceNumber: 'EXT-020',

    accountCodeSnapshot: 'BANK',
    accountNameSnapshot: 'Bank Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-09-12T15:05:00',
    createdBy: 'admin',

    isDeleted: false
  },

  // ────────────────────────────────────────────────────────────────────
  // JE-011 · Depreciation Expense
  // ────────────────────────────────────────────────────────────────────
  {
    id: '11111111-0021-0000-0000-000000000021',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-002',
    ledgerCode: 'LED02',
    ledgerName: 'Expense Ledger',

    accountId: 'acc-014',
    accountCode: 'DEPR',
    accountName: 'Depreciation Expense',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'oct-2026',
    accountingPeriodCode: 'OCT',
    accountingPeriodName: 'October 2026',

    entryDate: '2026-10-31',
    postingDate: '2026-10-31',

    postingSequenceNumber: 21,

    debitAmount: 6250,
    creditAmount: 0,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-011',
    sourceDocumentNumber: 'JV-011',

    journalEntryId: 'je-011',
    journalEntryNumber: 'JE-011',

    journalLineId: 'jl-021',
    journalLineNumber: 1,

    narration: 'Monthly depreciation on equipment',
    lineNarration: 'Depreciation expense debited',

    externalReferenceNumber: 'EXT-021',

    accountCodeSnapshot: 'DEPR',
    accountNameSnapshot: 'Depreciation Expense',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-10-31T23:00:00',
    createdBy: 'system',

    isDeleted: false
  },
  {
    id: '11111111-0022-0000-0000-000000000022',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-007',
    ledgerCode: 'LED07',
    ledgerName: 'Asset Ledger',

    accountId: 'acc-015',
    accountCode: 'ACCDEP',
    accountName: 'Accumulated Depreciation',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'oct-2026',
    accountingPeriodCode: 'OCT',
    accountingPeriodName: 'October 2026',

    entryDate: '2026-10-31',
    postingDate: '2026-10-31',

    postingSequenceNumber: 22,

    debitAmount: 0,
    creditAmount: 6250,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-011',
    sourceDocumentNumber: 'JV-011',

    journalEntryId: 'je-011',
    journalEntryNumber: 'JE-011',

    journalLineId: 'jl-022',
    journalLineNumber: 2,

    narration: 'Monthly depreciation on equipment',
    lineNarration: 'Accumulated depreciation credited',

    externalReferenceNumber: 'EXT-022',

    accountCodeSnapshot: 'ACCDEP',
    accountNameSnapshot: 'Accumulated Depreciation',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-10-31T23:05:00',
    createdBy: 'system',

    isDeleted: false
  },

  // ────────────────────────────────────────────────────────────────────
  // JE-012 · Interest Income from Bank
  // ────────────────────────────────────────────────────────────────────
  {
    id: '11111111-0023-0000-0000-000000000023',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-003',
    ledgerCode: 'LED03',
    ledgerName: 'Bank Ledger',

    accountId: 'acc-005',
    accountCode: 'BANK',
    accountName: 'Bank Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'nov-2026',
    accountingPeriodCode: 'NOV',
    accountingPeriodName: 'November 2026',

    entryDate: '2026-11-30',
    postingDate: '2026-11-30',

    postingSequenceNumber: 23,

    debitAmount: 3500,
    creditAmount: 0,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-012',
    sourceDocumentNumber: 'JV-012',

    journalEntryId: 'je-012',
    journalEntryNumber: 'JE-012',

    journalLineId: 'jl-023',
    journalLineNumber: 1,

    narration: 'Interest income earned on bank deposits',
    lineNarration: 'Bank account debited for interest',

    externalReferenceNumber: 'EXT-023',

    accountCodeSnapshot: 'BANK',
    accountNameSnapshot: 'Bank Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-11-30T20:00:00',
    createdBy: 'system',

    isDeleted: false
  },
  {
    id: '11111111-0024-0000-0000-000000000024',
    tenantId: '00000000-0000-0000-0000-000000000001',

    companyId: 'comp-001',
    companyCode: 'CMP01',
    companyName: 'ABC Pvt Ltd',

    branchId: 'branch-001',
    branchCode: 'BR01',
    branchName: 'Chennai',

    ledgerId: 'ledger-006',
    ledgerCode: 'LED06',
    ledgerName: 'Revenue Ledger',

    accountId: 'acc-016',
    accountCode: 'INTINC',
    accountName: 'Interest Income',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY26',
    fiscalYearName: 'FY 2026-27',

    accountingPeriodId: 'nov-2026',
    accountingPeriodCode: 'NOV',
    accountingPeriodName: 'November 2026',

    entryDate: '2026-11-30',
    postingDate: '2026-11-30',

    postingSequenceNumber: 24,

    debitAmount: 0,
    creditAmount: 3500,

    baseCurrencyId: 'cur-INR',
    baseCurrencyCode: 'INR',
    baseCurrencyName: 'Indian Rupee',

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-012',
    sourceDocumentNumber: 'JV-012',

    journalEntryId: 'je-012',
    journalEntryNumber: 'JE-012',

    journalLineId: 'jl-024',
    journalLineNumber: 2,

    narration: 'Interest income earned on bank deposits',
    lineNarration: 'Interest income credited',

    externalReferenceNumber: 'EXT-024',

    accountCodeSnapshot: 'INTINC',
    accountNameSnapshot: 'Interest Income',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-11-30T20:05:00',
    createdBy: 'system',

    isDeleted: false
  }
];
