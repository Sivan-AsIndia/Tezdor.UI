import { Salary, SalaryStatus } from "./salary";

export const SALARY_SEED: Salary[] = [
  {
    salaryId: 'SAL001',
    salaryNumber: 'SAL-2026-APR-001',
    status: SalaryStatus.Draft,
    branchId: 'BR001',
    payrollPeriodId: 'APR-2026',
    fromDate: '2026-04-01',
    toDate: '2026-04-30',
    salaryDate: '2026-05-02',
    salaryMonth: 'APR-2026',
    paymentDate: '2026-05-05',
    totalEmployees: 3,
    totalGrossAmount: 95000,
    totalDeductionAmount: 8000,
    totalNetSalary: 87000,
    expenseAccountId: 'EXP001',
    payableAccountId: 'PAY001',
    salaryLines: [] // filled below
  },

  {
    salaryId: 'SAL002',
    salaryNumber: 'SAL-2026-MAY-001',
    status: SalaryStatus.Processed,
    branchId: 'BR001',
    payrollPeriodId: 'MAY-2026',
    fromDate: '2026-05-01',
    toDate: '2026-05-31',
    salaryDate: '2026-06-01',
    salaryMonth: 'MAY-2026',
    paymentDate: '2026-06-05',
    totalEmployees: 4,
    totalGrossAmount: 140000,
    totalDeductionAmount: 12000,
    totalNetSalary: 128000,
    expenseAccountId: 'EXP001',
    payableAccountId: 'PAY001'
  },

  {
    salaryId: 'SAL003',
    salaryNumber: 'SAL-2026-JUN-001',
    status: SalaryStatus.Approved,
    branchId: 'BR002',
    payrollPeriodId: 'JUN-2026',
    fromDate: '2026-06-01',
    toDate: '2026-06-30',
    salaryDate: '2026-07-01',
    salaryMonth: 'JUN-2026',
    paymentDate: '2026-07-05',
    totalEmployees: 5,
    totalGrossAmount: 180000,
    totalDeductionAmount: 15000,
    totalNetSalary: 165000,
    expenseAccountId: 'EXP001',
    payableAccountId: 'PAY001'
  },

  // remaining sample (simplified for length)
  ...Array.from({ length: 9 }, (_, i) => ({
    salaryId: `SAL00${i + 4}`,
    salaryNumber: `SAL-2026-${i + 4}`,
    status: SalaryStatus.Draft,
    branchId: 'BR001',
    payrollPeriodId: `PER-${i + 4}`,
    fromDate: '2026-01-01',
    toDate: '2026-01-31',
    salaryDate: '2026-02-01',
    salaryMonth: 'JAN-2026',
    paymentDate: '2026-02-05',
    totalEmployees: 3,
    totalGrossAmount: 90000,
    totalDeductionAmount: 7000,
    totalNetSalary: 83000,
    expenseAccountId: 'EXP001',
    payableAccountId: 'PAY001'
  }))
];