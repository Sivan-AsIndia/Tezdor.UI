export interface PettyCashLine {

  // ===== CORE =====
  pettyCashLineId?: string;
  pettyCashId?: string;

  // ===== EXPENSE =====
  expenseAccountId: string;
  description: string;

  amount: number;           // required

  // ===== TAX =====
  taxId?: string;
  taxAmount?: number;       // derived

  // ===== TOTAL =====
  totalLineAmount?: number; // amount + tax

  // ===== SYSTEM =====
  createdAt?: Date;
  updatedAt?: Date;
}