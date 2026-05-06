
export interface PettyCash {

  // ===== Core Identity =====
  pettyCashId: string;
  tenantId: string;
  companyId: string;

  pettyCashCode: string;
  pettyCashName: string;

pettyCashStatus: PettyCashStatus;

  // ===== Fund Details =====
  pettyCashMode: 'Imprest' | 'NonImprest';

fundType: PettyCashFundType;

  floatLimitAmount: number;
  minimumThresholdAmount?: number;

  effectiveFromDate: string;
  effectiveToDate?: string;

  // ===== Organization =====
  branchId: string;
  departmentId?: string;
  costCenterId?: string;
  projectId?: string;

  custodianEmployeeId: string;
  alternateCustodianEmployeeId?: string;
  financeOwnerUserId?: string;

  // ===== Transaction =====
pettyCashTransactionType: PettyCashTransactionType;

  transactionDate: string;
  fiscalYearId: string;
  accountingPeriodId: string;

  purposeTitle: string;
  purposeDescription?: string;

sourceDocumentType?: PettyCashSourceDocumentType;

  sourceDocumentId?: string;
  sourceDocumentNumber?: string;

  // ===== Currency & Amount =====
  currencyId: string;
  exchangeRateId?: string;
  exchangeRate: number;

  openingCashBalance: number;

  requestedAmount?: number;
  approvedAmount?: number;
  disbursedAmount?: number;

  expenseAmount?: number;
  taxAmount?: number;

  returnedAmount?: number;
  replenishmentAmount?: number;

  closingCashBalance: number;

  // ===== Expense =====
  expenseCategoryId?: string;
  expenseLedgerAccountId?: string;

  taxApplicable: boolean;
  taxCodeId?: string;

  vendorNameOnReceipt?: string;
  receiptNumber?: string;
  receiptDate?: string;

  // ===== Receipt =====
  hasReceipt: boolean;
  receiptAttachmentId?: string;
  receiptFileCount?: number;

  missingReceiptReason?: string;

  receiptVerificationStatus:ReceiptVerificationStatus;

  receiptVerifiedByUserId?: string;
  receiptVerifiedOn?: string;

  duplicateReceiptSuspected: boolean;
  duplicateReceiptReferenceId?: string;

  // ===== Approval =====
approvalStatus: ApprovalStatus;

  approvalWorkflowId?: string;
  approvalInstanceId?: string;

  submittedByUserId?: string;
  submittedOn?: string;

  approvedByUserId?: string;
  approvedOn?: string;

  rejectedByUserId?: string;
  rejectedOn?: string;
  rejectionReason?: string;

  // ===== Finance Verification =====
financeVerificationStatus: FinanceVerificationStatus;

  financeVerifiedByUserId?: string;
  financeVerifiedOn?: string;
  financeVerificationRemarks?: string;

  // ===== Posting =====
postingStatus: PostingStatus;

  postingProfileId?: string;
  postingRuleId?: string;

  pettyCashLedgerAccountId: string;
  bankAccountId?: string;

  journalId?: string;
  journalEntryId?: string;

  postedByUserId?: string;
  postedOn?: string;
  postingFailureReason?: string;

  // ===== Replenishment =====
replenishmentStatus: ReplenishmentStatus;

  lastReplenishmentDate?: string;
  lastReplenishmentAmount?: number;

  // ===== Reconciliation =====
reconciliationStatus: ReconciliationStatus;

  systemCashBalance?: number;
  physicalCashCount?: number;
  cashDifferenceAmount?: number;

  differenceReason?: string;

  reconciledByUserId?: string;
  reconciledOn?: string;

  // ===== Governance =====
  isLocked: boolean;

  lockedByUserId?: string;
  lockedOn?: string;

  cancellationReason?: string;
  reversalReason?: string;
  closureReason?: string;
  overrideReason?: string;

  // ===== Notes =====
  notes?: string;
  internalFinanceRemarks?: string;
  attachmentCount?: number;

  // ===== Audit =====
  createdAt: string;
  createdByUserId: string;

  updatedAt?: string;
  updatedByUserId?: string;

  deletedAt?: string;
  deletedByUserId?: string;

  isDeleted: boolean;
  rowVersion: string;
}

export enum PettyCashStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  UnderReview = 'UnderReview',
  Approved = 'Approved',
  CashIssued = 'CashIssued',
  ExpenseRecorded = 'ExpenseRecorded',
  ReceiptPending = 'ReceiptPending',
  FinanceVerified = 'FinanceVerified',
  Posted = 'Posted',
  ReplenishmentPending = 'ReplenishmentPending',
  Replenished = 'Replenished',
  ReconciliationPending = 'ReconciliationPending',
  Reconciled = 'Reconciled',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled',
  Reversed = 'Reversed',
  Closed = 'Closed'
}


export enum ApprovalStatus {
  NotRequired = 'NotRequired',
  Draft = 'Draft',
  Submitted = 'Submitted',
  UnderReview = 'UnderReview',
  Approved = 'Approved',
  PartiallyApproved = 'PartiallyApproved',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled'
}

export enum ReceiptVerificationStatus {
  NotRequired = 'NotRequired',
  Pending = 'Pending',
  Verified = 'Verified',
  Rejected = 'Rejected',
  DuplicateSuspected = 'DuplicateSuspected',
  MissingReceiptApproved = 'MissingReceiptApproved'
}

export enum FinanceVerificationStatus {
  NotStarted = 'NotStarted',
  Pending = 'Pending',
  Verified = 'Verified',
  Rejected = 'Rejected',
  OnHold = 'OnHold',
  ExceptionApproved = 'ExceptionApproved'
}

export enum PostingStatus {
  NotPosted = 'NotPosted',
  ReadyToPost = 'ReadyToPost',
  Posted = 'Posted',
  PostingFailed = 'PostingFailed',
  Reversed = 'Reversed',
  Cancelled = 'Cancelled'
}

export enum ReplenishmentStatus {
  NotRequired = 'NotRequired',
  Required = 'Required',
  Requested = 'Requested',
  Approved = 'Approved',
  Processed = 'Processed',
  Rejected = 'Rejected'
}

export enum ReconciliationStatus {
  NotRequired = 'NotRequired',
  Pending = 'Pending',
  Matched = 'Matched',
  ShortageFound = 'ShortageFound',
  ExcessFound = 'ExcessFound',
  Adjusted = 'Adjusted',
  Closed = 'Closed'
}

export enum PettyCashFundType {
  BranchFund = 'BranchFund',
  DepartmentFund = 'DepartmentFund',
  ProjectFund = 'ProjectFund',
  EventFund = 'EventFund',
  TravelFund = 'TravelFund',
  TemporaryFund = 'TemporaryFund',
  EmergencyFund = 'EmergencyFund'
}

export enum PettyCashTransactionType {
  FundOpening = 'FundOpening',
  CashIssue = 'CashIssue',
  ExpenseRecording = 'ExpenseRecording',
  EmployeeReimbursement = 'EmployeeReimbursement',
  CashAdvance = 'CashAdvance',
  CashReturn = 'CashReturn',
  Replenishment = 'Replenishment',
  ShortageAdjustment = 'ShortageAdjustment',
  ExcessAdjustment = 'ExcessAdjustment',
  CustodianTransfer = 'CustodianTransfer',
  Closure = 'Closure'
}

export enum PettyCashSourceDocumentType {
  ManualPettyCashEntry = 'ManualPettyCashEntry',
  EmployeeClaim = 'EmployeeClaim',
  ExpenseVoucher = 'ExpenseVoucher',
  CashAdvanceRequest = 'CashAdvanceRequest',
  ReplenishmentRequest = 'ReplenishmentRequest',
  ReconciliationAdjustment = 'ReconciliationAdjustment',
  Other = 'Other'
}