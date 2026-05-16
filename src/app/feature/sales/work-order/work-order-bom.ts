export interface WorkOrderBomLine {


  workOrderBomLineId?: string;

  workOrderId: string;



  productStructureId: string;

  parentLineId?: string | null;

  itemName: string;


  level: number;

  rawMaterialId?: string | null;

  requiredQuantity: number;

  consumedQuantity: number;

  pendingQuantity: number;

  wastagePercentage?: number;

 
  unitOfMeasureId: string;

  createdOn?: string;

  updatedOn?: string;
}
