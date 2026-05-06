import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { ToastNotifier } from '../../../../core/services/toast';
import { Router, RouterModule } from '@angular/router';
import { PettyCash, PettyCashStatus, PettyCashTransactionType } from '../petty-cash';
import { PettyCashDataClient } from '../petty-cash-data-client';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal';
import { CommonModule } from '@angular/common';
import { EmployeeDataClient } from '../../employee-data-client';

@Component({
  selector: 'app-petty-cash-list',
  imports: [CommonModule, RouterModule, ConfirmModalComponent],
  templateUrl: './petty-cash-list.html',
  styleUrl: './petty-cash-list.css',
})
export class PettyCashListComponent {

  private readonly service = inject(PettyCashDataClient);
  private readonly empService = inject(EmployeeDataClient);
  private readonly router = inject(Router);
       private readonly toast = inject(ToastNotifier);

         modal = viewChild<ConfirmModalComponent>('modal');
  // ===== STATE =====
  list = this.service.list;
  employees = this.empService.employees;

  selectedRow = signal<PettyCash | null>(null);

  searchValue = signal('');
  page = signal(1);
  pageSize = signal(10);

  sortColumn = signal<keyof PettyCash | ''>('');
  sortDirection = signal<'asc' | 'desc'>('asc');


  statuses = Object.values(PettyCashStatus);

  // ===== MAP =====
  employeeMap = computed(() => {
    const map: Record<string, any> = {};
    this.employees().forEach(e => {
      map[e.employeeId!] = e;
    });
    return map;
  });


  // ===== FILTER =====
  filtered = computed(() => {
    const search = this.searchValue().toLowerCase();
    const f = this.filters();

    return this.list().filter(pc =>
      (!search ||
        pc.pettyCashCode.toLowerCase().includes(search) ||
        pc.purposeTitle?.toLowerCase().includes(search)
      ) &&
      (!f.status || pc.pettyCashStatus === f.status)
    );
  });

  // ===== SORT =====
  sorted = computed(() => {
    const data = [...this.filtered()];
    const col = this.sortColumn();
    const dir = this.sortDirection();

    if (!col) return data;

    return data.sort((a, b) => {

      if (col === 'transactionDate') {
        return dir === 'asc'
          ? new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime()
          : new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime();
      }

      const valA = (a[col] ?? '').toString();
      const valB = (b[col] ?? '').toString();

      return dir === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  });

  paginated = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.sorted().slice(start, start + this.pageSize());
  });

  total = computed(() => this.filtered().length);

  totalPages = computed(() =>
    Math.ceil(this.total() / this.pageSize())
  );

  showFilter = signal(false);
  filters = signal<{
  status: PettyCashStatus | null;
  type: string | null;
}>({
  status: null,
  type: null
});

transactionTypes = Object.values(PettyCashTransactionType);

selectStatus(val: any) {
  this.filters.update(f => ({ ...f, status: val || null }));
}

selectType(val: any) {
  this.filters.update(f => ({ ...f, type: val || null }));
}

resetFilters() {
  this.filters.set({ status: null, type: null });
}

closeFilter() {
  this.showFilter.set(false);
}

clearSearch() {
  this.searchValue.set('');
}

  // ===== ACTIONS =====
  onSearch(val: string) {
    this.searchValue.set(val);
    this.page.set(1);
  }

  onStatusFilter(val: any) {
    this.filters.update(f => ({
      ...f,
      status: val || null
    }));
  }

  sortBy(col: keyof PettyCash) {
    if (this.sortColumn() === col) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(col);
      this.sortDirection.set('asc');
    }
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


  // ===== NAV =====
  onAdd() {
    this.router.navigate(['/petty-cash/create']);
  }

  onEdit(pc: PettyCash) {
    this.router.navigate(['/petty-cash/edit', pc.pettyCashId]);
  }

  onView(pc: PettyCash) {
    this.router.navigate(['/petty-cash', pc.pettyCashId]);
  }

    onDelete(pc: PettyCash) {
      this.modal()?.open({
        type: 'delete',
        title: 'Delete',
        message: `Are you sure you want to delete ${pc.pettyCashId}?`,
        onConfirm: () => {
          this.delete(pc);
        }
      });
    }

  delete(pc: PettyCash) {
    this.service.delete(pc.pettyCashId);

  this.toast.success("Petty-Cash deleted successfully");
  }

  openRowDetails(pc: PettyCash) {
    this.selectedRow.set(pc);
  }

  // ===== HELPERS =====
  getAmount(pc: PettyCash): number {
    return (
      pc.expenseAmount ??
      pc.requestedAmount ??
      pc.disbursedAmount ??
      pc.replenishmentAmount ??
      pc.returnedAmount ??
      0
    );
  }

  formatAmount(val?: number) {
    return (val ?? 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2
    });
  }

  getStatusLabel(status: PettyCashStatus) {
    return status;
  }

  getStatusClass(status: PettyCashStatus) {
    switch (status) {
      case PettyCashStatus.Draft: return 'bg-secondary';
      case PettyCashStatus.Approved: return 'bg-info';
      case PettyCashStatus.Posted: return 'bg-success';
      case PettyCashStatus.Cancelled: return 'bg-danger';
      default: return 'bg-dark';
    }
  }

  getEmployeeName(id: string) {
    const emp = this.employeeMap()[id];
    return emp ? emp.firstName + ' ' + emp.lastName : '-';
  }

}