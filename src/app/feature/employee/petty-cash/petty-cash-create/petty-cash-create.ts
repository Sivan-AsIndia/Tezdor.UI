import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PettyCashDataClient } from '../petty-cash-data-client';
import { ToastNotifier } from '../../../../core/services/toast';
import { ApprovalStatus, FinanceVerificationStatus, PettyCash, PettyCashFundType, PettyCashSourceDocumentType, PettyCashStatus, PettyCashTransactionType, PostingStatus, ReceiptVerificationStatus, ReconciliationStatus, ReplenishmentStatus } from '../petty-cash';
import { EmployeeDataClient } from '../../employee-data-client';
import { CommonModule } from '@angular/common';
import { MasterDataClient } from '../../../../core/services/master-data';
import { PettyCashLine } from '../petty-cash-line';

@Component({
  selector: 'app-petty-cash-create',
  imports: [RouterModule, CommonModule],
  templateUrl: './petty-cash-create.html',
  styleUrl: './petty-cash-create.css',
})
export class PettyCashCreateComponent {

  private readonly service = inject(PettyCashDataClient);
  private readonly router = inject(Router);
  private readonly employeeService = inject(EmployeeDataClient);
  private readonly toast = inject(ToastNotifier);
  private readonly route = inject(ActivatedRoute);
  private readonly master = inject(MasterDataClient);

  id = this.route.snapshot.paramMap.get('id');
  isEditMode = signal(false);

  // ================= INIT =================
  constructor() {
    if (this.id) {
      this.isEditMode.set(true);

      const data = this.service.getById(this.id);

      if (data) {
        this.form.set({ ...data });

        const existingLines = this.service.getLines(this.id)();
        this.lines.set(existingLines);
      }
    }
  }

  // ===== TABS =====
  tabs = ['general', 'advanced', 'ownership', 'expense'];
  activeTab = signal('general');



  // ================= LINES =================
  lines = signal<PettyCashLine[]>([]);


  branches = this.master.branches;
  departments = this.master.departments;
  costCenters = this.master.costCenters;

  projects = this.master.projects;

  expenseCategories = this.master.expenseCategories;

  expenseLedgerAccounts = this.master.expenseLedgerAccount;

  taxCodes = this.master.taxCodes;

  currencies = this.master.currencies;

  fiscalYears = this.master.fiscalYears;

  accountingPeriods = this.master.accountingPeriods;




  addLine() {
    this.lines.update(list => [
      ...list,
      {
        pettyCashLineId: crypto.randomUUID(),
        pettyCashId: this.id ?? this.form().pettyCashId,

        createdAt: new Date().toISOString(),
        createdByUserId: 'SYSTEM',
        isDeleted: false
      }
    ]);
  }

  updateLine(index: number, field: keyof PettyCashLine, value: any) {

    this.lines.update(list => {
      const updated = [...list];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

  }

  removeLine(index: number) {
    this.lines.update(list => list.filter((_, i) => i !== index));
  }

  getLineNet(l: PettyCashLine) {
    return (
      (l.disbursedAmount || 0)
      + (l.replenishmentAmount || 0)
      - (l.expenseAmount || 0)
      - (l.returnedAmount || 0)
    );
  }

  // ================= TOTAL / CLOSING =================
  closingBalance = computed(() => {

    const f = this.form();
    const lines = this.lines();

    const totalReplenishment = lines.reduce((s, l) => s + (l.replenishmentAmount || 0), 0);
    const totalExpense = lines.reduce((s, l) => s + (l.expenseAmount || 0), 0);
    const totalReturned = lines.reduce((s, l) => s + (l.returnedAmount || 0), 0);
    const totalDisbursed = lines.reduce((s, l) => s + (l.disbursedAmount || 0), 0);

    return (
      (f.openingCashBalance || 0)
      + totalReplenishment
      + totalDisbursed
      - totalExpense
      - totalReturned
    );
  });

  custodianError = computed(() => {

    const f = this.form();

    if (!f.custodianEmployeeId || !f.alternateCustodianEmployeeId)
      return false;

    return f.custodianEmployeeId === f.alternateCustodianEmployeeId;

  });

  isAutoDocument = computed(() => {
    const type = this.form().sourceDocumentType;

    return type && type !== 'ManualPettyCashEntry' && type !== 'Other';
  });
  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  isSubmitted = signal(false);


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


  transactionType = computed(() => this.form().pettyCashTransactionType);
  // ================= FORM =================
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

    effectiveFromDate: new Date().toLocaleDateString('en-CA'),
    effectiveToDate: '',

    branchId: '',
    departmentId: '',
    costCenterId: '',
    projectId: '',

    custodianEmployeeId: '',

    pettyCashTransactionType: PettyCashTransactionType.ExpenseRecording,
    transactionDate: '',
    fiscalYearId: '',
    accountingPeriodId: '',

    purposeTitle: '',

    currencyId: 'INR',
    exchangeRate: 1,

    openingCashBalance: 0,
    closingCashBalance: 0,

    taxApplicable: false,
    duplicateReceiptSuspected: false,
    taxCodeId: '',

    hasReceipt: false,

    receiptVerificationStatus: ReceiptVerificationStatus.NotRequired,

    approvalStatus: ApprovalStatus.Draft,
    financeVerificationStatus: FinanceVerificationStatus.NotStarted,
    postingStatus: PostingStatus.NotPosted,
    replenishmentStatus: ReplenishmentStatus.NotRequired,
    reconciliationStatus: ReconciliationStatus.NotRequired,

    pettyCashLedgerAccountId: '',

    isLocked: false,

    createdAt: '',
    createdByUserId: 'SYSTEM',
    isDeleted: false,
    rowVersion: '1'
  });

  // ================= UPDATE =================
  update(field: keyof PettyCash, value: any) {
    this.form.update(f => ({ ...f, [field]: value }));
  }

  // ================= VALIDATION =================

  markSubmitted() {
    this.isSubmitted.set(true);
  }
  dateError = computed(() => {

    const from = this.form().effectiveFromDate;
    const to = this.form().effectiveToDate;

    if (!from || !to) return false;

    return new Date(to) < new Date(from);

  });


  taxCodeError = computed(() => {

    const f = this.form();

    return (
      this.isSubmitted() &&
      f.taxApplicable === true &&
      (!f.taxCodeId || f.taxCodeId.trim() === '')
    );

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
  hasError(field: keyof PettyCash): boolean {
    const value = this.form()[field];
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    return false;
  }

  // ================= SAVE =================
  onSave() {
    const isDraft = this.form().pettyCashStatus === 'Draft';

    // 🔥 LINE VALIDATION
    if (!isDraft) {

      if (!this.lines() || this.lines().length === 0) {
        this.toast.error('At least one line is required');
        return;
      }

      if (!this.validateLines()) {
        this.toast.error('Line validation failed');
        return;
      }

    }
    this.markSubmitted();

    if (
      this.hasError('pettyCashName') ||
      this.hasError('custodianEmployeeId') ||
      this.hasError('effectiveFromDate')
    ) {
      this.toast.error('Fill required fields');
      return;
    }

    const data = {
      ...this.form(),
      closingCashBalance: this.closingBalance(),
      lines: this.lines()
    };

    if (this.isEditMode()) {

      this.service.update(this.form(), this.lines());
      this.toast.success('Updated successfully');

    } else {

      this.service.add(this.form(), this.lines());
      this.toast.success('Created successfully');

    }

    this.router.navigate(['/petty-cash']);
  }

  onCancel() {
    this.router.navigate(['/petty-cash']);
  }

  // ================= FORMAT =================
  formatAmount(val?: number) {
    return (val ?? 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2
    });
  }



  deriveFiscal(dateStr: string) {

    if (!dateStr) return;

    const date = new Date(dateStr);

    // ===== FIND FISCAL YEAR =====
    const fy = this.fiscalYears().find(f =>
      new Date(f.start) <= date && date <= new Date(f.end)
    );

    if (fy) {
      this.update('fiscalYearId', fy.id);
    }

    // ===== FIND ACCOUNTING PERIOD =====
    const period = this.accountingPeriods().find(p =>
      new Date(p.start) <= date && date <= new Date(p.end)
    );

    if (period) {
      this.update('accountingPeriodId', period.id);
    }
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
  onTransactionDateChange(date: string) {

    this.update('transactionDate', date);

    this.deriveFiscal(date);

  }

  getFiscalYearName(id: string) {
    return this.fiscalYears().find(f => f.id === id)?.name ?? '-';
  }

  getAccountingPeriodName(id: string) {
    return this.accountingPeriods().find(p => p.id === id)?.name ?? '-';
  }

  isCashIssue() {
    return this.transactionType() === PettyCashTransactionType.CashIssue;
  }

  isExpense() {
    return this.transactionType() === PettyCashTransactionType.ExpenseRecording;
  }

  isReimbursement() {
    return this.transactionType() === PettyCashTransactionType.EmployeeReimbursement;
  }

  isReturn() {
    return this.transactionType() === PettyCashTransactionType.CashReturn;
  }

  isReplenishment() {
    return this.transactionType() === PettyCashTransactionType.Replenishment;
  }

  showRequested() {
    return this.isCashIssue() || this.isExpense() || this.isReimbursement() || this.isReplenishment();
  }

  validateLines(): boolean {

    for (const l of this.lines()) {

      if (this.showRequested() && !l.requestedAmount) return false;

      if (this.isExpense() && !l.expenseAmount) return false;

      if (this.isReturn() && !l.returnedAmount) return false;

      if (this.isReplenishment() && !l.replenishmentAmount) return false;
    }

    return true;
  }
}