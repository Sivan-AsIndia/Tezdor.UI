import {Injectable,computed, signal} from '@angular/core';

import { WorkOrder, WorkOrderStatus } from './work-order';
import { WORK_ORDER_SEED } from './work-order.seed';



@Injectable({
  providedIn: 'root'
})
export class WorkOrderDataClient {

  /* =====================================================
     STATE
  ===================================================== */

  private readonly _workOrders =
    signal<WorkOrder[]>(

      structuredClone(
        WORK_ORDER_SEED
      )

    );

  /* =====================================================
     PUBLIC SIGNALS
  ===================================================== */

  workOrders =
    computed(() =>

      this._workOrders()

    );

  activeWorkOrders =
    computed(() =>

      this._workOrders()

        .filter(x =>

          x.isActive !== false

        )

    );

  draftWorkOrders =
    computed(() =>

      this._workOrders()

        .filter(x =>

          x.status ===
          WorkOrderStatus.Draft

        )

    );

  confirmedWorkOrders =
    computed(() =>

      this._workOrders()

        .filter(x =>

          x.status ===
          WorkOrderStatus.Confirmed

        )

    );

  inProgressWorkOrders =
    computed(() =>

      this._workOrders()

        .filter(x =>

          x.status ===
          WorkOrderStatus.InProgress

        )

    );

  completedWorkOrders =
    computed(() =>

      this._workOrders()

        .filter(x =>

          x.status ===
          WorkOrderStatus.Completed

        )

    );

  cancelledWorkOrders =
    computed(() =>

      this._workOrders()

        .filter(x =>

          x.status ===
          WorkOrderStatus.Cancelled

        )

    );

  totalCount =
    computed(() =>

      this._workOrders()
        .length

    );

  /* =====================================================
     GET BY ID
  ===================================================== */

  getById(
    id: string
  ) {

    return this
      ._workOrders()

      .find(x =>

        x.workOrderId === id

      );

  }

  /* =====================================================
     ADD
  ===================================================== */

  add(
    data: WorkOrder
  ) {

    const maxNo =

      this._workOrders()

        .map(x =>

          Number(

            x.workOrderNo
              ?.replace(
                'WO-2026-',
                ''
              )

          ) || 0

        )

        .reduce(

          (
            a,
            b
          ) =>

            Math.max(a, b),

          0

        );

    const workOrderNo =

      `WO-2026-${

        (
          maxNo + 1
        )

          .toString()

          .padStart(5, '0')

      }`;

    const newData: WorkOrder = {

      ...data,

      workOrderId:
        crypto.randomUUID(),

      workOrderNo,

      createdOn:
        new Date()
          .toISOString(),

      updatedOn:
        new Date()
          .toISOString(),

      isActive:
        true,

      isCancelled:
        false,

      isCompleted:
        false,

      producedQuantity:
        data.producedQuantity || 0,

      pendingQuantity:
        data.orderedQuantity -

        (
          data.producedQuantity || 0
        )

    };

    this._workOrders.update(list => [

      newData,

      ...list

    ]);

  }

  /* =====================================================
     UPDATE
  ===================================================== */

  update(
    updated: WorkOrder
  ) {

    this._workOrders.update(list =>

      list.map(x =>

        x.workOrderId ===
        updated.workOrderId

          ?

          {

            ...x,

            ...updated,

            pendingQuantity:

              updated.orderedQuantity -

              (
                updated.producedQuantity || 0
              ),

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

  delete(
    id?: string
  ) {

    if (!id) {
      return;
    }

    this._workOrders.update(list =>

      list.filter(x =>

        x.workOrderId !== id

      )

    );

  }

  /* =====================================================
     SOFT DELETE
  ===================================================== */

  softDelete(
    id?: string
  ) {

    if (!id) {
      return;
    }

    this._workOrders.update(list =>

      list.map(x =>

        x.workOrderId === id

          ?

          {

            ...x,

            isActive: false,

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
     CONFIRM
  ===================================================== */

  confirm(
    id: string,
    userName = 'Admin'
  ) {

    this._workOrders.update(list =>

      list.map(x =>

        x.workOrderId === id

          ?

          {

            ...x,

            status:
              WorkOrderStatus.Confirmed,

            confirmedBy:
              'admin',

            confirmedByName:
              userName,

            confirmedDate:
              new Date()
                .toISOString(),

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
     START PRODUCTION
  ===================================================== */

  startProduction(
    id: string
  ) {

    this._workOrders.update(list =>

      list.map(x =>

        x.workOrderId === id

          ?

          {

            ...x,

            status:
              WorkOrderStatus.InProgress,

            isProductionStarted:
              true,

            actualStartDate:
              x.actualStartDate ||

              new Date()
                .toISOString(),

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
     COMPLETE
  ===================================================== */

  complete(
    id: string
  ) {

    this._workOrders.update(list =>

      list.map(x =>

        x.workOrderId === id

          ?

          {

            ...x,

            status:
              WorkOrderStatus.Completed,

            isCompleted:
              true,

            producedQuantity:
              x.orderedQuantity,

            pendingQuantity:
              0,

            actualEndDate:
              new Date()
                .toISOString(),

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
     CANCEL
  ===================================================== */

  cancel(
    id: string,
    reason: string
  ) {

    this._workOrders.update(list =>

      list.map(x =>

        x.workOrderId === id

          ?

          {

            ...x,

            status:
              WorkOrderStatus.Cancelled,

            isCancelled:
              true,

            cancellationReason:
              reason,

            cancelledDate:
              new Date()
                .toISOString(),

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
     UPDATE PRODUCTION
  ===================================================== */

  updateProductionQty(
    id: string,
    qty: number
  ) {

    this._workOrders.update(list =>

      list.map(x => {

        if (

          x.workOrderId !== id

        ) {

          return x;
        }

        const produced =

          qty;

        const pending =

          x.orderedQuantity -

          produced;

        return {

          ...x,

          producedQuantity:
            produced,

          pendingQuantity:
            pending,

          updatedOn:
            new Date()
              .toISOString()

        };

      })

    );

  }

}