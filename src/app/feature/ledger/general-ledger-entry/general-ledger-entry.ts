import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { ToastNotifier } from '../../../core/services/toast';
import { Router, RouterModule } from '@angular/router';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal';
import { GeneralLedgerEntryClient } from '../general-ledger-entry-client';
import { GeneralLedgerEntry } from '../general-ledger-entry';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from '../../../shared/components/tooltip-ui/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-general-ledger-entry',
  imports: [CommonModule, RouterModule, ConfirmModalComponent,TooltipDirective,MatDatepickerModule],
  templateUrl: './general-ledger-entry.html',
  styleUrl: './general-ledger-entry.css',
})
export class GeneralLedgerEntryComponent {

  private readonly gleService = inject(GeneralLedgerEntryClient);
  private readonly toast = inject(ToastNotifier);
  private readonly router = inject(Router);

  modal = viewChild<ConfirmModalComponent>('modal');
visiblePages = computed(() => {
  const current = this.page();
  const total = this.totalPages();
  if (total <= 1) return [1];

  const start = current;                        // current page
  const end = Math.min(total, current + 1);     // next page

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
  // ===== STATE =====
  entries = this.gleService.activeEntries;
  selectedEntry = signal<GeneralLedgerEntry | null>(null);

  searchValue = signal('');
  page = signal(1);
  pageSize = signal(5);

  filterTop = 0;
  filterRight = 0;

  sortColumn = signal<keyof GeneralLedgerEntry | ''>('');
  sortDirection = signal<'asc' | 'desc'>('asc');

  filters = signal<{
    sourceType: string | null;
    date: string | null;
  }>({
    sourceType: null,
    date: null
  });

  showFilter = signal(false);

  sourceOptions = ['JournalEntry', 'Invoice', 'Payment', 'Receipt', 'PettyCash'];

  // ===== FILTER =====
  filteredEntries = computed(() => {
    const search = this.searchValue().toLowerCase().trim();
    const f = this.filters();

    return this.entries().filter(e => {

      //  SEARCH
      const matchesSearch =
        !search ||
        (e.accountName ?? '').toLowerCase().includes(search) ||
        (e.sourceDocumentNumber ?? '').toLowerCase().includes(search) ||
        (e.narration ?? '').toLowerCase().includes(search);

      // SOURCE TYPE
      const matchesSource =
        !f.sourceType || e.sourceType === f.sourceType;

      // SINGLE DATE
      const matchesDate =
        !f.date ||
        new Date(e.postingDate).toDateString() === new Date(f.date).toDateString();

      return matchesSearch && matchesSource && matchesDate;
    });
  });

  // ===== SORT =====
  sortedEntries = computed(() => {
    const data = [...this.filteredEntries()];
    const column = this.sortColumn();
    const direction = this.sortDirection();

    if (!column) return data;

    return data.sort((a, b) => {

      if (column === 'postingDate') {
        return direction === 'asc'
          ? new Date(a.postingDate).getTime() - new Date(b.postingDate).getTime()
          : new Date(b.postingDate).getTime() - new Date(a.postingDate).getTime();
      }

      const valA = (a[column] ?? '').toString().toLowerCase();
      const valB = (b[column] ?? '').toString().toLowerCase();

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  });

  // ===== PAGINATION =====
  total = computed(() => this.filteredEntries().length);

  paginatedEntries = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.sortedEntries().slice(start, start + this.pageSize());
  });

  totalPages = computed(() =>
    Math.ceil(this.total() / this.pageSize())
  );

  // ===== ACTIONS =====
  onSearch(value: string) {
    this.searchValue.set(value);
    this.page.set(1);
  }

  clearSearch() {
    this.searchValue.set('');
    this.page.set(1);
  }

  changePage(p: number) {
    if (p >= 1 && p <= this.totalPages()) {
      this.page.set(p);
    }
  }

  changePageSize(size: number) {
    this.pageSize.set(+size);
    this.page.set(1);
  }

  sortBy(column: keyof GeneralLedgerEntry) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  openRowDetails(entry: GeneralLedgerEntry) {
    this.selectedEntry.set(entry);
  }

  onDelete(entry: GeneralLedgerEntry) {
    this.modal()?.open({
      type: 'delete',
      title: 'Delete',
      message: `Delete entry ${entry.sourceDocumentNumber}?`,
      onConfirm: () => {
        this.gleService.delete(entry.id);
        this.toast.success('Entry deleted');
      }
    });
  }

  onView(entry: GeneralLedgerEntry) {
    this.router.navigate(['/general-ledger-entries', entry.id]);
  }

  selectSource(value: string) {
    this.filters.update(f => ({
      ...f,
      sourceType: value || null
    }));
  }

  setDate(value: string) {
    this.filters.update(f => ({
      ...f,
      date: value || null
    }));
  }

  resetFilters() {
    this.filters.set({
      sourceType: null,
      date: null
    });
  }

  toggleFilter(): void {
    const btn = document.querySelector('.filter-btn') as HTMLElement;
    const rect = btn?.getBoundingClientRect();
    if (rect) {
      this.filterTop = rect.bottom + 8;
      this.filterRight = window.innerWidth - rect.right + -65;
    }
    this.showFilter.set(true);
  }

  closeFilter() {
    this.showFilter.set(false);
  }
}
