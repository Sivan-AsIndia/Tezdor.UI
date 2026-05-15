import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Shift } from '../shift';
import { ShiftDataClient } from '../shift-data-client';
import { ToastNotifier } from '../../../../core/services/toast';

export interface AccordionSection {

  id: string;

  label: string;

  icon: string;

  subtitle: string;

  isOpen: boolean;

}

@Component({
  selector: 'app-shift-create',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './shift-create.html',
  styleUrl: './shift-create.css',
})
export class ShiftCreateComponent {
  /* =====================================================
     INJECT
  ===================================================== */
private readonly route =
  inject(ActivatedRoute);
  private readonly fb =
    inject(FormBuilder);

  private readonly router =
    inject(Router);
  private readonly service = inject(ShiftDataClient);
    private readonly toast = inject(ToastNotifier);
    

  /* =====================================================
     STATE
  ===================================================== */

  readonly isEditMode =
    signal(false);

  readonly activeNavId =
    signal('s1');

    readonly editId =
  signal<string | null>(
    null
  );

  constructor() {

  const id =

    this.route
      .snapshot
      .paramMap
      .get('id');

  if (!id)
    return;

  const shift =
    this.service.getById(id);

  if (!shift)
    return;

  /* EDIT MODE */
  this.isEditMode.set(true);

  this.editId.set(id);

  /* PATCH FORM */
  this.form.patchValue({

    shiftCode:
      shift.shiftCode,

    shiftName:
      shift.shiftName,

    description:
      shift.description,

    startTime:
      shift.startTime,

    endTime:
      shift.endTime,

    breakStartTime:
      shift.breakStartTime,

    breakEndTime:
      shift.breakEndTime,

    breakMinutes:
      shift.breakMinutes,

    workingHours:
      shift.workingHours,

    minimumHoursForHalfDay:
      shift.minimumHoursForHalfDay,

    minimumHoursForFullDay:
      shift.minimumHoursForFullDay,

    lateGraceMinutes:
      shift.lateGraceMinutes,

    earlyOutGraceMinutes:
      shift.earlyOutGraceMinutes,

    allowOvertime:
      shift.allowOvertime,

    minimumOvertimeMinutes:
      shift.minimumOvertimeMinutes,

    isNightShift:
      shift.isNightShift,

    isFlexibleShift:
      shift.isFlexibleShift,

    isActive:
      shift.isActive,

    isSundayOff:
      shift.isSundayOff,

    isMondayOff:
      shift.isMondayOff,

    isTuesdayOff:
      shift.isTuesdayOff,

    isWednesdayOff:
      shift.isWednesdayOff,

    isThursdayOff:
      shift.isThursdayOff,

    isFridayOff:
      shift.isFridayOff,

    isSaturdayOff:
      shift.isSaturdayOff

  });

  /* UPDATE WEEK DAYS */
  this.weekDays.update(days =>

    days.map(day => ({

      ...day,

      isOff:

        this.form.controls[
          day.key as keyof typeof this.form.controls
        ].value as boolean

    }))

  );

}

  readonly sections =
    signal<AccordionSection[]>([

      {
        id: 's1',
        label: 'Basic info',
        icon: 'description',
        subtitle: 'Identity and description',
        isOpen: true
      },

      {
        id: 's2',
        label: 'Shift timing',
        icon: 'schedule',
        subtitle: 'Start and end times',
        isOpen: false
      },

      {
        id: 's3',
        label: 'Break schedule',
        icon: 'free_breakfast',
        subtitle: 'Optional break window',
        isOpen: false
      },

      {
        id: 's4',
        label: 'Attendance rules',
        icon: 'bar_chart',
        subtitle: 'Half day and full day thresholds',
        isOpen: false
      },

      {
        id: 's5',
        label: 'Grace periods',
        icon: 'tune',
        subtitle: 'Arrival and departure tolerance',
        isOpen: false
      },

      {
        id: 's6',
        label: 'Overtime',
        icon: 'more_time',
        subtitle: 'OT eligibility and threshold',
        isOpen: false
      },

      {
        id: 's7',
        label: 'Shift flags',
        icon: 'toggle_on',
        subtitle: 'Special behavior and status',
        isOpen: false
      },

      {
        id: 's8',
        label: 'Week off',
        icon: 'event_busy',
        subtitle: 'Select days employees are off',
        isOpen: false
      }

    ]);

  readonly weekDays =
    signal([

      {
        key: 'isSundayOff',
        label: 'SUN',
        short: 'S',
        isOff: true
      },

      {
        key: 'isMondayOff',
        label: 'MON',
        short: 'M',
        isOff: false
      },

      {
        key: 'isTuesdayOff',
        label: 'TUE',
        short: 'T',
        isOff: false
      },

      {
        key: 'isWednesdayOff',
        label: 'WED',
        short: 'W',
        isOff: false
      },

      {
        key: 'isThursdayOff',
        label: 'THU',
        short: 'T',
        isOff: false
      },

      {
        key: 'isFridayOff',
        label: 'FRI',
        short: 'F',
        isOff: false
      },

      {
        key: 'isSaturdayOff',
        label: 'SAT',
        short: 'S',
        isOff: true
      }

    ]);

  /* =====================================================
     FORM
  ===================================================== */

  readonly form =
    this.fb.nonNullable.group({

      /* BASIC */
      shiftCode: [
        '',
      ],

      shiftName: [
        '',
        Validators.required
      ],

      description: [''],

      /* TIMING */
      startTime: [
        '09:00',
        Validators.required
      ],

      endTime: [
        '17:00',
        Validators.required
      ],

      /* BREAK */
      breakStartTime: [''],

      breakEndTime: [''],

      breakMinutes: [
        0,
        Validators.min(0)
      ],

      /* ATTENDANCE */
      workingHours: [
        8,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      minimumHoursForHalfDay: [
        4,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      minimumHoursForFullDay: [
        7,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      /* GRACE */
      lateGraceMinutes: [
        10,
        [
          Validators.min(0),
          Validators.max(120)
        ]
      ],

      earlyOutGraceMinutes: [
        10,
        [
          Validators.min(0),
          Validators.max(120)
        ]
      ],

      /* OT */
      allowOvertime: [false],

      minimumOvertimeMinutes: [
        30,
        Validators.min(0)
      ],

      /* FLAGS */
      isNightShift: [false],

      isFlexibleShift: [false],

      isActive: [true],

      /* WEEK OFF */
      isSundayOff: [true],

      isMondayOff: [false],

      isTuesdayOff: [false],

      isWednesdayOff: [false],

      isThursdayOff: [false],

      isFridayOff: [false],

      isSaturdayOff: [true]

    });

  /* =====================================================
     COMPUTED
  ===================================================== */

  readonly calculatedHours =
    computed(() => {

      const s =
        this.form.controls
          .startTime.value;

      const e =
        this.form.controls
          .endTime.value;

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

    });

  readonly offDaysCount =
    computed(() =>

      this.weekDays()
        .filter(x => x.isOff)
        .length

    );

  readonly allowOvertime =
    computed(() =>

      this.form.controls
        .allowOvertime
        .value

    );



  /* =====================================================
     ACCORDION
  ===================================================== */

  toggleSection(
    id: string
  ) {

    this.sections.update(list =>

      list.map(section =>

        section.id === id

          ?

          {
            ...section,
            isOpen: !section.isOpen
          }

          :

          section

      )

    );

    const active =

      this.sections()
        .find(x => x.id === id);

    if (active?.isOpen) {

      this.activeNavId.set(id);

    }

  }

  openFromNav(
    id: string
  ) {

    this.sections.update(list =>

      list.map(section =>

        section.id === id

          ?

          {
            ...section,
            isOpen: true
          }

          :

          section

      )

    );

    this.activeNavId.set(id);

    setTimeout(() => {

      document
        .getElementById(id)
        ?.scrollIntoView({

          behavior: 'smooth',

          block: 'start'

        });

    }, 50);

  }

  /* =====================================================
     DAYS
  ===================================================== */

toggleDay(
  day: {
    key: string;
    isOff: boolean;
  }
) {

  const control =

    this.form.controls[
      day.key as keyof typeof this.form.controls
    ];

  const newValue =
    !control.value;

  control.setValue(
    newValue as never
  );

  this.weekDays.update(days =>

    days.map(x =>

      x.key === day.key

        ?

        {
          ...x,
          isOff: newValue
        }

        :

        x

    )

  );

}

  /* =====================================================
     SAVE
  ===================================================== */

/* =====================================================
   SAVE
===================================================== */

onSave() {


  /* VALIDATION */
  if (this.form.invalid) {

    this.form.markAllAsTouched();

    this.expandInvalidSections();

    return;

  }



  /* FORM DATA */
  const value =
    this.form.getRawValue();

  /* PAYLOAD */
  const payload: Shift = {

    shiftId:
      this.editId() || '',

    shiftCode:
      value.shiftCode
        ?.trim(),

    shiftName:
      value.shiftName
        ?.trim(),

    description:
      value.description
        ?.trim(),

    /* TIMING */
    startTime:
      value.startTime,

    endTime:
      value.endTime,

    /* BREAK */
    breakStartTime:
      value.breakStartTime,

    breakEndTime:
      value.breakEndTime,

    breakMinutes:
      Number(
        value.breakMinutes || 0
      ),

    /* ATTENDANCE */
    workingHours:
      Number(
        value.workingHours || 0
      ),

    minimumHoursForHalfDay:
      Number(
        value.minimumHoursForHalfDay || 0
      ),

    minimumHoursForFullDay:
      Number(
        value.minimumHoursForFullDay || 0
      ),

    /* GRACE */
    lateGraceMinutes:
      Number(
        value.lateGraceMinutes || 0
      ),

    earlyOutGraceMinutes:
      Number(
        value.earlyOutGraceMinutes || 0
      ),

    /* OT */
    allowOvertime:
      value.allowOvertime,

    minimumOvertimeMinutes:
      Number(
        value.minimumOvertimeMinutes || 0
      ),

    /* FLAGS */
    isNightShift:
      value.isNightShift,

    isFlexibleShift:
      value.isFlexibleShift,

    isActive:
      value.isActive,

    /* WEEK OFF */
    isSundayOff:
      value.isSundayOff,

    isMondayOff:
      value.isMondayOff,

    isTuesdayOff:
      value.isTuesdayOff,

    isWednesdayOff:
      value.isWednesdayOff,

    isThursdayOff:
      value.isThursdayOff,

    isFridayOff:
      value.isFridayOff,

    isSaturdayOff:
      value.isSaturdayOff,

    /* AUDIT */
    createdOn:
      new Date()
        .toISOString(),

    updatedOn:
      new Date()
        .toISOString()

  };

  /* EDIT */
  if (this.isEditMode()) {

    this.service.update(
      payload
    );

    this.toast.success(
      'Shift updated successfully'
    );

  }

  /* CREATE */
  else {

    this.service.add(
      payload
    );

    this.toast.success(
      'Shift created successfully'
    );

  }

  /* NAVIGATE */
  this.router.navigate([
    '/shifts'
  ]);

}

  /* =====================================================
     DISCARD
  ===================================================== */

  onDiscard() {

    this.router.navigate([
      '/shifts'
    ]);

  }

  /* =====================================================
     HELPERS
  ===================================================== */

  isNavActive(
    id: string
  ) {

    return (
      this.activeNavId() === id
    );

  }

  isSectionOpen(
    id: string
  ) {

    return (

      this.sections()
        .find(x => x.id === id)
        ?.isOpen

      ??

      false

    );

  }



  private expandInvalidSections() {

    this.sections.update(list =>

      list.map(section => {

        const fields =
          this.getSectionFields(section.id);

        const hasInvalid =

          fields.some(field =>

            this.form.controls[
              field as keyof typeof this.form.controls
            ]?.invalid

          );

        return {

          ...section,

          isOpen:

            hasInvalid

              ?

              true

              :

              section.isOpen

        };

      })

    );

  }

  /* =====================================================
     FIELD MAP
  ===================================================== */

  private getSectionFields(
    id: string
  ): string[] {

    const map:
      Record<string, string[]> = {

      s1: [
        'shiftCode',
        'shiftName'
      ],

      s2: [
        'startTime',
        'endTime'
      ],

      s3: [
        'breakStartTime',
        'breakEndTime',
        'breakMinutes'
      ],

      s4: [
        'workingHours',
        'minimumHoursForHalfDay',
        'minimumHoursForFullDay'
      ],

      s5: [
        'lateGraceMinutes',
        'earlyOutGraceMinutes'
      ],

      s6: [
        'allowOvertime',
        'minimumOvertimeMinutes'
      ],

      s7: [
        'isNightShift',
        'isFlexibleShift',
        'isActive'
      ],

      s8: [

        'isSundayOff',

        'isMondayOff',

        'isTuesdayOff',

        'isWednesdayOff',

        'isThursdayOff',

        'isFridayOff',

        'isSaturdayOff'

      ]

    };

    return map[id] ?? [];

  }

  /* =====================================================
   FIELD ERROR
===================================================== */

hasError(
  field: string
): boolean {

  const control =
    this.form.get(field);

  return !!(

    control &&

    control.invalid &&

    (
      control.dirty ||
      control.touched
    )

  );

}

}