export interface Shift {

  shiftId: string;

  shiftCode: string;

  shiftName: string;

  description?: string;

  // TIME
  startTime: string;

  endTime: string;

  // BREAK
  breakStartTime?: string;

  breakEndTime?: string;

  breakMinutes: number;

  // WORKING
  workingHours: number;

  minimumHoursForHalfDay: number;

  minimumHoursForFullDay: number;

  // GRACE
  lateGraceMinutes: number;

  earlyOutGraceMinutes: number;

  // OT
  allowOvertime: boolean;

  minimumOvertimeMinutes: number;

  // FLAGS
  isNightShift: boolean;

  isFlexibleShift: boolean;

  isDefault: boolean;

  isActive: boolean;

  // WEEK OFF
  isSundayOff: boolean;

  isMondayOff: boolean;

  isTuesdayOff: boolean;

  isWednesdayOff: boolean;

  isThursdayOff: boolean;

  isFridayOff: boolean;

  isSaturdayOff: boolean;

  // COMPANY
  companyId?: string;

  branchId?: string;

  // AUDIT
  createdOn?: string;

  createdBy?: string;

  updatedOn?: string;

  updatedBy?: string;
}