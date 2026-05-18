import {
  WorkOrderBomLine
} from './work-order-bom';

export const WORK_ORDER_BOM_SEED: WorkOrderBomLine[] = [

  /* =====================================================
     YASHIKA 3+1+1 SOFA SET  (WO-2026-00001)
  ===================================================== */

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00001',
    productStructureId: 'PS-YASH-001',
    parentLineId: null,
    itemName: 'Wooden Frame – Teak',
    level: 1,
    rawMaterialId: 'RM-WOOD-001',
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
    itemName: 'HR Foam 40D – Seat',
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
    level: 2,
    rawMaterialId: 'RM-SCR-001',
    requiredQuantity: 500,
    consumedQuantity: 200,
    pendingQuantity: 300,
    wastagePercentage: 2,
    unitOfMeasureId: 'UOM-NOS',
    createdOn: '2026-05-10T10:00:00'
  },

  /* =====================================================
     ROYAL SINGLE RECLINER  (WO-2026-00002)
  ===================================================== */

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00002',
    productStructureId: 'PS-REC-001',
    parentLineId: null,
    itemName: 'Steel Recliner Frame',
    level: 1,
    rawMaterialId: 'RM-MECH-001',
    requiredQuantity: 100,
    consumedQuantity: 100,
    pendingQuantity: 0,
    wastagePercentage: 1,
    unitOfMeasureId: 'UOM-NOS',
    createdOn: '2026-05-14T09:00:00'
  },

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00002',
    productStructureId: 'PS-REC-002',
    parentLineId: null,
    itemName: 'Moulded Foam 50D',
    level: 1,
    rawMaterialId: 'RM-FOAM-002',
    requiredQuantity: 300,
    consumedQuantity: 300,
    pendingQuantity: 0,
    wastagePercentage: 3,
    unitOfMeasureId: 'UOM-KG',
    createdOn: '2026-05-14T09:00:00'
  },

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00002',
    productStructureId: 'PS-REC-003',
    parentLineId: null,
    itemName: 'Leatherette – Dark Brown',
    level: 1,
    rawMaterialId: 'RM-LEAT-001',
    requiredQuantity: 250,
    consumedQuantity: 250,
    pendingQuantity: 0,
    wastagePercentage: 6,
    unitOfMeasureId: 'UOM-MTR',
    createdOn: '2026-05-14T09:00:00'
  },

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00002',
    productStructureId: 'PS-REC-004',
    parentLineId: null,
    itemName: 'Recliner Mechanism Manual',
    level: 1,
    rawMaterialId: 'RM-MECH-002',
    requiredQuantity: 100,
    consumedQuantity: 100,
    pendingQuantity: 0,
    wastagePercentage: 0,
    unitOfMeasureId: 'UOM-NOS',
    createdOn: '2026-05-14T09:00:00'
  },

  /* =====================================================
     MILANO L-SHAPE SOFA  (WO-2026-00003)
  ===================================================== */

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00003',
    productStructureId: 'PS-MIL-001',
    parentLineId: null,
    itemName: 'Wooden Frame – Sal Wood',
    level: 1,
    rawMaterialId: 'RM-WOOD-001',
    requiredQuantity: 800,
    consumedQuantity: 0,
    pendingQuantity: 800,
    wastagePercentage: 4,
    unitOfMeasureId: 'UOM-CFT',
    createdOn: '2026-05-18T11:00:00'
  },

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00003',
    productStructureId: 'PS-MIL-002',
    parentLineId: null,
    itemName: 'Pocket Springs',
    level: 1,
    rawMaterialId: 'RM-SPR-002',
    requiredQuantity: 1000,
    consumedQuantity: 0,
    pendingQuantity: 1000,
    wastagePercentage: 1,
    unitOfMeasureId: 'UOM-NOS',
    createdOn: '2026-05-18T11:00:00'
  },

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00003',
    productStructureId: 'PS-MIL-003',
    parentLineId: null,
    itemName: 'Velvet Fabric – Grey',
    level: 1,
    rawMaterialId: 'RM-FAB-003',
    requiredQuantity: 600,
    consumedQuantity: 0,
    pendingQuantity: 600,
    wastagePercentage: 8,
    unitOfMeasureId: 'UOM-MTR',
    createdOn: '2026-05-18T11:00:00'
  },

  {
    workOrderBomLineId: crypto.randomUUID(),
    workOrderId: 'WO-2026-00003',
    productStructureId: 'PS-MIL-004',
    parentLineId: null,
    itemName: 'HR Foam 40D – Seat',
    level: 2,
    rawMaterialId: 'RM-FOAM-001',
    requiredQuantity: 400,
    consumedQuantity: 0,
    pendingQuantity: 400,
    wastagePercentage: 5,
    unitOfMeasureId: 'UOM-KG',
    createdOn: '2026-05-18T11:00:00'
  }

];
