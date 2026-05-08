import { computed, Injectable, signal } from '@angular/core';
import { Permission, PermissionStatus } from './permission';

@Injectable({
  providedIn: 'root',
})
export class PermissionDataClient {

  // ===============================
  // STATE
  // ===============================

  private readonly _permissions =
    signal<Permission[]>([]);

  // ===============================
  // PUBLIC SIGNALS
  // ===============================

  permissions = this._permissions.asReadonly();

  // ===============================
  // COMPUTED
  // ===============================

  activePermissions = computed(() =>
    this._permissions().filter(x =>
      x.status !== PermissionStatus.Cancelled
    )
  );

  pendingPermissions = computed(() =>
    this._permissions().filter(x =>
      x.status === PermissionStatus.Pending
    )
  );

  approvedPermissions = computed(() =>
    this._permissions().filter(x =>
      x.status === PermissionStatus.Approved
    )
  );

  rejectedPermissions = computed(() =>
    this._permissions().filter(x =>
      x.status === PermissionStatus.Rejected
    )
  );

  totalPermissions = computed(() =>
    this._permissions().length
  );

  totalPending = computed(() =>
    this.pendingPermissions().length
  );

  totalApproved = computed(() =>
    this.approvedPermissions().length
  );

  totalRejected = computed(() =>
    this.rejectedPermissions().length
  );

  // ===============================
  // CRUD
  // ===============================

  add(permission: Permission) {

    // ===== DUPLICATE CHECK =====
    const exists = this._permissions().some(x =>

      x.employeeId === permission.employeeId &&

      x.permissionDate === permission.permissionDate &&

      (
        x.fromTime === permission.fromTime ||
        x.toTime === permission.toTime
      )
    );

    if (exists) {
      throw new Error(
        'Permission already exists for this time'
      );
    }

    const newPermission: Permission = {
      ...permission,

      permissionId:
        permission.permissionId ?? crypto.randomUUID(),

      permissionNumber:
        permission.permissionNumber
        ?? this.generatePermissionNumber(),

      appliedOn: new Date(),

      createdAt: new Date(),
      updatedAt: new Date()
    };

    this._permissions.update(list => [
      newPermission,
      ...list
    ]);
  }

  update(permission: Permission) {

    this._permissions.update(list =>
      list.map(x =>

        x.permissionId === permission.permissionId
          ? {
            ...permission,
            updatedAt: new Date()
          }
          : x
      )
    );
  }

  remove(permissionId?: string) {

    if (!permissionId) return;

    this._permissions.update(list =>
      list.filter(x =>
        x.permissionId !== permissionId
      )
    );
  }

  // ===============================
  // STATUS ACTIONS
  // ===============================

  approve(
    permissionId: string,
    approvedBy: string
  ) {

    this._permissions.update(list =>
      list.map(x =>

        x.permissionId === permissionId
          ? {
            ...x,

            status: PermissionStatus.Approved,

            approvedBy,
            approvedOn: new Date(),

            updatedAt: new Date()
          }
          : x
      )
    );
  }

  reject(
    permissionId: string,
    rejectedBy: string,
    rejectionReason: string
  ) {

    this._permissions.update(list =>
      list.map(x =>

        x.permissionId === permissionId
          ? {
            ...x,

            status: PermissionStatus.Rejected,

            rejectedBy,
            rejectedOn: new Date(),

            rejectionReason,

            updatedAt: new Date()
          }
          : x
      )
    );
  }

  cancel(permissionId: string) {

    this._permissions.update(list =>
      list.map(x =>

        x.permissionId === permissionId
          ? {
            ...x,

            status: PermissionStatus.Cancelled,

            updatedAt: new Date()
          }
          : x
      )
    );
  }

  // ===============================
  // HELPERS
  // ===============================

  getById(permissionId?: string) {

    if (!permissionId) return null;

    return this._permissions().find(x =>
      x.permissionId === permissionId
    );
  }

  getByEmployee(employeeId?: string) {

    if (!employeeId) return [];

    return this._permissions().filter(x =>
      x.employeeId === employeeId
    );
  }

  getByDate(date: string) {

    return this._permissions().filter(x =>
      x.permissionDate === date
    );
  }

  clear() {
    this._permissions.set([]);
  }

  // ===============================
  // NUMBER GENERATOR
  // ===============================

  private generatePermissionNumber(): string {

    const count =
      this._permissions().length + 1;

    return `PER-${count
      .toString()
      .padStart(4, '0')}`;
  }
}