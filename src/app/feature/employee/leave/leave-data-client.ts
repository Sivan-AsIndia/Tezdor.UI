import { Injectable, computed, inject, signal } from '@angular/core';
import { Leave, LeaveStatus } from './leave';
import { LEAVES } from './leave.seed';
import { AttendanceLine, AttendanceType } from '../attendance/attendance-line';
import { AttendanceDataClient } from '../attendance/attendance-data-client';


@Injectable({
  providedIn: 'root'
})
export class LeaveDataClient {

  // STATE

  private readonly attendanceLineService = inject(AttendanceDataClient)

  private readonly _leaves =
    signal<Leave[]>(LEAVES);

  // READONLY

  leaves =
    this._leaves.asReadonly();

  // ACTIVE LEAVES

  activeLeaves = computed(() =>

    this._leaves().filter(x =>

      x.status !== LeaveStatus.Cancelled
    )
  );

  // GET ALL

  getAll(): Leave[] {

    return this._leaves();
  }

  // GET BY ID

  getById(id: string): Leave | undefined {

    return this._leaves()
      .find(x => x.leaveId === id);
  }

  // GET BY EMPLOYEE

  getByEmployee(employeeId: string): Leave[] {

    return this._leaves()
      .filter(x => x.employeeId === employeeId);
  }

  // GET BY DATE

  getByDate(date: string): Leave[] {

    return this._leaves()
      .filter(x =>

        x.fromDate <= date &&
        x.toDate >= date
      );
  }

  // GET EMPLOYEE LEAVE BY DATE

  getEmployeeLeaveByDate(
    employeeId: string,
    date: string
  ): Leave | undefined {

    return this._leaves().find(x =>

      x.employeeId === employeeId &&

      x.fromDate <= date &&

      x.toDate >= date &&

      x.status === LeaveStatus.Approved
    );
  }

  // ADD

add(data: Leave) {

  const leave: Leave = {

    ...data,

    leaveId:
      data.leaveId ??
      crypto.randomUUID(),

    leaveNumber:
      data.leaveNumber ??
      this.generateLeaveNumber(),

    totalDays:
      this.calculateDays(
        data.fromDate,
        data.toDate
      ),

    appliedOn:
      data.appliedOn ??
      new Date(),

    createdAt: new Date(),

    updatedAt: new Date()
  };

  // SAVE LEAVE
  this._leaves.update(list => [

    ...list,

    leave
  ]);

  // =========================
  // ADD ATTENDANCE LINES
  // =========================

  const dates = this.getDateRange(
    leave.fromDate,
    leave.toDate
  );

  dates.forEach(date => {

    const line: AttendanceLine = {

      attendanceLineId:
        crypto.randomUUID(),

      attendanceId:
        leave.leaveId!,

      employeeId:
        leave.employeeId,

      attendanceDate: date,

      attendanceType:
        AttendanceType.Leave,

      leaveTypeId:
        leave.leaveTypeId,

      workingHours: 0,

      overtimeHours: 0,

      isLate: false,

      isEarlyExit: false,

      isHalfDay: false,

      remarks:
        leave.reason,

      timeLogs: [],

      createdAt: new Date()
    };

    this.attendanceLineService
      .addLine(line);
  });
}

  // UPDATE

update(data: Leave) {

  const updated: Leave = {

    ...data,

    totalDays:
      this.calculateDays(
        data.fromDate,
        data.toDate
      ),

    updatedAt: new Date()
  };

  // UPDATE LEAVE
  this._leaves.update(list =>

    list.map(x =>

      x.leaveId === updated.leaveId
        ? updated
        : x
    )
  );

  // =========================
  // REMOVE OLD LEAVE LINES
  // =========================

  this.attendanceLineService
    .removeByAttendanceId(updated.leaveId!);

  // =========================
  // RECREATE ATTENDANCE LINES
  // =========================

  const dates = this.getDateRange(
    updated.fromDate,
    updated.toDate
  );

  dates.forEach(date => {

    const line: AttendanceLine = {

      attendanceLineId:
        crypto.randomUUID(),

      attendanceId:
        updated.leaveId!,

      employeeId:
        updated.employeeId,

      attendanceDate: date,

      attendanceType:
        AttendanceType.Leave,

      leaveTypeId:
        updated.leaveTypeId,

      workingHours: 0,

      overtimeHours: 0,

      isLate: false,

      isEarlyExit: false,

      isHalfDay: false,

      remarks:
        updated.reason,

      timeLogs: [],

      createdAt: new Date(),

      updatedAt: new Date()
    };

    this.attendanceLineService
      .addLine(line);
  });
}

getDateRange(
  fromDate: string,
  toDate: string
): string[] {

  const dates: string[] = [];

  const current =
    new Date(fromDate);

  const end =
    new Date(toDate);

  while (current <= end) {

    dates.push(
      current
        .toISOString()
        .split('T')[0]
    );

    current.setDate(
      current.getDate() + 1
    );
  }

  return dates;
}
  // DELETE

  delete(id: string) {

    this._leaves.update(list =>

      list.filter(x =>

        x.leaveId !== id
      )
    );
  }

  // APPROVE

  approve(
    leaveId: string,
    approvedBy?: string
  ) {

    this._leaves.update(list =>

      list.map(x =>

        x.leaveId === leaveId

          ? {

              ...x,

              status: LeaveStatus.Approved,

              approvedBy,

              approvedOn: new Date(),

              updatedAt: new Date()
            }

          : x
      )
    );
  }

  // REJECT

  reject(
    leaveId: string,
    reason?: string,
    rejectedBy?: string
  ) {

    this._leaves.update(list =>

      list.map(x =>

        x.leaveId === leaveId

          ? {

              ...x,

              status: LeaveStatus.Rejected,

              rejectionReason: reason,

              rejectedBy,

              rejectedOn: new Date(),

              updatedAt: new Date()
            }

          : x
      )
    );
  }

  // CANCEL

  cancel(id: string) {

    this._leaves.update(list =>

      list.map(x =>

        x.leaveId === id

          ? {

              ...x,

              status: LeaveStatus.Cancelled,

              updatedAt: new Date()
            }

          : x
      )
    );
  }

  // EXISTS

  exists(
    employeeId: string,
    fromDate: string,
    toDate: string,
    excludeId?: string
  ): boolean {

    return this._leaves().some(x =>

      x.employeeId === employeeId &&

      x.leaveId !== excludeId &&

      (
        fromDate <= x.toDate &&
        toDate >= x.fromDate
      )
    );
  }

  // CALCULATE DAYS

  calculateDays(
    fromDate: string,
    toDate: string
  ): number {

    const from = new Date(fromDate);
    const to = new Date(toDate);

    const diff =
      to.getTime() - from.getTime();

    return Math.floor(
      diff / (1000 * 60 * 60 * 24)
    ) + 1;
  }

  // GENERATE NUMBER

  private generateLeaveNumber(): string {

    const count =
      this._leaves().length + 1;

    return `LEV-${String(count)
      .padStart(4, '0')}`;
  }

  // RESET SEED

  resetSeed() {

    this._leaves.set(LEAVES);
  }

}