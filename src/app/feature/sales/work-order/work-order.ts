import { WorkOrderBomLine } from "./work-order-bom";


export interface WorkOrder {
  workOrderId?: string;
  workOrderNo: string;
  workOrderDate: string;


  productId: number | null;

  uom?: string;
  orderedQuantity: number;
  producedQuantity: number;
  pendingQuantity: number;

  priority: WorkOrderPriority;

  plannedStartDate: string;
  plannedEndDate: string;

  actualStartDate?: string | null;
  actualEndDate?: string | null;

  salesOrderId?: string | null;
  customerId?: string | null;
  warehouseId?: string | null;

  remarks?: string;

  status: WorkOrderStatus;

  confirmedBy?: string | null;
  confirmedByName?: string;
  confirmedDate?: string | null;

  cancelledBy?: string | null;
  cancelledByName?: string;
  cancelledDate?: string | null;
  cancellationReason?: string;

  isActive?: boolean;
  isCancelled?: boolean;
  isCompleted?: boolean;
  isProductionStarted?: boolean;

   estimatedLeadTime?:number;


  createdBy?: string | null;
  createdOn?: string | null;
  updatedBy?: string | null;
  updatedOn?: string | null;

  bomLines?: WorkOrderBomLine[];
}

export enum WorkOrderStatus {

  Draft = 'Draft',

  Confirmed = 'Confirmed',

  InProgress = 'InProgress',

  Completed = 'Completed',

  Cancelled = 'Cancelled'
}


export enum WorkOrderPriority {

  Low = 'Low',

  Normal = 'Normal',

  High = 'High',

  Urgent = 'Urgent'
}



