import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SalaryDataClient } from '../salary-data-client';
import { Salary, SalaryStatus } from '../salary';
import { SalaryLine } from '../salary-line';
import { EmployeeDataClient } from '../../employee-data-client';
import { AttendanceDataClient } from '../../attendance/attendance-data-client';
import { AttendanceType } from '../../attendance/attendance-line';
import { ToastNotifier } from '../../../../core/services/toast';
import { MasterDataClient } from '../../../../core/services/master-data';
import { SalaryComponentType } from '../salary-component';
import { CommonModule } from '@angular/common';
import { SearchDropdownComponent } from "../../../../shared/components/search-dropdown/search-dropdown";
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-salary-create',
  imports: [CommonModule, RouterModule, SearchDropdownComponent,MatDatepickerModule],
  templateUrl: './salary-create.html',
  styleUrl: './salary-create.css',
})
export class SalaryCreateComponent {

  private readonly router = inject(Router);
  private readonly salaryService = inject(SalaryDataClient);
  private readonly employeeService = inject(EmployeeDataClient);
  private readonly attendanceService = inject(AttendanceDataClient);
  private readonly toast = inject(ToastNotifier);
  private readonly master = inject(MasterDataClient);
  errors = signal<Record<string, string>>({});

  private readonly route = inject(ActivatedRoute);

  // ================= STATE =================

  salaryList = this.salaryService.salaryList;

  editMode = false;

  activeTab = signal<'general' | 'lines'>('general');

  selectedLine = signal<SalaryLine | null>(null);
  showDetails = signal(false);

  today = signal(new Date());


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

  branches = computed(() =>
    this.master.branches().map(b => ({ id: b.branchId, name: b.branchName }))
  );

  periods = this.attendanceService.periods;

  statusOptions = [
    { value: SalaryStatus.Draft, label: 'Draft', hint: 'Editable' },
    { value: SalaryStatus.Processed, label: 'Processed', hint: 'Calculated' },
    { value: SalaryStatus.Approved, label: 'Approved', hint: 'Verified' },
    { value: SalaryStatus.Posted, label: 'Posted', hint: 'Locked' },
    { value: SalaryStatus.Paid, label: 'Paid', hint: 'Completed' }
  ];

  //  Clone seed (IMPORTANT)

  components = structuredClone(this.attendanceService.getComponents());


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


  setPeriod(periodId: string) {
    const period = this.periods().find(p => p.id === periodId);

    if (!period) return;

    this.form.update(f => ({
      ...f,
      payrollPeriodId: periodId,
      salaryMonth: this.getPeriodName(periodId),
      fromDate: period.fromDate,
      toDate: period.toDate
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

    const employees = this.employeeService.employees();

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

      //  CORRECT BASIC
      const basicEarned = perDay * payableDays;

      //  CLONE COMPONENTS
      const components = structuredClone(this.components);

      components.forEach(c => {

        // ===== EARNINGS =====
        if (c.componentName === 'Basic Salary') {
          c.amount = basicEarned;
        }

        if (c.componentName === 'House Rent Allowance (HRA)') {
          c.amount = basicEarned * 0.4;
        }

        if (c.componentName === 'Overtime') {
          c.amount = 0;
        }

        // ===== DEDUCTIONS =====
        if (c.componentName === 'Provident Fund (PF)') {
          c.amount = basicEarned * 0.12;
        }

        if (c.componentName === 'Employee State Insurance (ESI)') {
          c.amount = basicEarned * 0.0075;
        }

        if (c.componentName === 'Loss of Pay (LOP)') {
          const lopDays = 30 - payableDays;
          c.amount = perDay * lopDays;
        }

      });

      // ✅ Totals
      const grossEarnings = components
        .filter(c => c.componentType === SalaryComponentType.Earning)
        .reduce((sum, c) => sum + (c.amount || 0), 0);

      const totalDeductions = components
        .filter(c => c.componentType === SalaryComponentType.Deduction)
        .reduce((sum, c) => sum + (c.amount || 0), 0);

      const net = Math.max(0, grossEarnings - totalDeductions);

      return {
        salaryLineId: crypto.randomUUID(),
        employeeId: emp.employeeId!,
        basicSalary: basic,
        payableDays,
        overtimeHours: 0,

        grossEarnings: Math.round(grossEarnings),
        totalDeductions: Math.round(totalDeductions),
        netSalary: Math.round(net),

        salaryComponents: components
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

    const periodId = this.form().payrollPeriodId;

    // Check duplicate (ignore current record in edit mode)
    const exists = this.salaryService.salaryList()
      .some(s =>
        s.payrollPeriodId === periodId &&
        (!this.editMode || s.salaryId !== this.form().salaryId)
      );

    if (exists) {
      this.toast.error("Salary already created for this payroll period");
      return;
    }

    const salary: Salary = {
      ...this.form(),
      salaryLines: this.lines(),
      totalEmployees: this.totalEmployees(),
      totalGrossAmount: this.totalGross(),
      totalDeductionAmount: this.totalDeduction(),
      totalNetSalary: this.totalNet(),

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
    const emp = this.employeeService.getById(id);
    return emp ? `${emp.firstName} ${emp.lastName}` : id;
  }

  getPeriodName(id: string): string {
    return this.periods().find(p => p.id === id)?.name ?? '';
  }


  openDetails(line: SalaryLine) {
    this.selectedLine.set(line);
    this.showDetails.set(true);
  }

  closeDetails() {
    this.showDetails.set(false);
    this.selectedLine.set(null);
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

  numberToWords(amount: number | undefined): string {
    if (!amount) return '';

    const ones = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six',
      'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
      'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
      'Seventeen', 'Eighteen', 'Nineteen'
    ];

    const tens = [
      '', '', 'Twenty', 'Thirty', 'Forty',
      'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];

    function convert(n: number): string {
      if (n < 20) return ones[n];
      if (n < 100) return tens[Math.floor(n / 10)] + ' ' + ones[n % 10];
      if (n < 1000)
        return ones[Math.floor(n / 100)] + ' Hundred ' + convert(n % 100);
      if (n < 100000)
        return convert(Math.floor(n / 1000)) + ' Thousand ' + convert(n % 1000);
      if (n < 10000000)
        return convert(Math.floor(n / 100000)) + ' Lakh ' + convert(n % 100000);
      return convert(Math.floor(n / 10000000)) + ' Crore ' + convert(n % 10000000);
    }

    return convert(Math.floor(amount)) + ' Rupees Only';
  }

  earnings = computed(() =>
    this.selectedLine()?.salaryComponents?.filter(c => c.componentType === 'Earning') ?? []
  );

  deductions = computed(() =>
    this.selectedLine()?.salaryComponents?.filter(c => c.componentType === 'Deduction') ?? []
  );

  maxRows = computed(() =>
    Math.max(this.earnings().length, this.deductions().length)
  );

  rows = computed(() => {
    const e = this.earnings().filter(x => (x.amount ?? 0) > 0);
    const d = this.deductions().filter(x => (x.amount ?? 0) > 0);

    const max = Math.max(e.length, d.length);

    return Array.from({ length: max }, (_, i) => ({
      earning: e[i],
      deduction: d[i]
    }));
  });

  payrollPeriodDropdownItems = computed(() =>

  this.periods()

    .filter(x => !!x.id)

    .map(x => ({

      id: x.id!,

      name: x.name

    }))
);

}