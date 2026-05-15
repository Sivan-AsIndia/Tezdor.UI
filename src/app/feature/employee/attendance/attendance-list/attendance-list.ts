import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AttendanceDataClient } from '../attendance-data-client';
import { ConfirmModalComponent } from "../../../../shared/components/confirm-modal/confirm-modal";
import { AttendanceStatus, Attendance } from '../attendance';
import { ToastNotifier } from '../../../../core/services/toast';
import { MatDatepickerModule } from '@angular/material/datepicker';
declare var bootstrap: any;

@Component({
  selector: 'app-attendance-list',
  imports: [CommonModule, ConfirmModalComponent, RouterModule,MatDatepickerModule],
  templateUrl: './attendance-list.html',
  styleUrl: './attendance-list.css',
})
export class AttendanceListComponent {

  private readonly service = inject(AttendanceDataClient);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastNotifier);
  modal = viewChild<ConfirmModalComponent>('modal');

  canvas = viewChild<ElementRef>('attendanceCanvas');
  // ===== STATE =====
  attendances = this.service.attendanceList; // FIXED

  searchValue = signal('');
  page = signal(1);
  pageSize = signal(10);
  isEditMode = signal(false);
  offCanvas = signal(false);

  filterTop = 0;
  filterRight = 0;
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
  sortColumn = signal<keyof Attendance | ''>('');
  sortDirection = signal<'asc' | 'desc'>('asc');
  selectedAttendance = signal<Attendance | null>(null);

  model = signal<Attendance>({
    tenantId: '',
    companyId: '',
    branchId: '',
    attendancePeriodId: '',
    attendancePeriodName: '',
    fromDate: '',
    toDate: '',
    status: AttendanceStatus.Draft,
    isProcessedForSalary: false
  });


  AttendanceStatus = AttendanceStatus;

  statusOptions = Object
    .entries(AttendanceStatus)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      label: key,
      value: value as number
    }));

  errors = signal<Record<string, string>>({});

  showFilter = signal(false);

  filters = signal<{
    status: AttendanceStatus | null;
  }>({
    status: null
  });

  statusTouched = signal(false);
  // ===== FILTER =====
  filtered = computed(() => {

    const search = this.searchValue().toLowerCase().trim();
    const filter = this.filters();

    return this.attendances().filter((a: Attendance) => {

      const number = a.attendanceNumber?.toLowerCase() ?? '';
      const attendancePeriodName = a.attendancePeriodName?.toLowerCase() ?? '';

      const matchesSearch =
        number.includes(search) || attendancePeriodName.includes(search);

      const matchesStatus =
        !filter.status || a.status === filter.status;

      return matchesSearch && matchesStatus;

    });
  });

  // ===== SORT =====
  sorted = computed(() => {
    const data = [...this.filtered()];
    const col = this.sortColumn();
    const dir = this.sortDirection();

    if (!col) return data;

    return data.sort((a, b) => {
      const valA = (a[col] ?? '').toString().toLowerCase();
      const valB = (b[col] ?? '').toString().toLowerCase();

      if (valA < valB) return dir === 'asc' ? -1 : 1;
      if (valA > valB) return dir === 'asc' ? 1 : -1;
      return 0;
    });
  });

  // ===== PAGINATION =====
  total = computed(() => this.sorted().length);

  paginated = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.sorted().slice(start, start + this.pageSize());
  });

  totalPages = computed(() =>
    Math.ceil(this.total() / this.pageSize())
  );

  // ===== ACTIONS =====
  onSearch(val: string) {
    this.searchValue.set(val);
    this.page.set(1);
  }

  selectStatus(status: number) {
    this.filters.update(f => ({
      ...f,
      status: f.status === status ? null : status
    }));
  }

  closeFilter() {
    this.showFilter.set(false);
  }

  resetFilters() {
    this.filters.set({ status: null });
  }

  sortBy(column: keyof Attendance) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
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

  // ===== NAVIGATION =====
  onAdd() {
    this.router.navigate(['/attendance/create']);
  }

  onEdit(a: Attendance) {

    const clone: Attendance = {
      ...a,
      attendanceLines: [...(a.attendanceLines ?? [])]
    };

    this.model.set(clone);

    this.isEditMode.set(true);

    this.errors.set({});
    this.statusTouched.set(true);

    this.offCanvas.set(true);
  }

  onView(a: Attendance) {
    this.router.navigate(['/attendance', a.attendanceId]);
  }

  onViewLines(a: Attendance) {
    this.router.navigate(['/attendance', a.attendanceId, 'lines']);
  }

  onDelete(a: Attendance) {
    this.modal()?.open({
      type: 'delete',
      title: 'Delete Attendance',
      message: `Are you sure you want to delete ${a.attendanceNumber}?`,
      onConfirm: () => {
        this.delete(a);
      }
    });
  }

  delete(a: Attendance) {
    this.service.deleteAttendance(a.attendanceId!);
    this.toast.success('Deleted successfully');
  }


  openRowDetails(a: Attendance) {
    this.selectedAttendance.set(a);
  }

  // ===== UI HELPERS =====
  getStatusClass(status: AttendanceStatus) {
    return {
      'badge bg-warning': status === AttendanceStatus.Draft,
      'badge bg-info': status === AttendanceStatus.Submitted,
      'badge bg-success': status === AttendanceStatus.Approved,
      'badge bg-dark': status === AttendanceStatus.Locked,
      'badge bg-primary': status === AttendanceStatus.Open,

    };
  }

  getStatusLabel(status: AttendanceStatus): string {
    switch (status) {
      case AttendanceStatus.Draft: return 'Draft';
      case AttendanceStatus.Submitted: return 'Submitted';
      case AttendanceStatus.Approved: return 'Approved';
      case AttendanceStatus.Locked: return 'Locked';
      case AttendanceStatus.Open: return 'Open';
      default: return '';
    }
  }



  update<K extends keyof Attendance>(field: K, value: Attendance[K]) {
    this.model.update(m => ({
      ...m,
      [field]: value
    }));
  }

  onDateChange(field: 'fromDate' | 'toDate', value: string) {
    this.update(field, value);

    const { fromDate, toDate } = this.model();

    if (!fromDate || !toDate) return;

    const from = new Date(fromDate);
    const to = new Date(toDate);

    //  invalid case
    if (to < from) {
      this.update('toDate', fromDate);
      return;
    }

    //  calculate payable days
    const diff =
      (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24) + 1;

    this.update('payableDays', diff);
  }

  onStatusChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.statusTouched.set(true);

    if (!value) return;

    this.update('status', +value as AttendanceStatus);

    // clear error when user selects
    this.clearError('status');
  }


  save() {
    const m = this.model();

    // reset errors
    this.errors.set({});

    if (!m.attendancePeriodName?.trim()) {
      this.setError('attendancePeriodName', 'Attendance period Name is required');
    }

    // if (!this.statusTouched()) {
    //   this.setError('status', 'Status is required');
    // }

    if (!m.fromDate) {
      this.setError('fromDate', 'From date is required');
    }

    if (!m.toDate) {
      this.setError('toDate', 'To date is required');
    }

    if (m.fromDate && m.toDate) {
      const from = new Date(m.fromDate);
      const to = new Date(m.toDate);

      if (to < from) {
        this.setError('toDate', 'To date cannot be earlier than from date');
      }
    }

    if (!m.payableDays || m.payableDays <= 0) {
      this.setError('payableDays', 'Invalid payable days');
    }

    // stop if errors exist
    if (Object.keys(this.errors()).length > 0) return;

    //  success


    try {
      if (this.isEditMode()) {

        this.service.updateAttendance({ ...m });
        this.toast.success('Attendance updated successfully');

      } else {

        this.service.addAttendance({ ...m });
        this.toast.success('Attendance created successfully');

      }
    } catch (err: any) {
      this.toast.error(err.message);
      return;
    }

    this.close();
    this.isEditMode.set(false);
  }

  reset() {
    this.model.set({
      attendanceId: '',
      tenantId: '',
      companyId: '',
      branchId: '',
      attendancePeriodId: '',
      fromDate: '',
      toDate: '',
      attendanceNumber: '',
      status: AttendanceStatus.Draft,

      totalPresentDays: 0,
      totalAbsentDays: 0,
      totalLeaveDays: 0,
      totalWorkingHours: 0,
      totalOvertimeHours: 0,

      payableDays: 0,
      lossOfPayDays: 0,

      attendanceLines: [],
      attendancePeriodName: ''
    });

    // clear errors
    this.errors.set({});

    // reset status touched
    this.statusTouched.set(false);
  }



  close() {
    this.reset();
    this.isEditMode.set(false);
    this.offCanvas.set(false);
  }


  hasError(field: string): boolean {
    return !!this.errors()[field];
  }

  getError(field: string): string {
    return this.errors()[field];
  }

  setError(field: string, message: string) {
    this.errors.update(e => ({ ...e, [field]: message }));
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

  clearError(field: string) {
    this.errors.update(e => {
      const copy = { ...e };
      delete copy[field];
      return copy;
    });
  }
}