
import {
  ConsumptionRow,
  ProductionEntry,
} from './day-production';


const CONSUMPTIONS_WO1: ConsumptionRow[] = [
  {
    id: 1,
    materialId: 'RM-001',
    materialName: 'Steel Rods',
    materialCode: 'STL-001',

    plannedQty: 50,
    actualQty: 52,

    uomId: 'kg',
    uomName: 'Kg',

    batchNo: 'BATCH-2025-01',
    warehouseCode: 'WH-01',

    remarks: '',

    isExtra: false,

    costPerUnit: 150,
  },

  {
    id: 2,
    materialId: 'RM-002',
    materialName: 'Cement Bags OPC 53',
    materialCode: 'CMT-002',

    plannedQty: 20,
    actualQty: 20,

    uomId: 'bag',
    uomName: 'Bag',

    batchNo: 'BATCH-2025-02',
    warehouseCode: 'WH-01',

    remarks: '',

    isExtra: false,

    costPerUnit: 380,
  },
];


export const INITIAL_PRODUCTION_ENTRIES: ProductionEntry[] = [

  {
    id: 1,

    productionNo: 'PE-2025-00001',

    workOrderId: 1,
    workOrderNo: 'WO-2025-00001',

    productId: 101,
    productCode: 'SOFA-001',
    productName: 'Yashika 3+1+1 Sofa Set',

    productionLine: 'line-a',

    productionDate: '2025-05-01',

    shift: 'morning',

    supervisorName: 'Rajan M.',

    producedQty: 10,
    rejectedQty: 1,
    goodQty: 9,

    uom: 'Set',

    status: 'approved',

    approvedBy: 'Admin',
    approvedDate: '2025-05-02',

    consumptions: CONSUMPTIONS_WO1,
  },


  {
    id: 2,

    productionNo: 'PE-2025-00002',

    workOrderId: 2,
    workOrderNo: 'WO-2025-00002',

    productId: 102,
    productCode: 'PLY-009',
    productName: '8×4×9mm Plywood',

    productionLine: 'line-b',

    productionDate: '2025-05-03',

    shift: 'afternoon',

    supervisorName: 'Karthik Velu',

    producedQty: 200,
    rejectedQty: 5,
    goodQty: 195,

    uom: 'Sheet',

    status: 'submitted',

    consumptions: [],
  },


  {
    id: 3,

    productionNo: 'PE-2025-00003',

    workOrderId: 1,
    workOrderNo: 'WO-2025-00001',

    productId: 101,
    productCode: 'SOFA-001',
    productName: 'Yashika 3+1+1 Sofa Set',

    productionLine: 'line-a',

    productionDate: '2025-05-05',

    shift: 'morning',

    supervisorName: 'Priya S.',

    producedQty: 8,
    rejectedQty: 0,
    goodQty: 8,

    uom: 'Set',

    status: 'rejected',

    rejectedBy: 'QC Manager',

    rejectionReason:
      'Upholstery stitching does not meet standard spec.',

    consumptions: [],
  },


  {
    id: 4,

    productionNo: 'PE-2025-00004',

    workOrderId: 3,
    workOrderNo: 'WO-2025-00003',

    productId: 103,
    productCode: 'STL-ROD-12',
    productName: 'Steel Rods 12mm',

    productionLine: 'line-c',

    productionDate: '2025-05-07',

    shift: 'night',

    supervisorName: 'Arjun T.',

    producedQty: 500,
    rejectedQty: 12,
    goodQty: 488,

    uom: 'Kg',

    status: 'draft',

    consumptions: [],
  },
];


export const INITIAL_PRODUCTION_NEXT_ID =
  Math.max(
    ...INITIAL_PRODUCTION_ENTRIES.map(
      e => e.id
    )
  ) + 1;