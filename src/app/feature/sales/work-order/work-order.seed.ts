import {
  WorkOrder,
  WorkOrderPriority,
  WorkOrderStatus
} from './work-order';

export const WORK_ORDER_SEED: WorkOrder[] = [

  /* =====================================================
     LAPTOP ASSEMBLY
  ===================================================== */

  {

    workOrderId:
      'WO-2026-00001',

    workOrderNo:
      'WO-2026-00001',

    workOrderDate:
      '2026-05-10',

    productId:
      1,

    orderedQuantity:
      25,

    producedQuantity:
      10,

    pendingQuantity:
      15,

    priority:
      WorkOrderPriority.High,

    plannedStartDate:
      '2026-05-12',

    plannedEndDate:
      '2026-05-20',

    actualStartDate:
      '2026-05-13',

    actualEndDate:
      null,

    salesOrderId:
      'SO-2026-101',

    customerId:
      'CUST-001',

    warehouseId:
      'WH-FG-001',

    remarks:
      'Corporate laptop bulk production.',

    status:
      WorkOrderStatus.InProgress,

    confirmedBy:
      'EMP-ADMIN',

    confirmedByName:
      'Production Manager',

    confirmedDate:
      '2026-05-11T10:00:00',

    isActive:
      true,

    isCancelled:
      false,

    isCompleted:
      false,

    isProductionStarted:
      true,

    createdBy:
      'EMP-ADMIN',

    createdOn:
      '2026-05-10T09:00:00',

    updatedBy:
      'EMP-ADMIN',

    updatedOn:
      '2026-05-14T11:00:00',

    bomLines: []

  },

  /* =====================================================
     MOUSE
  ===================================================== */

  {

    workOrderId:
      'WO-2026-00002',

    workOrderNo:
      'WO-2026-00002',

    workOrderDate:
      '2026-05-14',

    productId:
      2,

    orderedQuantity:
      100,

    producedQuantity:
      100,

    pendingQuantity:
      0,

    priority:
      WorkOrderPriority.Normal,

    plannedStartDate:
      '2026-05-15',

    plannedEndDate:
      '2026-05-18',

    actualStartDate:
      '2026-05-15',

    actualEndDate:
      '2026-05-17',

    salesOrderId:
      'SO-2026-102',

    customerId:
      'CUST-002',

    warehouseId:
      'WH-FG-001',

    remarks:
      'Wireless mouse export batch completed.',

    status:
      WorkOrderStatus.Completed,

    confirmedBy:
      'EMP-ADMIN',

    confirmedByName:
      'Operations Head',

    confirmedDate:
      '2026-05-14T12:00:00',

    isActive:
      true,

    isCancelled:
      false,

    isCompleted:
      true,

    isProductionStarted:
      true,

    createdBy:
      'EMP-ADMIN',

    createdOn:
      '2026-05-14T08:00:00',

    updatedOn:
      '2026-05-17T18:00:00',

    bomLines: []

  },

  /* =====================================================
     TSHIRT
  ===================================================== */

  {

    workOrderId:
      'WO-2026-00003',

    workOrderNo:
      'WO-2026-00003',

    workOrderDate:
      '2026-05-18',

    productId:
      3,

    orderedQuantity:
      200,

    producedQuantity:
      0,

    pendingQuantity:
      200,

    priority:
      WorkOrderPriority.Urgent,

    plannedStartDate:
      '2026-05-19',

    plannedEndDate:
      '2026-05-28',

    actualStartDate:
      null,

    actualEndDate:
      null,

    salesOrderId:
      'SO-2026-103',

    customerId:
      'CUST-003',

    warehouseId:
      'WH-GARMENT-001',

    remarks:
      'Summer collection urgent production.',

    status:
      WorkOrderStatus.Confirmed,

    confirmedBy:
      'EMP-ADMIN',

    confirmedByName:
      'Factory Supervisor',

    confirmedDate:
      '2026-05-18T14:00:00',

    isActive:
      true,

    isCancelled:
      false,

    isCompleted:
      false,

    isProductionStarted:
      false,

    createdBy:
      'EMP-ADMIN',

    createdOn:
      '2026-05-18T10:00:00',

    updatedOn:
      '2026-05-18T14:00:00',

    bomLines: []

  }

];