import {
  MASTER_CATEGORIES,
  MASTER_BRANDS,
  MASTER_UNITS,
  MASTER_TAX_OPTIONS,
  MASTER_TAX_MAP,
  MASTER_PRODUCT_TYPES,
  MASTER_DISCOUNT_OPTIONS,
  MASTER_TEMPLATE_OPTIONS,
  SelectOption,
} from '../../core/services/master-data';

export type ProductStatus = 'active' | 'inactive' | 'discontinued';
export type DiscountType = 'none' | 'percentage' | 'fixed';
export type TabId = 'general' | 'advanced' | 'bom';
export type ProductType = 'Goods' | 'Service (labour, delivery)';

export interface ProductImage {
  id?: number;
  url: string;
  isPrimary?: boolean;
}
export interface Product {
  id: number;
  ProductId: string;
  TenantId: string;
  CompanyId: string;
  productCode: string;
  productName: string;
  images: ProductImage[];
  categoryId: number;
  categoryName: string;
  subCategoryId: number;
  subCategoryName: string;
  brandId?: number;
  unitId: number;
  unitName?: string;
  unitCode?: string;
  barcode?: string;
  costPrice: number;
  sellingPrice: number;
  warrantyMonths?: number;
  hsnCode?: string;
  dimensions?: string;
  weightKg?: number;
  minStockLevel?: number;
  leadTimeDays?: number;
  autoExpandBom?: boolean;
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
  ProductType: ProductType;
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

export const CATEGORY_OPTIONS: ISelectOption[] = MASTER_CATEGORIES as ISelectOption[];

export const BRAND_OPTIONS: ISelectOption[] = MASTER_BRANDS as ISelectOption[];

export const PRODUCT_TYPE_OPTIONS: ISelectOption[] = MASTER_PRODUCT_TYPES as ISelectOption[];

export const UNIT_OPTIONS: { value: number; label: string }[] = MASTER_UNITS;

export const TAX_OPTIONS: ISelectOption[] = MASTER_TAX_OPTIONS as ISelectOption[];
export const TAX_MAP: Record<number, number> = MASTER_TAX_MAP;

export const DISCOUNT_OPTIONS: IDiscountOption[] = MASTER_DISCOUNT_OPTIONS as IDiscountOption[];

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

export const TEMPLATE_OPTIONS: ISelectOption[] = MASTER_TEMPLATE_OPTIONS as ISelectOption[];
export interface ProductSummary {
  productCode: string;
  productName: string;
  vendorCode: string;
  vendorName: string;
  totalIn: number;
  unitId: number;
  totalOut: number;
  closingStock: number;
  transactionCount: number;
}
export interface DropdownOption {
  value: string | number;
  label: string;
}
