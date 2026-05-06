import { GeneralLedgerEntry } from "./general-ledger-entry";

export const GENERAL_LEDGER_ENTRIES_SEED: GeneralLedgerEntry[] = [

  // ── JE-002 · Rent Expense Paid ──────────────────────────────────────────
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
    fiscalYearCode: 'FY25',
    fiscalYearName: 'FY 2026-26',

    accountingPeriodId: 'apr-2026',
    accountingPeriodCode: 'APR',
    accountingPeriodName: 'April 2026',

    entryDate: '2026-04-02',
    postingDate: '2026-04-02',

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

    narration: 'Rent paid for April 2026',
    lineNarration: 'Rent expense debited',

    externalReferenceNumber: 'EXT-003',

    accountCodeSnapshot: 'RENT',
    accountNameSnapshot: 'Rent Expense Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-04-02T09:00:00',
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

    ledgerId: 'ledger-002',
    ledgerCode: 'LED02',
    ledgerName: 'Expense Ledger',

    accountId: 'acc-001',
    accountCode: 'CASH',
    accountName: 'Cash Account',

    fiscalYearId: 'fy-2026',
    fiscalYearCode: 'FY25',
    fiscalYearName: 'FY 2026-26',

    accountingPeriodId: 'apr-2026',
    accountingPeriodCode: 'APR',
    accountingPeriodName: 'April 2026',

    entryDate: '2026-04-02',
    postingDate: '2026-04-02',

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

    narration: 'Rent paid for April 2026',
    lineNarration: 'Cash credited for rent payment',

    externalReferenceNumber: 'EXT-004',

    accountCodeSnapshot: 'CASH',
    accountNameSnapshot: 'Cash Account',

    branchCodeSnapshot: 'BR01',
    branchNameSnapshot: 'Chennai',

    isReversal: false,

    createdAt: '2026-04-02T09:05:00',
    createdBy: 'admin',

    isDeleted: false
  },

  // ── JE-003 · Purchase of Office Supplies (Bank Payment) ─────────────────
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
    fiscalYearCode: 'FY25',
    fiscalYearName: 'FY 2026-26',

    accountingPeriodId: 'apr-2026',
    accountingPeriodCode: 'APR',
    accountingPeriodName: 'April 2026',

    entryDate: '2026-04-05',
    postingDate: '2026-04-05',

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

    createdAt: '2026-04-05T11:00:00',
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
    fiscalYearCode: 'FY25',
    fiscalYearName: 'FY 2026-26',

    accountingPeriodId: 'apr-2026',
    accountingPeriodCode: 'APR',
    accountingPeriodName: 'April 2026',

    entryDate: '2026-04-05',
    postingDate: '2026-04-05',

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

    createdAt: '2026-04-05T11:05:00',
    createdBy: 'admin',

    isDeleted: false
  },

  // ── JE-004 · Salary Expense ─────────────────────────────────────────────
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
    fiscalYearCode: 'FY25',
    fiscalYearName: 'FY 2026-26',

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
    fiscalYearCode: 'FY25',
    fiscalYearName: 'FY 2026-26',

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

  // ── JE-005 · Customer Receipt (Accounts Receivable cleared) ─────────────
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
    fiscalYearCode: 'FY25',
    fiscalYearName: 'FY 2026-26',

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

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-005',
    sourceDocumentNumber: 'JV-005',

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
    fiscalYearCode: 'FY25',
    fiscalYearName: 'FY 2026-26',

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

    sourceType: 'JournalEntry',
    sourceDocumentId: 'doc-005',
    sourceDocumentNumber: 'JV-005',

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

  // ── JE-006 · Petty Cash Replenishment ───────────────────────────────────
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
    fiscalYearCode: 'FY25',
    fiscalYearName: 'FY 2026-26',

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
    lineNarration: 'Petty cash account debited on replenishment',

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
    fiscalYearCode: 'FY25',
    fiscalYearName: 'FY 2026-26',

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
    lineNarration: 'Bank credited for petty cash replenishment',

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
];