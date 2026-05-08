import { Injectable, signal, computed } from '@angular/core';
import { EMPLOYEES } from './employee.seed';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataClient {

  // ===== STATE =====
  private readonly _employees = signal<Employee[]>(EMPLOYEES);

  // ===== READ =====
  employees = this._employees.asReadonly();

  total = computed(() => this._employees().length);


  getEmployee(id: string) {
    return computed(() =>
      this._employees().find(e => e.employeeId === id) ?? null
    );
  }

  // ===== GET BY ID =====
  getById(id: string): Employee | undefined {
    return this._employees().find(e => e.employeeId === id);
  }

  // ===== ADD =====
  add(employee: Employee) {

    const list = this._employees();

    const maxCode = list
      .map(e => Number(e.employeeCode?.replace('EMP', '')) || 0)
      .reduce((max, val) => Math.max(max, val), 0);

    const employeeCode = `EMP${(maxCode + 1).toString().padStart(3, '0')}`;

    const newEmp: Employee = {
      ...employee,
      employeeId: crypto.randomUUID(),
      employeeCode,
      createdAt: new Date()
    };

    this._employees.update(list => [...list, newEmp]);
  }

  // ===== UPDATE =====
  update(updated: Employee) {
    this._employees.update(list =>
      list.map(emp =>
        emp.employeeId === updated.employeeId
          ? { ...emp, ...updated, modifiedAt: new Date() }
          : emp
      )
    );
  }

  // ===== DELETE =====
  delete(id: string) {
    this._employees.update(list =>
      list.filter(emp => emp.employeeId !== id)
    );
  }

  // ===== BULK DELETE ===== 
  deleteMultiple(ids: string[]) {
    this._employees.update(list =>
      list.filter(emp => !ids.includes(emp.employeeId!))
    );
  }
}