// attendance.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Attendance } from './attendance';
import { AttendanceType, AttendanceLine } from './attendance-line';
import { ATTENDANCE_SEED } from './attendance.seed';
import { ATTENDANCE_LINES_SEED } from './attendance-line.seed';
import { PayrollPeriod } from './payroll-period';
import { PAYROLL_PERIODS } from './payroll-period.seed';

@Injectable({ providedIn: 'root' })
export class AttendanceDataClient {

  // ===== STATE =====

  private readonly _attendance = signal<Attendance | null>(null);

  private readonly _attendanceList = signal<Attendance[]>(ATTENDANCE_SEED);

  private readonly _loading = signal(false);

  // ===== SELECTORS =====

  attendance = this._attendance.asReadonly();
  attendanceList = this._attendanceList.asReadonly();
  loading = this._loading.asReadonly();
    private readonly _periods = signal<PayrollPeriod[]>(PAYROLL_PERIODS);

  periods = this._periods.asReadonly();


  lines = computed(() => this._attendance()?.attendanceLines ?? []);

  totalPresent = computed(() =>
    this.lines().reduce((sum, x) =>
      sum + (x.attendanceType === AttendanceType.Present ? 1 : x.isHalfDay ? 0.5 : 0), 0)
  );

  totalAbsent = computed(() =>
    this.lines().filter(x => x.attendanceType === AttendanceType.Absent).length
  );

  // ===== INIT =====

  setAttendance(data: Attendance) {
    this._attendance.set({
      ...data,
      attendanceLines: data.attendanceLines ?? []
    });
  }

  setAttendanceList(data: Attendance[]) { // ✅ NEW
    this._attendanceList.set(data);
  }

  clear() {
    this._attendance.set(null);
  }

getByEmployee(empId: string) {
  return this.lines().filter(a => a.employeeId === empId);
}

getByEmployeeAndDate(empId: string, from: string, to: string) {

  return ATTENDANCE_LINES_SEED.filter(a =>
    a.employeeId === empId &&
    a.attendanceDate >= from &&
    a.attendanceDate <= to
  );

}

  // ===== HEADER CRUD 
addAttendance(item: Attendance) {

  const list = this._attendanceList();

  if (this.isOverlappingPeriod(item, list)) {
    throw new Error('Attendance period overlaps with existing record');
  }

  const attendanceId = crypto.randomUUID();

  const count = list.length + 1;

  const year = new Date().getFullYear();

  const month = new Date(item.fromDate || new Date())
    .toLocaleString('default', { month: 'short' })
    .toUpperCase();

  const attendanceNumber = `ATT-${year}-${month}-${count
    .toString()
    .padStart(3, '0')}`;

  const attendancePeriodName =
    item.attendancePeriodName?.trim().toUpperCase() ?? '';

  const newItem: Attendance = {
    ...item,
    attendanceId,
    attendanceNumber,
    attendancePeriodName,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  this._attendanceList.update(list => [...list, newItem]);
}



updateAttendance(updated: Attendance) {

  const list = this._attendanceList();

  if (this.isOverlappingPeriod(updated, list, updated.attendanceId)) {
    throw new Error('Attendance period overlaps with existing record');
  }

  const normalized: Attendance = {
    ...updated,
    attendancePeriodName:
      updated.attendancePeriodName?.trim().toUpperCase(),
    updatedAt: new Date()
  };

  this._attendanceList.update(list =>
    list.map(x =>
      x.attendanceId === updated.attendanceId ? normalized : x
    )
  );
}

  deleteAttendance(id: string) {
    this._attendanceList.update(list =>
      list.filter(x => x.attendanceId !== id)
    );
  }


  private isOverlappingPeriod(
  item: Attendance,
  list: Attendance[],
  excludeId?: string
): boolean {

  const newFrom = new Date(item.fromDate);
  const newTo = new Date(item.toDate);

  return list.some(x => {

    // skip same record during update
    if (excludeId && x.attendanceId === excludeId) return false;



    const existingFrom = new Date(x.fromDate);
    const existingTo = new Date(x.toDate);

    // overlap condition
    return newFrom <= existingTo && newTo >= existingFrom;
  });
}

  // ===== LINE CRUD =====

loadLinesByAttendanceId(id: string) {
  const current = this._attendance();
  if (!current) return;

  const lines = ATTENDANCE_LINES_SEED
    .filter(x => x.attendanceId === id);

  this._attendance.set({
    ...current,
    attendanceLines: lines
  });
}

addLine(line: AttendanceLine) {

  const current = this._attendance();
  if (!current) return;

  const lines = current.attendanceLines ?? [];

  // VALIDATION: same employee + same date
  const exists = lines.some(x =>
    x.employeeId === line.employeeId &&
    x.attendanceDate === line.attendanceDate
  );

  if (exists) {
    throw new Error('Attendance already exists for this employee on this date');
  }

  //  Add line
  this._attendance.set({
    ...current,
    attendanceLines: [...lines, line]
  });
}

  updateLine(updated: AttendanceLine) {
    const current = this._attendance();
    if (!current) return;

    const updatedLines = (current.attendanceLines ?? []).map(x =>
      x.attendanceLineId === updated.attendanceLineId ? updated : x
    );

    this._attendance.set({
      ...current,
      attendanceLines: updatedLines
    });
  }

  removeLine(id: string) {
    const current = this._attendance();
    if (!current) return;

    this._attendance.set({
      ...current,
      attendanceLines: (current.attendanceLines ?? []).filter(x => x.attendanceLineId !== id)
    });
  }

  // ===== BUSINESS LOGIC =====

  updateLineField(
    line: AttendanceLine,
    field: keyof AttendanceLine,
    value: any
  ) {
    const updated = { ...line, [field]: value };

    // 🔥 Working hours
    if (updated.inTime && updated.outTime) {
      const inT = new Date(`1970-01-01T${updated.inTime}`);
      const outT = new Date(`1970-01-01T${updated.outTime}`);
      updated.workingHours =
        (outT.getTime() - inT.getTime()) / 3600000;
    } else {
      updated.workingHours = 0;
    }

    // 🔥 Attendance rules
    if (updated.attendanceType === AttendanceType.Absent) {
      updated.inTime = undefined;
      updated.outTime = undefined;
      updated.workingHours = 0;
    }

    this.updateLine(updated);
  }

  // ===== SUMMARY RECALC

  recalculateSummary() {
    const current = this._attendance();
    if (!current) return;

    const lines = current.attendanceLines ?? [];

    const totalPresentDays = lines.reduce((sum, x) =>
      sum + (x.attendanceType === AttendanceType.Present ? 1 : x.isHalfDay ? 0.5 : 0), 0);

    const totalAbsentDays = lines.filter(x =>
      x.attendanceType === AttendanceType.Absent
    ).length;

    const totalLeaveDays = lines.filter(x =>
      x.attendanceType === AttendanceType.Leave
    ).length;

    const totalWorkingHours = lines.reduce((sum, x) =>
      sum + (x.workingHours ?? 0), 0);

    const totalOvertimeHours = lines.reduce((sum, x) =>
      sum + (x.overtimeHours ?? 0), 0);

    this._attendance.set({
      ...current,
      totalPresentDays,
      totalAbsentDays,
      totalLeaveDays,
      totalWorkingHours,
      totalOvertimeHours
    });
  }

  // ===== MOCK / API =====

  loadMock(data: Attendance) {
    this.setAttendance(data);
  }

  loadMockList(data: Attendance[]) { // ✅ NEW
    this.setAttendanceList(data);
  }

  // ===== SAVE =====

  save(): Promise<Attendance> {
    const data = this._attendance();

    if (!data) {
      throw new Error('No attendance data to save');
    }

    // recalc before save
    this.recalculateSummary();

    return Promise.resolve(this._attendance()!);
  }
}