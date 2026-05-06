
export type ProductStatus = 'active' | 'inactive' | 'discontinued';
export type DiscountType  = 'none' | 'percentage' | 'fixed';
export type TabId         = 'general' | 'advanced';
export type ProductType         = 'Goods' | 'Service (labour, delivery)';

export interface ProductImage {
  id?: number;
  url: string;
  isPrimary?: boolean;
}
export interface Product {
  id: number;       
ProductId: string;
TenantId :string;
CompanyId :string;
  productCode: string;   
  productName: string; 
  images: ProductImage[]; 
  categoryId: number;  
  categoryName:string;
  brandId?: number;  
  unitId: number;     
  barcode?: string;  
  costPrice: number;   
  sellingPrice: number; 
  taxId?: number;     
  isInclusiveTax: boolean;  
   discountType: DiscountType;
  discountValue: number | null;
  reorderLevel?: number;   
  maxStockLevel?: number;   
  currentStock: number;    
  description?: string;  
  metaTagTitle: string;
  metaTagDescription: string;
  isPhysical: boolean;
  productTemplate: string;  
  ProductType :ProductType     
  status: ProductStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProductFormValue extends Omit<Product, 'currentStock' | 'productId'> {}

export interface ISelectOption {
  value: string;
  label: string;
}

export interface IStatusOption extends ISelectOption {
  hint: string;
}

export interface IDiscountOption extends ISelectOption {
  value: DiscountType;
}

export const CATEGORY_OPTIONS: ISelectOption[] = [
  { value: '1', label: 'Electronics' },
  { value: '2', label: 'Clothing' },
  { value: '3', label: 'Food & Beverages' },
  { value: '4', label: 'Hardware' },
  { value: '5', label: 'Stationery' },
];

export const BRAND_OPTIONS: ISelectOption[] = [
  { value: '1', label: 'Dell' },
  { value: '2', label: 'HP' },
  { value: '3', label: 'Apple' },
];

export const PRODUCT_TYPE_OPTIONS: ISelectOption[] = [
  { value: '1', label: 'Goods' },
  { value: '2', label: 'Service (labour, delivery)' }
];


export const UNIT_OPTIONS:{ value: number; label: string }[] = [
  { value: 1, label: 'Pcs' },
  { value: 2, label: 'Kg' },
  { value: 3, label: 'Litre' },
  { value: 4, label: 'Box' },
  { value:5, label: 'Dozen' },
];

export const TAX_OPTIONS: ISelectOption[] = [
  { value: '',  label: 'None' },
  { value: '1', label: 'GST 5%' },
  { value: '2', label: 'GST 12%' },
  { value: '3', label: 'GST 18%' },
  { value: '4', label: 'GST 28%' },
];

export const DISCOUNT_OPTIONS: IDiscountOption[] = [
  { value: 'none',       label: 'No Discount' },
  { value: 'percentage', label: 'Percentage %' },
  { value: 'fixed',      label: 'Fixed Price' },
];

export const STATUS_OPTIONS: IStatusOption[] = [
  { value: 'draft', label: 'Draft', hint: 'Selectable in Invoice & PO' },
  { value: 'approved', label: 'Approved', hint: 'Hidden from dropdowns' },
  { value: 'sent to supplier', label: 'Sent to Supplier', hint: 'Historical reference only' },
  { value: 'partial', label: 'Partial', hint: 'Historical reference only' },
  { value: 'received', label: 'Received', hint: 'Historical reference only' },
  { value: 'cancelled', label: 'Cancelled', hint: 'Historical reference only' },
];
export const STATUS_OPTIONSPRODUCT: IStatusOption[] = [
  { value: 'active', label: 'Active', hint: 'Selectable in Invoice & PO' },
  { value: 'inactive', label: 'Inactive', hint: 'Hidden from dropdowns' },
  { value: 'discontinued', label: 'Discontinued', hint: 'Historical reference only' },
];

export const TEMPLATE_OPTIONS: ISelectOption[] = [
  { value: '',        label: 'Default template' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'detailed', label: 'Detailed' },
];
export interface ProductSummary {
  productCode: string;
  productName: string;
  vendorCode: string;
  vendorName: string;
  totalIn: number;
  unitId:number;
  totalOut: number;
  closingStock: number;
  transactionCount: number;
}
export interface DropdownOption { value: string | number; label: string; }
