import { AttendanceType, AttendanceLine } from "./attendance-line";

export const ATTENDANCE_LINES_SEED: AttendanceLine[] = [

  // ===================== EMP001 =====================
  {
    attendanceLineId: 'L1',
    attendanceId: 'ATT001',
    employeeId: 'EMP001',
    attendanceDate: '2026-04-01',
    attendanceType: AttendanceType.Present,
    inTime: '09:05',
    outTime: '18:00',

    workingHours: 8.92, // 8h 55m → 8.92
    overtimeHours: 55,  // 🔥 55 minutes

    isLate: true,
    isEarlyExit: false,
    isHalfDay: false,
    timeLogs: []
  },
  {
    attendanceLineId: 'L2',
    attendanceId: 'ATT001',
    employeeId: 'EMP001',
    attendanceDate: '2026-04-02',
    attendanceType: AttendanceType.Present,
    inTime: '09:00',
    outTime: '18:00',

    workingHours: 9,
    overtimeHours: 60, // 🔥 1 hour = 60 mins

    isLate: false,
    isEarlyExit: false,
    isHalfDay: false,
    timeLogs: []
  },

  // ===================== EMP002 =====================
  {
    attendanceLineId: 'L4',
    attendanceId: 'ATT001',
    employeeId: 'EMP002',
    attendanceDate: '2026-04-01',
    attendanceType: AttendanceType.Present,
    inTime: '09:00',
    outTime: '13:00',

    workingHours: 4,
    overtimeHours: 0,

    isLate: false,
    isEarlyExit: true,
    isHalfDay: true,
    timeLogs: []
  },

  // ===================== EMP005 =====================
  {
    attendanceLineId: 'L6',
    attendanceId: 'ATT001',
    employeeId: 'EMP005',
    attendanceDate: '2026-04-01',
    attendanceType: AttendanceType.Present,
    inTime: '08:55',
    outTime: '18:30',

    workingHours: 9.58, // 9h 35m → 9.58
    overtimeHours: 95,  // 🔥 1h 35m = 95 mins

    isLate: false,
    isEarlyExit: false,
    isHalfDay: false,
    timeLogs: []
  }
];