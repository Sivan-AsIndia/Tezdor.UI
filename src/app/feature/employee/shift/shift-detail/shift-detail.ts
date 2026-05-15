import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ShiftDataClient } from '../shift-data-client';
import { Shift } from '../shift';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeDataClient } from '../../employee-data-client';
import { ShiftAssignmentDataClient } from '../shift-assignment-data-client';
import { MasterDataClient } from '../../../../core/services/master-data';
import { ToastNotifier } from '../../../../core/services/toast';
import { ShiftAssignment } from '../shift-assignment';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
declare const bootstrap: any;
@Component({
  selector: 'app-shift-detail',
  imports: [RouterModule, CommonModule,MatDatepickerModule],
  templateUrl: './shift-detail.html',
  styleUrl: './shift-detail.css',
})
export class ShiftDetailComponent {
  /* =====================================================
     INJECT
  ===================================================== */
  private readonly toast =
    inject(ToastNotifier);


  private readonly route =
    inject(ActivatedRoute);

  private readonly shiftService =
    inject(ShiftDataClient);


  private readonly employeeService =
    inject(EmployeeDataClient);

  private readonly shiftAssignmentService =
    inject(
      ShiftAssignmentDataClient
    );

  private readonly master = inject(MasterDataClient);

  readonly shifts = this.shiftService.shifts;

  readonly selectedShift =
    signal<Shift | null>(null);
  assignFormErrors =
    signal({

      effectiveFrom: false

    });

  employees = this.employeeService.employees;
  /* =====================================================
     MODAL
  ===================================================== */

  readonly departments = this.master.departments;
  readonly designations = this.master.designations;
  /* =====================================================
     STATE
  ===================================================== */

  shift =
    signal<Shift | null>(
      null
    );

  activeTab =
    signal<
      'overview' |
      'rules' |
      'audit'
    >('overview');

  readonly paramMap =
    toSignal(
      this.route.paramMap
    );


  readonly hasAssignments =
    computed(() =>

      this.shiftAssignments()
        .length > 0

    );


  /* ASSIGN SHIFT FORM */

  assignForm = signal({

    assignType:
      'Employee',

    employeeIds:
      [] as string[],

    departmentIds:
      [] as string[],

    designationIds:
      [] as string[],

    effectiveFrom:
      new Date().toLocaleDateString('en-CA'),

    effectiveTo:
      '',

    overrideExistingShift:
      false,

    isDefaultShift:
      false,

    isActive:
      true,

    remarks:
      ''

  });

  updateAssignForm<
    K extends keyof ReturnType<typeof this.assignForm>
  >(
    key: K,
    value: ReturnType<typeof this.assignForm>[K]
  ) {

    this.assignForm.update(form => ({

      ...form,

      [key]: value

    }));

  }

  toggleEmployee(
    id: string
  ) {

    this.assignForm.update(form => {

      const exists =
        form.employeeIds.includes(id);

      return {

        ...form,

        employeeIds:

          exists

            ?

            form.employeeIds.filter(x => x !== id)

            :

            [...form.employeeIds, id]

      };

    });

  }


  /* =====================================================
     INIT
  ===================================================== */

  constructor() {

    effect(() => {

      const params =
        this.paramMap();

      if (!params)
        return;

      const id =
        params.get('id');

      if (!id)
        return;

      const shift =
        this.shiftService
          .getById(id);

      this.shift.set(
        shift ?? null
      );

    });

  }

  /* =====================================================
     TAB
  ===================================================== */

  setTab(
    tab:
      'overview' |
      'rules' |
      'audit'
  ) {

    this.activeTab.set(tab);

  }

  /* =====================================================
     HELPERS
  ===================================================== */

  getWorkingHours() {

    const s =
      this.shift()?.startTime;

    const e =
      this.shift()?.endTime;

    if (!s || !e)
      return '0h 00m';

    const [sh, sm] =
      s.split(':').map(Number);

    const [eh, em] =
      e.split(':').map(Number);

    let mins =

      (eh * 60 + em)

      -

      (sh * 60 + sm);

    if (mins < 0)
      mins += 1440;

    const h =
      Math.floor(mins / 60);

    const m =
      mins % 60;

    return `${h}h ${m.toString().padStart(2, '0')}m`;

  }

  getWeekOffCount() {

    const s =
      this.shift();

    if (!s)
      return 0;

    return [

      s.isSundayOff,
      s.isMondayOff,
      s.isTuesdayOff,
      s.isWednesdayOff,
      s.isThursdayOff,
      s.isFridayOff,
      s.isSaturdayOff

    ].filter(Boolean).length;

  }

  getWeekOffText() {

    const s =
      this.shift();

    if (!s)
      return '-';

    const days: string[] = [];

    if (s.isSundayOff)
      days.push('Sun');

    if (s.isMondayOff)
      days.push('Mon');

    if (s.isTuesdayOff)
      days.push('Tue');

    if (s.isWednesdayOff)
      days.push('Wed');

    if (s.isThursdayOff)
      days.push('Thu');

    if (s.isFridayOff)
      days.push('Fri');

    if (s.isSaturdayOff)
      days.push('Sat');

    return days.join(', ');

  }

  getInitials(
    firstName?: string,
    lastName?: string
  ) {

    return `

    ${firstName?.[0] || ''}

    ${lastName?.[0] || ''}

  `.trim();

  }

  readonly assignedEmployees =
    computed(() => {

      const shift =
        this.shift();

      if (!shift)
        return [];

      const assignments =

        this.shiftAssignmentService
          .assignments()

          .filter(x =>

            x.shiftId ===
            shift.shiftId

            &&

            x.isActive

          );

      const employeeIds =

        assignments.flatMap(x =>

          x.employeeIds || []

        );

      return this.employees()

        .filter(emp =>

          employeeIds.includes(
            emp.employeeId!
          )

        );

    });

  readonly shiftAssignments =
    computed(() => {

      const shift =
        this.shift();

      if (!shift)
        return [];

      return this
        .shiftAssignmentService
        .assignments()

        .filter(x =>

          x.shiftId ===
          shift.shiftId

          &&

          x.isActive

        );

    });

  readonly assignedDepartments =
    computed(() => {

      const ids =

        this.shiftAssignments()

          .flatMap(x =>

            x.departmentIds || []

          );

      return this.departments()

        .filter(x =>

          ids.includes(
            x.id!
          )

        );

    });

  readonly assignedDesignations =
    computed(() => {

      const ids =

        this.shiftAssignments()

          .flatMap(x =>

            x.designationIds || []

          );

      return this.designations()

        .filter(x =>

          ids.includes(
            x.id!
          )

        );

    });

  readonly totalAssignments =
    computed(() =>

      this.assignedEmployees().length

      +

      this.assignedDepartments().length

      +

      this.assignedDesignations().length

    );
  readonly visibleAssignedEmployees =
    computed(() =>

      this.assignedEmployees()
        .slice(0, 5)

    );

  openAssignModal(
    shift: Shift
  ) {

    this.selectedShift.set(
      shift
    );

    /* EXISTING ASSIGNMENT */
    const existingAssignment =

      this.shiftAssignmentService
        .assignments()

        .filter(x =>

          x.shiftId ===
          shift.shiftId

        )

        .at(-1);

    /* HAS ASSIGNMENT */
    if (existingAssignment) {

      /* DETECT ASSIGN TYPE */
      let assignType:
        'Employee'
        |
        'Department'
        |
        'Designation'
        = 'Employee';

      if (
        existingAssignment
          .departmentIds
          ?.length
      ) {

        assignType =
          'Department';

      }

      else if (
        existingAssignment
          .designationIds
          ?.length
      ) {

        assignType =
          'Designation';

      }

      this.assignForm.set({

        assignType,

        /* IDS */
        employeeIds:
          existingAssignment
            .employeeIds || [],

        departmentIds:
          existingAssignment
            .departmentIds || [],

        designationIds:
          existingAssignment
            .designationIds || [],

        /* DATES */
        effectiveFrom:
          existingAssignment
            .effectiveFrom ||   new Date().toLocaleDateString('en-CA'),

        effectiveTo:
          existingAssignment
            .effectiveTo || '',

        /* FLAGS */
        isDefaultShift:
          existingAssignment
            .isDefaultShift ?? false,

        overrideExistingShift:
          existingAssignment
            .overrideExistingShift ?? false,

        isActive:
          existingAssignment
            .isActive ?? true,

        /* REMARKS */
        remarks:
          existingAssignment
            .remarks || ''

      });

    }

    /* NO ASSIGNMENT */
    else {

      this.resetAssignForm();

    }

  }

  readonly employeeDropdownItems =
    computed(() =>

      this.employeeService
        .employees()

        .map(emp => ({

          id:
            emp.employeeId!,

          name:
            `${emp.firstName} ${emp.lastName}`

        }))

    );

  assignShift() {

    const shift =
      this.selectedShift();

    const form =
      this.assignForm();

    if (!shift) {

      this.toast.error(
        'Select shift'
      );

      return;

    }

    this.assignFormErrors.set({

      effectiveFrom:
        !form.effectiveFrom

    });

    if (!form.effectiveFrom) {

      this.toast.error(
        'Select effective date'
      );

      return;

    }

    /* EFFECTIVE TO VALIDATION */

    if (form.effectiveTo &&  new Date(form.effectiveTo) < new Date(form.effectiveFrom)) {

      this.toast.error(

        'Effective To date cannot be less than Effective From date'

      );

      return;

    }

    /* EMPLOYEE */

    if (form.assignType === 'Employee' && form.employeeIds.length === 0) {

      this.toast.error(
        'Select at least one employee'
      );

      return;

    }

    /* Department */

    if (

      form.assignType === 'Department'

      &&

      form.departmentIds.length === 0

    ) {

      this.toast.error(
        'Select at least one Department'
      );

      return;

    }

    /* Designation */

    if (

      form.assignType === 'Designation'

      &&

      form.designationIds.length === 0

    ) {

      this.toast.error(
        'Select at least one Designation'
      );

      return;

    }

    const payload: ShiftAssignment = {

      shiftId:
        shift.shiftId!,

      employeeIds:
        form.employeeIds,

      departmentIds:
        form.departmentIds,

      designationIds:
        form.designationIds,

      effectiveFrom:
        form.effectiveFrom,

      effectiveTo:
        form.effectiveTo || null,

      overrideExistingShift:
        form.overrideExistingShift,

      isDefaultShift:
        form.isDefaultShift,

      isActive:
        form.isActive,

      remarks:
        form.remarks

    };

    this.shiftAssignmentService
    this.shiftAssignmentService
      .updateByShiftId(
        payload
      );

    this.toast.success(
      'Shift assigned successfully'
    );

    const modalEl =
      document.getElementById(
        'assignShiftModal'
      );

    if (modalEl) {

      const modal =
        bootstrap.Modal
          .getInstance(modalEl);

      modal?.hide();

    }

    this.resetAssignForm();
  }


  resetAssignForm() {
    /* RESET */

    this.assignForm.set({

      assignType:
        'Employee',

      employeeIds:
        [],

      departmentIds:
        [],

      designationIds:
        [],

      effectiveFrom:
        '',

      effectiveTo:
        '',

      overrideExistingShift:
        false,

      isDefaultShift:
        false,

      isActive:
        true,

      remarks:
        ''

    });


  }

  departmentDropdownItems = computed(() =>

    this.departments()

      .filter(x => !!x.id)

      .map(x => ({

        id: x.id!,

        name: x.name

      }))
  );

  designationDropdownItems = computed(() =>

    this.designations()

      .filter(x => !!x.id)

      .map(x => ({

        id: x.id!,

        name: x.name

      }))
  );


  toggleDepartment(
    id: string
  ) {

    this.assignForm.update(form => {

      const exists =

        form.departmentIds
          .includes(id);

      return {

        ...form,

        departmentIds:

          exists

            ?

            form.departmentIds
              .filter(x => x !== id)

            :

            [
              ...form.departmentIds,
              id
            ]

      };

    });

  }

  toggleDesignation(
    id: string
  ) {

    this.assignForm.update(form => {

      const exists =

        form.designationIds
          .includes(id);

      return {

        ...form,

        designationIds:

          exists

            ?

            form.designationIds
              .filter(x => x !== id)

            :

            [
              ...form.designationIds,
              id
            ]

      };

    });

  }

  getDesignation(
    designationId?: string
  ): string {

    if (!designationId)
      return '-';

    return (

      this.master
        .designations()
        .find(x =>

          x.id === designationId

        )

        ?.name

      ||

      '-'

    );

  }


}