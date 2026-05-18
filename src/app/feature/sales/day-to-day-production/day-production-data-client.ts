import { computed, Injectable, signal } from '@angular/core';
import { PeFilters, ProductionEntry, ProductionStatus } from './day-production';
import { INITIAL_PRODUCTION_ENTRIES, INITIAL_PRODUCTION_NEXT_ID } from './day-production.seed';


@Injectable({
  providedIn: 'root',
})
export class DayProductionDataClient {

  // ── Single source of truth ──
  private _entries = signal<ProductionEntry[]>(
    structuredClone(INITIAL_PRODUCTION_ENTRIES)
  );
 
  // Public read-only view
  readonly entries = this._entries.asReadonly();
 
  // ── Next ID helper ──
  private nextId = computed(() =>
    this._entries().length
      ? Math.max(...this._entries().map(e => e.id)) + 1
      : 1
  );
 
  // ── Add a new entry ──
  add(entry: Omit<ProductionEntry, 'id'>): ProductionEntry {
    const newEntry: ProductionEntry = { ...entry, id: this.nextId() };
    this._entries.update(arr => [...arr, newEntry]);
    return newEntry;
  }
 
  // ── Update existing entry ──
  update(updated: ProductionEntry): void {
    this._entries.update(arr =>
      arr.map(e => e.id === updated.id ? updated : e)
    );
  }
 
  // ── Delete entry ──
  delete(id: number): void {
    this._entries.update(arr => arr.filter(e => e.id !== id));
  }
 
  // ── Get by id ──
  getById(id: number): ProductionEntry | undefined {
    return this._entries().find(e => e.id === id);
  }
  
  generateProductionNo(): string {
    const year  = new Date().getFullYear();
    const count = this._entries().length;
    return `PE-${year}-${String(count + 1).padStart(5, '0')}`;
  }
}