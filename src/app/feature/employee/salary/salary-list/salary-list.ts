import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Salary, SalaryStatus } from '../salary';
import { CommonModule } from '@angular/common';
import { SalaryDataClient } from '../salary-data-client';

@Component({
  selector: 'app-salary-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './salary-list.html',
  styleUrl: './salary-list.css',
})
export class SalaryListComponent {

  private readonly router = inject(Router);
  private readonly salaryService = inject(SalaryDataClient);

  // ===== STATE =====
  salaryList = this.salaryService.salaryList;

  searchValue = signal('');
  page = signal(1);
  pageSize = signal(10);

  sortColumn = signal<keyof Salary | ''>('');
sortDirection = signal<'asc' | 'desc'>('asc');

showFilter = signal(false);

filters = signal<{
  status: SalaryStatus | null;
  period: string | null;
}>({
  status: null,
  period: null
});

periods = computed(() =>
  [...new Set(this.salaryList().map(s => s.salaryMonth))]
);
// ================= ROW DETAILS =================

selectedRow = signal<Salary | null>(null);

openRowDetails(row: Salary) {
  this.selectedRow.set(row);
}

statusOptions = Object
  .entries(SalaryStatus)
  .filter(([key, value]) => typeof value === 'number')
  .map(([key, value]) => ({
    label: key,
    value: value as number
  }));

  // ===== FILTER =====
filtered = computed(() => {

  const search = this.searchValue().trim().toLowerCase();
  const filter = this.filters();

  let data = this.salaryList();

  // SEARCH
  if (search) {
    data = data.filter(s =>
      (s.salaryNumber ?? '').toLowerCase().includes(search) ||
      (s.salaryMonth ?? '').toLowerCase().includes(search)
    );
  }

  //  STATUS FILTER
  if (filter.status) {
    data = data.filter(s => s.status === filter.status);
  }

  //  PERIOD FILTER
  if (filter.period) {
    data = data.filter(s => s.salaryMonth === filter.period);
  }

  // SORT (your existing logic)
  const column = this.sortColumn();
  const direction = this.sortDirection();

  if (!column) return data;

  return [...data].sort((a, b) => {
    let valA: any = a[column] ?? '';
    let valB: any = b[column] ?? '';

    if (column === 'fromDate' || column === 'toDate') {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return direction === 'asc' ? valA - valB : valB - valA;
    }

    return direction === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

});

  sortBy(column: keyof Salary) {

  if (this.sortColumn() === column) {
    this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
  } else {
    this.sortColumn.set(column);
    this.sortDirection.set('asc');
  }

}

  // ===== PAGINATION =====
  total = computed(() => this.filtered().length);

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize()))
  );

  paginated = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.filtered().slice(start, start + this.pageSize());
  });

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


  selectStatus(val: string) {
  this.filters.update(f => ({
    ...f,
    status: val ? +val : null
  }));
}

selectPeriod(val: string) {
  this.filters.update(f => ({
    ...f,
    period: val || null
  }));
}

closeFilter() {
  this.showFilter.set(false);
}

resetFilters() {
  this.filters.set({
    status: null,
    period: null
  });
}


  onAddSalary() {
    this.router.navigate(['/salary/create']);
  }

  onEdit(s: Salary) {
    if (!this.canEdit(s.status)) return;
    this.router.navigate(['/salary/edit', s.salaryId]);
  }

  onView(s: Salary) {
    this.router.navigate(['/salary', s.salaryId]);
  }

  // ===== HELPERS =====

  getBranchName(id: string): string {
    return id; // TODO: replace with BranchService
  }

  formatAmount(val?: number): string {
    return (val ?? 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  getStatusLabel(status: SalaryStatus): string {
    switch (status) {
      case SalaryStatus.Draft: return 'Draft';
      case SalaryStatus.Processed: return 'Processed';
      case SalaryStatus.Approved: return 'Approved';
      case SalaryStatus.Posted: return 'Posted';
      case SalaryStatus.Paid: return 'Paid';
      default: return '';
    }
  }

  getStatusClass(status: SalaryStatus): string {
    switch (status) {
      case SalaryStatus.Draft: return 'badge bg-warning';
      case SalaryStatus.Processed: return 'badge bg-info';
      case SalaryStatus.Approved: return 'badge active';
      case SalaryStatus.Posted: return 'badge bg-dark';
      case SalaryStatus.Paid: return 'badge bg-success';
      default: return 'badge';
    }
  }

  canEdit(status: SalaryStatus) {
    return status !== SalaryStatus.Posted &&
           status !== SalaryStatus.Paid;
  }
}