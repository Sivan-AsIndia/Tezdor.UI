import { SalaryLine } from "./salary-line";

export const SALARY_LINES_SEED: SalaryLine[] = [

  // ───────── SAL001 (Draft, APR-2026, B1) ─────────
  {
    salaryLineId: 'SL001-01', salaryId: 'SAL001', employeeId: 'EMP001',
    totalDays: 30, payableDays: 28, lossOfPayDays: 2, overtimeHours: 5,
    basicSalary: 35000, grossEarnings: 42000, totalDeductions: 5200, netSalary: 36800,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL001-02', salaryId: 'SAL001', employeeId: 'EMP002',
    totalDays: 30, payableDays: 30, lossOfPayDays: 0, overtimeHours: 2,
    basicSalary: 42000, grossEarnings: 50400, totalDeductions: 6100, netSalary: 44300,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL001-03', salaryId: 'SAL001', employeeId: 'EMP005',
    totalDays: 30, payableDays: 29, lossOfPayDays: 1, overtimeHours: 8,
    basicSalary: 60000, grossEarnings: 72000, totalDeductions: 8700, netSalary: 63300,
    salaryComponents: []
  },

  // ───────── SAL002 (Draft, MAY-2026, B1) ─────────
  {
    salaryLineId: 'SL002-01', salaryId: 'SAL002', employeeId: 'EMP001',
    totalDays: 31, payableDays: 30, lossOfPayDays: 1, overtimeHours: 3,
    basicSalary: 35000, grossEarnings: 41000, totalDeductions: 5000, netSalary: 36000,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL002-02', salaryId: 'SAL002', employeeId: 'EMP002',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 0,
    basicSalary: 42000, grossEarnings: 50400, totalDeductions: 6100, netSalary: 44300,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL002-03', salaryId: 'SAL002', employeeId: 'EMP005',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 10,
    basicSalary: 60000, grossEarnings: 73000, totalDeductions: 8800, netSalary: 64200,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL002-04', salaryId: 'SAL002', employeeId: 'EMP006',
    totalDays: 31, payableDays: 30, lossOfPayDays: 1, overtimeHours: 4,
    basicSalary: 38000, grossEarnings: 45000, totalDeductions: 5500, netSalary: 39500,
    salaryComponents: []
  },

  // ───────── SAL003 (Draft, JUN-2026, B2) ─────────
  {
    salaryLineId: 'SL003-01', salaryId: 'SAL003', employeeId: 'EMP003',
    totalDays: 30, payableDays: 28, lossOfPayDays: 2, overtimeHours: 0,
    basicSalary: 30000, grossEarnings: 34000, totalDeductions: 4200, netSalary: 29800,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL003-02', salaryId: 'SAL003', employeeId: 'EMP004',
    totalDays: 30, payableDays: 30, lossOfPayDays: 0, overtimeHours: 6,
    basicSalary: 15000, grossEarnings: 18500, totalDeductions: 2300, netSalary: 16200,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL003-03', salaryId: 'SAL003', employeeId: 'EMP007',
    totalDays: 30, payableDays: 29, lossOfPayDays: 1, overtimeHours: 3,
    basicSalary: 32000, grossEarnings: 38000, totalDeductions: 4600, netSalary: 33400,
    salaryComponents: []
  },

  // ───────── SAL004 (Processed, JAN-2026, B1) ─────────
  {
    salaryLineId: 'SL004-01', salaryId: 'SAL004', employeeId: 'EMP001',
    totalDays: 31, payableDays: 30, lossOfPayDays: 1, overtimeHours: 4,
    basicSalary: 35000, grossEarnings: 42000, totalDeductions: 5100, netSalary: 36900,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL004-02', salaryId: 'SAL004', employeeId: 'EMP002',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 0,
    basicSalary: 42000, grossEarnings: 50400, totalDeductions: 6100, netSalary: 44300,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL004-03', salaryId: 'SAL004', employeeId: 'EMP005',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 12,
    basicSalary: 60000, grossEarnings: 74000, totalDeductions: 8900, netSalary: 65100,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL004-04', salaryId: 'SAL004', employeeId: 'EMP006',
    totalDays: 31, payableDays: 29, lossOfPayDays: 2, overtimeHours: 0,
    basicSalary: 38000, grossEarnings: 43500, totalDeductions: 5300, netSalary: 38200,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL004-05', salaryId: 'SAL004', employeeId: 'EMP009',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 6,
    basicSalary: 45000, grossEarnings: 55100, totalDeductions: 6600, netSalary: 48500,
    salaryComponents: []
  },

  // ───────── SAL005 (Processed, FEB-2026, B2) ─────────
  {
    salaryLineId: 'SL005-01', salaryId: 'SAL005', employeeId: 'EMP003',
    totalDays: 28, payableDays: 26, lossOfPayDays: 2, overtimeHours: 0,
    basicSalary: 30000, grossEarnings: 33000, totalDeductions: 4000, netSalary: 29000,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL005-02', salaryId: 'SAL005', employeeId: 'EMP004',
    totalDays: 28, payableDays: 28, lossOfPayDays: 0, overtimeHours: 4,
    basicSalary: 15000, grossEarnings: 18200, totalDeductions: 2200, netSalary: 16000,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL005-03', salaryId: 'SAL005', employeeId: 'EMP007',
    totalDays: 28, payableDays: 27, lossOfPayDays: 1, overtimeHours: 2,
    basicSalary: 32000, grossEarnings: 37800, totalDeductions: 4600, netSalary: 33200,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL005-04', salaryId: 'SAL005', employeeId: 'EMP011',
    totalDays: 28, payableDays: 28, lossOfPayDays: 0, overtimeHours: 0,
    basicSalary: 18000, grossEarnings: 21600, totalDeductions: 2600, netSalary: 19000,
    salaryComponents: []
  },

  // ───────── SAL006 (Processed, MAR-2026, B1) ─────────
  {
    salaryLineId: 'SL006-01', salaryId: 'SAL006', employeeId: 'EMP001',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 5,
    basicSalary: 35000, grossEarnings: 43000, totalDeductions: 5200, netSalary: 37800,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL006-02', salaryId: 'SAL006', employeeId: 'EMP002',
    totalDays: 31, payableDays: 30, lossOfPayDays: 1, overtimeHours: 0,
    basicSalary: 42000, grossEarnings: 49000, totalDeductions: 5900, netSalary: 43100,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL006-03', salaryId: 'SAL006', employeeId: 'EMP005',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 15,
    basicSalary: 60000, grossEarnings: 76000, totalDeductions: 9200, netSalary: 66800,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL006-04', salaryId: 'SAL006', employeeId: 'EMP006',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 3,
    basicSalary: 38000, grossEarnings: 46000, totalDeductions: 5500, netSalary: 40500,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL006-05', salaryId: 'SAL006', employeeId: 'EMP009',
    totalDays: 31, payableDays: 30, lossOfPayDays: 1, overtimeHours: 0,
    basicSalary: 45000, grossEarnings: 52500, totalDeductions: 6300, netSalary: 46200,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL006-06', salaryId: 'SAL006', employeeId: 'EMP011',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 0,
    basicSalary: 18000, grossEarnings: 21600, totalDeductions: 2600, netSalary: 19000,
    salaryComponents: []
  },

  // ───────── SAL007 (Approved, NOV-2025, B1) ─────────
  {
    salaryLineId: 'SL007-01', salaryId: 'SAL007', employeeId: 'EMP001',
    totalDays: 30, payableDays: 29, lossOfPayDays: 1, overtimeHours: 3,
    basicSalary: 35000, grossEarnings: 41500, totalDeductions: 5000, netSalary: 36500,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL007-02', salaryId: 'SAL007', employeeId: 'EMP002',
    totalDays: 30, payableDays: 30, lossOfPayDays: 0, overtimeHours: 0,
    basicSalary: 42000, grossEarnings: 50400, totalDeductions: 6100, netSalary: 44300,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL007-03', salaryId: 'SAL007', employeeId: 'EMP005',
    totalDays: 30, payableDays: 30, lossOfPayDays: 0, overtimeHours: 8,
    basicSalary: 60000, grossEarnings: 73000, totalDeductions: 8800, netSalary: 64200,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL007-04', salaryId: 'SAL007', employeeId: 'EMP006',
    totalDays: 30, payableDays: 30, lossOfPayDays: 0, overtimeHours: 5,
    basicSalary: 38000, grossEarnings: 46500, totalDeductions: 5600, netSalary: 40900,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL007-05', salaryId: 'SAL007', employeeId: 'EMP009',
    totalDays: 30, payableDays: 28, lossOfPayDays: 2, overtimeHours: 0,
    basicSalary: 45000, grossEarnings: 51000, totalDeductions: 6200, netSalary: 44800,
    salaryComponents: []
  },

  // ───────── SAL008 (Approved, DEC-2025, B2) ─────────
  {
    salaryLineId: 'SL008-01', salaryId: 'SAL008', employeeId: 'EMP003',
    totalDays: 31, payableDays: 30, lossOfPayDays: 1, overtimeHours: 0,
    basicSalary: 30000, grossEarnings: 35000, totalDeductions: 4200, netSalary: 30800,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL008-02', salaryId: 'SAL008', employeeId: 'EMP004',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 3,
    basicSalary: 15000, grossEarnings: 18500, totalDeductions: 2200, netSalary: 16300,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL008-03', salaryId: 'SAL008', employeeId: 'EMP007',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 6,
    basicSalary: 32000, grossEarnings: 39500, totalDeductions: 4800, netSalary: 34700,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL008-04', salaryId: 'SAL008', employeeId: 'EMP011',
    totalDays: 31, payableDays: 30, lossOfPayDays: 1, overtimeHours: 0,
    basicSalary: 18000, grossEarnings: 21000, totalDeductions: 2500, netSalary: 18500,
    salaryComponents: []
  },

  // ───────── SAL009 (Posted, SEP-2025, B1) ─────────
  {
    salaryLineId: 'SL009-01', salaryId: 'SAL009', employeeId: 'EMP001',
    totalDays: 30, payableDays: 30, lossOfPayDays: 0, overtimeHours: 6,
    basicSalary: 35000, grossEarnings: 43000, totalDeductions: 5200, netSalary: 37800,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL009-02', salaryId: 'SAL009', employeeId: 'EMP002',
    totalDays: 30, payableDays: 30, lossOfPayDays: 0, overtimeHours: 0,
    basicSalary: 42000, grossEarnings: 50400, totalDeductions: 6100, netSalary: 44300,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL009-03', salaryId: 'SAL009', employeeId: 'EMP005',
    totalDays: 30, payableDays: 29, lossOfPayDays: 1, overtimeHours: 4,
    basicSalary: 60000, grossEarnings: 71000, totalDeductions: 8600, netSalary: 62400,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL009-04', salaryId: 'SAL009', employeeId: 'EMP006',
    totalDays: 30, payableDays: 30, lossOfPayDays: 0, overtimeHours: 2,
    basicSalary: 38000, grossEarnings: 45800, totalDeductions: 5500, netSalary: 40300,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL009-05', salaryId: 'SAL009', employeeId: 'EMP009',
    totalDays: 30, payableDays: 30, lossOfPayDays: 0, overtimeHours: 7,
    basicSalary: 45000, grossEarnings: 55800, totalDeductions: 6700, netSalary: 49100,
    salaryComponents: []
  },

  // ───────── SAL010 (Posted, OCT-2025, B2) ─────────
  {
    salaryLineId: 'SL010-01', salaryId: 'SAL010', employeeId: 'EMP003',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 0,
    basicSalary: 30000, grossEarnings: 36000, totalDeductions: 4300, netSalary: 31700,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL010-02', salaryId: 'SAL010', employeeId: 'EMP007',
    totalDays: 31, payableDays: 30, lossOfPayDays: 1, overtimeHours: 4,
    basicSalary: 32000, grossEarnings: 38500, totalDeductions: 4600, netSalary: 33900,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL010-03', salaryId: 'SAL010', employeeId: 'EMP011',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 0,
    basicSalary: 18000, grossEarnings: 21600, totalDeductions: 2600, netSalary: 19000,
    salaryComponents: []
  },

  // ───────── SAL011 (Paid, JUL-2025, B1) ─────────
  {
    salaryLineId: 'SL011-01', salaryId: 'SAL011', employeeId: 'EMP001',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 4,
    basicSalary: 35000, grossEarnings: 42500, totalDeductions: 5100, netSalary: 37400,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL011-02', salaryId: 'SAL011', employeeId: 'EMP002',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 0,
    basicSalary: 42000, grossEarnings: 50400, totalDeductions: 6100, netSalary: 44300,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL011-03', salaryId: 'SAL011', employeeId: 'EMP005',
    totalDays: 31, payableDays: 30, lossOfPayDays: 1, overtimeHours: 10,
    basicSalary: 60000, grossEarnings: 73000, totalDeductions: 8800, netSalary: 64200,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL011-04', salaryId: 'SAL011', employeeId: 'EMP006',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 0,
    basicSalary: 38000, grossEarnings: 45600, totalDeductions: 5500, netSalary: 40100,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL011-05', salaryId: 'SAL011', employeeId: 'EMP009',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 5,
    basicSalary: 45000, grossEarnings: 55000, totalDeductions: 6600, netSalary: 48400,
    salaryComponents: []
  },

  // ───────── SAL012 (Paid, AUG-2025, B1) ─────────
  {
    salaryLineId: 'SL012-01', salaryId: 'SAL012', employeeId: 'EMP001',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 7,
    basicSalary: 35000, grossEarnings: 43500, totalDeductions: 5300, netSalary: 38200,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL012-02', salaryId: 'SAL012', employeeId: 'EMP002',
    totalDays: 31, payableDays: 30, lossOfPayDays: 1, overtimeHours: 0,
    basicSalary: 42000, grossEarnings: 49000, totalDeductions: 5900, netSalary: 43100,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL012-03', salaryId: 'SAL012', employeeId: 'EMP005',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 12,
    basicSalary: 60000, grossEarnings: 75000, totalDeductions: 9000, netSalary: 66000,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL012-04', salaryId: 'SAL012', employeeId: 'EMP006',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 3,
    basicSalary: 38000, grossEarnings: 46000, totalDeductions: 5500, netSalary: 40500,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL012-05', salaryId: 'SAL012', employeeId: 'EMP009',
    totalDays: 31, payableDays: 29, lossOfPayDays: 2, overtimeHours: 0,
    basicSalary: 45000, grossEarnings: 51000, totalDeductions: 6200, netSalary: 44800,
    salaryComponents: []
  },
  {
    salaryLineId: 'SL012-06', salaryId: 'SAL012', employeeId: 'EMP011',
    totalDays: 31, payableDays: 31, lossOfPayDays: 0, overtimeHours: 0,
    basicSalary: 18000, grossEarnings: 21600, totalDeductions: 2600, netSalary: 19000,
    salaryComponents: []
  },
];
