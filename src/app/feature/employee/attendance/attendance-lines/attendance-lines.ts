import { Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AttendanceLine, AttendanceType } from '../attendance-line';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal';
import { AttendanceStatus } from '../attendance';
import { AttendanceDataClient } from '../attendance-data-client';
import { EmployeeDataClient } from '../../employee-data-client';
import { ToastNotifier } from '../../../../core/services/toast';
import { Permission, PermissionStatus, PermissionType } from '../../permission/permission';
import { PermissionDataClient } from '../../permission/permission-data-client';
import { Leave, LeaveStatus } from '../../leave/leave';
import { LeaveTypeDataClient } from '../../leave/leave-type-data-client';
import { LeaveDataClient } from '../../leave/leave-data-client';

@Component({
  selector: 'app-attendance-lines',
  imports: [ConfirmModalComponent, RouterModule],
  templateUrl: './attendance-lines.html',
  styleUrl: './attendance-lines.css',
})
export class AttendanceLinesComponent {

  private readonly service = inject(AttendanceDataClient);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastNotifier);
  private readonly empService = inject(EmployeeDataClient);
  private readonly permissionService = inject(PermissionDataClient);
  private readonly leaveTypeService = inject(LeaveTypeDataClient);
  private readonly leaveService = inject(LeaveDataClient);


  private readonly route = inject(ActivatedRoute);
  modal = viewChild<ConfirmModalComponent>('modal');
  paramMapSignal = toSignal(this.route.paramMap, { initialValue: null });

  // ===== STATE =====
  attendance = this.service.attendance;
  lines = computed(() => this.attendance()?.attendanceLines ?? []);
  AttendanceType = AttendanceType;
  selectedLine = signal<AttendanceLine | null>(null);
  filterDate = signal<string>('');

  errors = signal<Record<string, string>>({});
  selectedRow = signal<AttendanceLine | null>(null);

  showPermissionModal = signal(false);

  showQuickMenu = signal(false);

  selectedPermission = signal<Permission | null>(null);

  searchValue = signal('');
  page = signal(1);
  pageSize = signal(10);

  attendancePage = signal(1);
  attendancePageSize = signal(10);

  editingLineId = signal<string | null>(null);

  editForm = signal({
    inTime: '',
    outTime: ''
  });

  selectAll = signal(false);

  // use service signal
  employees = this.empService.employees;
  permissions = this.permissionService.permissions;
  hoveredPermission = signal<Permission | null>(null);
  showModal = signal(false);
  popoverX = signal(0);
  popoverY = signal(0);

  hoveredLeave = signal<Leave | null>(null);

  leavePopoverX = signal(0);

  leavePopoverY = signal(0);
  showLeaveModal = signal(false);


  leaveTypes =
    this.leaveTypeService.leaveTypes;
  selectedLeave = signal<Leave | null>(null);


  showPermissionPopover(
    event: MouseEvent,
    permission: Permission
  ) {

    this.popoverX.set(event.clientX);
    this.popoverY.set(event.clientY);

    this.hoveredPermission.set(permission);
  }

  hidePermissionPopover() {
    this.hoveredPermission.set(null);
  }


  form = signal({
    employeeIds: [] as string[],
    attendanceDate: new Date().toISOString().split('T')[0],
    inTime: '',
    outTime: ''
  });
  viewMode = signal<'table' | 'grid'>('table');

  permissionTypes = Object.values(PermissionType);

  permissionForm = signal({
    employeeId: '',
    permissionDate: new Date().toISOString().split('T')[0],

    fromTime: '',
    toTime: '',

    permissionType: PermissionType.Personal,

    reason: ''
  });



  leaveErrors = signal<Record<string, string>>({});

  leaveForm = signal({

    employeeId: '',

    leaveTypeId: '',

    fromDate: '',
    toDate: '',

    reason: '',

    status: LeaveStatus.Pending

  });



  constructor() {
    effect(() => {
      const params = this.paramMapSignal();
      if (!params) return;

      const id = params.get('id');

      if (!id) {
        this.reset();
        return;
      }

      // prevent unnecessary reload
      if (this.attendance()?.attendanceId === id) return;

      this.loadAttendance(id);
    });

    effect(() => {
      this.selectedEmployee();
      this.attendancePage.set(1); // reset when opening modal
    });
  }




  // == computed ===

  dates = computed(() => {
    const att = this.attendance();
    if (!att?.fromDate || !att?.toDate) return [];

    const start = new Date(att.fromDate);
    const end = new Date(att.toDate);

    const result: string[] = [];
    const d = new Date(start);

    while (d <= end) {
      result.push(d.toISOString().split('T')[0]); // YYYY-MM-DD
      d.setDate(d.getDate() + 1);
    }

    return result;
  });

  employeeMap = computed(() => {
    const map: Record<string, any> = {};
    this.employees().forEach(e => {
      map[e.employeeId!] = e;
    });
    return map;
  });

  paginatedEmployeeAttendance = computed(() => {
    const start = (this.attendancePage() - 1) * this.attendancePageSize();
    return this.employeeAttendanceLine().slice(start, start + this.attendancePageSize());
  });

  attendanceTotalPages = computed(() =>
    Math.ceil(this.employeeAttendanceLine().length / this.attendancePageSize())
  );

  attendancePageNumbers = computed(() => {
    return Array.from(
      { length: this.attendanceTotalPages() },
      (_, i) => i + 1
    );
  });






  onAttendancePageSizeChange(size: number) {
    this.attendancePageSize.set(size);
    this.attendancePage.set(1); // reset page
  }


  goToLedgerPage(page: number) {
    if (page < 1 || page > this.attendanceTotalPages()) return;
    this.attendancePage.set(page);
  }



  sortColumn = signal<keyof AttendanceLine | ''>('');
  sortDirection = signal<'asc' | 'desc'>('asc');

  selectedEmployee = signal<string | null>(null);

  canAdd = computed(() => {
    const att = this.attendance();
    if (!att) return false;

    const today = new Date().toISOString().split('T')[0];

    return (
      att.status === AttendanceStatus.Open && // Open
      !!att.fromDate &&
      !!att.toDate &&
      today >= att.fromDate &&
      today <= att.toDate
    );
  });


  employeeSummary = computed(() => {
    const map = new Map<string, any>();

    this.filtered().forEach(a => {

      if (!map.has(a.employeeId)) {
        map.set(a.employeeId, {
          employeeId: a.employeeId,
          fromDate: a.attendanceDate,
          toDate: a.attendanceDate,
          totalPresent: 0,
          totalWorkingHours: 0,
          totalOtMinutes: 0
        });
      }

      const item = map.get(a.employeeId);

      if (a.attendanceDate < item.fromDate) item.fromDate = a.attendanceDate;
      if (a.attendanceDate > item.toDate) item.toDate = a.attendanceDate;

      if (a.attendanceType === AttendanceType.Present) {
        item.totalPresent++;
      }

      item.totalWorkingHours += a.workingHours || 0;
      item.totalOtMinutes += a.overtimeHours || 0;
    });

    return Array.from(map.values());
  });


  // ===== FILTER =====
  filtered = computed(() => {
    const search = this.searchValue().trim().toLowerCase();
    const dateFilter = this.filterDate();

    return this.lines().filter(l => {

      const emp = this.getEmployeeName(l.employeeId)?.toLowerCase() ?? '';
      const date = l.attendanceDate ?? '';

      const matchesSearch =
        !search ||
        emp.includes(search) ||
        date.toLowerCase().includes(search);

      const matchesDate =
        !dateFilter || date === dateFilter;

      return matchesSearch && matchesDate;
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

  sortedSummary = computed(() => {
    const data = [...this.employeeSummary()];
    const dir = this.sortDirection();

    return data.sort((a, b) => {
      const valA = a.totalWorkingHours;
      const valB = b.totalWorkingHours;

      return dir === 'asc' ? valA - valB : valB - valA;
    });
  });
  paginatedSummary = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.sortedSummary().slice(start, start + this.pageSize());
  });

  // ===== PAGINATION =====
  total = computed(() => this.sorted().length);

  totalEmployees = computed(() => this.employeeSummary().length);

  paginated = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.sorted().slice(start, start + this.pageSize());
  });

  totalPages = computed(() =>
    Math.ceil(this.employeeSummary().length / this.pageSize())
  );

  paginatedEmployees = computed(() => {
    const start = (this.page() - 1) * this.pageSize();
    return this.employees().slice(start, start + this.pageSize());
  });

  employeeAttendanceLine = computed(() => {
    const empId = this.selectedEmployee();
    if (!empId) return [];

    return this.lines()   // FIX HERE
      .filter(x => x.employeeId === empId)
      .sort((a, b) => a.attendanceDate.localeCompare(b.attendanceDate));
  });

  empTotalPresent = computed(() =>
    this.employeeAttendanceLine().filter(x => x.attendanceType === AttendanceType.Present).length
  );

  empTotalHours = computed(() =>
    this.employeeAttendanceLine().reduce((sum, x) => sum + (x.workingHours || 0), 0)
  );

  empTotalOT = computed(() =>
    this.employeeAttendanceLine().reduce((sum, x) => sum + (x.overtimeHours || 0), 0)
  );

  empFromDate = computed(() => this.employeeAttendanceLine()[0]?.attendanceDate);
  empToDate = computed(() => this.employeeAttendanceLine().at(-1)?.attendanceDate);


  workingHours = computed(() => {
    const f = this.form();
    if (!f.inTime || !f.outTime) return 0;

    const [h1, m1] = f.inTime.split(':').map(Number);
    const [h2, m2] = f.outTime.split(':').map(Number);

    return ((h2 * 60 + m2) - (h1 * 60 + m1)) / 60;
  });






  getLine(empId: string, date: string) {
    return this.lines().find(x =>
      x.employeeId === empId &&
      x.attendanceDate === date
    );
  }



  // load data for edit

  loadAttendance(id: string) {
    const data = this.service.attendanceList()
      .find(x => x.attendanceId === id);

    if (data) {
      this.service.setAttendance(data);      // header
      this.service.loadLinesByAttendanceId(id); // 🔥 attach lines
    }
  }


  // ===== ACTIONS =====
  onSearch(val: string) {
    this.searchValue.set(val);
    this.page.set(1);
  }

  sortBy(column: keyof AttendanceLine) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(
        this.sortDirection() === 'asc' ? 'desc' : 'asc'
      );
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
  goBack() {
    this.router.navigate(['/attendance']);
  }


  openRowDetails(row: AttendanceLine) {
    this.selectedRow.set(row);
  }
  // ===== LINE ACTIONS =====
  startEdit(row: AttendanceLine) {
    this.editingLineId.set(row.attendanceLineId);

    this.editForm.set({
      inTime: row.inTime ?? '',
      outTime: row.outTime ?? ''
    });
  }

  cancelEdit() {
    this.editingLineId.set(null);
  }

  saveEdit(row: AttendanceLine) {
    const f = this.editForm();

    if (!f.inTime || !f.outTime) return;
    if (f.inTime >= f.outTime) {
      this.toast.error('Out time must be greater');
      return;
    }

    const inT = new Date(`1970-01-01T${f.inTime}`);
    const outT = new Date(`1970-01-01T${f.outTime}`);

    const totalMinutes = (outT.getTime() - inT.getTime()) / 60000;
    const workingHours = totalMinutes / 60;

    const updated: AttendanceLine = {
      ...row,
      inTime: f.inTime,
      outTime: f.outTime,
      workingHours: Math.round(workingHours * 100) / 100,
      overtimeHours: totalMinutes > 480 ? Math.round(totalMinutes - 480) : 0,
      isLate: f.inTime > '09:00',
      isEarlyExit: f.outTime < '18:00',
      isHalfDay: workingHours < 5
    };

    this.service.updateLine(updated);

    this.editingLineId.set(null);
  }

  onEdit(line: AttendanceLine) {

    // Set selected line (for tracking)
    this.selectedLine.set(line);

    this.form.set({
      employeeIds: [line.employeeId ?? ''],
      attendanceDate: line.attendanceDate ?? new Date().toISOString().split('T')[0],
      inTime: line.inTime ?? '',
      outTime: line.outTime ?? ''
    });
    this.errors.set({});

    this.showModal.set(true);
  }

  onDelete(line: AttendanceLine) {
    this.modal()?.open({
      type: 'delete',
      title: 'Delete',
      message: `Are you sure you want to delete ${line.attendanceLineId}?`,
      onConfirm: () => {
        this.delete(line);
      }
    });
  }

  onView(emp: AttendanceLine) {
    this.selectedEmployee.set(emp.employeeId);
  }



  delete(line: AttendanceLine) {
    this.service.removeLine(line.attendanceLineId);
    this.toast.success('Line deleted successfully');
  }



  // ===== UI HELPERS =====
  getStatusLabel(type: AttendanceType): string {
    switch (type) {
      case AttendanceType.Present: return 'Present';
      case AttendanceType.Absent: return 'Absent';
      case AttendanceType.Leave: return 'Leave';
      case AttendanceType.Holiday: return 'Holiday';
      case AttendanceType.WeekOff: return 'WeekOff';
      default: return '';
    }
  }

  getStatusClass(type: AttendanceType) {
    return {
      'bg-success': type === AttendanceType.Present,
      'bg-danger': type === AttendanceType.Absent,
      'bg-warning': type === AttendanceType.Leave,
      'bg-info': type === AttendanceType.Holiday,
      'bg-dark': type === AttendanceType.WeekOff,
    };
  }

  getEmployeeName(id: string): string {
    const emp = this.employeeMap()[id];
    return emp ? `${emp.firstName} ${emp.lastName}` : '—';
  }

  reset() {
    this.service.clear();
  }

  openAddModal() {
    if (!this.canAdd()) return;

    this.form.set({
      employeeIds: [],
      attendanceDate: new Date().toISOString().split('T')[0],
      inTime: '',
      outTime: ''
    });

    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedLine.set(null);
    this.selectAll.set(false);
  }

  setEmployee(value: string) {
    this.form.update(f => ({ ...f, employeeId: value }));
  }

  setInTime(value: string) {
    this.form.update(f => ({ ...f, inTime: value }));
  }

  setOutTime(value: string) {
    this.form.update(f => ({ ...f, outTime: value }));
  }

  setDate(value: string) {
    this.form.update(f => ({ ...f, attendanceDate: value }));
  }


  saveAttendance() {
    const f = this.form();

    // ===== VALIDATION =====
    this.errors.set({});
    if (!f.attendanceDate) {
      this.setError('attendanceDate', 'Select date');
    }

    if (!f.employeeIds) {
      this.setError('employeeId', 'Select employee');
    }
    if (!f.inTime) { this.setError('inTime', 'Enter in time'); }
    if (!f.inTime && f.outTime) {
      this.setError('inTime', 'Enter in time first');
    }

    if (f.inTime && f.outTime && f.inTime >= f.outTime) {
      this.setError('outTime', 'Out time must be greater than In time');
    }

    if (f.inTime && f.outTime && f.inTime >= f.outTime) {
      this.setError('outTime', 'Out time must be greater than In time');
    }
    if (f.employeeIds.length === 0) {
      this.toast.error("Please select at least one employee to mark attendance.")
      return;
    }

    // CHECK LEAVE EXISTS

    const leaveEmployees =
      f.employeeIds.filter(empId =>

        this.leaveService
          .leaves()
          .some(l =>

            l.employeeId === empId &&

            l.status !== LeaveStatus.Cancelled &&

            f.attendanceDate >= l.fromDate &&

            f.attendanceDate <= l.toDate
          )
      );


    // SHOW ERROR
    if (leaveEmployees.length > 0) {

      const names = leaveEmployees
        .map(id => this.getEmployeeName(id))
        .join(', ');

      this.toast.error(
        `Attendance cannot be marked because leave is already applied for ${names} on this date`
      );

      return;
    }
    // stop if any error
    if (Object.keys(this.errors()).length > 0) return;


    // ===== CALCULATE WORKING HOURS =====
    let workingHours = 0;
    let totalMinutes = 0;
    if (f.inTime && f.outTime) {
      const inT = new Date(`1970-01-01T${f.inTime}`);
      const outT = new Date(`1970-01-01T${f.outTime}`);
      const data = (outT.getTime() - inT.getTime()) / 3600000;
      totalMinutes = (outT.getTime() - inT.getTime()) / 60000;

      workingHours = Math.round(data * 100) / 100;
    }
    // ===== BUILD ATTENDANCE LINE =====
    try {
      if (this.selectedLine()) {

        //UPDATE EXISTING
        const updated: AttendanceLine = {
          ...this.selectedLine()!,
          inTime: f.inTime,
          outTime: f.outTime,
          workingHours,
          overtimeHours: totalMinutes > 480
            ? Math.round(totalMinutes - 480)
            : 0,
          isLate: f.inTime > '09:00',
          isEarlyExit: f.outTime < '18:00',
          isHalfDay: workingHours < 5
        };

        this.service.updateLine(updated);
        this.toast.success("Updated Successfully");

        this.selectedLine.set(null); // reset edit mode

      } else {

        // CREATE NEW
        f.employeeIds.forEach(empId => {

          const line: AttendanceLine = {
            attendanceLineId: crypto.randomUUID(),
            attendanceId: this.service.attendance()?.attendanceId!,
            employeeId: empId,
            attendanceDate: f.attendanceDate,
            attendanceType: AttendanceType.Present,
            inTime: f.inTime,
            outTime: f.outTime,
            workingHours,
            overtimeHours: totalMinutes > 480 ? Math.round(totalMinutes - 480) : 0,
            isLate: f.inTime > '09:00',
            isEarlyExit: f.outTime < '18:00',
            isHalfDay: workingHours < 5,
            timeLogs: []
          };

          this.service.addLine(line);

        });

        this.toast.success("Attendance added for selected employees");
      }
    } catch (err: any) {
      this.toast.error(err.message);
      return;
    }



    // ===== OPTIONAL: RECALCULATE SUMMARY =====
    this.service.recalculateSummary();

    // ===== RESET FORM =====
    this.form.set({
      employeeIds: [],
      attendanceDate: new Date().toISOString().split('T')[0], // 🔥 today
      inTime: '',
      outTime: ''
    });
    // ===== CLOSE MODAL =====
    this.closeModal();
  }

  toggleSelectAll() {
    const all = this.selectAll();

    if (all) {
      this.form.update(f => ({
        ...f,
        employeeIds: this.employees().map(e => e.employeeId!)
      }));
    } else {
      this.form.update(f => ({ ...f, employeeIds: [] }));
    }
  }

  toggleEmployee(empId: string) {

    this.form.update(f => {

      const exists = f.employeeIds.includes(empId);

      return {
        ...f,
        employeeIds: exists
          ? f.employeeIds.filter(id => id !== empId)
          : [...f.employeeIds, empId]
      };
    });
  }

  toggleView() {
    this.viewMode.update(v => v === 'table' ? 'grid' : 'table');
  }

  getDateForDay(day: number): string {
    const base = this.attendance(); // current header

    if (!base?.fromDate) return '';

    const d = new Date(base.fromDate);
    d.setDate(day);

    return d.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  getLineForDay(empId: string, day: number) {
    const date = this.getDateForDay(day);

    return this.lines().find(x =>
      x.employeeId === empId &&
      x.attendanceDate === date
    );
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

  clearError(field: string) {
    this.errors.update(e => {
      const copy = { ...e };
      delete copy[field];
      return copy;
    });
  }

  formatHours(hours: number): string {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}:${m.toString().padStart(2, '0')}`;
  }

  formatMinutes(mins: number): string {
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    return `${h}:${m.toString().padStart(2, '0')}`;
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

  openDatePicker(input: HTMLInputElement) {
    input.showPicker?.(); // modern browsers
    input.focus();        // fallback
  }

  clearDate(event: Event) {
    event.stopPropagation(); // prevent opening picker
    this.filterDate.set('');
  }

  permissionHours = computed(() => {

    const f = this.permissionForm();

    if (!f.fromTime || !f.toTime) return 0;

    const start = new Date(`1970-01-01T${f.fromTime}`);
    const end = new Date(`1970-01-01T${f.toTime}`);

    const diff = (end.getTime() - start.getTime()) / 3600000;

    return diff > 0
      ? Number(diff.toFixed(2))
      : 0;

  });

  // ===============================
  // OPEN / CLOSE
  // ===============================

  openPermissionModal(permission?: Permission) {

    if (permission) {

      this.selectedPermission.set(permission);

      this.permissionForm.set({
        employeeId: permission.employeeId,
        permissionDate: permission.permissionDate,

        fromTime: permission.fromTime,
        toTime: permission.toTime,

        permissionType:
          permission.permissionType ?? PermissionType.Personal,

        reason: permission.reason ?? ''
      });

    } else {

      this.selectedPermission.set(null);

      this.permissionForm.set({
        employeeId: '',
        permissionDate: new Date().toISOString().split('T')[0],

        fromTime: '',
        toTime: '',

        permissionType: PermissionType.Personal,

        reason: ''
      });

    }

    this.errors.set({});
    this.showQuickMenu.set(false);
    this.showPermissionModal.set(true);
  }

  closePermissionModal() {
    this.showPermissionModal.set(false);
    this.selectedPermission.set(null);
  }

  // ===============================
  // SETTERS
  // ===============================

  setPermissionEmployee(value: string) {
    this.permissionForm.update(f => ({
      ...f,
      employeeId: value
    }));
  }

  setPermissionDate(value: string) {
    this.permissionForm.update(f => ({
      ...f,
      permissionDate: value
    }));
  }

  setFromTime(value: string) {
    this.permissionForm.update(f => ({
      ...f,
      fromTime: value
    }));
  }

  setToTime(value: string) {
    this.permissionForm.update(f => ({
      ...f,
      toTime: value
    }));
  }

  setPermissionType(type: PermissionType) {
    this.permissionForm.update(f => ({
      ...f,
      permissionType: type
    }));
  }

  setReason(value: string) {
    this.permissionForm.update(f => ({
      ...f,
      reason: value
    }));
  }

  // ===============================
  // VALIDATION
  // ===============================

  validatePermission(): boolean {

    const f = this.permissionForm();

    this.errors.set({});

    if (!f.employeeId) {
      this.setError('employeeId', 'Select employee');
    }

    if (!f.permissionDate) {
      this.setError('permissionDate', 'Select date');
    }

    if (!f.fromTime) {
      this.setError('fromTime', 'Enter from time');
    }

    if (!f.toTime) {
      this.setError('toTime', 'Enter to time');
    }

    if (
      f.fromTime &&
      f.toTime &&
      f.fromTime >= f.toTime
    ) {
      this.setError(
        'toTime',
        'To time must be greater than from time'
      );
    }

    if (!f.reason?.trim()) {
      this.setError('reason', 'Enter reason');
    }

    return Object.keys(this.errors()).length === 0;
  }

  // ===============================
  // SAVE
  // ===============================

  savePermission() {

    if (!this.validatePermission()) {
      this.toast.error('Please fix validation errors');
      return;
    }

    const f = this.permissionForm();

    const permission: Permission = {

      permissionId:
        this.selectedPermission()?.permissionId
        ?? crypto.randomUUID(),

      permissionNumber:
        this.selectedPermission()?.permissionNumber
        ?? `PER-${Date.now()}`,

      employeeId: f.employeeId,

      permissionDate: f.permissionDate,

      fromTime: f.fromTime,
      toTime: f.toTime,

      totalHours: this.permissionHours(),

      permissionType: f.permissionType,

      reason: f.reason,

      status:
        this.selectedPermission()?.status
        ?? PermissionStatus.Pending,

      appliedOn:
        this.selectedPermission()?.appliedOn
        ?? new Date(),

      createdAt:
        this.selectedPermission()?.createdAt
        ?? new Date(),

      updatedAt: new Date()
    };

    try {

      if (this.selectedPermission()) {

        this.permissionService.update(permission);

        this.toast.success('Permission updated successfully');

      } else {

        this.permissionService.add(permission);

        this.toast.success('Permission added successfully');
      }

      this.closePermissionModal();

    } catch (err: any) {

      this.toast.error(err.message || 'Failed to save permission');
    }
  }

  hasPermission(empId: string, date: string): boolean {

    return this.permissions().some(p =>
      p.employeeId === empId &&
      p.permissionDate === date &&
      p.status !== PermissionStatus.Cancelled
    );
  }

  getPermission(empId: string, date: string) {

    return this.permissions().find(p =>
      p.employeeId === empId &&
      p.permissionDate === date &&
      p.status !== PermissionStatus.Cancelled
    );
  }

  openPermissionForRow(row: AttendanceLine) {

    const existing = this.getPermission(
      row.employeeId,
      row.attendanceDate
    );

    if (existing) {

      this.openPermissionModal(existing);

    } else {

      this.selectedPermission.set(null);

      this.permissionForm.set({
        employeeId: row.employeeId,
        permissionDate: row.attendanceDate,
        fromTime: row.inTime || '',
        toTime: row.outTime || '',
        permissionType: PermissionType.Personal,
        reason: ''
      });

      this.showPermissionModal.set(true);
    }
  }

  empTotalPermissions = computed(() => {

    const empId = this.selectedEmployee();

    if (!empId) return 0;

    return this.permissions().filter(p =>

      p.employeeId === empId &&

      p.status !== PermissionStatus.Cancelled

    ).length;

  });


  isAbsent(empId: string, date: string): boolean {

    const line = this.getLine(empId, date);

    // Explicit absent
    if (line?.attendanceType === AttendanceType.Absent) {

      console.log("true-------------------");
      return true;
    }

    // No attendance and past date
    console.log(date);
    console.log(this.isPastDate(date));
    console.log(!line && this.isPastDate(date));
    return !line && this.isPastDate(date);
  }

  isPastDate(date: string): boolean {

    // Parse manually
    const [year, month, day] = date.split('-').map(Number);

    const checkDate = new Date(year, month - 1, day);

    const today = new Date();

    // Remove time
    today.setHours(0, 0, 0, 0);

    return checkDate < today;
  }

  openLeaveModal(
    leave?: Leave,
    date?: string
  ) {

    // ===== EDIT =====
    if (leave) {

      this.selectedLeave.set(leave);

      this.leaveForm.set({

        employeeId: leave.employeeId,

        leaveTypeId:
          leave.leaveTypeId ?? '',

        fromDate: leave.fromDate,

        toDate: leave.toDate,

        reason: leave.reason ?? '',

        status:
          leave.status ??
          LeaveStatus.Pending
      });

    }

    // ===== CREATE =====
    else {

      const selectedDate =
        date ??
        new Date()
          .toISOString()
          .split('T')[0];

      this.selectedLeave.set(null);

      this.leaveForm.set({

        employeeId: '',

        leaveTypeId: '',

        fromDate: selectedDate,

        toDate: selectedDate,

        reason: '',

        status: LeaveStatus.Pending
      });
    }

    this.leaveErrors.set({});
    this.showQuickMenu.set(false);
    this.showLeaveModal.set(true);
  }

  validateLeave(): boolean {

    const f = this.leaveForm();

    const errors: Record<string, string> = {};

    // EMPLOYEE
    if (!f.employeeId) {
      errors['employeeId'] =
        'Employee is required';
    }

    // LEAVE TYPE
    if (!f.leaveTypeId) {
      errors['leaveTypeId'] =
        'Leave type is required';
    }

    // FROM DATE
    if (!f.fromDate) {
      errors['fromDate'] =
        'From date is required';
    }

    // TO DATE
    if (!f.toDate) {
      errors['toDate'] =
        'To date is required';
    }

    // DATE VALIDATION
    if (
      f.fromDate &&
      f.toDate &&
      new Date(f.fromDate) >
      new Date(f.toDate)
    ) {

      errors['toDate'] =
        'To date must be after from date';
    }

    // REASON
    if (!f.reason?.trim()) {
      errors['reason'] =
        'Reason is required';
    }

    this.leaveErrors.set(errors);

    return Object.keys(errors).length === 0;
  }

  saveLeave() {

    // VALIDATE
    if (!this.validateLeave()) {

      this.toast.error(
        'Please fix validation errors'
      );

      return;
    }



    const f = this.leaveForm();

    // FROM > TO CHECK
    if (
      new Date(f.fromDate) >
      new Date(f.toDate)
    ) {

      this.leaveErrors.update(e => ({
        ...e,
        toDate:
          'To date cannot be earlier than from date'
      }));

      this.toast.error(
        'Invalid leave date range'
      );

      return;
    }

    const alreadyExists =
      this.leaveService.exists(

        f.employeeId,

        f.fromDate,

        f.toDate,

        this.selectedLeave()?.leaveId
      );

    if (alreadyExists) {

      this.leaveErrors.update(e => ({
        ...e,

        fromDate:
          'Leave already applied for selected dates',

        toDate:
          'Leave already applied for selected dates'
      }));

      this.toast.error(
        'Leave already exists for selected date range'
      );

      return;
    }


    const leave: Leave = {

      leaveId:
        this.selectedLeave()?.leaveId ??
        crypto.randomUUID(),

      leaveNumber:
        this.selectedLeave()?.leaveNumber ??
        `LEV-${Date.now()}`,

      employeeId: f.employeeId,

      leaveTypeId: f.leaveTypeId,

      fromDate: f.fromDate,

      toDate: f.toDate,

      reason: f.reason,

      status:
        f.status ??
        LeaveStatus.Pending,

      appliedOn:
        this.selectedLeave()?.appliedOn ??
        new Date(),

      createdAt:
        this.selectedLeave()?.createdAt ??
        new Date(),

      updatedAt: new Date()
    };

    // EDIT
    if (this.selectedLeave()) {

      this.leaveService.update(leave);

      this.toast.success(
        'Leave updated successfully'
      );
    }

    // CREATE
    else {

      this.leaveService.add(leave);

      this.toast.success(
        'Leave added successfully'
      );
    }

    // CLOSE
    this.showLeaveModal.set(false);

    this.selectedLeave.set(null);

    // RESET FORM
    this.leaveForm.set({

      employeeId: '',

      leaveTypeId: '',

      fromDate: '',

      toDate: '',

      reason: '',

      status: LeaveStatus.Pending
    });

    this.leaveErrors.set({});
  }

  hasLeaveError(field: string): boolean {

    return !!this.leaveErrors()[field];
  }

  getLeaveError(field: string): string {

    return this.leaveErrors()[field];
  }

  showLeavePopover(
    event: MouseEvent,
    leave?: Leave
  ) {

    if (!leave) return;

    this.leavePopoverX.set(
      event.clientX
    );

    this.leavePopoverY.set(
      event.clientY
    );

    this.hoveredLeave.set(leave);
  }


  // HIDE

  hideLeavePopover() {

    this.hoveredLeave.set(null);
  }


  // GET LEAVE

  getLeaveByAttendance(
    attendanceId: string
  ) {

    return this.leaveService
      .leaves()
      .find(x =>

        x.leaveId === attendanceId
      );
  }

  getLeaveTypeName(
    leaveTypeId?: string
  ): string {

    if (!leaveTypeId) {
      return '-';
    }

    return this.leaveTypes()
      .find(x =>
        x.leaveTypeId === leaveTypeId
      )
      ?.leaveTypeName ?? '-';
  }

  totalLeaves = computed(() => {

    const empId =
      this.selectedEmployee();

    const attendance =
      this.attendance();

    if (
      !empId ||
      !attendance?.fromDate ||
      !attendance?.toDate
    ) {
      return 0;
    }

    const from =
      attendance.fromDate;

    const to =
      attendance.toDate;

    return new Set(

      this.leaveService
        .leaves()

        .filter(x =>

          x.employeeId === empId &&

          // OVERLAP WITH ATTENDANCE PERIOD
          x.fromDate <= to &&
          x.toDate >= from
        )

        .map(x => x.leaveId)

    ).size;
  });

}