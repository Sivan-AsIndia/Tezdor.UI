export interface BomNode {
  id: number;
  productId: number;       
  parentId: number | null;   
  level: number;       
  itemName: string;
  itemCode: string;
  rawMaterialId: string | null;
  rawMaterialName: string | null;
  quantity: number;
  unitId: string;
  unitName: string;
  wastagePercent: number;
  costPerUnit: number | null;
  isOptional: boolean;
  processingNotes: string;
  isExpanded: boolean;
  isEditing: boolean;
  hasError: boolean;
  sortOrder: number;
}
