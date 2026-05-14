import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Shift } from '../shift';

export interface AccordionSection {

  id: string;

  label: string;

  icon: string;

  subtitle: string;

  isOpen: boolean;

}

@Component({
  selector: 'app-shift-create',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './shift-create.html',
  styleUrl: './shift-create.css',
})
export class ShiftCreateComponent implements OnInit {

  isEditMode =signal(false);
  form!: FormGroup;
  activeNavId = 's1';
  calculatedHours = '8h 00m';
  offDaysCount = 2;

  sections: AccordionSection[] = [
    { id: 's1', label: 'Basic info',       icon: 'description',       subtitle: 'Identity and description',          isOpen: true  },
    { id: 's2', label: 'Shift timing',     icon: 'schedule',          subtitle: 'Start and end times',               isOpen: false },
    { id: 's3', label: 'Break schedule',   icon: 'free_breakfast',    subtitle: 'Optional break window',             isOpen: false },
    { id: 's4', label: 'Attendance rules', icon: 'bar_chart',         subtitle: 'Half day and full day thresholds',  isOpen: false },
    { id: 's5', label: 'Grace periods',    icon: 'tune',              subtitle: 'Arrival and departure tolerance',   isOpen: false },
    { id: 's6', label: 'Overtime',         icon: 'more_time',         subtitle: 'OT eligibility and threshold',      isOpen: false },
    { id: 's7', label: 'Shift flags',      icon: 'toggle_on',         subtitle: 'Special behavior and status',       isOpen: false },
    { id: 's8', label: 'Week off',         icon: 'event_busy',        subtitle: 'Select days employees are off',     isOpen: false },
  ];

  weekDays = [
    { key: 'isSundayOff',    label: 'SUN', short: 'S', isOff: true  },
    { key: 'isMondayOff',    label: 'MON', short: 'M', isOff: false },
    { key: 'isTuesdayOff',   label: 'TUE', short: 'T', isOff: false },
    { key: 'isWednesdayOff', label: 'WED', short: 'W', isOff: false },
    { key: 'isThursdayOff',  label: 'THU', short: 'T', isOff: false },
    { key: 'isFridayOff',    label: 'FRI', short: 'F', isOff: false },
    { key: 'isSaturdayOff',  label: 'SAT', short: 'S', isOff: true  },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // Basic
      shiftCode:    ['', Validators.required],
      shiftName:    ['', Validators.required],
      description:  [''],

      // Timing
      startTime:    ['09:00', Validators.required],
      endTime:      ['17:00', Validators.required],

      // Break
      breakStartTime: [''],
      breakEndTime:   [''],
      breakMinutes:   [0, [Validators.min(0)]],

      // Attendance
      workingHours:            [8,   [Validators.required, Validators.min(0)]],
      minimumHoursForHalfDay:  [4,   [Validators.required, Validators.min(0)]],
      minimumHoursForFullDay:  [7,   [Validators.required, Validators.min(0)]],

      // Grace
      lateGraceMinutes:      [10, [Validators.min(0), Validators.max(120)]],
      earlyOutGraceMinutes:  [10, [Validators.min(0), Validators.max(120)]],

      // OT
      allowOvertime:         [false],
      minimumOvertimeMinutes:[30, [Validators.min(0)]],

      // Flags
      isNightShift:    [false],
      isFlexibleShift: [false],
      isActive:        [true],

      // Week off
      isSundayOff:    [true],
      isMondayOff:    [false],
      isTuesdayOff:   [false],
      isWednesdayOff: [false],
      isThursdayOff:  [false],
      isFridayOff:    [false],
      isSaturdayOff:  [true],
    });

    this.recalcHours();
    this.recalcOffDays();

    this.form.get('startTime')!.valueChanges.subscribe(() => this.recalcHours());
    this.form.get('endTime')!.valueChanges.subscribe(() => this.recalcHours());

    this.weekDays.forEach(d => {
      this.form.get(d.key)!.valueChanges.subscribe(val => {
        d.isOff = val;
        this.recalcOffDays();
      });
    });
  }

  // ─── Accordion ────────────────────────────────────────────────────────────

  toggleSection(id: string): void {
    const sec = this.sections.find(s => s.id === id)!;
    sec.isOpen = !sec.isOpen;
    if (sec.isOpen) this.activeNavId = id;
    else {
      const firstOpen = this.sections.find(s => s.isOpen);
      if (firstOpen) this.activeNavId = firstOpen.id;
    }
  }

  openFromNav(id: string): void {
    const sec = this.sections.find(s => s.id === id)!;
    if (!sec.isOpen) sec.isOpen = true;
    this.activeNavId = id;
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  // ─── Calculations ─────────────────────────────────────────────────────────

  recalcHours(): void {
    const s = this.form.get('startTime')!.value as string;
    const e = this.form.get('endTime')!.value as string;
    if (!s || !e) return;
    const [sh, sm] = s.split(':').map(Number);
    const [eh, em] = e.split(':').map(Number);
    let mins = (eh * 60 + em) - (sh * 60 + sm);
    if (mins < 0) mins += 1440;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    this.calculatedHours = `${h}h ${m.toString().padStart(2, '0')}m`;
  }

  recalcOffDays(): void {
    this.offDaysCount = this.weekDays.filter(d => d.isOff).length;
  }

  toggleDay(day: { key: string; isOff: boolean }): void {
    const ctrl = this.form.get(day.key)!;
    ctrl.setValue(!ctrl.value);
  }

  // ─── Submit ───────────────────────────────────────────────────────────────

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      // open sections that have errors
      this.sections.forEach(sec => {
        const sectionFields = this.getSectionFields(sec.id);
        const hasError = sectionFields.some(f => this.form.get(f)?.invalid);
        if (hasError) sec.isOpen = true;
      });
      return;
    }
    const payload: Shift = this.form.value;
    console.log('Shift payload:', payload);
    // this.shiftService.create(payload).subscribe(() => this.router.navigate(['/shifts']));
  }

  onDiscard(): void {
    this.router.navigate(['/shifts']);
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  get allowOvertime(): boolean {
    return this.form.get('allowOvertime')!.value;
  }

  isNavActive(id: string): boolean {
    return this.activeNavId === id;
  }

  isSectionOpen(id: string): boolean {
    return this.sections.find(s => s.id === id)?.isOpen ?? false;
  }

  hasError(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  private getSectionFields(id: string): string[] {
    const map: Record<string, string[]> = {
      s1: ['shiftCode', 'shiftName'],
      s2: ['startTime', 'endTime'],
      s3: ['breakStartTime', 'breakEndTime', 'breakMinutes'],
      s4: ['workingHours', 'minimumHoursForHalfDay', 'minimumHoursForFullDay'],
      s5: ['lateGraceMinutes', 'earlyOutGraceMinutes'],
      s6: ['allowOvertime', 'minimumOvertimeMinutes'],
      s7: ['isNightShift', 'isFlexibleShift', 'isActive'],
      s8: ['isSundayOff','isMondayOff','isTuesdayOff','isWednesdayOff','isThursdayOff','isFridayOff','isSaturdayOff'],
    };
    return map[id] ?? [];
  }
}