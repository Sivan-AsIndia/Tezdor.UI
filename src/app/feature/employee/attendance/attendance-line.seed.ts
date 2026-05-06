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
  },

  // ===================== MORE DATA =====================
{
  attendanceLineId: 'L7',
  attendanceId: 'ATT001',
  employeeId: 'EMP001',
  attendanceDate: '2026-04-03',
  attendanceType: AttendanceType.Present,
  inTime: '09:15',
  outTime: '18:05',
  workingHours: 8.83,
  overtimeHours: 5,
  isLate: true,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},
{
  attendanceLineId: 'L8',
  attendanceId: 'ATT001',
  employeeId: 'EMP001',
  attendanceDate: '2026-04-04',
  attendanceType: AttendanceType.Present,
  inTime: '09:15',
  outTime: '',
  workingHours: 0,
  overtimeHours: 0,
  isLate: false,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},

// EMP002
{
  attendanceLineId: 'L9',
  attendanceId: 'ATT001',
  employeeId: 'EMP002',
  attendanceDate: '2026-04-02',
  attendanceType: AttendanceType.Present,
  inTime: '09:20',
  outTime: '18:00',
  workingHours: 8.67,
  overtimeHours: 0,
  isLate: true,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},
{
  attendanceLineId: 'L10',
  attendanceId: 'ATT001',
  employeeId: 'EMP002',
  attendanceDate: '2026-04-03',
  attendanceType: AttendanceType.Present,
  inTime: '09:00',
  outTime: '17:00',
  workingHours: 8,
  overtimeHours: 0,
  isLate: false,
  isEarlyExit: true,
  isHalfDay: false,
  timeLogs: []
},

// EMP003
{
  attendanceLineId: 'L11',
  attendanceId: 'ATT001',
  employeeId: 'EMP003',
  attendanceDate: '2026-04-01',
  attendanceType: AttendanceType.Present,
  inTime: '08:50',
  outTime: '18:10',
  workingHours: 9.33,
  overtimeHours: 10,
  isLate: false,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},
{
  attendanceLineId: 'L12',
  attendanceId: 'ATT001',
  employeeId: 'EMP003',
  attendanceDate: '2026-04-02',
  attendanceType: AttendanceType.Leave,
  inTime: '',
  outTime: '',
  workingHours: 0,
  overtimeHours: 0,
  isLate: false,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},

// EMP004
{
  attendanceLineId: 'L13',
  attendanceId: 'ATT001',
  employeeId: 'EMP004',
  attendanceDate: '2026-04-01',
  attendanceType: AttendanceType.Present,
  inTime: '09:05',
  outTime: '18:30',
  workingHours: 9.42,
  overtimeHours: 30,
  isLate: true,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},
{
  attendanceLineId: 'L14',
  attendanceId: 'ATT001',
  employeeId: 'EMP004',
  attendanceDate: '2026-04-02',
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

// EMP005
{
  attendanceLineId: 'L15',
  attendanceId: 'ATT001',
  employeeId: 'EMP005',
  attendanceDate: '2026-04-02',
  attendanceType: AttendanceType.Present,
  inTime: '08:45',
  outTime: '18:45',
  workingHours: 10,
  overtimeHours: 60,
  isLate: false,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},
{
  attendanceLineId: 'L16',
  attendanceId: 'ATT001',
  employeeId: 'EMP005',
  attendanceDate: '2026-04-03',
  attendanceType: AttendanceType.Present,
  inTime: '08:50',
  outTime: '',
  workingHours: 0,
  overtimeHours: 0,
  isLate: false,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},

// EMP006
{
  attendanceLineId: 'L17',
  attendanceId: 'ATT001',
  employeeId: 'EMP006',
  attendanceDate: '2026-04-01',
  attendanceType: AttendanceType.Present,
  inTime: '09:10',
  outTime: '18:00',
  workingHours: 8.83,
  overtimeHours: 0,
  isLate: true,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},
{
  attendanceLineId: 'L18',
  attendanceId: 'ATT001',
  employeeId: 'EMP006',
  attendanceDate: '2026-04-02',
  attendanceType: AttendanceType.Present,
  inTime: '09:00',
  outTime: '18:20',
  workingHours: 9.33,
  overtimeHours: 20,
  isLate: false,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},

// EMP007
{
  attendanceLineId: 'L19',
  attendanceId: 'ATT001',
  employeeId: 'EMP007',
  attendanceDate: '2026-04-01',
  attendanceType: AttendanceType.Leave,
  inTime: '',
  outTime: '',
  workingHours: 0,
  overtimeHours: 0,
  isLate: false,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},
{
  attendanceLineId: 'L20',
  attendanceId: 'ATT001',
  employeeId: 'EMP007',
  attendanceDate: '2026-04-02',
  attendanceType: AttendanceType.Present,
  inTime: '09:00',
  outTime: '18:00',
  workingHours: 9,
  overtimeHours: 0,
  isLate: false,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},

// EMP008
{
  attendanceLineId: 'L21',
  attendanceId: 'ATT001',
  employeeId: 'EMP008',
  attendanceDate: '2026-04-01',
  attendanceType: AttendanceType.Present,
  inTime: '09:30',
  outTime: '18:00',
  workingHours: 8.5,
  overtimeHours: 0,
  isLate: true,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},
{
  attendanceLineId: 'L22',
  attendanceId: 'ATT001',
  employeeId: 'EMP008',
  attendanceDate: '2026-04-02',
  attendanceType: AttendanceType.Present,
  inTime: '09:00',
  outTime: '17:30',
  workingHours: 8.5,
  overtimeHours: 0,
  isLate: false,
  isEarlyExit: true,
  isHalfDay: false,
  timeLogs: []
},

// EMP009
{
  attendanceLineId: 'L23',
  attendanceId: 'ATT001',
  employeeId: 'EMP009',
  attendanceDate: '2026-04-01',
  attendanceType: AttendanceType.Present,
  inTime: '08:50',
  outTime: '18:00',
  workingHours: 9.17,
  overtimeHours: 0,
  isLate: false,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},
{
  attendanceLineId: 'L24',
  attendanceId: 'ATT001',
  employeeId: 'EMP009',
  attendanceDate: '2026-04-02',
  attendanceType: AttendanceType.Present,
  inTime: '09:00',
  outTime: '18:45',
  workingHours: 9.75,
  overtimeHours: 45,
  isLate: false,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},

// EMP010
{
  attendanceLineId: 'L25',
  attendanceId: 'ATT001',
  employeeId: 'EMP010',
  attendanceDate: '2026-04-01',
  attendanceType: AttendanceType.Present,
  inTime: '09:10',
  outTime: '',
  workingHours: 0,
  overtimeHours: 0,
  isLate: false,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},
{
  attendanceLineId: 'L26',
  attendanceId: 'ATT001',
  employeeId: 'EMP010',
  attendanceDate: '2026-04-02',
  attendanceType: AttendanceType.Present,
  inTime: '09:05',
  outTime: '18:00',
  workingHours: 8.92,
  overtimeHours: 0,
  isLate: true,
  isEarlyExit: false,
  isHalfDay: false,
  timeLogs: []
},
];