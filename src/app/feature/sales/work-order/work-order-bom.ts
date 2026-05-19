export interface WorkOrderBomLine {
  workOrderBomLineId?: string;

  workOrderId: string;

  productStructureId: string;

  parentLineId?: string | null;

  itemName: string;
Warehouse?:string;
  level: number;
  materialCode: string;
  materialName: string;
  rawMaterialId?: string | null;

  rawMaterialName?: string;
  rawMaterialCode?: string;

  unitName?: string;

  requiredQuantity: number;
  consumedQuantity: number;
  pendingQuantity: number;

  wastagePercentage?: number;

  unitOfMeasureId: string;

  createdOn?: string;
  updatedOn?: string;
}
