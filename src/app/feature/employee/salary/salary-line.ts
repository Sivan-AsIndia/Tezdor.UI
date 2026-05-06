import { SalaryComponent } from "./salary-component";

export interface SalaryLine {

  // ===== CORE =====
  salaryLineId?: string;
  salaryId?: string;

  employeeId: string;
  attendanceId?: string;

  // ===== ATTENDANCE =====
  totalDays?: number;          // decimal (5,2)
  payableDays?: number;        // decimal (5,2)
  lossOfPayDays?: number;      // decimal (5,2)
  overtimeHours?: number;      // decimal (5,2)

  // ===== EARNINGS =====
  basicSalary: number;         // required
  grossEarnings?: number;      // derived

  // ===== DEDUCTIONS =====
  totalDeductions?: number;    // derived

  // ===== NET =====
  netSalary?: number;          // derived

  // ===== COMPONENTS =====
  salaryComponents?: SalaryComponent[];

  // ===== SYSTEM =====
  createdAt?: Date;
  updatedAt?: Date;
}