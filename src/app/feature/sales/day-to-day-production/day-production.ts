// ══════════════════════════════════════════════════════════════
// day-production.ts
// ══════════════════════════════════════════════════════════════

export type ProductionStatus =
  | 'draft'
  | 'submitted'
  | 'approved'
  | 'rejected';

export interface ConsumptionRow {
  id: number;

  materialId: string;

  materialName: string;

  materialCode: string;

  plannedQty: number | null;

  actualQty: number;

  uomId: string;

  uomName: string;

  batchNo: string;

  warehouseCode: string;

  remarks: string;

  isExtra: boolean;

  costPerUnit: number | null;
}

export interface ProductionEntry {

  id: number;

  productionNo: string;

  workOrderId: number;

  workOrderNo: string;

  productId: number;

  productCode: string;

  productName: string;

  productionLine: string;

  productionDate: string;

  shift: string;

  supervisorId?: string;

  supervisorName: string;

  workerCount?: number;

  producedQty: number;

  rejectedQty: number;

  goodQty: number;

  uom: string;

  startTime?: string;

  endTime?: string;

  downtimeMinutes?: number;

  downtimeReason?: string;

  remarks?: string;

  status: ProductionStatus;

  approvedBy?: string;

  approvedDate?: string;

  rejectedBy?: string;

  rejectionReason?: string;

  createdAt?: string;

  updatedAt?: string;

  consumptions: ConsumptionRow[];
}

export interface PeFilters {
  status: string;
  shift: string;
  dateFrom: string;
  dateTo: string;
}

// ─────────────────────────────────────────────
// Dropdowns
// ─────────────────────────────────────────────

export const SHIFT_OPTIONS = [
  {
    value: 'morning',
    label: 'Morning (06:00 – 14:00)',
  },

  {
    value: 'afternoon',
    label: 'Afternoon (14:00 – 22:00)',
  },

  {
    value: 'night',
    label: 'Night (22:00 – 06:00)',
  },

  {
    value: 'general',
    label: 'General (09:00 – 18:00)',
  },
];

export const LINE_OPTIONS = [
  {
    value: 'line-a',
    label: 'Line A — Upholstery',
  },

  {
    value: 'line-b',
    label: 'Line B — Woodwork',
  },

  {
    value: 'line-c',
    label: 'Line C — Metal Fab',
  },

  {
    value: 'line-d',
    label: 'Line D — Assembly',
  },
];

export const SUPERVISOR_OPTIONS = [
  {
    value: 'EMP-101',
    label: 'EMP-101 — Rajan M.',
  },

  {
    value: 'EMP-114',
    label: 'EMP-114 — Karthik Velu',
  },

  {
    value: 'EMP-132',
    label: 'EMP-132 — Priya S.',
  },

  {
    value: 'EMP-158',
    label: 'EMP-158 — Arjun T.',
  },
];