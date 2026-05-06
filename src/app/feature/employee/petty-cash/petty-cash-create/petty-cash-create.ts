import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PettyCashDataClient } from '../petty-cash-data-client';
import { ToastNotifier } from '../../../../core/services/toast';
import { ApprovalStatus, FinanceVerificationStatus, PettyCash, PettyCashFundType, PettyCashSourceDocumentType, PettyCashStatus, PettyCashTransactionType, PostingStatus, ReceiptVerificationStatus, ReconciliationStatus, ReplenishmentStatus } from '../petty-cash';
import { EmployeeDataClient } from '../../employee-data-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-petty-cash-create',
  imports: [RouterModule,CommonModule],
  templateUrl: './petty-cash-create.html',
  styleUrl: './petty-cash-create.css',
})
export class PettyCashCreateComponent {

  private readonly service = inject(PettyCashDataClient);
  private readonly router = inject(Router);
  private readonly employeeService = inject(EmployeeDataClient);
    private readonly toast = inject(ToastNotifier);

  // ===== TABS =====
  tabs = ['general','advanced','ownership','expense'];
  activeTab = signal('general');

  custodianError = computed(() => {

  const f = this.form();

  if (!f.custodianEmployeeId || !f.alternateCustodianEmployeeId)
    return false;

  return f.custodianEmployeeId === f.alternateCustodianEmployeeId;

});

branches = signal([
  { branchId: 'B1', branchName: 'Head Office' },
  { branchId: 'B2', branchName: 'Chennai Branch' },
  { branchId: 'B3', branchName: 'Coimbatore Branch' },
  { branchId: 'B4', branchName: 'Madurai Branch' }
]);

departments = signal([
  { departmentId: 'D1', departmentName: 'Finance' },
  { departmentId: 'D2', departmentName: 'HR' },
  { departmentId: 'D3', departmentName: 'Operations' },
  { departmentId: 'D4', departmentName: 'Sales' }
]);

costCenters = signal([
  { costCenterId: 'CC1', costCenterName: 'Admin Cost Center' },
  { costCenterId: 'CC2', costCenterName: 'Project Cost Center' },
  { costCenterId: 'CC3', costCenterName: 'Branch Operations' }
]);

projects = signal([
  { projectId: 'P1', projectName: 'Construction Project' },
  { projectId: 'P2', projectName: 'IT Implementation' },
  { projectId: 'P3', projectName: 'Retail Expansion' }
]);

expenseCategories = signal([
  { id: 'EC1', name: 'Stationery' },
  { id: 'EC2', name: 'Courier' },
  { id: 'EC3', name: 'Transport' },
  { id: 'EC4', name: 'Refreshments' },
  { id: 'EC5', name: 'Parking' }
]);

ledgers = signal([
  { id: 'L1', name: 'Stationery Expense' },
  { id: 'L2', name: 'Courier Charges' },
  { id: 'L3', name: 'Travel Expense' }
]);

taxCodes = signal([
  { id: 'GST5', name: 'GST 5%' },
  { id: 'GST12', name: 'GST 12%' },
  { id: 'GST18', name: 'GST 18%' }
]);

isAutoDocument = computed(() => {
  const type = this.form().sourceDocumentType;

  return type && type !== 'ManualPettyCashEntry' && type !== 'Other';
});
  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  // ===== ENUMS =====
  statuses = Object.values(PettyCashStatus);
  fundTypes = Object.values(PettyCashFundType);
  transactionTypes = Object.values(PettyCashTransactionType);
  receiptStatuses = Object.values(ReceiptVerificationStatus);
financeStatuses = Object.values(FinanceVerificationStatus);
postingStatuses = Object.values(PostingStatus);
approvalStatuses = Object.values(ApprovalStatus);
reconciliationStatuses = Object.values(ReconciliationStatus);
replenishmentStatuses = Object.values(ReplenishmentStatus);
sourceDocumentTypes = [
  'ManualPettyCashEntry',
  'EmployeeClaim',
  'ExpenseVoucher',
  'CashAdvanceRequest',
  'ReplenishmentRequest',
  'ReconciliationAdjustment',
  'Other'
];
employees = this.employeeService.employees;

currencies = [
  { currencyId: 'INR', currencyCode: 'INR' },
  { currencyId: 'USD', currencyCode: 'USD' },
  { currencyId: 'EUR', currencyCode: 'EUR' }
];
  // ===== FORM =====
form = signal<PettyCash>({
  pettyCashId: '',
  tenantId: 'T1',
  companyId: 'C1',

  pettyCashCode: '',
  pettyCashName: '',
  pettyCashStatus: PettyCashStatus.Draft,

  pettyCashMode: 'Imprest',
  fundType: PettyCashFundType.BranchFund,

  floatLimitAmount: 0,
  minimumThresholdAmount: 0,
  effectiveFromDate: '',
  effectiveToDate: '',

  branchId: '',
  departmentId: '',
  costCenterId: '',
  projectId: '',

  custodianEmployeeId: '',
  alternateCustodianEmployeeId: '',
  financeOwnerUserId: '',

  pettyCashTransactionType: PettyCashTransactionType.ExpenseRecording,
  transactionDate: '',
  fiscalYearId: '',
  accountingPeriodId: '',

  purposeTitle: '',
  purposeDescription: '',

  sourceDocumentType: PettyCashSourceDocumentType.ManualPettyCashEntry,
  sourceDocumentId: '',
  sourceDocumentNumber: '',

  currencyId: 'INR',
  exchangeRateId: '',
  exchangeRate: 1,

  openingCashBalance: 0,
  requestedAmount: 0,
  approvedAmount: 0,
  disbursedAmount: 0,
  expenseAmount: 0,
  taxAmount: 0,
  returnedAmount: 0,
  replenishmentAmount: 0,
  closingCashBalance: 0,

  expenseCategoryId: '',
  expenseLedgerAccountId: '',

  taxApplicable: false,
  taxCodeId: '',

  vendorNameOnReceipt: '',
  receiptNumber: '',
  receiptDate: '',

  hasReceipt: false,
  receiptAttachmentId: '',
  receiptFileCount: 0,
  missingReceiptReason: '',

  receiptVerificationStatus: ReceiptVerificationStatus.NotRequired,
  receiptVerifiedByUserId: '',
  receiptVerifiedOn: '',
  duplicateReceiptSuspected: false,
  duplicateReceiptReferenceId: '',

  approvalStatus: ApprovalStatus.Draft,
  approvalWorkflowId: '',
  approvalInstanceId: '',
  submittedByUserId: '',
  submittedOn: '',
  approvedByUserId: '',
  approvedOn: '',
  rejectedByUserId: '',
  rejectedOn: '',
  rejectionReason: '',

  financeVerificationStatus: FinanceVerificationStatus.NotStarted,
  financeVerifiedByUserId: '',
  financeVerifiedOn: '',
  financeVerificationRemarks: '',

  postingStatus: PostingStatus.NotPosted,
  postingProfileId: '',
  postingRuleId: '',
  pettyCashLedgerAccountId: '',
  bankAccountId: '',
  journalId: '',
  journalEntryId: '',
  postedByUserId: '',
  postedOn: '',
  postingFailureReason: '',

  replenishmentStatus: ReplenishmentStatus.NotRequired,
  lastReplenishmentDate: '',
  lastReplenishmentAmount: 0,

  reconciliationStatus: ReconciliationStatus.NotRequired,
  systemCashBalance: 0,
  physicalCashCount: 0,
  cashDifferenceAmount: 0,
  differenceReason: '',
  reconciledByUserId: '',
  reconciledOn: '',

  isLocked: false,
  lockedByUserId: '',
  lockedOn: '',
  cancellationReason: '',
  reversalReason: '',
  closureReason: '',
  overrideReason: '',

  notes: '',
  internalFinanceRemarks: '',
  attachmentCount: 0,

  createdAt: new Date().toISOString(),
  createdByUserId: 'SYSTEM',
  updatedAt: '',
  updatedByUserId: '',
  deletedAt: '',
  deletedByUserId: '',
  isDeleted: false,
  rowVersion: '1'
});

dateError = computed(() => {

  const from = this.form().effectiveFromDate;
  const to = this.form().effectiveToDate;

  if (!from || !to) return false;

  return new Date(to) < new Date(from);

});

onCurrencyChange(currencyId: string) {

  this.update('currencyId', currencyId);

  if (currencyId === 'INR') {
    this.update('exchangeRate', 1);
  } else {
    // mock exchange rate
    this.update('exchangeRate', 83.25);
  }
}
closingBalance = computed(() => {

  const f = this.form();

  return (
    (f.openingCashBalance || 0)
    + (f.disbursedAmount || 0)
    + (f.replenishmentAmount || 0)
    - (f.expenseAmount || 0)
    - (f.returnedAmount || 0)
  );

});

  // ===== UPDATE =====
  update(field: keyof PettyCash, value: any) {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  // ===== SAVE =====

  onSave() {

  const f = this.form();

  if (!f.effectiveFromDate) {
    this.toast.error('Effective From is required');
    return;
  }

  if (this.dateError()) {
    this.toast.error('Effective To cannot be earlier than Effective From');
    return;
  }

  this.service.add(f);
    this.router.navigate(['/petty-cash']);

}

onCategoryChange(categoryId: string) {

  this.update('expenseCategoryId', categoryId);

  // simple mapping example
  const map: any = {
    EC1: 'L1',
    EC2: 'L2',
    EC3: 'L3'
  };

  this.update('expenseLedgerAccountId', map[categoryId] || '');
}

receiptDateError = computed(() => {

  const f = this.form();

  if (!f.receiptDate) return false;

  const receipt = new Date(f.receiptDate);
  const txn = new Date(f.transactionDate);
  const today = new Date();

  return receipt > today || receipt > txn;

});

onFileUpload(event: any) {

  const files = event.target.files;

  if (!files || files.length === 0) return;

  this.update('receiptFileCount', files.length);

  // mock attachment id
  this.update('receiptAttachmentId', crypto.randomUUID());

}

  onCancel() {
    this.router.navigate(['/petty-cash']);
  }
}