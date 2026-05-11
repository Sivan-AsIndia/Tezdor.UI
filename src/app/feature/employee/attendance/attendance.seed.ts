import { AttendanceStatus, Attendance } from "./attendance";

export const ATTENDANCE_SEED: Attendance [] = [
  // ────────────────────────────────────────────────────────────────────
  // STATUS: Draft (3 records)
  // ────────────────────────────────────────────────────────────────────
  {
    attendanceId: 'ATT001',
    tenantId: 'T1',
    companyId: 'C1',
    branchId: 'B1',

    attendancePeriodId: 'JAN-2026',
    attendancePeriodName: 'JAN-2026',

    fromDate: '2026-01-01',
    toDate: '2026-01-31',

    attendanceNumber: 'ATT-2026-JAN-001',

    status: AttendanceStatus.Draft,

    attendanceLines: [],

    totalPresentDays: 20,
    totalAbsentDays: 2,
    totalLeaveDays: 3,
    totalWorkingHours: 160,
    totalOvertimeHours: 10,
    payableDays: 31,
  },
  {
    attendanceId: 'ATT002',
    tenantId: 'T1',
    companyId: 'C1',
    branchId: 'B1',

    attendancePeriodId: 'FEB-2026',
    attendancePeriodName: 'FEB-2026',

    fromDate: '2026-02-01',
    toDate: '2026-02-28',

    attendanceNumber: 'ATT-2026-FEB-001',

    status: AttendanceStatus.Draft,

    attendanceLines: [],

    totalPresentDays: 18,
    totalAbsentDays: 1,
    totalLeaveDays: 2,
    totalWorkingHours: 144,
    totalOvertimeHours: 8,
    payableDays: 28,
  },
  {
    attendanceId: 'ATT003',
    tenantId: 'T1',
    companyId: 'C1',
    branchId: 'B1',

    attendancePeriodId: 'MAR-2026',
    attendancePeriodName: 'MAR-2026',

    fromDate: '2026-03-01',
    toDate: '2026-03-31',

    attendanceNumber: 'ATT-2026-MAR-001',

    status: AttendanceStatus.Draft,

    attendanceLines: [],

    totalPresentDays: 22,
    totalAbsentDays: 0,
    totalLeaveDays: 4,
    totalWorkingHours: 176,
    totalOvertimeHours: 12,
    payableDays: 31,
  },

  // ────────────────────────────────────────────────────────────────────
  // STATUS: Submitted (2 records)
  // ────────────────────────────────────────────────────────────────────
  {
    attendanceId: 'ATT004',
    tenantId: 'T1',
    companyId: 'C1',
    branchId: 'B1',

    attendancePeriodId: 'APR-2026',
    attendancePeriodName: 'APR-2026',

    fromDate: '2026-04-01',
    toDate: '2026-04-30',

    attendanceNumber: 'ATT-2026-APR-001',

    status: AttendanceStatus.Submitted,

    attendanceLines: [],

    totalPresentDays: 21,
    totalAbsentDays: 1,
    totalLeaveDays: 2,
    totalWorkingHours: 168,
    totalOvertimeHours: 15,
    payableDays: 30,
  },
  {
    attendanceId: 'ATT005',
    tenantId: 'T1',
    companyId: 'C1',
    branchId: 'B1',

    attendancePeriodId: 'MAY-2026',
    attendancePeriodName: 'MAY-2026',

    fromDate: '2026-05-01',
    toDate: '2026-05-31',

    attendanceNumber: 'ATT-2026-MAY-001',

    status: AttendanceStatus.Submitted,

    attendanceLines: [],

    totalPresentDays: 23,
    totalAbsentDays: 0,
    totalLeaveDays: 1,
    totalWorkingHours: 184,
    totalOvertimeHours: 20,
    payableDays: 31,
  },

  // ────────────────────────────────────────────────────────────────────
  // STATUS: Approved (3 records)
  // ────────────────────────────────────────────────────────────────────
  {
    attendanceId: 'ATT006',
    tenantId: 'T1',
    companyId: 'C1',
    branchId: 'B1',

    attendancePeriodId: 'JUN-2026',
    attendancePeriodName: 'JUN-2026',

    fromDate: '2026-06-01',
    toDate: '2026-06-30',

    attendanceNumber: 'ATT-2026-JUN-001',

    status: AttendanceStatus.Approved,

    attendanceLines: [],

    totalPresentDays: 20,
    totalAbsentDays: 2,
    totalLeaveDays: 3,
    totalWorkingHours: 160,
    totalOvertimeHours: 5,
    payableDays: 30,
  },
  {
    attendanceId: 'ATT007',
    tenantId: 'T1',
    companyId: 'C1',
    branchId: 'B1',

    attendancePeriodId: 'JUL-2026',
    attendancePeriodName: 'JUL-2026',

    fromDate: '2026-07-01',
    toDate: '2026-07-31',

    attendanceNumber: 'ATT-2026-JUL-001',

    status: AttendanceStatus.Approved,

    attendanceLines: [],

    totalPresentDays: 22,
    totalAbsentDays: 1,
    totalLeaveDays: 2,
    totalWorkingHours: 176,
    totalOvertimeHours: 18,
    payableDays: 31,
  },
  {
    attendanceId: 'ATT008',
    tenantId: 'T1',
    companyId: 'C1',
    branchId: 'B1',

    attendancePeriodId: 'AUG-2026',
    attendancePeriodName: 'AUG-2026',

    fromDate: '2026-08-01',
    toDate: '2026-08-31',

    attendanceNumber: 'ATT-2026-AUG-001',

    status: AttendanceStatus.Approved,

    attendanceLines: [],

    totalPresentDays: 21,
    totalAbsentDays: 0,
    totalLeaveDays: 4,
    totalWorkingHours: 168,
    totalOvertimeHours: 22,
    payableDays: 31,
  },

  // ────────────────────────────────────────────────────────────────────
  // STATUS: Locked (2 records)
  // ────────────────────────────────────────────────────────────────────
  {
    attendanceId: 'ATT009',
    tenantId: 'T1',
    companyId: 'C1',
    branchId: 'B1',

    attendancePeriodId: 'SEP-2026',
    attendancePeriodName: 'SEP-2026',

    fromDate: '2026-09-01',
    toDate: '2026-09-30',

    attendanceNumber: 'ATT-2026-SEP-001',

    status: AttendanceStatus.Locked,

    attendanceLines: [],

    totalPresentDays: 20,
    totalAbsentDays: 1,
    totalLeaveDays: 3,
    totalWorkingHours: 160,
    totalOvertimeHours: 8,
    payableDays: 30,

    isProcessedForSalary: true,
    salaryProcessedOn: new Date('2026-10-01'),
    salaryId: 'SAL-SEP-001',
  },
  {
    attendanceId: 'ATT010',
    tenantId: 'T1',
    companyId: 'C1',
    branchId: 'B1',

    attendancePeriodId: 'OCT-2026',
    attendancePeriodName: 'OCT-2026',

    fromDate: '2026-10-01',
    toDate: '2026-10-31',

    attendanceNumber: 'ATT-2026-OCT-001',

    status: AttendanceStatus.Locked,

    attendanceLines: [],

    totalPresentDays: 23,
    totalAbsentDays: 0,
    totalLeaveDays: 2,
    totalWorkingHours: 184,
    totalOvertimeHours: 16,
    payableDays: 31,

    isProcessedForSalary: true,
    salaryProcessedOn: new Date('2026-11-01'),
    salaryId: 'SAL-OCT-001',
  },

  // ────────────────────────────────────────────────────────────────────
  // STATUS: Open (2 records)
  // ────────────────────────────────────────────────────────────────────
  {
    attendanceId: 'ATT011',
    tenantId: 'T1',
    companyId: 'C1',
    branchId: 'B1',

    attendancePeriodId: 'NOV-2026',
    attendancePeriodName: 'NOV-2026',

    fromDate: '2026-11-01',
    toDate: '2026-11-30',

    attendanceNumber: 'ATT-2026-NOV-001',

    status: AttendanceStatus.Open,

    attendanceLines: [],

    totalPresentDays: 15,
    totalAbsentDays: 0,
    totalLeaveDays: 1,
    totalWorkingHours: 120,
    totalOvertimeHours: 5,
    payableDays: 30,
  },
  {
    attendanceId: 'ATT012',
    tenantId: 'T1',
    companyId: 'C1',
    branchId: 'B1',

    attendancePeriodId: 'DEC-2026',
    attendancePeriodName: 'DEC-2026',

    fromDate: '2026-12-01',
    toDate: '2026-12-31',

    attendanceNumber: 'ATT-2026-DEC-001',

    status: AttendanceStatus.Open,

    attendanceLines: [],

    totalPresentDays: 10,
    totalAbsentDays: 0,
    totalLeaveDays: 0,
    totalWorkingHours: 80,
    totalOvertimeHours: 0,
    payableDays: 31,
  }
];
