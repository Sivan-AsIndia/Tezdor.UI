import { Injectable, signal, computed } from '@angular/core';
import { Salary, SalaryStatus } from './salary';
import { SalaryLine } from './salary-line';
import { SALARY_SEED } from './salary.seed';

@Injectable({
  providedIn: 'root'
})
export class SalaryDataClient {

  // ===== STATE =====
  private readonly _salaryList = signal<Salary[]>(SALARY_SEED);

  // ===== READ =====
  salaryList = this._salaryList.asReadonly();

  total = computed(() => this._salaryList().length);

  // ===== GET BY ID (REACTIVE) =====
  getSalary(id: string) {
    return computed(() =>
      this._salaryList().find(s => s.salaryId === id) ?? null
    );
  }

  // ===== GET BY ID (NON-REACTIVE) =====
  getById(id: string): Salary | undefined {
    return this._salaryList().find(s => s.salaryId === id);
  }

  // ===== ADD =====
  add(salary: Salary) {

    const count = this._salaryList().length + 1;
    const year = new Date().getFullYear();

    const salaryNumber = `SAL-${year}-${count
      .toString()
      .padStart(3, '0')}`;

    const newSalary: Salary = {
      ...salary,
      salaryId: crypto.randomUUID(),
      salaryNumber,
      status: SalaryStatus.Draft,
      createdAt: new Date()
    };

    this._salaryList.update(list => [...list, newSalary]);
  }

  // ===== UPDATE =====
  update(updated: Salary) {
    this._salaryList.update(list =>
      list.map(s =>
        s.salaryId === updated.salaryId
          ? { ...s, ...updated, updatedAt: new Date() }
          : s
      )
    );
  }

  // ===== DELETE =====
  delete(id: string) {
    this._salaryList.update(list =>
      list.filter(s => s.salaryId !== id)
    );
  }

  // ===== BULK DELETE =====
  deleteMultiple(ids: string[]) {
    this._salaryList.update(list =>
      list.filter(s => !ids.includes(s.salaryId!))
    );
  }

  // ===== SALARY LINE OPERATIONS =========================

  // ===== ADD LINE =====
  addLine(salaryId: string, line: SalaryLine) {

    this._salaryList.update(list =>
      list.map(s => {

        if (s.salaryId !== salaryId) return s;

        const newLine: SalaryLine = {
          ...line,
          salaryLineId: crypto.randomUUID(),
          salaryId
        };

        const updatedLines = [...(s.salaryLines ?? []), newLine];

        return {
          ...s,
          salaryLines: updatedLines,
          totalEmployees: updatedLines.length
        };
      })
    );
  }

  // ===== UPDATE LINE =====
  updateLine(salaryId: string, updatedLine: SalaryLine) {

    this._salaryList.update(list =>
      list.map(s => {

        if (s.salaryId !== salaryId) return s;

        return {
          ...s,
          salaryLines: (s.salaryLines ?? []).map(l =>
            l.salaryLineId === updatedLine.salaryLineId
              ? { ...l, ...updatedLine }
              : l
          )
        };
      })
    );
  }

  // ===== DELETE LINE =====
  deleteLine(salaryId: string, lineId: string) {

    this._salaryList.update(list =>
      list.map(s => {

        if (s.salaryId !== salaryId) return s;

        const updatedLines = (s.salaryLines ?? [])
          .filter(l => l.salaryLineId !== lineId);

        return {
          ...s,
          salaryLines: updatedLines,
          totalEmployees: updatedLines.length
        };
      })
    );
  }

  // ===== CALCULATIONS ==================================

  // ===== RECALCULATE TOTALS =====
  recalculateSalary(salaryId: string) {

    this._salaryList.update(list =>
      list.map(s => {

        if (s.salaryId !== salaryId) return s;

        const lines = s.salaryLines ?? [];

        const totalGross = lines.reduce((sum, l) => sum + (l.grossEarnings ?? 0), 0);
        const totalDeduction = lines.reduce((sum, l) => sum + (l.totalDeductions ?? 0), 0);
        const totalNet = lines.reduce((sum, l) => sum + (l.netSalary ?? 0), 0);

        return {
          ...s,
          totalEmployees: lines.length,
          totalGrossAmount: totalGross,
          totalDeductionAmount: totalDeduction,
          totalNetSalary: totalNet
        };
      })
    );
  }

  // ===== WORKFLOW ======================================

  updateStatus(id: string, status: SalaryStatus) {
    this._salaryList.update(list =>
      list.map(s =>
        s.salaryId === id
          ? { ...s, status }
          : s
      )
    );
  }

}