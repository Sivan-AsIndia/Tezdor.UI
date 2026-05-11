import { ApprovalStatus, FinanceVerificationStatus, PettyCash, PettyCashFundType, PettyCashSourceDocumentType, PettyCashStatus, PettyCashTransactionType, PostingStatus, ReceiptVerificationStatus, ReconciliationStatus, ReplenishmentStatus } from "./petty-cash";

export const PETTY_CASH_SEED_FULL: PettyCash[] = [

  // ────────────────────────────────────────────────────────────────────
  // STATUS: Draft (2 records)
  // ────────────────────────────────────────────────────────────────────
  {
    pettyCashId: 'PC001',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-001',
    pettyCashName: 'Office Supplies - Draft',
    pettyCashStatus: PettyCashStatus.Draft,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.BranchFund,

    floatLimitAmount: 10000,
    minimumThresholdAmount: 1000,

    effectiveFromDate: '2026-01-15',

    branchId: 'B1',
    departmentId: 'D1',

    custodianEmployeeId: 'EMP001',

    pettyCashTransactionType: PettyCashTransactionType.ExpenseRecording,
    transactionDate: '2026-01-15',
    fiscalYearId: 'FY26',
    accountingPeriodId: 'JAN',
    expenseLedgerAccountId: 'acc-004',
    expenseCategoryId: 'EC1',

    purposeTitle: 'Stationery purchase',

    currencyId: 'INR',
    exchangeRate: 1,

    taxApplicable: false,
    openingCashBalance: 10000,
    closingCashBalance: 9500,

    hasReceipt: false,

    duplicateReceiptSuspected: false,
    receiptVerificationStatus: ReceiptVerificationStatus.NotRequired,

    approvalStatus: ApprovalStatus.Draft,
    financeVerificationStatus: FinanceVerificationStatus.NotStarted,
    postingStatus: PostingStatus.NotPosted,

    pettyCashLedgerAccountId: 'LED_PC',

    replenishmentStatus: ReplenishmentStatus.NotRequired,
    reconciliationStatus: ReconciliationStatus.Pending,

    isLocked: false,
    createdAt: '2026-01-15',
    createdByUserId: 'EMP1',
    isDeleted: false,
    rowVersion: '1'
  },
  {
    pettyCashId: 'PC002',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-002',
    pettyCashName: 'Travel Expense - Draft',
    pettyCashStatus: PettyCashStatus.Draft,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.TravelFund,

    floatLimitAmount: 15000,

    effectiveFromDate: '2026-02-10',

    branchId: 'B1',
    custodianEmployeeId: 'EMP002',
    duplicateReceiptSuspected: false,

    pettyCashTransactionType: PettyCashTransactionType.ExpenseRecording,
    transactionDate: '2026-02-10',
    fiscalYearId: 'FY26',
    accountingPeriodId: 'FEB',
    expenseLedgerAccountId: 'acc-004',
    expenseCategoryId: 'EC3',

    purposeTitle: 'Employee travel',

    currencyId: 'INR',
    exchangeRate: 1,

    taxApplicable: false,
    openingCashBalance: 15000,
    closingCashBalance: 14200,

    hasReceipt: false,

    receiptVerificationStatus: ReceiptVerificationStatus.NotRequired,
    approvalStatus: ApprovalStatus.Draft,
    financeVerificationStatus: FinanceVerificationStatus.NotStarted,
    postingStatus: PostingStatus.NotPosted,

    pettyCashLedgerAccountId: 'LED_PC',

    replenishmentStatus: ReplenishmentStatus.NotRequired,
    reconciliationStatus: ReconciliationStatus.Pending,

    isLocked: false,
    createdAt: '2026-02-10',
    createdByUserId: 'EMP2',
    isDeleted: false,
    rowVersion: '1'
  },

  // ────────────────────────────────────────────────────────────────────
  // STATUS: Submitted (2 records)
  // ────────────────────────────────────────────────────────────────────
  {
    pettyCashId: 'PC003',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-003',
    pettyCashName: 'Courier Charges - Submitted',
    pettyCashStatus: PettyCashStatus.Submitted,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.DepartmentFund,

    floatLimitAmount: 8000,

    effectiveFromDate: '2026-03-05',

    branchId: 'B1',
    departmentId: 'D2',

    custodianEmployeeId: 'EMP003',
    duplicateReceiptSuspected: false,

    pettyCashTransactionType: PettyCashTransactionType.ExpenseRecording,
    transactionDate: '2026-03-05',
    fiscalYearId: 'FY26',
    accountingPeriodId: 'MAR',
    expenseLedgerAccountId: 'acc-004',
    expenseCategoryId: 'EC2',

    purposeTitle: 'Document courier service',

    currencyId: 'INR',
    exchangeRate: 1,

    taxApplicable: false,
    openingCashBalance: 8000,
    closingCashBalance: 7600,

    hasReceipt: true,
    receiptNumber: 'CR-1001',
    receiptDate: '2026-03-05',

    receiptVerificationStatus: ReceiptVerificationStatus.Pending,
    approvalStatus: ApprovalStatus.Submitted,
    financeVerificationStatus: FinanceVerificationStatus.Pending,
    postingStatus: PostingStatus.NotPosted,

    pettyCashLedgerAccountId: 'LED_PC',

    submittedByUserId: 'EMP3',
    submittedOn: '2026-03-05',

    replenishmentStatus: ReplenishmentStatus.NotRequired,
    reconciliationStatus: ReconciliationStatus.Pending,

    isLocked: false,
    createdAt: '2026-03-05',
    createdByUserId: 'EMP3',
    isDeleted: false,
    rowVersion: '1'
  },
  {
    pettyCashId: 'PC004',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-004',
    pettyCashName: 'Refreshments - Submitted',
    pettyCashStatus: PettyCashStatus.Submitted,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.EventFund,

    floatLimitAmount: 12000,

    effectiveFromDate: '2026-04-12',

    branchId: 'B1',
    custodianEmployeeId: 'EMP004',
    duplicateReceiptSuspected: false,

    pettyCashTransactionType: PettyCashTransactionType.ExpenseRecording,
    transactionDate: '2026-04-12',
    fiscalYearId: 'FY26',
    accountingPeriodId: 'APR',
    expenseLedgerAccountId: 'acc-004',
    expenseCategoryId: 'EC5',

    purposeTitle: 'Meeting refreshments',

    currencyId: 'INR',
    exchangeRate: 1,

    taxApplicable: false,
    openingCashBalance: 12000,
    closingCashBalance: 11300,

    hasReceipt: true,
    receiptNumber: 'RF-2001',
    receiptDate: '2026-04-12',

    receiptVerificationStatus: ReceiptVerificationStatus.Pending,
    approvalStatus: ApprovalStatus.Submitted,
    financeVerificationStatus: FinanceVerificationStatus.Pending,
    postingStatus: PostingStatus.NotPosted,

    pettyCashLedgerAccountId: 'LED_PC',

    submittedByUserId: 'EMP4',
    submittedOn: '2026-04-12',

    replenishmentStatus: ReplenishmentStatus.NotRequired,
    reconciliationStatus: ReconciliationStatus.Pending,

    isLocked: false,
    createdAt: '2026-04-12',
    createdByUserId: 'EMP4',
    isDeleted: false,
    rowVersion: '1'
  },

  // ────────────────────────────────────────────────────────────────────
  // STATUS: Approved (2 records)
  // ────────────────────────────────────────────────────────────────────
  {
    pettyCashId: 'PC005',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-005',
    pettyCashName: 'Taxi Fare - Approved',
    pettyCashStatus: PettyCashStatus.Approved,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.TravelFund,

    floatLimitAmount: 20000,
    minimumThresholdAmount: 2000,

    effectiveFromDate: '2026-05-08',

    branchId: 'B1',

    custodianEmployeeId: 'EMP005',
    duplicateReceiptSuspected: false,

    pettyCashTransactionType: PettyCashTransactionType.ExpenseRecording,
    transactionDate: '2026-05-08',
    fiscalYearId: 'FY26',
    accountingPeriodId: 'MAY',
    expenseLedgerAccountId: 'acc-004',
    expenseCategoryId: 'EC3',

    purposeTitle: 'Client meeting transport',

    sourceDocumentType: PettyCashSourceDocumentType.ExpenseVoucher,

    currencyId: 'INR',
    exchangeRate: 1,

    taxApplicable: false,
    openingCashBalance: 20000,
    closingCashBalance: 19400,

    vendorNameOnReceipt: 'Fast Cabs',
    receiptNumber: 'TX-5001',
    receiptDate: '2026-05-08',

    hasReceipt: true,
    receiptAttachmentId: 'ATT5',
    receiptFileCount: 1,

    receiptVerificationStatus: ReceiptVerificationStatus.Verified,
    receiptVerifiedByUserId: 'FIN1',
    receiptVerifiedOn: '2026-05-09',

    approvalStatus: ApprovalStatus.Approved,
    approvedByUserId: 'MGR1',
    approvedOn: '2026-05-09',

    financeVerificationStatus: FinanceVerificationStatus.Verified,
    postingStatus: PostingStatus.ReadyToPost,

    pettyCashLedgerAccountId: 'LED_PC',

    replenishmentStatus: ReplenishmentStatus.NotRequired,
    reconciliationStatus: ReconciliationStatus.Pending,

    isLocked: false,
    createdAt: '2026-05-08',
    createdByUserId: 'EMP5',
    isDeleted: false,
    rowVersion: '1'
  },
  {
    pettyCashId: 'PC006',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-006',
    pettyCashName: 'Fund Opening - Head Office',
    pettyCashStatus: PettyCashStatus.Approved,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.BranchFund,

    floatLimitAmount: 50000,
    minimumThresholdAmount: 5000,

    effectiveFromDate: '2026-04-01',
    effectiveToDate: '2026-12-31',

    branchId: 'B1',
    departmentId: 'D1',
    costCenterId: 'CC1',
    projectId: 'P1',

    custodianEmployeeId: 'EMP001',
    alternateCustodianEmployeeId: 'EMP2',
    financeOwnerUserId: 'FIN1',
    duplicateReceiptSuspected: false,

    pettyCashTransactionType: PettyCashTransactionType.FundOpening,
    transactionDate: '2026-04-01',
    fiscalYearId: 'FY26',
    accountingPeriodId: 'APR',

    purposeTitle: 'Initial fund setup',
    purposeDescription: 'Opening balance allocation',

    sourceDocumentType: PettyCashSourceDocumentType.ManualPettyCashEntry,
    sourceDocumentId: 'DOC1',
    sourceDocumentNumber: 'DOC-001',

    currencyId: 'INR',
    exchangeRateId: 'EX1',
    exchangeRate: 1,

    openingCashBalance: 0,
    closingCashBalance: 50000,

    taxApplicable: false,
    taxCodeId: 'GST0',

    receiptDate: '2026-04-01',

    hasReceipt: false,
    receiptAttachmentId: 'ATT1',
    receiptFileCount: 0,

    receiptVerificationStatus: ReceiptVerificationStatus.NotRequired,
    receiptVerifiedByUserId: 'FIN1',
    receiptVerifiedOn: '2026-04-01',

    approvalStatus: ApprovalStatus.Approved,
    approvalWorkflowId: 'WF1',
    approvalInstanceId: 'INST1',

    submittedByUserId: 'EMP1',
    submittedOn: '2026-04-01',

    approvedByUserId: 'FIN1',
    approvedOn: '2026-04-01',

    financeVerificationStatus: FinanceVerificationStatus.Verified,
    financeVerifiedByUserId: 'FIN1',
    financeVerifiedOn: '2026-04-01',
    financeVerificationRemarks: 'Valid',

    postingStatus: PostingStatus.ReadyToPost,
    postingProfileId: 'PP1',
    postingRuleId: 'PR1',

    pettyCashLedgerAccountId: 'LED_PC',
    bankAccountId: 'BANK1',

    journalId: 'J1',
    journalEntryId: 'JE1',

    replenishmentStatus: ReplenishmentStatus.NotRequired,
    lastReplenishmentDate: '2026-04-01',
    lastReplenishmentAmount: 0,

    reconciliationStatus: ReconciliationStatus.Pending,
    systemCashBalance: 50000,
    physicalCashCount: 50000,
    cashDifferenceAmount: 0,

    notes: 'Initial setup',
    internalFinanceRemarks: 'OK',
    attachmentCount: 1,

    isLocked: false,

    createdAt: '2026-04-01',
    createdByUserId: 'ADMIN',

    updatedAt: '2026-04-01',
    updatedByUserId: 'ADMIN',

    isDeleted: false,
    rowVersion: '1'
  },

  // ────────────────────────────────────────────────────────────────────
  // STATUS: Posted (2 records)
  // ────────────────────────────────────────────────────────────────────
  {
    pettyCashId: 'PC007',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-007',
    pettyCashName: 'Stationery Expense - Posted',
    pettyCashStatus: PettyCashStatus.Posted,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.DepartmentFund,

    floatLimitAmount: 20000,
    minimumThresholdAmount: 2000,

    effectiveFromDate: '2026-04-02',

    branchId: 'B1',
    departmentId: 'D2',

    custodianEmployeeId: 'EMP002',
    duplicateReceiptSuspected: false,

    pettyCashTransactionType: PettyCashTransactionType.ExpenseRecording,
    transactionDate: '2026-04-02',
    fiscalYearId: 'FY26',
    accountingPeriodId: 'APR',

    purposeTitle: 'Stationery purchase',

    sourceDocumentType: PettyCashSourceDocumentType.ExpenseVoucher,

    currencyId: 'INR',
    exchangeRate: 1,

    openingCashBalance: 50000,
    closingCashBalance: 48800,

    expenseCategoryId: 'EC1',
    expenseLedgerAccountId: 'acc-004',

    taxApplicable: false,

    vendorNameOnReceipt: 'ABC Stores',
    receiptNumber: 'R1001',
    receiptDate: '2026-04-02',

    hasReceipt: true,
    receiptAttachmentId: 'ATT2',
    receiptFileCount: 1,

    receiptVerificationStatus: ReceiptVerificationStatus.Verified,
    receiptVerifiedByUserId: 'FIN1',
    receiptVerifiedOn: '2026-04-02',

    approvalStatus: ApprovalStatus.Approved,
    financeVerificationStatus: FinanceVerificationStatus.Verified,
    postingStatus: PostingStatus.Posted,

    pettyCashLedgerAccountId: 'LED_PC',

    postedByUserId: 'FIN1',
    postedOn: '2026-04-03',

    replenishmentStatus: ReplenishmentStatus.Required,
    reconciliationStatus: ReconciliationStatus.Pending,

    isLocked: true,
    createdAt: '2026-04-02',
    createdByUserId: 'EMP1',
    isDeleted: false,
    rowVersion: '1'
  },
  {
    pettyCashId: 'PC008',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-008',
    pettyCashName: 'Parking Fee - Posted',
    pettyCashStatus: PettyCashStatus.Posted,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.EventFund,

    floatLimitAmount: 10000,
    effectiveFromDate: '2026-04-04',

    branchId: 'B1',
    custodianEmployeeId: 'EMP004',
    duplicateReceiptSuspected: false,
    pettyCashTransactionType: PettyCashTransactionType.ExpenseRecording,
    transactionDate: '2026-04-04',
    fiscalYearId: 'FY26',
    accountingPeriodId: 'APR',
    expenseLedgerAccountId: 'acc-004',
    expenseCategoryId: 'EC5',
    purposeTitle: 'Parking charges',

    currencyId: 'INR',
    exchangeRate: 1,

    taxApplicable: false,
    openingCashBalance: 8000,
    closingCashBalance: 7700,

    hasReceipt: false,
    missingReceiptReason: 'Lost',

    receiptVerificationStatus: ReceiptVerificationStatus.MissingReceiptApproved,

    approvalStatus: ApprovalStatus.Approved,
    financeVerificationStatus: FinanceVerificationStatus.ExceptionApproved,
    postingStatus: PostingStatus.Posted,

    pettyCashLedgerAccountId: 'LED_PC',

    postedByUserId: 'FIN1',
    postedOn: '2026-04-05',

    replenishmentStatus: ReplenishmentStatus.NotRequired,
    reconciliationStatus: ReconciliationStatus.Pending,

    isLocked: true,
    createdAt: '2026-04-04',
    createdByUserId: 'EMP4',
    isDeleted: false,
    rowVersion: '1'
  },

  // ────────────────────────────────────────────────────────────────────
  // STATUS: Rejected (2 records)
  // ────────────────────────────────────────────────────────────────────
  {
    pettyCashId: 'PC009',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-009',
    pettyCashName: 'Duplicate Receipt - Rejected',
    pettyCashStatus: PettyCashStatus.Rejected,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.ProjectFund,

    floatLimitAmount: 15000,
    effectiveFromDate: '2026-04-03',

    branchId: 'B1',
    projectId: 'P2',

    custodianEmployeeId: 'EMP003',

    pettyCashTransactionType: PettyCashTransactionType.ExpenseRecording,
    expenseCategoryId: 'EC2',
    transactionDate: '2026-04-03',
    fiscalYearId: 'FY26',
    accountingPeriodId: 'APR',
    expenseLedgerAccountId: 'acc-004',

    purposeTitle: 'Duplicate claim',

    currencyId: 'INR',
    exchangeRate: 1,

    openingCashBalance: 10000,
    closingCashBalance: 9500,

    hasReceipt: true,
    receiptNumber: 'R1001',

    receiptVerificationStatus: ReceiptVerificationStatus.DuplicateSuspected,
    duplicateReceiptSuspected: true,
    duplicateReceiptReferenceId: 'PC007',

    approvalStatus: ApprovalStatus.Rejected,
    rejectionReason: 'Duplicate receipt detected',
    rejectedByUserId: 'MGR1',
    rejectedOn: '2026-04-04',

    financeVerificationStatus: FinanceVerificationStatus.Rejected,
    postingStatus: PostingStatus.NotPosted,

    pettyCashLedgerAccountId: 'LED_PC',

    taxApplicable: false,
    replenishmentStatus: ReplenishmentStatus.NotRequired,
    reconciliationStatus: ReconciliationStatus.Pending,

    isLocked: false,
    createdAt: '2026-04-03',
    createdByUserId: 'EMP3',
    isDeleted: false,
    rowVersion: '1'
  },
  {
    pettyCashId: 'PC010',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-010',
    pettyCashName: 'Invalid Expense - Rejected',
    pettyCashStatus: PettyCashStatus.Rejected,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.BranchFund,

    floatLimitAmount: 18000,
    effectiveFromDate: '2026-05-15',

    branchId: 'B1',

    custodianEmployeeId: 'EMP006',
    duplicateReceiptSuspected: false,

    pettyCashTransactionType: PettyCashTransactionType.ExpenseRecording,
    expenseCategoryId: 'EC4',
    transactionDate: '2026-05-15',
    fiscalYearId: 'FY26',
    accountingPeriodId: 'MAY',
    expenseLedgerAccountId: 'acc-004',

    purposeTitle: 'Personal expense',

    currencyId: 'INR',
    exchangeRate: 1,

    openingCashBalance: 18000,
    closingCashBalance: 17500,

    hasReceipt: true,
    receiptNumber: 'PER-001',

    receiptVerificationStatus: ReceiptVerificationStatus.Rejected,

    approvalStatus: ApprovalStatus.Rejected,
    rejectionReason: 'Not a valid business expense',
    rejectedByUserId: 'FIN1',
    rejectedOn: '2026-05-16',

    financeVerificationStatus: FinanceVerificationStatus.Rejected,
    postingStatus: PostingStatus.NotPosted,

    pettyCashLedgerAccountId: 'LED_PC',

    taxApplicable: false,
    replenishmentStatus: ReplenishmentStatus.NotRequired,
    reconciliationStatus: ReconciliationStatus.Pending,

    isLocked: false,
    createdAt: '2026-05-15',
    createdByUserId: 'EMP6',
    isDeleted: false,
    rowVersion: '1'
  },

  // ────────────────────────────────────────────────────────────────────
  // STATUS: Replenished (2 records)
  // ────────────────────────────────────────────────────────────────────
  {
    pettyCashId: 'PC011',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-011',
    pettyCashName: 'Branch Fund Replenishment',
    pettyCashStatus: PettyCashStatus.Replenished,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.BranchFund,

    floatLimitAmount: 30000,
    minimumThresholdAmount: 3000,

    effectiveFromDate: '2026-06-01',

    branchId: 'B1',
    custodianEmployeeId: 'EMP001',
    duplicateReceiptSuspected: false,

    pettyCashTransactionType: PettyCashTransactionType.Replenishment,
    transactionDate: '2026-06-01',
    fiscalYearId: 'FY26',
    accountingPeriodId: 'JUN',

    purposeTitle: 'Monthly replenishment',

    sourceDocumentType: PettyCashSourceDocumentType.ReplenishmentRequest,

    currencyId: 'INR',
    exchangeRate: 1,

    openingCashBalance: 2500,
    closingCashBalance: 30000,

    taxApplicable: false,

    hasReceipt: false,

    receiptVerificationStatus: ReceiptVerificationStatus.NotRequired,

    approvalStatus: ApprovalStatus.Approved,
    financeVerificationStatus: FinanceVerificationStatus.Verified,
    postingStatus: PostingStatus.Posted,

    pettyCashLedgerAccountId: 'LED_PC',
    bankAccountId: 'BANK1',

    replenishmentStatus: ReplenishmentStatus.Processed,
    lastReplenishmentDate: '2026-06-01',
    lastReplenishmentAmount: 27500,

    reconciliationStatus: ReconciliationStatus.Matched,
    systemCashBalance: 30000,
    physicalCashCount: 30000,
    cashDifferenceAmount: 0,

    isLocked: true,
    createdAt: '2026-06-01',
    createdByUserId: 'FIN1',
    isDeleted: false,
    rowVersion: '1'
  },
  {
    pettyCashId: 'PC012',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-012',
    pettyCashName: 'Department Fund Replenishment',
    pettyCashStatus: PettyCashStatus.Replenished,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.DepartmentFund,

    floatLimitAmount: 25000,
    minimumThresholdAmount: 2500,

    effectiveFromDate: '2026-06-10',

    branchId: 'B1',
    departmentId: 'D2',

    custodianEmployeeId: 'EMP002',
    duplicateReceiptSuspected: false,

    pettyCashTransactionType: PettyCashTransactionType.Replenishment,
    transactionDate: '2026-06-10',
    fiscalYearId: 'FY26',
    accountingPeriodId: 'JUN',

    purposeTitle: 'Monthly dept replenishment',

    sourceDocumentType: PettyCashSourceDocumentType.ReplenishmentRequest,

    currencyId: 'INR',
    exchangeRate: 1,

    openingCashBalance: 2000,
    closingCashBalance: 25000,

    taxApplicable: false,

    hasReceipt: false,

    receiptVerificationStatus: ReceiptVerificationStatus.NotRequired,

    approvalStatus: ApprovalStatus.Approved,
    financeVerificationStatus: FinanceVerificationStatus.Verified,
    postingStatus: PostingStatus.Posted,

    pettyCashLedgerAccountId: 'LED_PC',
    bankAccountId: 'BANK1',

    replenishmentStatus: ReplenishmentStatus.Processed,
    lastReplenishmentDate: '2026-06-10',
    lastReplenishmentAmount: 23000,

    reconciliationStatus: ReconciliationStatus.Matched,
    systemCashBalance: 25000,
    physicalCashCount: 25000,
    cashDifferenceAmount: 0,

    isLocked: true,
    createdAt: '2026-06-10',
    createdByUserId: 'FIN1',
    isDeleted: false,
    rowVersion: '1'
  }
];
