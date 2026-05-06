import { AttendanceStatus, Attendance } from "./attendance";

export const ATTENDANCE_SEED: Attendance [] = [
    {
  attendanceId: 'ATT001',

  tenantId: 'T1',
  companyId: 'C1',
  branchId: 'B1',

  attendancePeriodId: 'APR-2026',
  attendancePeriodName: 'APR-2026',

  fromDate: '2026-04-01',
  toDate: '2026-04-30',

  attendanceNumber: 'ATT-2026-APR-001',

  status: AttendanceStatus.Locked,

  attendanceLines: [],

  totalPresentDays: 0,
  totalAbsentDays: 0,
  totalLeaveDays: 0,
  totalWorkingHours: 0,
  totalOvertimeHours: 0,
  payableDays:30,
},
{
  attendanceId: 'ATT002',

  tenantId: 'T1',
  companyId: 'C1',
  branchId: 'B1',

  attendancePeriodId: 'MAY-2026',
    attendancePeriodName: 'MAY-2026',

  fromDate: '2026-05-01',
  toDate: '2026-05-31',

  attendanceNumber: 'ATT-2026-MAY-001',

  status: AttendanceStatus.Open,

  attendanceLines: [],

  totalPresentDays: 0,
  totalAbsentDays: 0,
  totalLeaveDays: 0,
  totalWorkingHours: 0,
  totalOvertimeHours: 0,
    payableDays:31,
},
{
  attendanceId: 'ATT002',

  tenantId: 'T1',
  companyId: 'C1',
  branchId: 'B1',

  attendancePeriodId: 'JUNE-2026',
    attendancePeriodName: 'JUNE-2026',

  fromDate: '2026-06-01',
  toDate: '2026-06-30',

  attendanceNumber: 'ATT-2026-JUNE-001',

  status: AttendanceStatus.Draft,

  attendanceLines: [],

  totalPresentDays: 0,
  totalAbsentDays: 0,
  totalLeaveDays: 0,
  totalWorkingHours: 0,
  totalOvertimeHours: 0,
    payableDays:30,
}
];