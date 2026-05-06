import { Injectable, signal, computed } from '@angular/core';
import { GeneralLedgerEntry } from './general-ledger-entry';
import { GENERAL_LEDGER_ENTRIES_SEED } from './general-ledger-entry.seed';

@Injectable({
  providedIn: 'root'
})
export class GeneralLedgerEntryClient {

  // ===== STATE =====
  private readonly _entries = signal<GeneralLedgerEntry[]>(GENERAL_LEDGER_ENTRIES_SEED);

  // ===== READ =====
  entries = this._entries.asReadonly();

  total = computed(() => this._entries().length);

  // ===== GET SINGLE (Reactive) =====
  getEntry(id: string) {
    return computed(() =>
      this._entries().find(e => e.id === id) ?? null
    );
  }

  // ===== GET BY ID (Non-reactive) =====
  getById(id: string): GeneralLedgerEntry | undefined {
    return this._entries().find(e => e.id === id);
  }

  // ===== ADD =====
  add(entry: GeneralLedgerEntry) {
    const newEntry: GeneralLedgerEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      isDeleted: false
    };

    this._entries.update(list => [...list, newEntry]);
  }

  // ===== UPDATE =====
  update(updated: GeneralLedgerEntry) {
    this._entries.update(list =>
      list.map(e =>
        e.id === updated.id
          ? {
              ...e,
              ...updated,
              // ERP: never override audit blindly in real app
              createdAt: e.createdAt
            }
          : e
      )
    );
  }

  // ===== SOFT DELETE (ERP SAFE) =====
  delete(id: string) {
    this._entries.update(list =>
      list.map(e =>
        e.id === id
          ? { ...e, isDeleted: true }
          : e
      )
    );
  }

  // ===== HARD DELETE (optional for mock) =====
  deletePermanent(id: string) {
    this._entries.update(list =>
      list.filter(e => e.id !== id)
    );
  }

  // ===== BULK DELETE =====
  deleteMultiple(ids: string[]) {
    this._entries.update(list =>
      list.map(e =>
        ids.includes(e.id)
          ? { ...e, isDeleted: true }
          : e
      )
    );
  }

  // ===== FILTERED (ACTIVE ONLY) =====
  activeEntries = computed(() =>
    this._entries().filter(e => !e.isDeleted)
  );

  // ===== BY SOURCE DOCUMENT (Voucher View) =====
  getBySourceDocument(docId: string) {
    return computed(() =>
      this._entries().filter(e => e.sourceDocumentId === docId)
    );
  }

  // ===== RUNNING BALANCE (VERY IMPORTANT FOR LEDGER UI) =====
  getRunningBalance(accountId: string) {
    return computed(() => {
      const list = this._entries()
        .filter(e => e.accountId === accountId && !e.isDeleted)
        .sort((a, b) => a.postingSequenceNumber - b.postingSequenceNumber);

      let balance = 0;

      return list.map(e => {
        balance += (e.debitAmount - e.creditAmount);

        return {
          ...e,
          runningBalance: balance
        };
      });
    });
  }

  // ===== GROUP BY DATE (FOR REPORTS) =====
  groupByDate() {
    return computed(() => {
      const map: Record<string, GeneralLedgerEntry[]> = {};

      this._entries().forEach(e => {
        if (!map[e.postingDate]) {
          map[e.postingDate] = [];
        }
        map[e.postingDate].push(e);
      });

      return map;
    });
  }
}