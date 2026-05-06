import { AttendanceTimeLog, PunchType } from "./attendance-time-log";

export const ATTENDANCE_TIMELOGS_SEED: AttendanceTimeLog[] = [

  // EMP001 - Day 1
  {
    attendanceTimeLogId: 'TL1',
    attendanceLineId: 'L1',
    punchTime: '2026-04-01T09:05:00',
    punchType: PunchType.In,
    source: 'Biometric'
  },
  {
    attendanceTimeLogId: 'TL2',
    attendanceLineId: 'L1',
    punchTime: '2026-04-01T13:00:00',
    punchType: PunchType.Out,
    source: 'Biometric'
  },
  {
    attendanceTimeLogId: 'TL3',
    attendanceLineId: 'L1',
    punchTime: '2026-04-01T14:00:00',
    punchType: PunchType.In,
    source: 'Biometric'
  },
  {
    attendanceTimeLogId: 'TL4',
    attendanceLineId: 'L1',
    punchTime: '2026-04-01T18:00:00',
    punchType: PunchType.Out,
    source: 'Biometric'
  },

  // EMP005 (overtime case)
  {
    attendanceTimeLogId: 'TL5',
    attendanceLineId: 'L6',
    punchTime: '2026-04-01T08:55:00',
    punchType: PunchType.In,
    source: 'Biometric'
  },
  {
    attendanceTimeLogId: 'TL6',
    attendanceLineId: 'L6',
    punchTime: '2026-04-01T18:30:00',
    punchType: PunchType.Out,
    source: 'Biometric'
  }
];