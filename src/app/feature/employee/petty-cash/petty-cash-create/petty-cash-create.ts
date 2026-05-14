import { afterNextRender, ChangeDetectorRef, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PettyCashDataClient } from '../petty-cash-data-client';
import { ToastNotifier } from '../../../../core/services/toast';
import { ApprovalStatus, FinanceVerificationStatus, PettyCash, PettyCashFundType, PettyCashStatus, PettyCashTransactionType, PostingStatus, ReceiptAttachment, ReceiptAttachmentFile, ReceiptVerificationStatus, ReconciliationStatus, ReplenishmentStatus } from '../petty-cash';
import { EmployeeDataClient } from '../../employee-data-client';
import { CommonModule } from '@angular/common';
import { MasterDataClient } from '../../../../core/services/master-data';
import { PettyCashLine } from '../petty-cash-line';
import { SearchDropdownComponent } from "../../../../shared/components/search-dropdown/search-dropdown";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Editor,
  NgxEditorModule,
  Toolbar
} from 'ngx-editor';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-petty-cash-create',
  imports: [RouterModule, CommonModule, SearchDropdownComponent,NgxEditorModule,ReactiveFormsModule,MatDatepickerModule],
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
editor!: Editor;   

readonly editorForm = new FormGroup({

  missingReceiptReason:
    new FormControl('')

});

readonly toolbar: Toolbar = [

  ['bold', 'italic', 'underline'],

  ['strike'],

  ['code', 'blockquote'],

  [
    {
      heading: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6'
      ]
    }
  ],

  ['ordered_list', 'bullet_list'],

  ['link', 'image'],

  ['text_color', 'background_color'],

  ['horizontal_rule'],

  ['undo', 'redo']

];

  id = this.route.snapshot.paramMap.get('id');
  isEditMode = signal(false);

  private readonly cdr =
  inject(ChangeDetectorRef);

showEditor =
  signal(false);

  // ================= INIT =================


constructor() {
  afterNextRender(() => {
    requestAnimationFrame(() => {
      this.editor = new Editor();   // init here first

      // subscribe AFTER editor is created
      this.editorForm.controls['missingReceiptReason']
        .valueChanges.subscribe(value => {
          this.update('missingReceiptReason', value || '');
        });

      this.showEditor.set(true);
      this.cdr.detectChanges();
    });
  });

    if (this.id) {
      this.isEditMode.set(true);

      const data = this.service.getById(this.id);

      if (data) {
        this.form.set({ ...data });

        const existingLines = this.service.getLines(this.id)();
        this.lines.set(existingLines);

        // ===== LOAD ATTACHMENT =====
const attachment =
  this.service
    .receiptAttachments()
    .find(x =>

      x.receiptAttachmentId ===
      data.receiptAttachmentId
    );

if (attachment) {

  this.receiptAttachment.set(
    attachment
  );

  this.uploadedFiles.set(
    attachment.files
  );
}
      }
    }

  this.editorForm.controls[
    'missingReceiptReason'
  ].valueChanges.subscribe(value => {

    this.update(
      'missingReceiptReason',
      value || ''
    );

  });
      effect(() => {

    const reason =
      this.form().missingReceiptReason;

    if (reason === undefined) {
      return;
    }

  });

  }

  // ===== TABS =====
  tabs = ['general', 'advanced', 'ownership', 'expense'];
  activeTab = signal('general');



  // ================= LINES =================
  lines = signal<PettyCashLine[]>([]);

  receiptAttachment =
    signal<ReceiptAttachment | null>(null);

  uploadedFiles =
    signal<ReceiptAttachmentFile[]>([]);


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

    //  LINE VALIDATION
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

  // ===== ATTACHMENT =====
  const attachment =
    this.receiptAttachment();

  // ===== SAVE =====
  if (this.isEditMode()) {

    this.service.update(
      data,
      this.lines(),
      attachment
    );

    this.toast.success(
      'Updated successfully'
    );

  } else {

    this.service.add(
      data,
      this.lines(),
      attachment
    );

    this.toast.success(
      'Created successfully'
    );
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




// FILE UPLOAD

onFileUpload(event: any) {

  const files =
    Array.from(
      event.target.files || []
    ) as File[];

  if (!files.length) return;

  // ===== VALID TYPES =====
  const allowedTypes = [

    'image/jpeg',
    'image/png',

    'application/pdf',

    'application/msword',

    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  // ===== EXISTING =====
  const existing =
    [...this.uploadedFiles()];

  // ===== LIMIT =====
  if (
    existing.length + files.length > 3
  ) {

    this.toast.error(
      'Maximum 3 files allowed'
    );

    event.target.value = '';

    return;
  }

  // ===== VALIDATE =====
  for (const file of files) {

    // TYPE
    if (
      !allowedTypes.includes(file.type)
    ) {

      this.toast.error(
        `${file.name} has invalid file type`
      );

      continue;
    }

    // SIZE
    if (
      file.size > 1024 * 1024
    ) {

      this.toast.error(
        `${file.name} exceeds 1 MB`
      );

      continue;
    }

    // ===== MAP =====
    const mapped: ReceiptAttachmentFile = {

      fileId:
        crypto.randomUUID(),

      fileName:
        file.name,

      originalFileName:
        file.name,

      fileExtension:
        '.' + file.name.split('.').pop(),

      mimeType:
        file.type,

      fileSizeInBytes:
        file.size,

      fileSizeLabel:
        this.formatFileSize(file.size),

      file,

      isDeleted: false
    };

    existing.push(mapped);
  }

  // ===== ATTACHMENT ID =====
  let attachmentId =
    this.form().receiptAttachmentId;

  if (!attachmentId) {

    attachmentId =
      crypto.randomUUID();
  }

  // ===== CREATE BATCH =====
  const attachment: ReceiptAttachment = {

    receiptAttachmentId:
      attachmentId,

    pettyCashId:
      this.form().pettyCashId ?? '',

    files: existing,

    fileCount:
      existing.length,

    totalSizeInBytes:
      existing.reduce(
        (sum, x) =>
          sum + x.fileSizeInBytes,
        0
      ),

    uploadedAt:
      new Date().toISOString()
  };

  // ===== UPDATE SIGNAL =====
  this.receiptAttachment.set(
    attachment
  );

  this.uploadedFiles.set(
    existing
  );

  // ===== UPDATE FORM =====
  this.update(
    'receiptAttachmentId',
    attachment.receiptAttachmentId
  );

  this.update(
    'receiptFileCount',
    existing.length
  );

  // RESET
  event.target.value = '';
}

// =========================================================
// REMOVE FILE
// =========================================================

removeFile(index: number) {

  const updated =
    [...this.uploadedFiles()];

  updated.splice(index, 1);

  this.uploadedFiles.set(
    updated
  );

  // ===== UPDATE ATTACHMENT =====
  const current =
    this.receiptAttachment();

  if (current) {

    this.receiptAttachment.set({

      ...current,

      files: updated,

      fileCount:
        updated.length,

      totalSizeInBytes:
        updated.reduce(
          (sum, x) =>
            sum + x.fileSizeInBytes,
          0
        )
    });
  }

  // ===== UPDATE FORM =====
  this.update(
    'receiptFileCount',
    updated.length
  );

  // ===== CLEAR =====
  if (!updated.length) {

    this.receiptAttachment.set(
      null
    );

    this.update(
      'receiptAttachmentId',
      null
    );
  }
}

// =========================================================
// FORMAT FILE SIZE
// =========================================================

formatFileSize(bytes: number) {

  if (bytes < 1024) {

    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {

    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

  // -------- Drop down items --------------//

departmentDropdownItems = computed(() =>

  this.departments()

    .filter(x => !!x.id)

    .map(x => ({

      id: x.id!,

      name: x.name

    }))
);

branchDropdownItems = computed(() =>

  this.branches()

    .filter(x => !!x.branchId)

    .map(x => ({

      id: x.branchId!,

      name: x.branchName

    }))
);

employeeDropdownItems = computed(() =>

  this.employees()

    .filter(x => !!x.employeeId)

    .map(x => ({

      id: x.employeeId!,

      name:
        `${x.firstName} ${x.lastName}`

    }))
);

transactionTypeDropdownItems = computed(() =>

  this.transactionTypes.map(x => ({

    id: x,

    name: x

  }))
);

expenseLedgerDropdownItems = computed(() =>

  this.expenseLedgerAccounts()

    .filter(x => !!x.accountId)

    .map(x => ({

      id: x.accountId!,

      name: x.accountName

    }))
);
}