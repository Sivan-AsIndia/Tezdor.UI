import { Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AttendanceLine, AttendanceType } from '../attendance-line';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal';
import { AttendanceStatus } from '../attendance';
import { AttendanceDataClient } from '../attendance-data-client';
import { EmployeeDataClient } from '../../employee-data-client';
import { ToastNotifier } from '../../../../core/services/toast';
import { PermissionDataClient } from '../../permission/permission-data-client';
import { LeaveTypeDataClient } from '../../leave/leave-type-data-client';
import { LeaveDataClient } from '../../leave/leave-data-client';
import { Permission, PermissionStatus, PermissionType } from '../../permission/permission';
import { Leave, LeaveStatus } from '../../leave/leave';
import { CommonModule } from '@angular/common';
import { SearchDropdownComponent } from '../../../../shared/components/search-dropdown/search-dropdown';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MasterDataClient } from '../../../../core/services/master-data';
import { ShiftDataClient } from '../../shift/shift-data-client';
import { ShiftAssignmentDataClient } from '../../shift/shift-assignment-data-client';

@Component({
  selector: 'app-attendance-lines',
  imports: [ConfirmModalComponent, RouterModule, CommonModule, SearchDropdownComponent, MatDatepickerModule],
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
  private readonly masterDataClient =
    inject(MasterDataClient);
  private readonly shiftService =
    inject(ShiftDataClient);

  private readonly shiftAssignmentService =
    inject(ShiftAssignmentDataClient);


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
  employeeDropdownItems = computed(() =>

    this.employees()

      .filter(x => !!x.employeeId)

      .map(x => ({

        id: x.employeeId!,

        name:
          `${x.firstName} ${x.lastName}`

      }))
  );
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

  showLeaveDetailsPopup =
    signal(false);

  showPermissionDetailsPopup =
    signal(false);

  editingOtEmployeeId =
    signal<string | null>(null);

  editingOtHours =
    signal<number>(0);

  editingOtReason =
    signal('');

  rejectingOtEmployeeId =
    signal<string | null>(null);

  rejectOtReason =
    signal('');

  showRejectOtPopup =
    signal(false);

  showOtEditPopup =
    signal(false);

  editingOtEmployee =
    signal<any | null>(null);

  editOtForm = signal({

    otHours: 0,

    reason: ''

  });

  showRejectAllOtPopup =
    signal(false);

  rejectAllOtReason =
    signal('');

  selectedFailedEmployees =
    signal<string[]>([]);



  /* =========================================================
 ATTENDANCE RESULT
========================================================= */

  attendanceFailedList = signal<{

    employeeId: string;

    employeeName: string;

    reason: string;

  }[]>([]);

  attendanceOtList = signal<
    {
      employeeId: string;

      employeeName: string;

      shiftName: string;

      otMinutes: number;

      otHours: number;

      approved: boolean;

      rejected: boolean;

      otRejectReason?: string;

      /* NEW */

      isOtEdited?: boolean;

      otEditReason?: string;

    }[]
  >([]);

  showAttendanceResultPopup =
    signal(false);




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
      item.totalOtMinutes += a.approvedOtMinutes || 0;
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

    this.employeeAttendanceLine()

      .reduce(

        (sum, x) =>

          sum +

          (

            x.approvedOtMinutes

            ||


            0

          ),

        0

      )

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

  saveEdit(
    row: AttendanceLine
  ) {

    const f =
      this.editForm();

    /* =========================
       BASIC VALIDATION
    ========================= */

    if (
      !f.inTime
      ||
      !f.outTime
    ) {

      this.toast.error(
        'Enter in & out time'
      );

      return;
    }

    if (
      f.inTime >=
      f.outTime
    ) {

      this.toast.error(
        'Out time must be greater'
      );

      return;
    }

    /* =========================
       GET EMPLOYEE SHIFT
    ========================= */

    const shift =
      this.getEmployeeShift(
        row.employeeId
      );

    if (!shift) {

      this.toast.error(
        'No shift assigned'
      );

      return;
    }

    /* =========================
       TIME CONVERSION
    ========================= */

    const shiftStart =
      this.timeToMinutes(
        shift.startTime
      );

    const shiftEnd =
      this.timeToMinutes(
        shift.endTime
      );

    const inMinutes =
      this.timeToMinutes(
        f.inTime
      );

    const outMinutes =
      this.timeToMinutes(
        f.outTime
      );

    /* =========================
       GRACE VALIDATION
    ========================= */

    const lateGrace =
      shift.lateGraceMinutes || 0;

    const earlyGrace =
      shift.earlyOutGraceMinutes || 0;

    const allowedIn =
      shiftStart + lateGrace;

    const allowedOut =
      shiftEnd - earlyGrace;

    const isLate =
      inMinutes > allowedIn;

    const isEarlyExit =
      outMinutes < allowedOut;

    /* STRICT VALIDATION */

    if (isLate) {

      this.toast.error(

        `Late entry exceeded grace period (${lateGrace} mins)`

      );

      return;
    }

    if (isEarlyExit) {

      this.toast.error(

        `Early exit exceeded grace period (${earlyGrace} mins)`

      );

      return;
    }

    /* =========================
       WORKING HOURS
    ========================= */

    const totalMinutes =
      outMinutes - inMinutes;

    const workingHours =
      this.minutesToHours(
        totalMinutes
      );

    /* =========================
       OT CALCULATION
    ========================= */

    let overtimeMinutes = 0;

    const shiftDuration =
      shiftEnd - shiftStart;

    const extraMinutes =
      totalMinutes - shiftDuration;

    const eligibleForOt =

      shift.allowOvertime

      &&

      extraMinutes >=
      (
        shift.minimumOvertimeMinutes
        || 0
      );

    if (eligibleForOt) {

      overtimeMinutes =
        extraMinutes;

    }

    /* =========================
       UPDATE LINE
    ========================= */

    const updated:
      AttendanceLine = {

      ...row,

      inTime:
        f.inTime,

      outTime:
        f.outTime,

      workingHours,

      overtimeHours: 0,


      originalOtHours:
        this.minutesToHours(
          overtimeMinutes
        ),

      originalOtMinutes:
        overtimeMinutes,

      approvedOtHours:
        row.approvedOtHours || 0,

      approvedOtMinutes:
        row.approvedOtMinutes || 0,

      isOtEligible:
        eligibleForOt,

      isLate: false,

      isEarlyExit: false,

      isHalfDay:
        workingHours < 5
    };

    this.service.updateLine(
      updated
    );

    /* =========================
       PUSH TO OT APPROVAL
    ========================= */

    if (
      eligibleForOt
      &&
      overtimeMinutes > 0
    ) {

      const emp =
        this.employees()
          .find(x =>

            x.employeeId ===
            row.employeeId
          );

      this.attendanceOtList.update(list => [

        ...list.filter(x =>

          x.employeeId !==
          row.employeeId
        ),

        {

          employeeId:
            row.employeeId,

          employeeName:
            emp
              ?

              `${emp.firstName} ${emp.lastName}`

              :

              'Employee',

          shiftName:
            shift.shiftName,

          otMinutes:
            overtimeMinutes,

          otHours:
            this.minutesToHours(
              overtimeMinutes
            ),

          approved: false,

          rejected: false
        }

      ]);

      this.showAttendanceResultPopup.set(
        true
      );
    }

    this.toast.success(
      'Attendance updated'
    );

    this.editingLineId.set(
      null
    );
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

  setDate(
    value: Date | null
  ) {

    if (!value) {
      return;
    }

    const day =

      String(
        value.getDate()
      ).padStart(2, '0');

    const month =

      String(
        value.getMonth() + 1
      ).padStart(2, '0');

    const year =
      value.getFullYear();

    const formattedDate =

      `${year}-${month}-${day}`;

    this.form.update(f => ({

      ...f,

      attendanceDate:
        formattedDate

    }));

  }


  saveAttendance() {

    const f =
      this.form();

    this.errors.set({});

    this.attendanceFailedList.set([]);
    this.attendanceOtList.set([]);

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!f.attendanceDate) {

      this.setError(
        'attendanceDate',
        'Select date'
      );
    }

    if (f.employeeIds.length === 0) {

      this.toast.error(
        'Select employees'
      );

      return;
    }

    if (!f.inTime) {

      this.setError(
        'inTime',
        'Enter in time'
      );
    }

    // if (!f.outTime) {

    //   this.setError(
    //     'outTime',
    //     'Enter out time'
    //   );
    // }

    if (

      f.inTime
      &&

      f.outTime
      &&

      f.inTime >= f.outTime

    ) {

      this.setError(
        'outTime',
        'Out time must be greater'
      );
    }

    if (
      Object.keys(
        this.errors()
      ).length > 0
    ) {

      return;

    }

    /* =====================================================
       PROCESS EMPLOYEE
    ===================================================== */

    f.employeeIds.forEach(empId => {

      const emp =
        this.employees()
          .find(x =>
            x.employeeId === empId
          );

      if (!emp) {
        return;
      }

      /* =====================================================
         LEAVE CHECK
      ===================================================== */

      const hasLeave =

        this.leaveService
          .leaves()

          .some(l =>

            l.employeeId === empId

            &&

            l.status !== LeaveStatus.Cancelled

            &&

            f.attendanceDate >= l.fromDate

            &&

            f.attendanceDate <= l.toDate
          );

      if (hasLeave) {

        this.attendanceFailedList.update(list => [

          ...list,

          {

            employeeId: empId,

            employeeName:
              `${emp.firstName} ${emp.lastName}`,

            reason:
              'Employee already on leave'

          }

        ]);

        return;
      }

      /* =====================================================
         GET SHIFT
      ===================================================== */

      const shift =
        this.getEmployeeShift(
          empId
        );

      if (!shift) {

        this.attendanceFailedList.update(list => [

          ...list,

          {

            employeeId: empId,

            employeeName:
              `${emp.firstName} ${emp.lastName}`,

            reason:
              'No shift assigned'

          }

        ]);

        return;
      }

      /* =====================================================
         TIME CONVERSION
      ===================================================== */

      const shiftStart =
        this.timeToMinutes(
          shift.startTime
        );

      const shiftEnd =
        this.timeToMinutes(
          shift.endTime
        );

      const inMinutes =
        this.timeToMinutes(
          f.inTime
        );

      const outMinutes =
        this.timeToMinutes(
          f.outTime
        );

      /* =====================================================
         GRACE PERIOD
      ===================================================== */

      const lateGrace =
        shift.lateGraceMinutes || 0;

      const earlyGrace =
        shift.earlyOutGraceMinutes || 0;

      const allowedInTime =
        shiftStart + lateGrace;

      const allowedOutTime =
        shiftEnd - earlyGrace;

      const isLate =
        inMinutes > allowedInTime;

      const isEarlyExit =
        outMinutes < allowedOutTime;

      /* =====================================================
         STRICT LATE VALIDATION
      ===================================================== */

      if (isLate) {

        this.attendanceFailedList.update(list => [

          ...list,

          {

            employeeId: empId,

            employeeName:
              `${emp.firstName} ${emp.lastName}`,

            reason:
              `Late entry exceeded grace period (${lateGrace} mins)`

          }

        ]);

        return;
      }

      /* =====================================================
         STRICT EARLY EXIT VALIDATION
      ===================================================== */

      if (isEarlyExit) {

        this.attendanceFailedList.update(list => [

          ...list,

          {

            employeeId: empId,

            employeeName:
              `${emp.firstName} ${emp.lastName}`,

            reason:
              `Early exit exceeded grace period (${earlyGrace} mins)`

          }

        ]);

        return;
      }

      /* =====================================================
         WORKING HOURS
      ===================================================== */
      let totalMinutes = 0;

      let workingHours = 0;

      /* ONLY IF OUT TIME EXISTS */

      if (f.outTime) {

        totalMinutes =

          outMinutes - inMinutes;

        workingHours =

          this.minutesToHours(
            totalMinutes
          );

      }

      /* =====================================================
         OT CALCULATION
      ===================================================== */

      let overtimeMinutes = 0;

      const shiftDuration =
        shiftEnd - shiftStart;

      const extraMinutes =
        totalMinutes - shiftDuration;

      const eligibleForOt =

        shift.allowOvertime

        &&

        extraMinutes >=
        (
          shift.minimumOvertimeMinutes
          || 0
        );

      if (eligibleForOt) {

        overtimeMinutes =
          extraMinutes;

        this.attendanceOtList.update(list => [

          ...list,

          {

            employeeId: empId,

            employeeName:
              `${emp.firstName} ${emp.lastName}`,

            shiftName:
              shift.shiftName,

            otMinutes:
              overtimeMinutes,

            otHours:
              this.minutesToHours(
                overtimeMinutes
              ),

            approved:
              true,

            rejected:
              false,

            otRejectReason:
              ''

          }

        ]);
      }

      /* =====================================================
         SAVE ATTENDANCE
      ===================================================== */

      const line: AttendanceLine = {

        attendanceLineId:
          crypto.randomUUID(),

        attendanceId:
          this.service
            .attendance()
            ?.attendanceId!,

        employeeId:
          empId,

        attendanceDate:
          f.attendanceDate,

        attendanceType:
          AttendanceType.Present,

        inTime:
          f.inTime,

        outTime:
          f.outTime,

        workingHours,

        overtimeHours: 0,

        isOtEligible:
          eligibleForOt,

        isOtApproved:
          false,

        isOtRejected:
          false,

        approvedOtHours:
          0,

        approvedOtMinutes:
          0,

        originalOtHours:
          this.minutesToHours(
            overtimeMinutes
          ),

        originalOtMinutes:
          overtimeMinutes,
        isLate:
          false,

        isEarlyExit:
          false,

        isHalfDay:
          workingHours < 5,

        timeLogs: [],

        otRejectReason:
          ''

      };

      try {

        this.service.addLine(
          line
        );

      }

      catch (err: any) {

        this.attendanceFailedList.update(list => [

          ...list,

          {

            employeeId: empId,

            employeeName:
              `${emp.firstName} ${emp.lastName}`,

            reason:
              err.message

          }

        ]);

      }

    });

    /* =====================================================
       SUMMARY
    ===================================================== */

    this.service.recalculateSummary();

    this.toast.success(
      'Attendance processed'
    );

    /* =====================================================
       CLOSE MAIN MODAL
    ===================================================== */

    this.closeModal();

    /* =====================================================
       OPEN RESULT POPUP
    ===================================================== */

    /* OPEN RESULT POPUP ONLY IF NEEDED */

    const hasFailedAttendance =

      this.attendanceFailedList()
        .length > 0;

    const hasOtEmployees =

      this.attendanceOtList()
        .length > 0;

    if (
      hasFailedAttendance
      ||
      hasOtEmployees
    ) {

      this.showAttendanceResultPopup.set(
        true
      );

    }
    /* =====================================================
       RESET FORM
    ===================================================== */

    this.form.set({

      employeeIds: [],

      attendanceDate:
        new Date()
          .toISOString()
          .split('T')[0],

      inTime: '',

      outTime: ''

    });

  }



  rejectOtPopup(
    employeeId: string
  ) {

    this.rejectingOtEmployeeId.set(
      employeeId
    );

    this.rejectOtReason.set('');

    this.showRejectOtPopup.set(
      true
    );
  }

  approveOt(
    employeeId: string,
    showToast = true
  ) {

    const ot =

      this.attendanceOtList()
        .find(x =>

          x.employeeId === employeeId
        );

    if (!ot) {
      return;
    }

    this.service
      .updateLineByEmployee(

        employeeId,

        line => ({

          ...line,

          overtimeHours:
            ot.otHours,
          overtimeMinutes:
            ot.otMinutes,


          approvedOtHours:
            ot.otHours,

          approvedOtMinutes:
            ot.otMinutes,

          isOtApproved: true,

          isOtRejected: false,

          otApprovedOn:
            new Date()
              .toISOString()

        })
      );

    /* REMOVE FROM LIST */

    this.attendanceOtList.update(list =>

      list.filter(x =>

        x.employeeId !== employeeId
      )
    );

    if (showToast) {

      this.toast.success(
        'OT approved'
      );

    }
    this.closeAttendanceSummaryIfEmpty();
  }

  rejectOt(
    employeeId: string,
    reason: string,
    showToast = true
  ) {

    this.service
      .updateLineByEmployee(

        employeeId,

        line => ({

          ...line,

          overtimeHours: 0,

          approvedOtHours: 0,

          approvedOtMinutes: 0,

          isOtApproved: false,

          isOtRejected: true,

          otRejectReason:
            reason

        })
      );

    /* REMOVE FROM LIST */

    this.attendanceOtList.update(list =>

      list.filter(x =>

        x.employeeId !== employeeId
      )
    );

    if (showToast) {

      this.toast.success(
        'OT rejected'
      );

    }

    this.closeAttendanceSummaryIfEmpty();
  }


  confirmRejectOt() {

    const employeeId =
      this.rejectingOtEmployeeId();

    if (!employeeId) {
      return;
    }

    const reason =
      this.rejectOtReason()
        .trim();

    if (!reason) {

      this.toast.error(
        'Enter reject reason'
      );

      return;
    }

    this.rejectOt(
      employeeId,
      reason,
      true
    );

    this.showRejectOtPopup.set(
      false
    );

    this.rejectingOtEmployeeId.set(
      null
    );

    this.rejectOtReason.set('');
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

  setFilterDate(
    value: Date | null
  ) {

    if (!value) {

      this.filterDate.set('');

      return;
    }

    const day =

      String(
        value.getDate()
      ).padStart(2, '0');

    const month =

      String(
        value.getMonth() + 1
      ).padStart(2, '0');

    const year =
      value.getFullYear();

    const formattedDate =

      `${year}-${month}-${day}`;

    this.filterDate.set(
      formattedDate
    );

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

  setPermissionDate(
    value: Date | null
  ) {

    if (!value) {
      return;
    }

    const day =

      String(
        value.getDate()
      ).padStart(2, '0');

    const month =

      String(
        value.getMonth() + 1
      ).padStart(2, '0');

    const year =
      value.getFullYear();

    const formattedDate =

      `${year}-${month}-${day}`;

    this.permissionForm.update(f => ({

      ...f,

      permissionDate:
        formattedDate

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

    const hasLeave =
      this.leaveService
        .leaves()
        .some(l =>

          l.employeeId === f.employeeId &&

          l.status !== LeaveStatus.Cancelled &&

          f.permissionDate >= l.fromDate &&

          f.permissionDate <= l.toDate
        );

    if (hasLeave) {

      this.toast.error(
        'Permission cannot be applied because leave already exists on this date'
      );

      return;
    }

    const alreadyExists =
      this.permissionService
        .permissions()
        .some(p =>

          p.employeeId === f.employeeId &&
          p.permissionDate === f.permissionDate &&
          p.status !== PermissionStatus.Cancelled
        );

    if (alreadyExists) {

      this.toast.error(
        'Only one permission is allowed per day'
      );

      return;
    }

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

    const hasAttendance =
      this.service.hasAttendance(

        f.employeeId,

        f.fromDate,

        f.toDate,

        this.selectedLeave()?.leaveId
      );

    if (hasAttendance) {
      this.leaveErrors.update(e => ({
        ...e,

        fromDate:
          'Attendance already exists for selected dates',

        toDate:
          'Attendance already exists for selected dates'
      }));

      this.toast.error(
        'Attendance already exists for selected dates'
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





  openLeavePopup(
    leave?: Leave
  ) {

    if (!leave) return;

    this.selectedLeave.set(leave);

    this.showLeaveDetailsPopup.set(true);
  }

  closeLeavePopup() {

    this.showLeaveDetailsPopup.set(false);

    this.selectedLeave.set(null);
  }

  openPermissionPopup(
    permission?: Permission
  ) {

    if (!permission) {
      return;
    }

    this.selectedPermission.set(permission);

    this.showPermissionDetailsPopup.set(true);
  }

  closePermissionPopup() {

    this.selectedPermission.set(null);

    this.showPermissionDetailsPopup.set(false);
  }

  openOtEdit(
    item: any
  ) {

    this.editingOtEmployee.set(
      item
    );

    this.editOtForm.set({

      otHours:
        item.otHours || 0,

      reason: ''

    });

    this.showOtEditPopup.set(
      true
    );
  }

  confirmOtEditApprove() {

    const employee =

      this.editingOtEmployee();

    if (!employee) {
      return;
    }

    const form =
      this.editOtForm();

    if (

      !form.otHours
      ||

      form.otHours < 0

    ) {

      this.toast.error(
        'Enter valid OT hours'
      );

      return;
    }

    if (

      !form.reason
        .trim()

    ) {

      this.toast.error(
        'Enter edit reason'
      );

      return;
    }

    /* UPDATE OT LIST */

    this.attendanceOtList.update(list =>

      list.map(x =>

        x.employeeId ===
          employee.employeeId

          ?

          {

            ...x,

            otHours:
              form.otHours,

            otMinutes:
              Math.round(
                form.otHours * 60
              ),

            isOtEdited:
              true,

            otEditReason:
              form.reason

          }

          :

          x
      )
    );

    /* AUTO APPROVE */

    this.approveOt(
      employee.employeeId,
      true
    );

    this.toast.success(
      'OT updated & approved'
    );

    this.showOtEditPopup.set(
      false
    );

    this.editingOtEmployee.set(
      null
    );
  }

  closeOtEditPopup() {

    this.showOtEditPopup.set(
      false
    );

    this.editingOtEmployee.set(
      null
    );
  }

  closeAttendanceSummaryIfEmpty() {

    if (

      this.attendanceOtList()
        .length === 0

      &&

      this.attendanceFailedList()
        .length === 0

    ) {

      this.showAttendanceResultPopup.set(
        false
      );

    }
  }

  saveOtEdit() {

    this.attendanceOtList.update(list =>

      list.map(x =>

        x.employeeId ===
          this.editingOtEmployeeId()

          ?

          {

            ...x,

            otHours:
              this.editingOtHours(),

            isOtEdited:
              true,

            otEditReason:
              this.editingOtReason()

          }

          :

          x
      )
    );

  }


  approveAllOt() {

    const items =
      [...this.attendanceOtList()];

    items.forEach(item => {

      this.approveOt(
        item.employeeId,
        false
      );

    });

    this.toast.success(
      'All OT approved'
    );
  }

  rejectAllOt() {

    this.rejectAllOtReason.set(
      ''
    );

    this.showRejectAllOtPopup.set(
      true
    );
  }

  confirmRejectAllOt() {

    const reason =

      this.rejectAllOtReason()
        .trim();

    if (!reason) {

      this.toast.error(
        'Enter reject reason'
      );

      return;
    }

    const items =
      [...this.attendanceOtList()];

    items.forEach(item => {

      this.rejectOt(

        item.employeeId,

        reason,
        false

      );

    });

    this.showRejectAllOtPopup.set(
      false
    );

    this.rejectAllOtReason.set(
      ''
    );

    this.toast.success(
      'All OT rejected'
    );
  }

  closeRejectAllOtPopup() {

    this.showRejectAllOtPopup.set(
      false
    );

    this.rejectAllOtReason.set(
      ''
    );
  }


  formatDate(
    date: Date
  ): string {

    const day =
      String(
        date.getDate()
      ).padStart(2, '0');

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, '0');

    const year =
      date.getFullYear();

    return `${year}-${month}-${day}`;

  }

  /* =====================================================
   DESIGNATION
===================================================== */

  getDesignation(
    designationId?: string
  ): string {

    if (!designationId)
      return '-';

    return (

      this.masterDataClient
        .designations()
        .find(x =>

          x.id === designationId

        )

        ?.name

      ||

      '-'

    );

  }

  /* =========================================================
     GET EMPLOYEE SHIFT
  ========================================================= */

  getEmployeeShift(
    empId: string
  ) {

    const emp =
      this.employees()
        .find(x =>
          x.employeeId === empId
        );

    if (!emp) {
      return null;
    }

    const assignments =

      this.shiftAssignmentService
        .assignments()

        .filter(x => {

          if (!x.isActive) {
            return false;
          }

          /* EMPLOYEE */
          if (
            x.employeeIds?.includes(empId)
          ) {
            return true;
          }

          /* DEPARTMENT */
          if (
            x.departmentIds?.includes(
              emp.departmentId!
            )
          ) {
            return true;
          }

          /* DESIGNATION */
          if (
            x.designationIds?.includes(
              emp.designationId!
            )
          ) {
            return true;
          }

          return false;
        });

    /* PRIORITY
       Employee
       Department
       Designation
    */

    const employeeAssignment =
      assignments.find(x =>
        x.employeeIds?.includes(empId)
      );

    if (employeeAssignment) {

      return this.shiftService
        .shifts()
        .find(s =>
          s.shiftId ===
          employeeAssignment.shiftId
        );
    }

    const departmentAssignment =
      assignments.find(x =>
        x.departmentIds?.includes(
          emp.departmentId!
        )
      );

    if (departmentAssignment) {

      return this.shiftService
        .shifts()
        .find(s =>
          s.shiftId ===
          departmentAssignment.shiftId
        );
    }

    const designationAssignment =
      assignments.find(x =>
        x.designationIds?.includes(
          emp.designationId!
        )
      );

    if (designationAssignment) {

      return this.shiftService
        .shifts()
        .find(s =>
          s.shiftId ===
          designationAssignment.shiftId
        );
    }

    /* DEFAULT SHIFT */
    return this.shiftService
      .shifts()
      .find(x =>

        x.isDefault
        &&

        x.isActive
      );
  }

  /* =========================================================
     TIME HELPERS
  ========================================================= */

  timeToMinutes(
    value: string
  ): number {

    const [h, m] =
      value.split(':').map(Number);

    return (h * 60) + m;
  }

  minutesToHours(
    mins: number
  ): number {

    return Math.round(
      (mins / 60) * 100
    ) / 100;
  }


  toggleSelectAllFailed(
    checked: boolean
  ) {

    if (checked) {

      this.selectedFailedEmployees.set(

        this.attendanceFailedList()
          .map(x => x.employeeId)

      );

    }

    else {

      this.selectedFailedEmployees.set([]);

    }
  }

  toggleFailedEmployee(
    employeeId: string
  ) {

    this.selectedFailedEmployees.update(list =>

      list.includes(employeeId)

        ?

        list.filter(x => x !== employeeId)

        :

        [...list, employeeId]

    );
  }

  approveFailedAttendance() {

    const selected =
      this.selectedFailedEmployees();

    if (selected.length === 0) {

      this.toast.error(
        'Select employees'
      );

      return;
    }

    const form =
      this.form();

    selected.forEach(empId => {

      const inMinutes =
        this.timeToMinutes(
          form.inTime
        );

      const outMinutes =
        this.timeToMinutes(
          form.outTime
        );

      const totalMinutes =
        outMinutes - inMinutes;

      const workingHours =
        this.minutesToHours(
          totalMinutes
        );

      const line: AttendanceLine = {

        attendanceLineId:
          crypto.randomUUID(),

        attendanceId:
          this.service
            .attendance()
            ?.attendanceId!,

        employeeId:
          empId,

        attendanceDate:
          form.attendanceDate,

        attendanceType:
          AttendanceType.Present,

        inTime:
          form.inTime,

        outTime:
          form.outTime,

        workingHours,

        overtimeHours: 0,

        approvedOtHours: 0,

        approvedOtMinutes: 0,

        isOtApproved: false,

        isOtRejected: false,

        isLate: true,

        isEarlyExit: false,

        isHalfDay:
          workingHours < 5,

        remarks:
          'Attendance overridden by admin',

        timeLogs: []

      };

      this.service.addLine(line);

    });

    /* REMOVE SAVED FAILED */

    this.attendanceFailedList.update(list =>

      list.filter(x =>

        !selected.includes(
          x.employeeId
        )
      )
    );

    this.selectedFailedEmployees.set([]);

    this.toast.success(
      'Attendance saved successfully'
    );

    this.closeAttendanceSummaryIfEmpty();
  }
}