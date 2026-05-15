import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Employee } from '../employee';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeDataClient } from '../employee-data-client';
import { PrintService } from '../../../core/print/print.service';
import { ShiftAssignmentDataClient } from '../shift/shift-assignment-data-client';
import { ShiftDataClient } from '../shift/shift-data-client';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetailComponent {


  private readonly route = inject(ActivatedRoute);
  private readonly empService = inject(EmployeeDataClient);
  private readonly printService = inject(PrintService);
  private readonly shiftAssignmentService = inject(ShiftAssignmentDataClient);
  private readonly shiftService = inject(ShiftDataClient);

  activeTab =
    signal<
      'personal'
      |
      'job'
      |
      'shift'
      |
      'salary'
      |
      'pay'
    >('personal');

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

  setTab(tab: 'personal' | 'job' | 'salary' | 'pay' | 'shift') {
    this.activeTab.set(tab);
  }

  print() {
    const emp = this.employee();
    if (emp) {
      this.printService.printEmployee(emp);
    }
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

  readonly employeeShiftAssignments =
    computed(() => {

      const emp =
        this.employee();

      if (!emp)
        return [];

      const assignments =

        this
          .shiftAssignmentService
          .assignments()

          .filter(x =>

            x.isActive

          );

      /* =====================================================
         1. EMPLOYEE SHIFT
      ===================================================== */

      const employeeAssignments =

        assignments.filter(x =>

          x.employeeIds
            ?.includes(
              emp.employeeId!
            )

        );

      if (
        employeeAssignments.length
      ) {

        return employeeAssignments;

      }

      /* =====================================================
         2. DEPARTMENT SHIFT
      ===================================================== */

      const departmentAssignments =

        assignments.filter(x =>

          x.departmentIds
            ?.includes(
              emp.departmentId!
            )

        );

      if (
        departmentAssignments.length
      ) {

        return departmentAssignments;

      }

      /* =====================================================
         3. DESIGNATION SHIFT
      ===================================================== */

      const designationAssignments =

        assignments.filter(x =>

          x.designationIds
            ?.includes(
              emp.designationId!
            )

        );

      if (
        designationAssignments.length
      ) {

        return designationAssignments;

      }

      /* =====================================================
         4. BRANCH SHIFT
      ===================================================== */

      const branchAssignments =

        assignments.filter(x =>

          x.branchIds
            ?.includes(
              emp.branchId!
            )

        );

      if (
        branchAssignments.length
      ) {

        return branchAssignments;

      }

      /* =====================================================
         5. DEFAULT SHIFT
      ===================================================== */

      const defaultShift =

        this.shiftService
          .shifts()

          .find(x =>

            x.isDefault

            &&

            x.isActive

          );

      if (!defaultShift) {

        return [];

      }

      return [

        {

          shiftAssignmentId:
            'default-shift',

          shiftId:
            defaultShift.shiftId!,

          employeeIds:
            [emp.employeeId!],

          departmentIds: [],
          designationIds: [],
          branchIds: [],

          effectiveFrom:
            defaultShift.createdOn ||

            new Date()
              .toISOString(),

          effectiveTo:
            null,

          isDefaultShift:
            true,

          overrideExistingShift:
            false,

          isActive:
            true,

          remarks:
            'Default shift assigned automatically'

        }

      ];

    });

  getShiftName(
    shiftId?: string
  ) {

    if (!shiftId)
      return '-';

    return this
      .shiftService
      .getById(shiftId)
      ?.shiftName

      ||

      '-';

  }

  getShift(
    shiftId?: string
  ) {

    if (!shiftId)
      return null;

    return this
      .shiftService
      .getById(
        shiftId
      );

  }
}

