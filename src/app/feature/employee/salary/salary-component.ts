export interface SalaryComponent {

  // ===== CORE =====
  salaryComponentLineId?: string;
  salaryLineId?: string;

  // ===== COMPONENT =====
  componentType: SalaryComponentType;
  componentName: string;

  amount: number;
  isStatutory?: boolean;

  // ===== SYSTEM =====
  createdAt?: Date;
  updatedAt?: Date;
}

export enum SalaryComponentType {
  Earning = 'Earning',
  Deduction = 'Deduction'
}