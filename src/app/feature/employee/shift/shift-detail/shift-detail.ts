import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ShiftDataClient } from '../shift-data-client';
import { Shift } from '../shift';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shift-detail',
  imports: [RouterModule],
  templateUrl: './shift-detail.html',
  styleUrl: './shift-detail.css',
})
export class ShiftDetailComponent {
  /* =====================================================
     INJECT
  ===================================================== */

  private readonly route =
    inject(ActivatedRoute);

  private readonly shiftService =
    inject(ShiftDataClient);

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

}