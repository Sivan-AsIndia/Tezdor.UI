import { GenderApplicability, LeaveType } from "./leave-type";

export const LEAVE_TYPES: LeaveType[] = [

  {
    leaveTypeId: crypto.randomUUID(),
    leaveTypeCode: 'CL',
    leaveTypeName: 'Casual Leave',
    maxDaysPerYear: 12,
    isPaid: true,
    allowHalfDay: true,
    requireApproval: true,
    isActive: true,
    colorCode: '#3b82f6'
  },

  {
    leaveTypeId: crypto.randomUUID(),
    leaveTypeCode: 'SL',
    leaveTypeName: 'Sick Leave',
    maxDaysPerYear: 10,
    isPaid: true,
    allowHalfDay: false,
    requireApproval: true,
    requireAttachment: true,
    isActive: true,
    colorCode: '#ef4444'
  },

  {
    leaveTypeId: crypto.randomUUID(),
    leaveTypeCode: 'EL',
    leaveTypeName: 'Earned Leave',
    maxDaysPerYear: 18,
    isPaid: true,
    allowHalfDay: false,
    requireApproval: true,
    isActive: true,
    colorCode: '#22c55e'
  },

  {
    leaveTypeId: crypto.randomUUID(),
    leaveTypeCode: 'LOP',
    leaveTypeName: 'Loss Of Pay',
    maxDaysPerYear: 90,
    isPaid: false,
    allowHalfDay: false,
    requireApproval: true,
    isActive: true,
    colorCode: '#6b7280'
  },

  {
    leaveTypeId: crypto.randomUUID(),
    leaveTypeCode: 'ML',
    leaveTypeName: 'Maternity Leave',
    maxDaysPerYear: 180,
    isPaid: true,
    allowHalfDay: false,
    requireApproval: true,
    genderApplicability: GenderApplicability.Female,
    isActive: true,
    colorCode: '#ec4899'
  }

];