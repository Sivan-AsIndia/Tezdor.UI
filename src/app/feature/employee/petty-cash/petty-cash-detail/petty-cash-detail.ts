import { Component, computed, inject, signal } from '@angular/core';
import { PettyCashDataClient } from '../petty-cash-data-client';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReconciliationStatus } from '../petty-cash';
import { ToastNotifier } from '../../../../core/services/toast';
import { MasterDataClient } from '../../../../core/services/master-data';
import { EmployeeDataClient } from '../../employee-data-client';
import { PrintService } from '../../../../core/print/print.service';

@Component({
  selector: 'app-petty-cash-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './petty-cash-detail.html',
  styleUrl: './petty-cash-detail.css',
})
export class PettyCashDetailComponent {

  private readonly service = inject(PettyCashDataClient);
  private readonly empService = inject(EmployeeDataClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastNotifier);
  private readonly master = inject(MasterDataClient);
  private readonly printService = inject(PrintService);

  // ===== GET ID =====
  id = this.route.snapshot.paramMap.get('id')!;

  // ===== DATA =====
  pettyCash = this.service.getPettyCash(this.id); // signal

  // EDITABLE LINES (IMPORTANT FIX)
  lines = signal(this.service.getLines(this.id)());

  editingIndex = signal<number | null>(null);

  reconciliationStatuses = ReconciliationStatus;

  showReasonModal = signal(false);
  reasonText = signal('');
  reasonError = signal(false);

  currentAction = signal<'reject' | 'cancel' | 'close' | 'reverse' | null>(null);
  currentId = signal<string | null>(null);

  employees = this.empService.employees;

  expenseCategories = this.master.expenseCategories;

  expenseLedgerAccounts = this.master.expenseLedgerAccount;

  // ===== HELPERS =====
  print() {
    const pc = this.pettyCash();
    if (pc) {
      this.printService.printPettyCash(
        pc,
        this.lines(),
        (id: string) => this.getEmployeeName(id)
      );
    }
  }

  formatAmount(val?: number) {
    return (val ?? 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2
    });
  }

  getStatusClass(status?: string) {
    if (!status) return 'bg-light text-dark';

    switch (status) {
      case 'Draft': return 'bg-light text-secondary';
      case 'Approved': return 'bg-light text-info';
      case 'Posted': return 'bg-light text-success';
      case 'Cancelled': return 'bg-light text-danger';
      default: return 'bg-light text-dark';
    }
  }

  // ===== TRANSACTION TYPE =====
  transactionType = computed(() => this.pettyCash()?.pettyCashTransactionType);

  isCashIssue() {
    return this.transactionType() === 'CashIssue';
  }

  isExpense() {
    return this.transactionType() === 'ExpenseRecording';
  }

  isReimbursement() {
    return this.transactionType() === 'EmployeeReimbursement';
  }

  isReturn() {
    return this.transactionType() === 'CashReturn';
  }

  isReplenishment() {
    return this.transactionType() === 'Replenishment';
  }

  showRequested() {
    return this.isCashIssue() || this.isExpense() || this.isReimbursement() || this.isReplenishment();
  }

  // ===== CALCULATIONS =====
  closingBalance = computed(() => {

    const pc = this.pettyCash();
    if (!pc) return 0;

    return this.lines().reduce((bal, l) =>
      bal
      + (l.disbursedAmount || 0)
      + (l.replenishmentAmount || 0)
      - (l.expenseAmount || 0)
      - (l.returnedAmount || 0),
      pc.openingCashBalance || 0
    );

  });

  // ===== TOTALS =====
  getTotalRequested() {
    return this.lines().reduce((s, l) => s + (l.requestedAmount || 0), 0);
  }

  getTotalApproved() {
    return this.lines().reduce((s, l) => s + (l.approvedAmount || 0), 0);
  }

  getTotalDisbursed() {
    return this.lines().reduce((s, l) => s + (l.disbursedAmount || 0), 0);
  }

  getTotalExpense() {
    return this.lines().reduce((s, l) => s + (l.expenseAmount || 0), 0);
  }

  getTotalTax() {
    return this.lines().reduce((s, l) => s + (l.taxAmount || 0), 0);
  }

  getTotalReturned() {
    return this.lines().reduce((s, l) => s + (l.returnedAmount || 0), 0);
  }

  getTotalReplenishment() {
    return this.lines().reduce((s, l) => s + (l.replenishmentAmount || 0), 0);
  }

  getLineNet(line: any): number {
    return (
      (line.disbursedAmount || 0)
      + (line.replenishmentAmount || 0)
      - (line.expenseAmount || 0)
      - (line.returnedAmount || 0)
    );
  }

  // ===== LINE OPS =====
  addLine() {
    this.lines.update(l => [
      ...l,
      {
        pettyCashLineId: crypto.randomUUID(),
        pettyCashId: this.id,
        requestedAmount: 0,
        approvedAmount: 0,
        disbursedAmount: 0,
        expenseAmount: 0,
        taxAmount: 0,
        returnedAmount: 0,
        replenishmentAmount: 0,
        createdAt: '',
        createdByUserId: '',
        isDeleted: false
      }
    ]);
  }

  removeLine(index: number) {
    this.lines.update(l => l.filter((_, i) => i !== index));
  }

  updateLine(index: number, field: string, value: number) {
    this.lines.update(lines =>
      lines.map((l, i) =>
        i === index ? { ...l, [field]: value } : l
      )
    );
  }

  // ===== ACTIONS =====
  post(id: string) {
    this.service.post(id);
    this.toast.success("Petty-Cash posted successfully");
  }

  reject(id: string, reason: string) {
    this.service.reject(id, reason);
    this.toast.success("Petty-Cash rejected successfully");
  }

  cancel(id: string, reason: string) {
    this.service.cancel(id, reason);
    this.toast.success("Petty-Cash cancelled successfully");
  }

  close(id: string, reason: string) {
    this.service.close(id, reason);
    this.toast.success("Petty-Cash closed successfully");
  }

  reverse(id: string, reason: string) {
    this.service.reverse(id, reason);
    this.toast.success("Petty-Cash reversed successfully");
  }

  submit(id: string) {
    this.service.submit(id);
    this.toast.success("Petty-Cash submitted successfully");
  }

  approve(id: string) {
    this.service.approve(id);
    this.toast.success("Petty-Cash approved successfully");
  }


  verifyReceipt(id: string) {
    this.service.verifyReceipt(id);
    this.toast.success("Receipt verified successfully");
  }

  reconcile(id: string) {
    this.service.reconcile(id, 5000);
    this.toast.success("Reconciliation completed");
  }


  requestReplenishment(id: string) {
    this.service.requestReplenishment(id);
  }

  startEdit(index: number) {
    this.editingIndex.set(index);
  }

  cancelEdit() {
    this.editingIndex.set(null);
  }

  isEditing(index: number) {
    return this.editingIndex() === index;
  }


  saveEdit(index: number) {

    const line = this.lines()[index];
    if (!line) return;

    // ===== VALIDATIONS =====
    if (this.showRequested() && (!line.requestedAmount || line.requestedAmount <= 0)) {
      this.toast.error('Requested amount is required');
      return;
    }

    if (this.isExpense() && (!line.expenseAmount || line.expenseAmount <= 0)) {
      this.toast.error('Expense amount is required');
      return;
    }

    if (this.isReturn() && (!line.returnedAmount || line.returnedAmount <= 0)) {
      this.toast.error('Returned amount is required');
      return;
    }

    if (this.isReplenishment() && (!line.replenishmentAmount || line.replenishmentAmount <= 0)) {
      this.toast.error('Replenishment amount is required');
      return;
    }

    if ((line.disbursedAmount || 0) > (line.approvedAmount || 0)) {
      this.toast.error('Disbursed cannot exceed approved');
      return;
    }

    // SAVE TO SERVICE (IMPORTANT FIX)
    this.service.updateLine(line);

    // EXIT EDIT MODE
    this.editingIndex.set(null);

    this.toast.success('Line updated successfully');
  }

  openReasonPopup(action: 'reject' | 'cancel' | 'close' | 'reverse', id: string) {
    this.currentAction.set(action);
    this.currentId.set(id);
    this.reasonText.set('');
    this.reasonError.set(false);
    this.showReasonModal.set(true);
  }

  closeModal() {
    this.showReasonModal.set(false);
  }

  confirmAction() {

    const reason = this.reasonText().trim();
    const id = this.currentId();
    const action = this.currentAction();

    if (!reason) {
      this.reasonError.set(true);
      return;
    }

    switch (action) {

      case 'reject':
        this.service.reject(id!, reason);
        this.toast.success('Rejected successfully');
        break;

      case 'cancel':
        this.service.cancel(id!, reason);
        this.toast.success('Cancelled successfully');
        break;

      case 'close':
        this.service.close(id!, reason);
        this.toast.success('Closed successfully');
        break;

      case 'reverse':
        this.service.reverse(id!, reason);
        this.toast.success('Reversed successfully');
        break;
    }

    this.closeModal();
  }

  getCategoryName(id?: string): string {
    return this.expenseCategories().find(c => c.id === id)?.name || '-';
  }

  getAccountName(id?: string): string {
    return this.expenseLedgerAccounts().find(a => a.accountId === id)?.accountName || '-';
  }

  employeeMap = computed(() => {
    const map: Record<string, any> = {};
    this.employees().forEach(e => {
      map[e.employeeId!] = e;
    });
    return map;
  });


  getEmployeeName(id: string): string {
    const emp = this.employeeMap()[id];
    return emp ? `${emp.firstName} ${emp.lastName}` : '—';
  }

}