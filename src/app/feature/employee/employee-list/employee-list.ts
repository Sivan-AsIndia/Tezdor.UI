import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { EmployeeStatus, Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { ToastNotifier } from '../../../core/services/toast';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal';
import { Router, RouterModule } from '@angular/router';
import { EmployeeDataClient } from '../employee-data-client';
import { MasterDataClient } from '../../../core/services/master-data';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, ConfirmModalComponent, RouterModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeListComponent {

  private readonly empService = inject(EmployeeDataClient);
  private readonly toast = inject(ToastNotifier);
  private readonly router = inject(Router);
  private readonly master = inject(MasterDataClient);

  modal = viewChild<ConfirmModalComponent>('modal');
  filterTop = 0;
  filterRight = 0;


  // ===== STATE =====
  employees = this.empService.employees;
  selectedEmployee = signal<Employee | null>(null);

  sortColumn = signal<keyof Employee | ''>('');
  sortDirection = signal<'asc' | 'desc'>('asc');


  searchValue = signal('');
  page = signal(1);
  pageSize = signal(5);
  showFilter = signal(false);

  // ===== FILTER =====
  filteredEmployees = computed(() => {
    const search = this.searchValue().toLowerCase().trim();
    const filter = this.filters();

    return this.employees().filter(emp => {

      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search) ||
        emp.employeeCode.toLowerCase().includes(search) ||
        emp.personalmobileNumber.includes(search);

      const matchesStatus =
        !filter.status || emp.status === filter.status;

      const matchesDepartment =
        !filter.departmentId || emp.departmentId === filter.departmentId;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  });

  readonly statuses = Object.values(EmployeeStatus);
  readonly departments = this.master.departments; // signal from service

  filters = signal<{
    status: EmployeeStatus | null;
    departmentId: string | null;
  }>({
    status: null,
    departmentId: null
  });

  // ===== PAGINATION =====
  total = computed(() => this.filteredEmployees().length);

  paginatedEmployees = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.sortedEmployees().slice(start, start + this.pageSize());
  });


  totalPages = computed(() =>
    Math.ceil(this.total() / this.pageSize())
  );

  // ===== ACTIONS =====
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

  getAvatarColor(name: string): string {
    if (!name) return '#ccc';

    // generate hash from name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // convert to pastel color (HSL)
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`; // pastel tone
  }

  getDepartmentName(id: string): string {
    return this.departments().find(d => d.id === id)?.name ?? id;
  }



  getFullName(emp: Employee): string {
    return `${emp.firstName ?? ''} ${emp.lastName ?? ''}`.trim();
  }

  onSearch(value: string) {
    this.searchValue.set(value);
    this.page.set(1); // reset page
  }



  sortBy(column: keyof Employee) {

    if (this.sortColumn() === column) {
      // toggle direction
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  sortedEmployees = computed(() => {
    const data = [...this.filteredEmployees()];

    const column = this.sortColumn();
    const direction = this.sortDirection();

    if (!column) return data;

    return data.sort((a, b) => {

      //  Handle date separately
      if (column === 'dateOfJoining') {
        const aTime = new Date(a.dateOfJoining).getTime();
        const bTime = new Date(b.dateOfJoining).getTime();
        return direction === 'asc' ? aTime - bTime : bTime - aTime;
      }

      const valA = (a[column] ?? '').toString().toLowerCase();
      const valB = (b[column] ?? '').toString().toLowerCase();

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  });




  openRowDetails(emp: Employee) {
    this.selectedEmployee.set(emp);
  }


  onEdit(emp: Employee) {
    this.router.navigate(['/employees/edit', emp.employeeId]);
  }

  onAddEmp() {
    this.router.navigate(['/employees/create']);
  }


  onDelete(emp: Employee) {
    this.modal()?.open({
      type: 'delete',
      title: 'Delete',
      message: `Are you sure you want to delete ${emp.employeeName}?`,
      onConfirm: () => {
        this.delete(emp);
      }
    });
  }

  delete(emp: Employee) {
    this.empService.delete(emp.employeeId!);
    this.toast.success('Employee deleted successfully');
  }

  onView(emp: Employee) {
    this.router.navigate(['/employees', emp.employeeId]);
  }

  //---Filter -----//

  selectStatus(status: EmployeeStatus) {
    this.filters.update(f => ({
      ...f,
      status: f.status === status ? null : status
    }));
  }

  selectDepartment(deptId: string) {
    this.filters.update(f => ({
      ...f,
      departmentId: f.departmentId === deptId ? null : deptId
    }));
  }

  resetFilters() {
    this.filters.set({
      status: null,
      departmentId: null
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