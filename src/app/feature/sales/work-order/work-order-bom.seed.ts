import {
  WorkOrderBomLine
} from './work-order-bom';

export const WORK_ORDER_BOM_SEED: WorkOrderBomLine[] = [

  /* =====================================================
     LAPTOP
  ===================================================== */

  {

    workOrderBomLineId:
      crypto.randomUUID(),

    workOrderId:
      'WO-2026-00001',

    productStructureId:
      'PS-LAP-001',

    parentLineId:
      null,

    itemName:
      'Laptop Motherboard',

    level:
      1,

    rawMaterialId:
      'RM-MB-001',

    requiredQuantity:
      25,

    consumedQuantity:
      10,

    pendingQuantity:
      15,

    wastagePercentage:
      2,

    unitOfMeasureId:
      'UOM-NOS',

    createdOn:
      '2026-05-10T10:00:00'

  },

  {

    workOrderBomLineId:
      crypto.randomUUID(),

    workOrderId:
      'WO-2026-00001',

    productStructureId:
      'PS-LAP-002',

    parentLineId:
      null,

    itemName:
      '16GB RAM Module',

    level:
      1,

    rawMaterialId:
      'RM-RAM-016',

    requiredQuantity:
      50,

    consumedQuantity:
      20,

    pendingQuantity:
      30,

    wastagePercentage:
      1,

    unitOfMeasureId:
      'UOM-NOS',

    createdOn:
      '2026-05-10T10:00:00'

  },

  {

    workOrderBomLineId:
      crypto.randomUUID(),

    workOrderId:
      'WO-2026-00001',

    productStructureId:
      'PS-LAP-003',

    parentLineId:
      null,

    itemName:
      '512GB SSD',

    level:
      1,

    rawMaterialId:
      'RM-SSD-512',

    requiredQuantity:
      25,

    consumedQuantity:
      10,

    pendingQuantity:
      15,

    wastagePercentage:
      0,

    unitOfMeasureId:
      'UOM-NOS',

    createdOn:
      '2026-05-10T10:00:00'

  },

  /* =====================================================
     MOUSE
  ===================================================== */

  {

    workOrderBomLineId:
      crypto.randomUUID(),

    workOrderId:
      'WO-2026-00002',

    productStructureId:
      'PS-MSE-001',

    parentLineId:
      null,

    itemName:
      'Mouse Sensor PCB',

    level:
      1,

    rawMaterialId:
      'RM-PCB-001',

    requiredQuantity:
      100,

    consumedQuantity:
      100,

    pendingQuantity:
      0,

    wastagePercentage:
      1,

    unitOfMeasureId:
      'UOM-NOS',

    createdOn:
      '2026-05-14T09:00:00'

  },

  {

    workOrderBomLineId:
      crypto.randomUUID(),

    workOrderId:
      'WO-2026-00002',

    productStructureId:
      'PS-MSE-002',

    parentLineId:
      null,

    itemName:
      'Wireless Module',

    level:
      1,

    rawMaterialId:
      'RM-WLS-002',

    requiredQuantity:
      100,

    consumedQuantity:
      100,

    pendingQuantity:
      0,

    wastagePercentage:
      0,

    unitOfMeasureId:
      'UOM-NOS',

    createdOn:
      '2026-05-14T09:00:00'

  },

  /* =====================================================
     TSHIRT
  ===================================================== */

  {

    workOrderBomLineId:
      crypto.randomUUID(),

    workOrderId:
      'WO-2026-00003',

    productStructureId:
      'PS-TSH-001',

    parentLineId:
      null,

    itemName:
      'Blue Cotton Fabric',

    level:
      1,

    rawMaterialId:
      'RM-FAB-BLUE',

    requiredQuantity:
      400,

    consumedQuantity:
      0,

    pendingQuantity:
      400,

    wastagePercentage:
      5,

    unitOfMeasureId:
      'UOM-MTR',

    createdOn:
      '2026-05-18T11:00:00'

  },

  {

    workOrderBomLineId:
      crypto.randomUUID(),

    workOrderId:
      'WO-2026-00003',

    productStructureId:
      'PS-TSH-002',

    parentLineId:
      null,

    itemName:
      'T-Shirt Neck Label',

    level:
      2,

    rawMaterialId:
      'RM-LBL-001',

    requiredQuantity:
      200,

    consumedQuantity:
      0,

    pendingQuantity:
      200,

    wastagePercentage:
      0,

    unitOfMeasureId:
      'UOM-NOS',

    createdOn:
      '2026-05-18T11:00:00'

  }

];