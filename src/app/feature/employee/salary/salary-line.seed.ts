import { SalaryLine } from "./salary-line";

export const SALARY_LINES_SEED: SalaryLine[] = [
  {
    salaryLineId: 'SL1',
    salaryId: 'SAL001',
    employeeId: 'EMP001',
    totalDays: 30,
    payableDays: 28,
    lossOfPayDays: 2,
    overtimeHours: 5,
    basicSalary: 30000,
    grossEarnings: 32000,
    totalDeductions: 2000,
    netSalary: 30000,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL2',
    salaryId: 'SAL001',
    employeeId: 'EMP002',
    totalDays: 30,
    payableDays: 30,
    lossOfPayDays: 0,
    overtimeHours: 2,
    basicSalary: 35000,
    grossEarnings: 36000,
    totalDeductions: 3000,
    netSalary: 33000,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL3',
    salaryId: 'SAL001',
    employeeId: 'EMP003',
    totalDays: 30,
    payableDays: 29,
    lossOfPayDays: 1,
    overtimeHours: 3,
    basicSalary: 28000,
    grossEarnings: 30000,
    totalDeductions: 3000,
    netSalary: 27000,
    salaryComponents: []
  },

  // more lines
  ...Array.from({ length: 9 }, (_, i) => ({
    salaryLineId: `SL${i + 4}`,
    salaryId: 'SAL002',
    employeeId: `EMP00${i + 4}`,
    totalDays: 30,
    payableDays: 30,
    lossOfPayDays: 0,
    overtimeHours: 1,
    basicSalary: 25000 + i * 1000,
    grossEarnings: 26000 + i * 1000,
    totalDeductions: 2000,
    netSalary: 24000 + i * 1000,
    salaryComponents: []
  }))
];