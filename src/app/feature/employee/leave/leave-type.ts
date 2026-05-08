// ===============================
// LEAVE TYPE MODEL
// ===============================

export interface LeaveType {

  // ===== CORE =====
  leaveTypeId?: string;

  leaveTypeCode?: string;
  leaveTypeName: string;

  // ===== RULES =====
  maxDaysPerYear?: number;

  isPaid?: boolean;

  allowHalfDay?: boolean;

  requireApproval?: boolean;

  requireAttachment?: boolean;

  // ===== APPLICABILITY =====
  genderApplicability?: GenderApplicability;

  // ===== STATUS =====
  isActive?: boolean;

  // ===== DISPLAY =====
  colorCode?: string;

  description?: string;

  // ===== SYSTEM =====
  createdAt?: Date;
  updatedAt?: Date;
}

export enum GenderApplicability {
  All = 'All',
  Male = 'Male',
  Female = 'Female'
}