import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Employee } from '../employee';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeDataClient } from '../employee-data-client';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule,RouterModule],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetailComponent {


  private readonly route = inject(ActivatedRoute);
  private readonly empService = inject(EmployeeDataClient);

  activeTab = signal<'personal' | 'job' | 'salary' | 'pay'>('personal');

  employee = signal<Employee | null>(null);

  paramMap = toSignal(this.route.paramMap);

  constructor() {
    effect(() => {
      const params = this.paramMap();
      if (!params) return;

      const id = params.get('id');
      if (!id) return;

      const emp = this.empService.getById(id);
      this.employee.set(emp ?? null);
    });
  }

  setTab(tab: 'personal' | 'job' | 'salary' | 'pay') {
    this.activeTab.set(tab);
  }

  print() {
    window.print();
  }

  // 🔹 helpers
  getFullName(emp: Employee) {
    return `${emp.firstName} ${emp.lastName}`;
  }

  getInitials(emp: Employee) {
    return `${emp.firstName?.[0] ?? ''}${emp.lastName?.[0] ?? ''}`;
  }

  formatDate(date?: Date) {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-GB');
  }

  getAge(date?: Date) {
    if (!date) return '-';
    const diff = new Date().getFullYear() - new Date(date).getFullYear();
    return diff + ' Years';
  }
}

