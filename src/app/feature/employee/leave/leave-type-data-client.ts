import { Injectable, signal } from '@angular/core';
import { LEAVE_TYPES } from './leave-type.seed';
import { LeaveType } from './leave-type';


@Injectable({
  providedIn: 'root'
})
export class LeaveTypeDataClient {

  // STATE

  private readonly _leaveTypes =
    signal<LeaveType[]>(LEAVE_TYPES);

  // READONLY
  leaveTypes =
    this._leaveTypes.asReadonly();

  // GET ALL

  getAll(): LeaveType[] {

    return this._leaveTypes();
  }

  // GET BY ID
  getById(id: string): LeaveType | undefined {

    return this._leaveTypes()
      .find(x => x.leaveTypeId === id);
  }

  // ADD

  add(data: LeaveType) {

    const newData: LeaveType = {

      ...data,

      leaveTypeId:
        data.leaveTypeId ||
        crypto.randomUUID(),

      createdAt: new Date(),

      updatedAt: new Date()
    };

    this._leaveTypes.update(list => [

      ...list,

      newData
    ]);
  }

  // UPDATE
  update(data: LeaveType) {

    this._leaveTypes.update(list =>

      list.map(x =>

        x.leaveTypeId === data.leaveTypeId

          ? {
              ...x,

              ...data,

              updatedAt: new Date()
            }

          : x
      )
    );
  }

  // DELETE
  delete(id: string) {

    this._leaveTypes.update(list =>

      list.filter(x =>

        x.leaveTypeId !== id
      )
    );
  }

  // EXISTS BY NAME
  existsByName(
    name: string,
    excludeId?: string
  ): boolean {

    return this._leaveTypes().some(x =>

      x.leaveTypeName
        ?.trim()
        .toLowerCase() ===
      name
        .trim()
        .toLowerCase()

      &&

      x.leaveTypeId !== excludeId
    );
  }

  // ACTIVE ONLY
  activeLeaveTypes() {

    return this._leaveTypes()
      .filter(x => x.isActive !== false);
  }

  // TOGGLE ACTIVE
  toggleActive(id: string) {

    this._leaveTypes.update(list =>

      list.map(x =>

        x.leaveTypeId === id

          ? {
              ...x,

              isActive: !x.isActive,

              updatedAt: new Date()
            }

          : x
      )
    );
  }

  // RESET SEED
  resetSeed() {

    this._leaveTypes.set(LEAVE_TYPES);
  }

}