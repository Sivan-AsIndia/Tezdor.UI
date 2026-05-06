import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SalaryDataClient } from '../salary-data-client';
import { EmployeeDataClient } from '../../employee-data-client';
import { Salary } from '../salary';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-salary-detail',
  imports: [RouterModule],
  templateUrl: './salary-detail.html',
  styleUrl: './salary-detail.css',
})
export class SalaryDetailComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly salaryService = inject(SalaryDataClient);
  private readonly empService = inject(EmployeeDataClient);

  salary = signal<Salary | null>(null);

  paramMap = toSignal(this.route.paramMap);

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

  print(){
    window.print()
  }

}