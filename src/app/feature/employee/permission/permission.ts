export interface Permission {

  // ===== CORE =====
  permissionId?: string;
  permissionNumber?: string;

  employeeId: string;

  // ===== PERMISSION DETAILS =====
  permissionDate: string;

  fromTime: string;
  toTime: string;

  totalHours?: number;

  reason?: string;

  // ===== TYPE =====
  permissionType?: PermissionType;

  // ===== STATUS =====
  status: PermissionStatus;

  // ===== APPROVAL =====
  appliedOn?: Date;

  approvedBy?: string;
  approvedOn?: Date;

  rejectedBy?: string;
  rejectedOn?: Date;

  rejectionReason?: string;

  remarks?: string;

  isCompensated?: boolean;
   
  adjustedAgainst?: string;
  // ===== SYSTEM =====
  createdAt?: Date;
  updatedAt?: Date;
}

export enum PermissionType {
  LateEntry = 'LateEntry',
  EarlyExit = 'EarlyExit',
  Personal = 'Personal',
  Medical = 'Medical',
  OfficialWork = 'OfficialWork',
  Emergency = 'Emergency'
}

export enum PermissionStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled'
}