import { WorkOrderBomLine } from './work-order-bom';

export const WORK_ORDER_BOM_SEED: WorkOrderBomLine[] = [

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00001',
    productStructureId: 'PS-YASH-001',
    parentLineId: null,

    itemName: 'Wooden Frame – Teak',
    materialCode: 'G111',
    materialName: 'dsd',

    level: 1,
    rawMaterialId: 'RM-WOOD-001',
   Warehouse:' Finished Goods – Coimbatore ',
    requiredQuantity: 75,
    consumedQuantity: 30,
    pendingQuantity: 45,

    wastagePercentage: 3,
    unitOfMeasureId: 'UOM-CFT',

    createdOn: '2026-05-10T10:00:00'
  },

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00001',
    productStructureId: 'PS-YASH-002',
    parentLineId: null,

    itemName: 'Commercial Plywood 18mm',
    materialCode: 'G111',
    materialName: 'dsd',
   Warehouse:' Finished Goods – Coimbatore ',
    level: 1,
    rawMaterialId: 'RM-PLY-001',

    requiredQuantity: 50,
    consumedQuantity: 20,
    pendingQuantity: 30,

    wastagePercentage: 2,
    unitOfMeasureId: 'UOM-SHT',

    createdOn: '2026-05-10T10:00:00'
  },

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00001',
    productStructureId: 'PS-YASH-003',
    parentLineId: null,
   Warehouse:' Finished Goods – Coimbatore ',
    itemName: 'HR Foam 40D – Seat',
    materialCode: 'G111',
    materialName: 'dsd',

    level: 1,
    rawMaterialId: 'RM-FOAM-001',

    requiredQuantity: 100,
    consumedQuantity: 40,
    pendingQuantity: 60,

    wastagePercentage: 5,
    unitOfMeasureId: 'UOM-KG',

    createdOn: '2026-05-10T10:00:00'
  },

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00001',
    productStructureId: 'PS-YASH-004',
    parentLineId: null,

    itemName: 'Chenille Fabric – Beige',
    materialCode: 'G111',
    materialName: 'dsd',
   Warehouse:' Finished Goods – Coimbatore ',
    level: 1,
    rawMaterialId: 'RM-FAB-001',

    requiredQuantity: 200,
    consumedQuantity: 80,
    pendingQuantity: 120,

    wastagePercentage: 8,
    unitOfMeasureId: 'UOM-MTR',

    createdOn: '2026-05-10T10:00:00'
  },

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00001',
    productStructureId: 'PS-YASH-005',
    parentLineId: null,

    itemName: 'Zigzag Springs',
    materialCode: 'G111',
    materialName: 'dsd',
   Warehouse:' Finished Goods – Coimbatore ',
    level: 1,
    rawMaterialId: 'RM-SPR-001',

    requiredQuantity: 150,
    consumedQuantity: 60,
    pendingQuantity: 90,

    wastagePercentage: 1,
    unitOfMeasureId: 'UOM-NOS',

    createdOn: '2026-05-10T10:00:00'
  },

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00001',
    productStructureId: 'PS-YASH-006',
    parentLineId: null,

    itemName: 'Wood Screws 2.5 inch',
    materialCode: 'G111',
    materialName: 'dsd',

    level: 2,
    rawMaterialId: 'RM-SCR-001',
   Warehouse:' Finished Goods – Coimbatore ',
    requiredQuantity: 500,
    consumedQuantity: 200,
    pendingQuantity: 300,

    wastagePercentage: 2,
    unitOfMeasureId: 'UOM-NOS',

    createdOn: '2026-05-10T10:00:00'
  }

];