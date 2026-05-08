// ===============================
// LEAVE MODEL
// ===============================

export interface Leave {

  // ===== CORE =====
  leaveId?: string;
  leaveNumber?: string;

  employeeId: string;

  // ===== LEAVE TYPE =====
  leaveTypeId: string;

  // ===== LEAVE DETAILS =====
  fromDate: string;
  toDate: string;

  totalDays?: number;

  reason?: string;

  // ===== STATUS =====
  status: LeaveStatus;

  // ===== APPROVAL =====
  appliedOn?: Date;

  approvedBy?: string;
  approvedOn?: Date;

  rejectedBy?: string;
  rejectedOn?: Date;

  rejectionReason?: string;

  remarks?: string;

  // ===== SYSTEM =====
  createdAt?: Date;
  updatedAt?: Date;
}

export enum LeaveStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled'
}