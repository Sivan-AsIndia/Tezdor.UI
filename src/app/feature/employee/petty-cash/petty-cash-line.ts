export interface PettyCashLine {

  pettyCashLineId: string;
  pettyCashId: string; // FK → Header


  // ===== AMOUNTS =====
  requestedAmount?: number;
  approvedAmount?: number;
  disbursedAmount?: number;

  expenseAmount?: number;
  taxAmount?: number;

  returnedAmount?: number;
  replenishmentAmount?: number;


  // ===== AUDIT =====
  createdAt: string;
  createdByUserId: string;

  updatedAt?: string;
  updatedByUserId?: string;

  isDeleted: boolean;

  deletedAt?: string;
  deletedByUserId?: string;
}