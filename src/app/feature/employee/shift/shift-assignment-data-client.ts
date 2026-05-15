import {computed,Injectable,signal} from '@angular/core';

import {ShiftAssignment} from './shift-assignment';

@Injectable({
  providedIn: 'root'
})

export class ShiftAssignmentDataClient {



  private readonly _assignments =
    signal<ShiftAssignment[]>([]);



  readonly assignments =
    this._assignments.asReadonly();

  readonly total =
    computed(() =>

      this._assignments()
        .length

    );

  /* =====================================================
     ADD
  ===================================================== */

  add(
    assignment: ShiftAssignment
  ) {

    const newAssignment: ShiftAssignment = {

      ...assignment,

      shiftAssignmentId:
        crypto.randomUUID(),

      createdOn:
        new Date()
          .toISOString(),

      isActive:
        true

    };

    this._assignments.update(data => [

      ...data,

      newAssignment

    ]);

  }

  /* =====================================================
     UPDATE
  ===================================================== */

  update(
    updated: ShiftAssignment
  ) {

    this._assignments.update(list =>

      list.map(x =>

        x.shiftAssignmentId ===
        updated.shiftAssignmentId

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

  updateByShiftId(
  assignment: ShiftAssignment
) {

  this._assignments.update(list => {

    const index =

      list.findIndex(x =>

        x.shiftId ===
        assignment.shiftId

      );

    /* UPDATE */
    if (index !== -1) {

      const updated = [...list];

      updated[index] = {

        ...updated[index],

        ...assignment

      };

      return updated;

    }

    /* ADD NEW */
    return [

      ...list,

      assignment

    ];

  });

}

  /* =====================================================
     DELETE
  ===================================================== */

  delete(
    id: string
  ) {

    this._assignments.update(list =>

      list.filter(x =>

        x.shiftAssignmentId !== id

      )

    );

  }

}