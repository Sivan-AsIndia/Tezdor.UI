import { SalaryComponent, SalaryComponentType } from "./salary-component";

export const SALARY_COMPONENT_SEED: SalaryComponent[] = [

  // EARNINGS

  {
    componentType: SalaryComponentType.Earning,
    componentName: 'Basic Salary',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Earning,
    componentName: 'House Rent Allowance (HRA)',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Earning,
    componentName: 'Dearness Allowance (DA)',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Earning,
    componentName: 'Conveyance Allowance',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Earning,
    componentName: 'Medical Allowance',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Earning,
    componentName: 'Special Allowance',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Earning,
    componentName: 'Bonus',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Earning,
    componentName: 'Overtime',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Earning,
    componentName: 'Incentives',
    amount: 0,
    isStatutory: false
  },

  // DEDUCTIONS

  {
    componentType: SalaryComponentType.Deduction,
    componentName: 'Provident Fund (PF)',
    amount: 0,
    isStatutory: true
  },
  {
    componentType: SalaryComponentType.Deduction,
    componentName: 'Employee State Insurance (ESI)',
    amount: 0,
    isStatutory: true
  },
  {
    componentType: SalaryComponentType.Deduction,
    componentName: 'Professional Tax (PT)',
    amount: 0,
    isStatutory: true
  },
  {
    componentType: SalaryComponentType.Deduction,
    componentName: 'Income Tax (TDS)',
    amount: 0,
    isStatutory: true
  },
  {
    componentType: SalaryComponentType.Deduction,
    componentName: 'Loan Deduction',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Deduction,
    componentName: 'Salary Advance',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Deduction,
    componentName: 'Loss of Pay (LOP)',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Deduction,
    componentName: 'Late Penalty',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Deduction,
    componentName: 'Insurance',
    amount: 0,
    isStatutory: false
  },
  {
    componentType: SalaryComponentType.Deduction,
    componentName: 'Other Deduction',
    amount: 0,
    isStatutory: false
  }

];