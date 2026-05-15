import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { ConfirmModalComponent } from "../../../../shared/components/confirm-modal/confirm-modal";
import { ToastNotifier } from '../../../../core/services/toast';
import { Router } from '@angular/router';
import { Shift } from '../shift';
import { ShiftDataClient } from '../shift-data-client';

@Component({
  selector: 'app-shift-list',
  imports: [ConfirmModalComponent],
  templateUrl: './shift-list.html',
  styleUrl: './shift-list.css',
})
export class ShiftListComponent {

  /* =====================================================
     INJECTION
  ===================================================== */

  private readonly toast =
    inject(ToastNotifier);

  private readonly router =
    inject(Router);
  private readonly shiftService =
    inject(ShiftDataClient);

  readonly modal =
    viewChild<ConfirmModalComponent>('modal');

  /* =====================================================
     STATE
  ===================================================== */

  readonly shifts = this.shiftService.shifts;

  readonly selectedShift =
    signal<Shift | null>(null);

  /* =====================================================
     SEARCH
  ===================================================== */

  readonly searchValue =
    signal('');

  /* =====================================================
     SORT
  ===================================================== */

  readonly sortColumn =
    signal<keyof Shift | ''>('');

  readonly sortDirection =
    signal<'asc' | 'desc'>('asc');

  /* =====================================================
     PAGINATION
  ===================================================== */

  readonly page =
    signal(1);

  readonly pageSize =
    signal(5);

  /* =====================================================
     FILTER
  ===================================================== */

  readonly showFilter =
    signal(false);

  readonly filters = signal({

    isActive:
      null as boolean | null,

    isNightShift:
      null as boolean | null

  });

  /* =====================================================
     FILTERED SHIFTS
  ===================================================== */

readonly filteredShifts =
  computed(() => {

    const search =

      this.searchValue()
        .toLowerCase()
        .trim();

    const filter =
      this.filters();

    return this.shifts()

      .filter(shift => {

        const matchesSearch =

          shift.shiftName
            .toLowerCase()
            .includes(search)

          ||

          shift.shiftCode
            .toLowerCase()
            .includes(search);

        const matchesStatus =

          filter.isActive === null

            ?

            true

            :

            shift.isActive ===
            filter.isActive;

        const matchesNight =

          filter.isNightShift === null

            ?

            true

            :

            shift.isNightShift ===
            filter.isNightShift;

        return (

          matchesSearch

          &&

          matchesStatus

          &&

          matchesNight

        );

      });

  });

  /* =====================================================
     SORTED SHIFTS
  ===================================================== */

  readonly sortedShifts =
    computed(() => {

      const data = [
        ...this.filteredShifts()
      ];

      const column =
        this.sortColumn();

      const direction =
        this.sortDirection();

      if (!column) {
        return data;
      }

      return data.sort((a, b) => {

        const valA =

          (a[column] ?? '')
            .toString()
            .toLowerCase();

        const valB =

          (b[column] ?? '')
            .toString()
            .toLowerCase();

        if (valA < valB) {

          return direction === 'asc'
            ? -1
            : 1;

        }

        if (valA > valB) {

          return direction === 'asc'
            ? 1
            : -1;

        }

        return 0;

      });

    });

  /* =====================================================
     TOTAL
  ===================================================== */

  readonly total =
    computed(() =>

      this.filteredShifts()
        .length

    );

  /* =====================================================
     PAGINATED SHIFTS
  ===================================================== */
visiblePages = computed(() => {
  const current = this.page();
  const total = this.totalPages();
  if (total <= 1) return [1];

  const start = current;                        // current page
  const end = Math.min(total, current + 1);     // next page

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
  readonly paginatedShifts =
    computed(() => {

      const start =

        (
          this.page() - 1
        )

        *

        this.pageSize();

      return this.sortedShifts()
        .slice(
          start,
          start + this.pageSize()
        );

    });



  readonly totalPages =
    computed(() =>

      Math.ceil(

        this.total()

        /

        this.pageSize()

      )

    );


  onSearch(
    value: string
  ) {

    this.searchValue
      .set(value);

    this.page.set(1);

  }

  clearSearch() {

    this.searchValue
      .set('');

    this.page.set(1);

  }


  sortBy(
    column: keyof Shift
  ) {

    if (
      this.sortColumn() === column
    ) {

      this.sortDirection.set(

        this.sortDirection() === 'asc'

          ?

          'desc'

          :

          'asc'

      );

    }

    else {

      this.sortColumn
        .set(column);

      this.sortDirection
        .set('asc');

    }

  }



  changePage(page: number) {

    if (page >= 1 && page <= this.totalPages()) 
      {

      this.page.set(page);
    }

  }

  changePageSize(
    size: number
  ) {

    this.pageSize
      .set(+size);

    this.page.set(1);

  }


  toggleFilter() {

    this.showFilter
      .update(v => !v);

  }

  closeFilter() {

    this.showFilter
      .set(false);

  }

  resetFilters() {

    this.filters.set({

      isActive: null,

      isNightShift: null

    });

  }

  selectStatus(
    value: boolean
  ) {

    this.filters.update(f => ({

      ...f,

      isActive:

        f.isActive === value

          ?

          null

          :

          value

    }));

  }

  selectNightShift(
    value: boolean
  ) {

    this.filters.update(f => ({

      ...f,

      isNightShift:

        f.isNightShift === value

          ?

          null

          :

          value

    }));

  }

  onAddShift() {

    this.router.navigate([
      '/shift/create'
    ]);

  }

  onEdit(
    shift: Shift
  ) {

    this.router.navigate([
      '/shift/edit',
      shift.shiftId
    ]);

  }

  onView(
    shift: Shift
  ) {

    this.router.navigate([
      '/shift',
      shift.shiftId
    ]);

  }

  onDelete(
    shift: Shift
  ) {

    this.modal()?.open({

      type: 'delete',

      title: 'Delete Shift',

      message:
        `Are you sure you want to delete ${shift.shiftName}?`,

      onConfirm: () => {

        this.delete(
          shift.shiftId
        );

      }

    });

  }

delete(
  id: string
) {

  this.shiftService
    .delete(id);

  this.toast.success(
    'Shift deleted successfully'
  );

}

  openRowDetails( shift: Shift) {
    this.selectedShift.set(shift);
  }

}
