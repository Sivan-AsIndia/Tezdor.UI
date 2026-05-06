import { Injectable, signal, computed } from '@angular/core';
import { ApprovalStatus, FinanceVerificationStatus, PettyCash, ReconciliationStatus, ReplenishmentStatus } from './petty-cash';

import {
  PettyCashStatus,
  PostingStatus
} from './petty-cash';
import { PETTY_CASH_SEED_FULL } from './petty-cash.seed';

@Injectable({
  providedIn: 'root'
})
export class PettyCashDataClient {

  // ===== STATE =====
  private readonly _list = signal<PettyCash[]>(PETTY_CASH_SEED_FULL);

  // ===== READ =====
  list = this._list.asReadonly();

  total = computed(() => this._list().length);

  // ===== GET (Reactive) =====
  getPettyCash(id: string) {
    return computed(() =>
      this._list().find(x => x.pettyCashId === id) ?? null
    );
  }

  // ===== GET BY ID =====
  getById(id: string): PettyCash | undefined {
    return this._list().find(x => x.pettyCashId === id);
  }

  submit(id: string) {

  const now = new Date().toISOString();

  this._list.update(list =>
    list.map(item => {

      if (item.pettyCashId !== id) return item;
      if (item.pettyCashStatus !== 'Draft') return item;

      return {
        ...item,
        pettyCashStatus: PettyCashStatus.Submitted,
        approvalStatus: ApprovalStatus.Submitted,
        updatedAt: now
      };

    })
  );
}

approve(id: string) {

  const now = new Date().toISOString();

  this._list.update(list =>
    list.map(item => {

      if (item.pettyCashId !== id) return item;

      return {
        ...item,
approvalStatus: ApprovalStatus.Approved,
        approvedByUserId: 'SYSTEM',
        approvedOn: now,
        pettyCashStatus: PettyCashStatus.Approved,
        updatedAt: now
      };

    })
  );
}

reject(id: string) {

  const now = new Date().toISOString();

  this._list.update(list =>
    list.map(item => {

      if (item.pettyCashId !== id) return item;

      return {
        ...item,
        approvalStatus: ApprovalStatus.Rejected,
        pettyCashStatus: PettyCashStatus.Cancelled,
        updatedAt: now
      };

    })
  );
}

verifyReceipt(id: string) {

  const now = new Date().toISOString();

  this._list.update(list =>
    list.map(item => {

      if (item.pettyCashId !== id) return item;

      return {
        ...item,
        financeVerificationStatus: FinanceVerificationStatus.Rejected,
        receiptVerifiedOn: now,
        receiptVerifiedByUserId: 'SYSTEM',
        updatedAt: now
      };

    })
  );
}

reconcile(id: string, physicalCash?: number) {

  const now = new Date().toISOString();

  this._list.update(list =>
    list.map(item => {

      if (item.pettyCashId !== id) return item;

      const systemBalance =
        (item.openingCashBalance || 0)
        + (item.disbursedAmount || 0)
        + (item.replenishmentAmount || 0)
        - (item.expenseAmount || 0)
        - (item.returnedAmount || 0);

      if (physicalCash == null) {
        return {
          ...item,
          reconciliationStatus: ReconciliationStatus.Pending,
          updatedAt: now
        };
      }

      if (physicalCash === systemBalance) {
        return {
          ...item,
          reconciliationStatus:  ReconciliationStatus.Matched,
          updatedAt: now
        };
      }

      if (physicalCash < systemBalance) {
        return {
          ...item,
          reconciliationStatus: ReconciliationStatus.ShortageFound,
          shortageAmount: systemBalance - physicalCash,
          updatedAt: now
        };
      }

      return {
        ...item,
        reconciliationStatus: ReconciliationStatus.ExcessFound,
        excessAmount: physicalCash - systemBalance,
        updatedAt: now
      };

    })
  );
}

adjust(id: string) {

  const now = new Date().toISOString();

  this._list.update(list =>
    list.map(item => {

      if (item.pettyCashId !== id) return item;

      if (
        item.reconciliationStatus !== 'ShortageFound' &&
        item.reconciliationStatus !== 'ExcessFound'
      ) return item;

      return {
        ...item,
        reconciliationStatus: ReconciliationStatus.Adjusted,
        updatedAt: now
      };

    })
  );
}

close(id: string) {

  const now = new Date().toISOString();

  this._list.update(list =>
    list.map(item => {

      if (item.pettyCashId !== id) return item;

      if (
        item.reconciliationStatus !== 'Matched' &&
        item.reconciliationStatus !== 'Adjusted'
      ) return item;

      return {
        ...item,
        pettyCashStatus: PettyCashStatus.Closed,
        reconciliationStatus: ReconciliationStatus.Closed,
        closedOn: now,
        updatedAt: now,
        isLocked: true
      };

    })
  );
}

cancel(id: string) {

  const now = new Date().toISOString();

  this._list.update(list =>
    list.map(item => {

      if (item.pettyCashId !== id) return item;

      return {
        ...item,
        pettyCashStatus: PettyCashStatus.Cancelled,
        updatedAt: now
      };

    })
  );
}

requestReplenishment(id: string) {

  const now = new Date().toISOString();

  this._list.update(list =>
    list.map(item => {

      if (item.pettyCashId !== id) return item;

      const required =
        (item.floatLimitAmount || 0)
        - (item.closingCashBalance || 0);

      return {
        ...item,
        replenishmentStatus: ReplenishmentStatus.Required,
        replenishmentAmount: required > 0 ? required : 0,
        updatedAt: now
      };

    })
  );
}
  // ===== ADD =====
  add(data: PettyCash) {

    const now = new Date().toISOString();

    const newItem: PettyCash = {
      ...data,

      pettyCashId: crypto.randomUUID(),
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

    this._list.update(list => [...list, newItem]);
  }

  // ===== UPDATE =====
  update(updated: PettyCash) {

    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item =>
        item.pettyCashId === updated.pettyCashId
          ? {
              ...item,
              ...updated,
              updatedAt: now,
              updatedByUserId: 'SYSTEM'
            }
          : item
      )
    );
  }

  // ===== SOFT DELETE (ERP STANDARD) =====
delete(id: string) {

  this._list.update(list =>
    list.filter(item => item.pettyCashId !== id)
  );

}

  // ===== BULK DELETE =====
  deleteMultiple(ids: string[]) {

    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item =>
        ids.includes(item.pettyCashId)
          ? {
              ...item,
              isDeleted: true,
              deletedAt: now,
              deletedByUserId: 'SYSTEM'
            }
          : item
      )
    );
  }

  // ===== POSTING (VERY IMPORTANT 🔥) =====
  post(id: string) {

    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item => {

        if (item.pettyCashId !== id) return item;

        // Already posted → skip
        if (item.postingStatus === PostingStatus.Posted) return item;

        // Business rule: must be approved
        if (item.approvalStatus !== 'Approved') {
          console.warn('Cannot post without approval');
          return item;
        }

        return {
          ...item,
          postingStatus: PostingStatus.Posted,
          pettyCashStatus: PettyCashStatus.Posted,
          postedOn: now,
          postedByUserId: 'SYSTEM',
          isLocked: true
        };

      })
    );
  }

  // ===== REVERSE =====
  reverse(id: string) {

    const now = new Date().toISOString();

    this._list.update(list =>
      list.map(item => {

        if (item.pettyCashId !== id) return item;

        if (item.postingStatus !== PostingStatus.Posted) return item;

        return {
          ...item,
          postingStatus: PostingStatus.Reversed,
          pettyCashStatus: PettyCashStatus.Reversed,
          reversalReason: 'Manual reversal',
          isLocked: false,
          updatedAt: now
        };

      })
    );
  }

}