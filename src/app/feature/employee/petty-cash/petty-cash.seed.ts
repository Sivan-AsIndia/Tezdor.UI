import { ApprovalStatus, FinanceVerificationStatus, PettyCash, PettyCashFundType, PettyCashSourceDocumentType, PettyCashStatus, PettyCashTransactionType, PostingStatus, ReceiptVerificationStatus, ReconciliationStatus, ReplenishmentStatus } from "./petty-cash";

export const PETTY_CASH_SEED_FULL: PettyCash[] = [

  /* 1️⃣ FUND OPENING */
  {
    pettyCashId: 'PC1',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-001',
    pettyCashName: 'Head Office Fund',
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

    // expenseCategoryId: 'EXP1',
    // expenseLedgerAccountId: 'LED_EXP',

    taxApplicable: false,
    taxCodeId: 'GST0',

    vendorNameOnReceipt: '',
    receiptNumber: '',
    receiptDate: '2026-04-01',

    hasReceipt: false,
    receiptAttachmentId: 'ATT1',
    receiptFileCount: 0,

    missingReceiptReason: '',

    receiptVerificationStatus: ReceiptVerificationStatus.NotRequired,
    receiptVerifiedByUserId: 'FIN1',
    receiptVerifiedOn: '2026-04-01',

    duplicateReceiptSuspected: false,
    duplicateReceiptReferenceId: '',

    approvalStatus: ApprovalStatus.Approved,
    approvalWorkflowId: 'WF1',
    approvalInstanceId: 'INST1',

    submittedByUserId: 'EMP1',
    submittedOn: '2026-04-01',

    approvedByUserId: 'FIN1',
    approvedOn: '2026-04-01',

    rejectedByUserId: '',
    rejectedOn: '',
    rejectionReason: '',

    financeVerificationStatus: FinanceVerificationStatus.Verified,
    financeVerifiedByUserId: 'FIN1',
    financeVerifiedOn: '2026-04-01',
    financeVerificationRemarks: 'Valid',

    postingStatus: PostingStatus.Posted,
    postingProfileId: 'PP1',
    postingRuleId: 'PR1',

    pettyCashLedgerAccountId: 'LED_PC',
    bankAccountId: 'BANK1',

    journalId: 'J1',
    journalEntryId: 'JE1',

    postedByUserId: 'FIN1',
    postedOn: '2026-04-01',
    postingFailureReason: '',

    replenishmentStatus: ReplenishmentStatus.NotRequired,
    lastReplenishmentDate: '2026-04-01',
    lastReplenishmentAmount: 0,

    reconciliationStatus: ReconciliationStatus.Pending,
    systemCashBalance: 50000,
    physicalCashCount: 50000,
    cashDifferenceAmount: 0,

    differenceReason: '',

    reconciledByUserId: '',
    reconciledOn: '',

    isLocked: true,
    lockedByUserId: 'FIN1',
    lockedOn: '2026-04-01',

    cancellationReason: '',
    reversalReason: '',
    closureReason: '',
    overrideReason: '',

    notes: 'Initial setup',
    internalFinanceRemarks: 'OK',
    attachmentCount: 1,

    createdAt: '2026-04-01',
    createdByUserId: 'ADMIN',

    updatedAt: '2026-04-01',
    updatedByUserId: 'ADMIN',

    deletedAt: '',
    deletedByUserId: '',

    isDeleted: false,
    rowVersion: '1'
  },

  /* 2️⃣ EXPENSE VERIFIED */
  {
    pettyCashId: 'PC2',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-002',
    pettyCashName: 'Stationery Expense',
    pettyCashStatus: PettyCashStatus.Posted,

    pettyCashMode: 'Imprest',
    fundType: PettyCashFundType.DepartmentFund,

    floatLimitAmount: 20000,
    minimumThresholdAmount: 2000,

    effectiveFromDate: '2026-04-02',

    branchId: 'B1',
    departmentId: 'D2',

    custodianEmployeeId: 'EMP002',

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

    duplicateReceiptSuspected: false,

    approvalStatus: ApprovalStatus.Approved,
    financeVerificationStatus: FinanceVerificationStatus.Verified,
    postingStatus: PostingStatus.Posted,

    pettyCashLedgerAccountId: 'LED_PC',

    replenishmentStatus: ReplenishmentStatus.Required,
    reconciliationStatus: ReconciliationStatus.Pending,

    isLocked: true,
    createdAt: '2026-04-02',
    createdByUserId: 'EMP1',
    isDeleted: false,
    rowVersion: '1'
  },

  /* 3️⃣ DUPLICATE RECEIPT */
  {
    pettyCashId: 'PC3',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-003',
    pettyCashName: 'Duplicate Receipt Test',
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
    duplicateReceiptReferenceId: 'PC2',

    approvalStatus: ApprovalStatus.Rejected,
    rejectionReason: 'Duplicate',

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

  /* 4️⃣ MISSING RECEIPT */
  {
    pettyCashId: 'PC4',
    tenantId: 'T1',
    companyId: 'C1',
    pettyCashCode: 'PC-004',
    pettyCashName: 'No Receipt Expense',
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
    purposeTitle: 'Parking',

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

    replenishmentStatus: ReplenishmentStatus.NotRequired,
    reconciliationStatus: ReconciliationStatus.Pending,

    isLocked: true,
    createdAt: '2026-04-04',
    createdByUserId: 'EMP4',
    isDeleted: false,
    rowVersion: '1'
  },


];