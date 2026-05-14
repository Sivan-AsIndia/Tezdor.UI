import { computed, Injectable, signal } from "@angular/core";
import { Shift } from "./shift";
import { SHIFT_SEED_DATA } from "./shift.seed";


@Injectable({
  providedIn: 'root'
})

export class ShiftDataClient {

  /* =====================================================
     STATE
  ===================================================== */

  private readonly _shifts =
    signal<Shift[]>(
      SHIFT_SEED_DATA
    );


  readonly shifts =
    this._shifts.asReadonly();

  readonly total =
    computed(() =>
      this._shifts().length
    );


  getShift(id: string) {

    return computed(() =>

      this._shifts()
        .find(x =>

          x.shiftId === id

        ) ?? null

    );

  }

  getById(id: string) {

    return this._shifts()
      .find(x =>

        x.shiftId === id

      );

  }

  /* =====================================================
     ADD
  ===================================================== */

  add(shift: Shift) {

    const maxCode =

      this._shifts()

        .map(x =>

          Number(
            x.shiftCode
              ?.replace(
                'SHIFT',
                ''
              )
          ) || 0

        )

        .reduce(
          (a, b) =>
            Math.max(a, b),
          0
        );

    const newShift: Shift = {

      ...shift,

      shiftId:
        crypto.randomUUID(),

      shiftCode:
        `SHIFT${

          (
            maxCode + 1
          )

            .toString()
            .padStart(3, '0')

        }`,

      createdOn:
        new Date()
          .toISOString(),

      isActive:
        true

    };

    this._shifts.update(data => [

      ...data,

      newShift

    ]);

  }

  /* =====================================================
     UPDATE
  ===================================================== */

  update(updated: Shift) {

    this._shifts.update(list =>

      list.map(x =>

        x.shiftId ===
        updated.shiftId

          ?

          {

            ...x,

            ...updated,

            updatedOn:
              new Date()
                .toISOString()

          }

          :

          x

      )

    );

  }

  /* =====================================================
     DELETE
  ===================================================== */

  delete(id: string) {

    this._shifts.update(list =>

      list.filter(x =>

        x.shiftId !== id

      )

    );

  }

  deleteMultiple(ids: string[]) {

    this._shifts.update(list =>

      list.filter(x =>

        !ids.includes(
          x.shiftId
        )

      )

    );

  }

  /* =====================================================
     STATUS
  ===================================================== */

  activate(id: string) {

    this.setStatus(
      id,
      true
    );

  }

  deactivate(id: string) {

    this.setStatus(
      id,
      false
    );

  }

  private setStatus(
    id: string,
    status: boolean
  ) {

    this._shifts.update(list =>

      list.map(x =>

        x.shiftId === id

          ?

          {
            ...x,
            isActive: status
          }

          :

          x

      )

    );

  }

}