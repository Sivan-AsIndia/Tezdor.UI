import { SalaryComponent, SalaryComponentType } from "./salary-component";

export const SALARY_COMPONENTS_SEED: SalaryComponent[] = [

  // ===== SL1 =====
  { salaryComponentLineId: 'SC1', salaryLineId: 'SL1', componentType: SalaryComponentType.Earning, componentName: 'Basic', amount: 30000 },
  { salaryComponentLineId: 'SC2', salaryLineId: 'SL1', componentType: SalaryComponentType.Earning, componentName: 'HRA', amount: 12000 },
  { salaryComponentLineId: 'SC3', salaryLineId: 'SL1', componentType: SalaryComponentType.Earning, componentName: 'Overtime', amount: 500 },
  { salaryComponentLineId: 'SC4', salaryLineId: 'SL1', componentType: SalaryComponentType.Deduction, componentName: 'PF', amount: 3600, isStatutory: true },
  { salaryComponentLineId: 'SC5', salaryLineId: 'SL1', componentType: SalaryComponentType.Deduction, componentName: 'ESI', amount: 320, isStatutory: true },

  // ===== SL2 =====
  { salaryComponentLineId: 'SC6', salaryLineId: 'SL2', componentType: SalaryComponentType.Earning, componentName: 'Basic', amount: 35000 },
  { salaryComponentLineId: 'SC7', salaryLineId: 'SL2', componentType: SalaryComponentType.Earning, componentName: 'HRA', amount: 14000 },
  { salaryComponentLineId: 'SC8', salaryLineId: 'SL2', componentType: SalaryComponentType.Earning, componentName: 'Overtime', amount: 200 },
  { salaryComponentLineId: 'SC9', salaryLineId: 'SL2', componentType: SalaryComponentType.Deduction, componentName: 'PF', amount: 4200, isStatutory: true },
  { salaryComponentLineId: 'SC10', salaryLineId: 'SL2', componentType: SalaryComponentType.Deduction, componentName: 'ESI', amount: 400, isStatutory: true },

  // ===== SL3 =====
  { salaryComponentLineId: 'SC11', salaryLineId: 'SL3', componentType: SalaryComponentType.Earning, componentName: 'Basic', amount: 28000 },
  { salaryComponentLineId: 'SC12', salaryLineId: 'SL3', componentType: SalaryComponentType.Earning, componentName: 'HRA', amount: 11000 },
  { salaryComponentLineId: 'SC13', salaryLineId: 'SL3', componentType: SalaryComponentType.Earning, componentName: 'Overtime', amount: 300 },
  { salaryComponentLineId: 'SC14', salaryLineId: 'SL3', componentType: SalaryComponentType.Deduction, componentName: 'PF', amount: 3360, isStatutory: true },
  { salaryComponentLineId: 'SC15', salaryLineId: 'SL3', componentType: SalaryComponentType.Deduction, componentName: 'ESI', amount: 290, isStatutory: true },

  // ===== SL4 =====
  { salaryComponentLineId: 'SC16', salaryLineId: 'SL4', componentType: SalaryComponentType.Earning, componentName: 'Basic', amount: 26000 },
  { salaryComponentLineId: 'SC17', salaryLineId: 'SL4', componentType: SalaryComponentType.Earning, componentName: 'HRA', amount: 10000 },
  { salaryComponentLineId: 'SC18', salaryLineId: 'SL4', componentType: SalaryComponentType.Deduction, componentName: 'PF', amount: 3120, isStatutory: true },

  // ===== SL5 =====
  { salaryComponentLineId: 'SC19', salaryLineId: 'SL5', componentType: SalaryComponentType.Earning, componentName: 'Basic', amount: 32000 },
  { salaryComponentLineId: 'SC20', salaryLineId: 'SL5', componentType: SalaryComponentType.Earning, componentName: 'HRA', amount: 12500 },
  { salaryComponentLineId: 'SC21', salaryLineId: 'SL5', componentType: SalaryComponentType.Earning, componentName: 'Bonus', amount: 2000 },
  { salaryComponentLineId: 'SC22', salaryLineId: 'SL5', componentType: SalaryComponentType.Deduction, componentName: 'PF', amount: 3840, isStatutory: true },

  // ===== SL6 =====
  { salaryComponentLineId: 'SC23', salaryLineId: 'SL6', componentType: SalaryComponentType.Earning, componentName: 'Basic', amount: 29000 },
  { salaryComponentLineId: 'SC24', salaryLineId: 'SL6', componentType: SalaryComponentType.Earning, componentName: 'HRA', amount: 11500 },
  { salaryComponentLineId: 'SC25', salaryLineId: 'SL6', componentType: SalaryComponentType.Deduction, componentName: 'PF', amount: 3480, isStatutory: true },

  // ===== SL7 =====
  { salaryComponentLineId: 'SC26', salaryLineId: 'SL7', componentType: SalaryComponentType.Earning, componentName: 'Basic', amount: 31000 },
  { salaryComponentLineId: 'SC27', salaryLineId: 'SL7', componentType: SalaryComponentType.Earning, componentName: 'HRA', amount: 12000 },
  { salaryComponentLineId: 'SC28', salaryLineId: 'SL7', componentType: SalaryComponentType.Deduction, componentName: 'PF', amount: 3720, isStatutory: true },

  // ===== SL8 =====
  { salaryComponentLineId: 'SC29', salaryLineId: 'SL8', componentType: SalaryComponentType.Earning, componentName: 'Basic', amount: 27000 },
  { salaryComponentLineId: 'SC30', salaryLineId: 'SL8', componentType: SalaryComponentType.Earning, componentName: 'HRA', amount: 10500 },
  { salaryComponentLineId: 'SC31', salaryLineId: 'SL8', componentType: SalaryComponentType.Deduction, componentName: 'PF', amount: 3240, isStatutory: true },

  // ===== SL9 =====
  { salaryComponentLineId: 'SC32', salaryLineId: 'SL9', componentType: SalaryComponentType.Earning, componentName: 'Basic', amount: 33000 },
  { salaryComponentLineId: 'SC33', salaryLineId: 'SL9', componentType: SalaryComponentType.Earning, componentName: 'HRA', amount: 13000 },
  { salaryComponentLineId: 'SC34', salaryLineId: 'SL9', componentType: SalaryComponentType.Deduction, componentName: 'PF', amount: 3960, isStatutory: true },

  // ===== SL10 =====
  { salaryComponentLineId: 'SC35', salaryLineId: 'SL10', componentType: SalaryComponentType.Earning, componentName: 'Basic', amount: 25000 },
  { salaryComponentLineId: 'SC36', salaryLineId: 'SL10', componentType: SalaryComponentType.Earning, componentName: 'HRA', amount: 9500 },
  { salaryComponentLineId: 'SC37', salaryLineId: 'SL10', componentType: SalaryComponentType.Deduction, componentName: 'PF', amount: 3000, isStatutory: true },

  // ===== SL11 =====
  { salaryComponentLineId: 'SC38', salaryLineId: 'SL11', componentType: SalaryComponentType.Earning, componentName: 'Basic', amount: 34000 },
  { salaryComponentLineId: 'SC39', salaryLineId: 'SL11', componentType: SalaryComponentType.Earning, componentName: 'HRA', amount: 13500 },
  { salaryComponentLineId: 'SC40', salaryLineId: 'SL11', componentType: SalaryComponentType.Deduction, componentName: 'PF', amount: 4080, isStatutory: true },

  // ===== SL12 =====
  { salaryComponentLineId: 'SC41', salaryLineId: 'SL12', componentType: SalaryComponentType.Earning, componentName: 'Basic', amount: 36000 },
  { salaryComponentLineId: 'SC42', salaryLineId: 'SL12', componentType: SalaryComponentType.Earning, componentName: 'HRA', amount: 14500 },
  { salaryComponentLineId: 'SC43', salaryLineId: 'SL12', componentType: SalaryComponentType.Deduction, componentName: 'PF', amount: 4320, isStatutory: true }
];