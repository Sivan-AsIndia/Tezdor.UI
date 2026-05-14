import { Shift } from "./shift";

export const SHIFT_SEED_DATA: Shift[] = [

  /* =====================================================
     GENERAL SHIFT
  ===================================================== */
  {
    shiftId:
      crypto.randomUUID(),

    shiftCode:
      'SHIFT-GEN',

    shiftName:
      'General Shift',

    description:
      'Standard office working shift',

    startTime:
      '09:00',

    endTime:
      '18:00',

    breakStartTime:
      '13:00',

    breakEndTime:
      '14:00',

    breakMinutes:
      60,

    workingHours:
      8,

    minimumHoursForHalfDay:
      4,

    minimumHoursForFullDay:
      8,

    lateGraceMinutes:
      15,

    earlyOutGraceMinutes:
      10,

    allowOvertime:
      true,

    minimumOvertimeMinutes:
      30,

    isNightShift:
      false,

    isFlexibleShift:
      false,

    isActive:
      true,

    isSundayOff:
      true,

    isMondayOff:
      false,

    isTuesdayOff:
      false,

    isWednesdayOff:
      false,

    isThursdayOff:
      false,

    isFridayOff:
      false,

    isSaturdayOff:
      false
  },

  /* =====================================================
     MORNING SHIFT
  ===================================================== */
  {
    shiftId:
      crypto.randomUUID(),

    shiftCode:
      'SHIFT-MORN',

    shiftName:
      'Morning Shift',

    description:
      'Factory morning production shift',

    startTime:
      '06:00',

    endTime:
      '14:00',

    breakStartTime:
      '10:00',

    breakEndTime:
      '10:30',

    breakMinutes:
      30,

    workingHours:
      7.5,

    minimumHoursForHalfDay:
      4,

    minimumHoursForFullDay:
      7.5,

    lateGraceMinutes:
      10,

    earlyOutGraceMinutes:
      5,

    allowOvertime:
      true,

    minimumOvertimeMinutes:
      30,

    isNightShift:
      false,

    isFlexibleShift:
      false,

    isActive:
      true,

    isSundayOff:
      true,

    isMondayOff:
      false,

    isTuesdayOff:
      false,

    isWednesdayOff:
      false,

    isThursdayOff:
      false,

    isFridayOff:
      false,

    isSaturdayOff:
      false
  },

  /* =====================================================
     EVENING SHIFT
  ===================================================== */
  {
    shiftId:
      crypto.randomUUID(),

    shiftCode:
      'SHIFT-EVE',

    shiftName:
      'Evening Shift',

    description:
      'Evening operational shift',

    startTime:
      '14:00',

    endTime:
      '22:00',

    breakStartTime:
      '18:00',

    breakEndTime:
      '18:30',

    breakMinutes:
      30,

    workingHours:
      7.5,

    minimumHoursForHalfDay:
      4,

    minimumHoursForFullDay:
      7.5,

    lateGraceMinutes:
      10,

    earlyOutGraceMinutes:
      5,

    allowOvertime:
      true,

    minimumOvertimeMinutes:
      30,

    isNightShift:
      false,

    isFlexibleShift:
      false,

    isActive:
      true,

    isSundayOff:
      true,

    isMondayOff:
      false,

    isTuesdayOff:
      false,

    isWednesdayOff:
      false,

    isThursdayOff:
      false,

    isFridayOff:
      false,

    isSaturdayOff:
      false
  },

  /* =====================================================
     NIGHT SHIFT
  ===================================================== */
  {
    shiftId:
      crypto.randomUUID(),

    shiftCode:
      'SHIFT-NIGHT',

    shiftName:
      'Night Shift',

    description:
      'Night production and support shift',

    startTime:
      '22:00',

    endTime:
      '06:00',

    breakStartTime:
      '02:00',

    breakEndTime:
      '02:30',

    breakMinutes:
      30,

    workingHours:
      7.5,

    minimumHoursForHalfDay:
      4,

    minimumHoursForFullDay:
      7.5,

    lateGraceMinutes:
      10,

    earlyOutGraceMinutes:
      5,

    allowOvertime:
      true,

    minimumOvertimeMinutes:
      30,

    isNightShift:
      true,

    isFlexibleShift:
      false,

    isActive:
      true,

    isSundayOff:
      true,

    isMondayOff:
      false,

    isTuesdayOff:
      false,

    isWednesdayOff:
      false,

    isThursdayOff:
      false,

    isFridayOff:
      false,

    isSaturdayOff:
      false
  },

  /* =====================================================
     FLEXIBLE SHIFT
  ===================================================== */
  {
    shiftId:
      crypto.randomUUID(),

    shiftCode:
      'SHIFT-FLEX',

    shiftName:
      'Flexible Shift',

    description:
      'Flexible timing shift for management',

    startTime:
      '09:00',

    endTime:
      '18:00',

    breakStartTime:
      '13:00',

    breakEndTime:
      '14:00',

    breakMinutes:
      60,

    workingHours:
      8,

    minimumHoursForHalfDay:
      4,

    minimumHoursForFullDay:
      8,

    lateGraceMinutes:
      60,

    earlyOutGraceMinutes:
      30,

    allowOvertime:
      false,

    minimumOvertimeMinutes:
      0,

    isNightShift:
      false,

    isFlexibleShift:
      true,

    isActive:
      true,

    isSundayOff:
      true,

    isMondayOff:
      false,

    isTuesdayOff:
      false,

    isWednesdayOff:
      false,

    isThursdayOff:
      false,

    isFridayOff:
      false,

    isSaturdayOff:
      false
  }

];