import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SalaryDataClient } from '../salary-data-client';
import { EmployeeDataClient } from '../../employee-data-client';
import { Salary } from '../salary';
import { toSignal } from '@angular/core/rxjs-interop';
import { SalaryLine } from '../salary-line';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salary-detail',
  imports: [RouterModule, CommonModule],
  templateUrl: './salary-detail.html',
  styleUrl: './salary-detail.css',
})
export class SalaryDetailComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly salaryService = inject(SalaryDataClient);
  private readonly empService = inject(EmployeeDataClient);

  salary = signal<Salary | null>(null);

  paramMap = toSignal(this.route.paramMap);

  selectedLine = signal<SalaryLine | null>(null);
  showDetails = signal(false);

  today = signal(new Date());

  constructor() {
    effect(() => {

      const params = this.paramMap();
      if (!params) return;

      const id = params.get('id');
      if (!id) return;

      const sal = this.salaryService.getById(id);
      this.salary.set(sal ?? null);

    });
  }

  // ================= HELPERS =================

  getEmployeeName(id: string): string {
    const emp = this.empService.getById(id);
    return emp ? `${emp.firstName} ${emp.lastName}` : id;
  }

  formatAmount(val?: number): string {
    return (val ?? 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  formatDate(date?: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-GB');
  }

  print() {
    window.print()
  }

  openDetails(line: SalaryLine) {
    this.selectedLine.set(line);
    this.showDetails.set(true);
  }

  closeDetails() {
    this.showDetails.set(false);
    this.selectedLine.set(null);
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


}