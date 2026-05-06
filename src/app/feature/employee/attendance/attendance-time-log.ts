export interface AttendanceTimeLog {
  attendanceTimeLogId: string;

  attendanceLineId: string;

  punchTime: string; // ISO datetime

  punchType: PunchType;

  source?: string; // Biometric / Manual / Mobile
}

export enum PunchType {
  In = 1,
  Out = 2
}