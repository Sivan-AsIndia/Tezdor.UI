import { AttendanceLine } from "./attendance-line";

export interface Attendance {

  // ===== CORE =====
  attendanceId?: string;
  tenantId: string;
  companyId: string;

  branchId: string;
  attendancePeriodId: string;

    attendancePeriodName: string;

  fromDate: string;   // ISO date (YYYY-MM-DD)
  toDate: string;

  attendanceNumber?: string;

  status: AttendanceStatus;

  // ===== SUMMARY =====
  totalPresentDays?: number;
  totalAbsentDays?: number;
  totalLeaveDays?: number;
  totalWorkingHours?: number;
  totalOvertimeHours?: number;

  // ===== PAYROLL =====
  isProcessedForSalary?: boolean;
  salaryProcessedOn?: Date;
  salaryId?: string;

  payableDays?: number;
  lossOfPayDays?: number;

  // ===== ATTACHMENT =====
  attachmentCount?: number;
  supportingDocument?: File;

  // ===== COLLECTION =====
  attendanceLines?: AttendanceLine[];

  // ===== AUDIT =====
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;

  isDeleted?: boolean;
}




export enum AttendanceStatus {
  Draft = 1,
  Submitted = 2,
  Approved = 3,
  Locked = 4,
  Open = 5
}

