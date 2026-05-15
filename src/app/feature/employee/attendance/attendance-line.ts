import { AttendanceTimeLog } from "./attendance-time-log";

export interface AttendanceLine {
  attendanceLineId: string;

  attendanceId: string;
  employeeId: string;

  attendanceDate: string; // ISO date

  attendanceType: AttendanceType;

  // Leave
  leaveTypeId?: string;

  // Shift
  shiftId?: string;

  // Time (use string for UI binding HH:mm or ISO)
  inTime?: string;
  outTime?: string;

  // Derived
  workingHours: number;

  // Flags
  isLate: boolean;
  isEarlyExit: boolean;
  isHalfDay: boolean;

  // Remarks
  remarks?: string;

  // Navigation
  timeLogs: AttendanceTimeLog[];

  overtimeHours: number;

  /* OT APPROVAL */

  isOtEligible?: boolean;

  isOtApproved?: boolean;

  isOtRejected?: boolean;

  approvedOtHours?: number;

  approvedOtMinutes?: number;

  otApprovedOn?: string;

  otApprovedBy?: string;

  otRejectReason?: string;

  /* OT EDIT */

  isOtEdited?: boolean;

  originalOtHours?: number;

  originalOtMinutes?: number;

  otEditReason?: string;

  // ===== AUDIT =====
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export enum AttendanceType {
  Present = 1,
  Absent = 2,
  Leave = 3,
  Holiday = 4,
  WeekOff = 5
}