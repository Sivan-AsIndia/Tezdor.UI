import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SalaryDataClient } from '../salary-data-client';
import { Salary, SalaryStatus } from '../salary';
import { SalaryLine } from '../salary-line';
import { EmployeeDataClient } from '../../employee-data-client';
import { AttendanceDataClient } from '../../attendance/attendance-data-client';
import { AttendanceType } from '../../attendance/attendance-line';
import { ToastNotifier } from '../../../../core/services/toast';

@Component({
  selector: 'app-salary-create',
  imports: [RouterModule],
  templateUrl: './salary-create.html',
  styleUrl: './salary-create.css',
})
export class SalaryCreateComponent {

  private readonly router = inject(Router);
  private readonly salaryService = inject(SalaryDataClient);
    private readonly employeeService = inject(EmployeeDataClient);
        private readonly attendanceService = inject(AttendanceDataClient);
          private readonly toast = inject(ToastNotifier);
          errors = signal<Record<string, string>>({});

private readonly route = inject(ActivatedRoute);

  // ================= STATE =================

  editMode = false;

  activeTab = signal<'general' | 'lines'>('general');

  form = signal<Salary>({
    salaryNumber: '',
    branchId: '',
    payrollPeriodId: '',
    fromDate: '',
    toDate: '',
    salaryDate: '',
    salaryMonth: '',
    paymentDate: '',
    status: SalaryStatus.Draft,
    expenseAccountId: '',
    payableAccountId: ''
  });

  lines = signal<SalaryLine[]>([]);

  // ================= MOCK DATA =================

  branches = signal([
    { id: 'B1', name: 'Head Office' },
    { id: 'B2', name: 'Chennai Branch' }
  ]);

  periods = this.attendanceService.periods;

  statusOptions = [
    { value: SalaryStatus.Draft, label: 'Draft', hint: 'Editable' },
    { value: SalaryStatus.Processed, label: 'Processed', hint: 'Calculated' },
    { value: SalaryStatus.Approved, label: 'Approved', hint: 'Verified' },
    { value: SalaryStatus.Posted, label: 'Posted', hint: 'Locked' },
    { value: SalaryStatus.Paid, label: 'Paid', hint: 'Completed' }
  ];


  constructor() {

  effect(() => {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    const salary = this.salaryService.getById(id);

    if (!salary) return;

    this.editMode = true;

    this.form.set({ ...salary });

    this.lines.set(salary.salaryLines ?? []);

  });

}
  // ================= TAB =================

setTab(tab: 'general' | 'lines') {

  if (tab === 'lines') {

    const f = this.form();

    if (!f.payrollPeriodId || !f.fromDate || !f.toDate) {
      this.validate(); // reuse to show errors
      this.toast.error("Complete General details");
      return;
    }

    if (f.fromDate > f.toDate) {
      this.validate();
      return;
    }
  }

  this.activeTab.set(tab);
}
  // ================= SETTERS =================

  setBranch(val: string) {
    this.form.update(f => ({ ...f, branchId: val }));
  }

setFromDate(val: string) {
  this.form.update(f => ({ ...f, fromDate: val }));
  this.clearError('fromDate');
}

setToDate(val: string) {
  this.form.update(f => ({ ...f, toDate: val }));
  this.clearError('toDate');
}

setPeriod(val: string) {
  this.form.update(f => ({
    ...f,
    payrollPeriodId: val,
    salaryMonth: this.getPeriodName(val)
  }));
  this.clearError('payrollPeriodId');
}

  setSalaryDate(val: string) {
    this.form.update(f => ({ ...f, salaryDate: val }));
  }

  setStatus(val: SalaryStatus) {
    this.form.update(f => ({ ...f, status: val }));
  }

  // ================= LINES =================

generateSalary() {

  const employees = this.employeeService.employees(); //  signal call

  const from = this.form().fromDate;
  const to = this.form().toDate;

  if (!from || !to) {
    this.toast.error('Select date range');
    return;
  }

  const lines: SalaryLine[] = employees.map(emp => {

    const attendance =
      this.attendanceService.getByEmployeeAndDate(
        emp.employeeId!,
        from,
        to
      ) ?? [];

    const payableDays = attendance.filter(a =>
      a.attendanceType === AttendanceType.Present
    ).length;

    const basic = emp.basicSalary ?? 0;
    const perDay = basic / 30;

    const gross = perDay * payableDays;

    const pf = basic * 0.12;
    const esi = gross * 0.0075;

    const totalDeductions = pf + esi;

    const net = gross - totalDeductions;

    return {
      salaryLineId: crypto.randomUUID(),
      employeeId: emp.employeeId!,
      basicSalary: basic,
      payableDays,
      overtimeHours: 0,
      grossEarnings: Math.round(gross),
      totalDeductions: Math.round(totalDeductions),
      netSalary: Math.round(net)
    };

  });

  this.lines.set(lines);
}

  removeLine(id?: string) {
    this.lines.update(list => list.filter(l => l.salaryLineId !== id));
     this.toast.success("line removed successfully");
  }

  // ================= CALCULATIONS =================

  totalEmployees = computed(() => this.lines().length);

  totalGross = computed(() =>
    this.lines().reduce((sum, l) => sum + (l.grossEarnings ?? 0), 0)
  );

  totalDeduction = computed(() =>
    this.lines().reduce((sum, l) => sum + (l.totalDeductions ?? 0), 0)
  );

  totalNet = computed(() =>
    this.lines().reduce((sum, l) => sum + (l.netSalary ?? 0), 0)
  );

  // ================= SAVE =================

onSave() {

  if (!this.validate()) {
    this.toast.error("Please fix validation errors");
    return;
  }

  const salary: Salary = {
    ...this.form(),
    salaryLines: this.lines(),
    totalEmployees: this.totalEmployees(),
    totalGrossAmount: this.totalGross(),
    totalDeductionAmount: this.totalDeduction(),
    totalNetSalary: this.totalNet()
  };

  if (this.editMode) {
    this.salaryService.update(salary);
    this.toast.success("Updated Successfully");
  } else {
    this.salaryService.add(salary);
    this.toast.success("Added Successfully");
  }

  this.router.navigate(['/salary']);
}

  onCancel() {
    this.router.navigate(['/salary']);
  }

  // ================= HELPERS =================

  formatAmount(val?: number): string {
    return (val ?? 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  getEmployeeName(id: string): string {
    return id; // integrate EmployeeDataClient later
  }

  getPeriodName(id: string): string {
    return this.periods().find(p => p.id === id)?.name ?? '';
  }

  validate(): boolean {

  const f = this.form();
  const errs: Record<string, string> = {};

  if (!f.payrollPeriodId) {
    errs['payrollPeriodId'] = 'Payroll period is required';
  }

  if (!f.fromDate) {
    errs['fromDate'] = 'From date is required';
  }

  if (!f.toDate) {
    errs['toDate'] = 'To date is required';
  }

  // 🔥 Optional (strong validation)
  if (f.fromDate && f.toDate && f.fromDate > f.toDate) {
    errs['toDate'] = 'To date must be greater than or equal to From date';
  }

  this.errors.set(errs);

  return Object.keys(errs).length === 0;
}

hasError(field: string) {
  return !!this.errors()[field];
}

getError(field: string) {
  return this.errors()[field];
}

clearError(field: string) {
  const errs = { ...this.errors() };
  delete errs[field];
  this.errors.set(errs);
}


}