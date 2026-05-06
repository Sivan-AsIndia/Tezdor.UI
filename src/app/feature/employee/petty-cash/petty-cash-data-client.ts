import { Injectable, signal, computed } from '@angular/core';
import { ApprovalStatus, FinanceVerificationStatus, PettyCash, ReconciliationStatus, ReplenishmentStatus } from './petty-cash';

import {
  PettyCashStatus,
  PostingStatus
} from './petty-cash';
import { PETTY_CASH_SEED_FULL } from './petty-cash.seed';
import { PettyCashLine } from './petty-cash-line';
import { PETTY_CASH_LINE_SEED } from './petty-cash-line.seed';

@Injectable({
  providedIn: 'root'
})
export class PettyCashDataClient {


  // ===== STATE =====
  private readonly _list = signal<PettyCash[]>(PETTY_CASH_SEED_FULL);
  private readonly _lines = signal<PettyCashLine[]>(PETTY_CASH_LINE_SEED);

  // ===== READ =====
  list = this._list.asReadonly();
  lines = this._lines.asReadonly();

  total = computed(() => this._list().length);

  // ===== GET =====
  getById(id: string): PettyCash | undefined {
    return this._list().find(x => x.pettyCashId === id);
  }

  getPettyCash(id: string) {
    return computed<PettyCash | null>(() =>
      this._list().find(x => x.pettyCashId === id) ?? null
    );
  }

  getLines(pettyCashId: string) {
    return computed(() =>
      this._lines().filter(x => x.pettyCashId === pettyCashId)
    );
  }

  // ===== CALCULATE BALANCE (CORE LOGIC 🔥) =====
  calculateClosing(id: string): number {

    const pc = this.getById(id);
    if (!pc) return 0;

    const lines = this._lines().filter(x => x.pettyCashId === id);

    const totalReplenishment = lines.reduce((s, l) => s + (l.replenishmentAmount || 0), 0);
    const totalExpense = lines.reduce((s, l) => s + (l.expenseAmount || 0), 0);
    const totalReturned = lines.reduce((s, l) => s + (l.returnedAmount || 0), 0);
    const totalDisbursed = lines.reduce((s, l) => s + (l.disbursedAmount || 0), 0);

    return (
      (pc.openingCashBalance || 0)
      + totalReplenishment
      + totalDisbursed
      - totalExpense
      - totalReturned
    );
  }

  updateLine(updated: PettyCashLine) {

    const now = new Date().toISOString();

    this._lines.update(list =>
      list.map(l =>
        l.pettyCashLineId === updated.pettyCashLineId
          ? {
            ...l,
            ...updated,
            updatedAt: now,
            updatedByUserId: 'SYSTEM'
          }
          : l
      )
    );
  }

  // ===== ACTIONS =====

  submit(id: string) {
    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item =>
        item.pettyCashId === id && item.pettyCashStatus === PettyCashStatus.Draft
          ? {
            ...item,
            pettyCashStatus: PettyCashStatus.Submitted,
            approvalStatus: ApprovalStatus.Submitted,
            updatedAt: now,
            submittedByUserId: 'admin',
            submittedOn: now
          }
          : item
      )
    );
  }

  approve(id: string) {
    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item =>
        item.pettyCashId === id
          ? {
            ...item,
            approvalStatus: ApprovalStatus.Approved,
            pettyCashStatus: PettyCashStatus.Approved,
            approvedOn: now,
            approvedByUserId: 'SYSTEM',
            updatedAt: now,
          }
          : item
      )
    );
  }

  reject(id: string, reason: string) {

    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item =>
        item.pettyCashId === id
          ? {
            ...item,
            approvalStatus: ApprovalStatus.Rejected,
            pettyCashStatus: PettyCashStatus.Rejected,
            rejectionReason: reason,
            rejectedByUserId: 'admin',
            rejectedOn: now,
            updatedAt: now
          }
          : item
      )
    );
  }

  verifyReceipt(id: string) {
    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item =>
        item.pettyCashId === id
          ? {
            ...item,
            financeVerificationStatus: FinanceVerificationStatus.Verified,
            receiptVerifiedOn: now,
            receiptVerifiedByUserId: 'SYSTEM',
            updatedAt: now
          }
          : item
      )
    );
  }

  // ===== RECONCILIATION (UPDATED 🔥) =====
  reconcile(id: string, physicalCash?: number) {

    const now = new Date().toISOString();
    const systemBalance = this.calculateClosing(id);

    this._list.update(list =>
      list.map(item => {

        if (item.pettyCashId !== id) return item;

        if (physicalCash == null) {
          return { ...item, reconciliationStatus: ReconciliationStatus.Pending, updatedAt: now };
        }

        if (physicalCash === systemBalance) {
          return { ...item, reconciliationStatus: ReconciliationStatus.Matched, updatedAt: now };
        }

        if (physicalCash < systemBalance) {
          return {
            ...item,
            reconciliationStatus: ReconciliationStatus.ShortageFound,
            cashDifferenceAmount: systemBalance - physicalCash,
            updatedAt: now
          };
        }

        return {
          ...item,
          reconciliationStatus: ReconciliationStatus.ExcessFound,
          cashDifferenceAmount: physicalCash - systemBalance,
          updatedAt: now
        };

      })
    );
  }

  adjust(id: string) {

    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item =>
        item.pettyCashId === id &&
          (item.reconciliationStatus === ReconciliationStatus.ShortageFound ||
            item.reconciliationStatus === ReconciliationStatus.ExcessFound)
          ? { ...item, reconciliationStatus: ReconciliationStatus.Adjusted, updatedAt: now }
          : item
      )
    );
  }

  close(id: string, reason: string) {

    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item =>
        item.pettyCashId === id &&
          (item.reconciliationStatus === ReconciliationStatus.Matched ||
            item.reconciliationStatus === ReconciliationStatus.Adjusted)
          ? {
            ...item,
            pettyCashStatus: PettyCashStatus.Closed,
            reconciliationStatus: ReconciliationStatus.Closed,
            closureReason: reason,
            isLocked: true,
            updatedAt: now
          }
          : item
      )
    );
  }

  reverse(id: string, reason: string) {

    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item => {

        if (item.pettyCashId !== id) return item;

        if (item.postingStatus !== PostingStatus.Posted) return item;

        return {
          ...item,
          pettyCashStatus: PettyCashStatus.Reversed,
          postingStatus: PostingStatus.Reversed,
          reversalReason: reason,
          isLocked: false,
          updatedAt: now
        };

      })
    );
  }

  // ===== REPLENISHMENT  =====
  requestReplenishment(id: string) {

    const now = new Date().toISOString();

    const pc = this.getById(id);
    if (!pc) return;

    const closing = this.calculateClosing(id);

    const required = (pc.floatLimitAmount || 0) - closing;

    // create new line instead of updating header ❗
    this._lines.update(lines => [
      ...lines,
      {
        pettyCashLineId: crypto.randomUUID(),
        pettyCashId: id,
        replenishmentAmount: required > 0 ? required : 0,
        requestedAmount: required > 0 ? required : 0,
        approvedAmount: 0,
        disbursedAmount: 0,
        createdAt: now,
        createdByUserId: 'SYSTEM',
        isDeleted: false
      }
    ]);

    this._list.update(list =>
      list.map(item =>
        item.pettyCashId === id
          ? {
            ...item,
            replenishmentStatus: ReplenishmentStatus.Requested,
            updatedAt: now
          }
          : item
      )
    );
  }

  add(header: PettyCash, lines: PettyCashLine[]) {

    const now = new Date().toISOString();

    const newId = crypto.randomUUID();

    // ===== CREATE HEADER =====
    const newHeader: PettyCash = {
      ...header,

      pettyCashId: newId,
      pettyCashCode: `PC-${Date.now()}`,

      pettyCashStatus: PettyCashStatus.Draft,
      postingStatus: PostingStatus.NotPosted,

      createdAt: now,
      createdByUserId: 'SYSTEM',

      updatedAt: now,
      updatedByUserId: 'SYSTEM',

      isDeleted: false,
      rowVersion: '1'
    };

    // ===== CREATE LINES =====
    const newLines: PettyCashLine[] = lines.map(l => ({
      ...l,
      pettyCashLineId: crypto.randomUUID(),
      pettyCashId: newId,

      createdAt: now,
      createdByUserId: 'SYSTEM',
      isDeleted: false
    }));

    // ===== SAVE =====
    this._list.update(list => [...list, newHeader]);
    this._lines.update(existing => [...existing, ...newLines]);

  }

  update(header: PettyCash, lines: PettyCashLine[]) {

    const now = new Date().toISOString();

    // ===== UPDATE HEADER =====
    this._list.update(list =>
      list.map(item =>
        item.pettyCashId === header.pettyCashId
          ? {
            ...item,
            ...header,
            updatedAt: now,
            updatedByUserId: 'SYSTEM'
          }
          : item
      )
    );

    // ===== REPLACE LINES =====
    this._lines.update(existing => {
      const others = existing.filter(l => l.pettyCashId !== header.pettyCashId);

      const updatedLines = lines.map(l => ({
        ...l,
        pettyCashLineId: l.pettyCashLineId || crypto.randomUUID(),
        pettyCashId: header.pettyCashId,
        updatedAt: now,
        updatedByUserId: 'SYSTEM',
        isDeleted: false
      }));

      return [...others, ...updatedLines];
    });


  }

  delete(id: string) {

    // ===== DELETE HEADER =====
    this._list.update(list =>
      list.filter(item => item.pettyCashId !== id)
    );

    // ===== DELETE RELATED LINES =====
    this._lines.update(lines =>
      lines.filter(line => line.pettyCashId !== id)
    );

  }


  post(id: string) {

    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item => {

        if (item.pettyCashId !== id) return item;

        // already posted
        if (item.postingStatus === PostingStatus.Posted) return item;

        // must be approved
        if (item.approvalStatus !== ApprovalStatus.Approved) {
          console.warn('Cannot post without approval');
          return item;
        }

        return {
          ...item,
          postingStatus: PostingStatus.Posted,
          pettyCashStatus: PettyCashStatus.Posted,

          postedOn: now,
          postedByUserId: 'SYSTEM',

          isLocked: true,
          updatedAt: now
        };

      })
    );

  }

  cancel(id: string, reason: string) {

    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item => {

        if (item.pettyCashId !== id) return item;

        if (item.postingStatus === PostingStatus.Posted) {
          console.warn('Cannot cancel posted entry');
          return item;
        }

        return {
          ...item,
          pettyCashStatus: PettyCashStatus.Cancelled,
          approvalStatus: ApprovalStatus.Rejected,
          cancellationReason: reason,
          cancelledOn: now,
          cancelledByUserId: 'SYSTEM',
          isLocked: true,
          updatedAt: now
        };

      })
    );
  }

}