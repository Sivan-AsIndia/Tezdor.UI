// master-data.service.ts
import { Injectable, signal } from '@angular/core';

export interface Option {
  id: string;
  name: string;
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface StatusOption extends SelectOption {
  hint: string;
}

export interface VendorOption {
  id: string;
  code: string;
  name: string;
}

export interface CustomerOption {
  value: string;
  label: string;
  gstin?: string;
  pan?: string;
  address?: string;
  mobile?: string;
  email?: string;
}

export interface UnitOption {
  value: number;
  label: string;
}

export interface ProductOption {
  value: string;
  label: string;
  code: string;
  price: number;
  costPrice: number;
  taxPct: number;
  unitId: number;
  categoryId: number;
  categoryName: string;
  isPhysical: boolean;
}

export interface RawMaterialOption {
  id: string;
  code: string;
  name: string;
  unitId: number;
  unitName: string;
  costPerUnit: number;
  categoryTag: string;
}

@Injectable({ providedIn: 'root' })
export class MasterDataClient {

  // ═══════════════════════════════════════════════════════
  //  ORGANIZATION
  // ═══════════════════════════════════════════════════════

  readonly departments = signal<Option[]>([
    { id: 'PROD', name: 'Production' },
    { id: 'DESIGN', name: 'Design & Prototyping' },
    { id: 'UPHOL', name: 'Upholstery' },
    { id: 'CARP', name: 'Carpentry' },
    { id: 'QC', name: 'Quality Control' },
    { id: 'SALES', name: 'Sales & Marketing' },
    { id: 'WH', name: 'Warehouse & Stores' },
    { id: 'FIN', name: 'Finance & Accounts' },
    { id: 'HR', name: 'HR & Admin' },
  ]);

  readonly designations = signal<Option[]>([
    { id: 'MGR', name: 'Manager' },
    { id: 'TL', name: 'Team Lead' },
    { id: 'DEV', name: 'Executive' },
    { id: 'GM', name: 'General Manager' },
    { id: 'PM', name: 'Production Manager' },
    { id: 'SU', name: 'Senior Upholsterer' },
    { id: 'CARP', name: 'Carpenter' },
    { id: 'QC_HEAD', name: 'QC Head' },
    { id: 'SALES_EX', name: 'Sales Executive' },
    { id: 'WH_SUPV', name: 'Warehouse Supervisor' },
    { id: 'ACCT', name: 'Accountant' },
    { id: 'HR_EX', name: 'HR Executive' },
    { id: 'HELPER', name: 'Helper / Trainee' },
  ]);

  readonly roles = signal<Option[]>([
    { id: 'ADMIN', name: 'Administrator' },
    { id: 'SUPER_ADMIN', name: 'Super Admin' },
    { id: 'PROD_MGR', name: 'Production Manager' },
    { id: 'MASTER_DATA', name: 'Master Data Officer' },
    { id: 'DESIGN_LEAD', name: 'Design Lead' },
    { id: 'QC_INSPECTOR', name: 'QC Inspector' },
    { id: 'WH_MANAGER', name: 'Warehouse Manager' },
    { id: 'SALES_EX', name: 'Sales Executive' },
    { id: 'SALES_MGR', name: 'Sales Manager' },
    { id: 'FIN_MANAGER', name: 'Finance Manager' },
    { id: 'ACCOUNTANT', name: 'Accountant' },
    { id: 'HR_EXEC', name: 'HR Executive' },
    { id: 'LOGISTICS', name: 'Logistics Officer' },
    { id: 'EMP', name: 'Employee' },
  ]);

  branches = signal([
    { branchId: 'B1', branchName: 'Head Office & Factory – Coimbatore' },
    { branchId: 'B2', branchName: 'Showroom – Chennai' },
    { branchId: 'B3', branchName: 'Showroom – Bangalore' },
    { branchId: 'B4', branchName: 'Warehouse – Salem' },
  ]);

  costCenters = signal([
    { costCenterId: 'CC1', costCenterName: 'Factory Operations' },
    { costCenterId: 'CC2', costCenterName: 'Showroom Operations' },
    { costCenterId: 'CC3', costCenterName: 'Warehouse & Logistics' },
  ]);

  projects = signal([
    { projectId: 'P1', projectName: 'New Recliner Line Launch' },
    { projectId: 'P2', projectName: 'Bangalore Showroom Setup' },
    { projectId: 'P3', projectName: 'Custom Order – Hotel Chain' },
  ]);

  // ═══════════════════════════════════════════════════════
  //  GEOGRAPHY
  // ═══════════════════════════════════════════════════════

  readonly cities = signal<Option[]>([
    { id: 'CBE', name: 'Coimbatore' },
    { id: 'CHN', name: 'Chennai' },
    { id: 'BLR', name: 'Bangalore' },
    { id: 'SLM', name: 'Salem' },
  ]);

  readonly states = signal<Option[]>([
    { id: 'TN', name: 'Tamil Nadu' },
    { id: 'KA', name: 'Karnataka' },
    { id: 'KL', name: 'Kerala' },
  ]);

  readonly countries = signal<Option[]>([
    { id: 'IN', name: 'India' },
    { id: 'US', name: 'USA' },
    { id: 'AE', name: 'UAE' },
  ]);

  readonly placeOfSupplyOptions = signal<SelectOption[]>([
    { value: 'TN', label: 'Tamil Nadu' },
    { value: 'KA', label: 'Karnataka' },
    { value: 'MH', label: 'Maharashtra' },
    { value: 'DL', label: 'Delhi' },
    { value: 'GJ', label: 'Gujarat' },
  ]);

  // ═══════════════════════════════════════════════════════
  //  EMPLOYEE / HR
  // ═══════════════════════════════════════════════════════

  readonly degrees = signal<Option[]>([
    { id: 'SSLC', name: 'SSLC' },
    { id: 'HSC', name: 'HSC' },
    { id: 'DIP', name: 'Diploma' },
    { id: 'BA', name: 'B.A' },
    { id: 'BSC', name: 'B.Sc' },
    { id: 'BCOM', name: 'B.Com' },
    { id: 'BE', name: 'B.E' },
    { id: 'BTECH', name: 'B.Tech' },
    { id: 'BCA', name: 'BCA' },
    { id: 'MA', name: 'M.A' },
    { id: 'MSC', name: 'M.Sc' },
    { id: 'MCOM', name: 'M.Com' },
    { id: 'ME', name: 'M.E' },
    { id: 'MTECH', name: 'M.Tech' },
    { id: 'MCA', name: 'MCA' },
    { id: 'MBA', name: 'MBA' },
    { id: 'PHD', name: 'Ph.D' },
  ]);

  readonly bankNames = signal<Option[]>([
    { id: 'SBI', name: 'State Bank of India' },
    { id: 'HDFC', name: 'HDFC Bank' },
    { id: 'ICICI', name: 'ICICI Bank' },
    { id: 'AXIS', name: 'Axis Bank' },
    { id: 'PNB', name: 'Punjab National Bank' },
    { id: 'BOB', name: 'Bank of Baroda' },
    { id: 'CANARA', name: 'Canara Bank' },
    { id: 'UBI', name: 'Union Bank of India' },
    { id: 'IOB', name: 'Indian Overseas Bank' },
    { id: 'IDBI', name: 'IDBI Bank' },
    { id: 'INDUSIND', name: 'IndusInd Bank' },
    { id: 'YES', name: 'Yes Bank' },
    { id: 'KOTAK', name: 'Kotak Mahindra Bank' },
    { id: 'FEDERAL', name: 'Federal Bank' },
    { id: 'RBL', name: 'RBL Bank' },
  ]);

  // ═══════════════════════════════════════════════════════
  //  FINANCE / ACCOUNTING
  // ═══════════════════════════════════════════════════════

  expenseCategories = signal([
    { id: 'EC1', name: 'Raw Material Transport' },
    { id: 'EC2', name: 'Courier & Shipping' },
    { id: 'EC3', name: 'Vehicle & Delivery' },
    { id: 'EC4', name: 'Factory Consumables' },
    { id: 'EC5', name: 'Office Supplies' },
  ]);

  expenseLedgerAccount = signal([
    { accountId: 'acc-003', accountCode: 'RENT', accountName: 'Rent Expense Account' },
    { accountId: 'acc-001', accountCode: 'CASH', accountName: 'Cash Account' },
    { accountId: 'acc-004', accountCode: 'OFFSUP', accountName: 'Office Supplies Expense' },
    { accountId: 'acc-005', accountCode: 'BANK', accountName: 'Bank Account' },
    { accountId: 'acc-006', accountCode: 'SAL', accountName: 'Salary Expense Account' },
    { accountId: 'acc-007', accountCode: 'AR', accountName: 'Accounts Receivable' },
    { accountId: 'acc-008', accountCode: 'PC', accountName: 'Petty Cash Account' },
    { accountId: 'acc-009', accountCode: 'SALES', accountName: 'Sales Revenue Account' },
    { accountId: 'acc-013', accountCode: 'AP', accountName: 'Accounts Payable' },
    { accountId: 'acc-017', accountCode: 'PURCH', accountName: 'Purchases Account' },
    { accountId: 'acc-018', accountCode: 'GSTIN', accountName: 'GST Input Credit' },
    { accountId: 'acc-019', accountCode: 'GSTOUT', accountName: 'GST Output Liability' },
  ]);

  taxCodes = signal([
    { id: 'GST5', name: 'GST 5%' },
    { id: 'GST12', name: 'GST 12%' },
    { id: 'GST18', name: 'GST 18%' },
  ]);

  currencies = signal([
    { currencyId: 'INR', currencyCode: 'INR' },
    { currencyId: 'USD', currencyCode: 'USD' },
    { currencyId: 'EUR', currencyCode: 'EUR' },
  ]);

  fiscalYears = signal([
    { id: 'FY25', name: '2025-2026', start: '2025-04-01', end: '2026-03-31' },
    { id: 'FY26', name: '2026-2027', start: '2026-04-01', end: '2027-03-31' },
  ]);

  accountingPeriods = signal([
    { id: 'JAN26', name: 'January 2026', start: '2026-01-01', end: '2026-01-31' },
    { id: 'FEB26', name: 'February 2026', start: '2026-02-01', end: '2026-02-28' },
    { id: 'MAR26', name: 'March 2026', start: '2026-03-01', end: '2026-03-31' },
    { id: 'APR26', name: 'April 2026', start: '2026-04-01', end: '2026-04-30' },
    { id: 'MAY26', name: 'May 2026', start: '2026-05-01', end: '2026-05-31' },
  ]);

  // ═══════════════════════════════════════════════════════
  //  VENDORS (Sofa / Furniture raw-material suppliers)
  // ═══════════════════════════════════════════════════════

  readonly vendors = signal<VendorOption[]>(MASTER_VENDORS);

  getVendorMap(): Record<string, { code: string; name: string }> {
    return MASTER_VENDOR_MAP;
  }

  getVendorDropdown(): { code: string; name: string }[] {
    return this.vendors().map(v => ({ code: v.id, name: v.name }));
  }

  getSupplierSelectOptions(): SelectOption[] {
    return this.vendors().map(v => ({
      value: v.id,
      label: `${v.name} (${v.code})`,
    }));
  }

  // ═══════════════════════════════════════════════════════
  //  CUSTOMERS (Furniture retailers, Interior designers)
  // ═══════════════════════════════════════════════════════

  readonly customers = signal<CustomerOption[]>(MASTER_CUSTOMERS);

  // ═══════════════════════════════════════════════════════
  //  PRODUCTS & INVENTORY
  // ═══════════════════════════════════════════════════════

  readonly units = signal<UnitOption[]>(MASTER_UNITS);

  readonly categories = signal<SelectOption[]>(MASTER_CATEGORIES);

  readonly brands = signal<SelectOption[]>(MASTER_BRANDS);

  readonly productTypes = signal<SelectOption[]>(MASTER_PRODUCT_TYPES);

  readonly warehouses = signal<SelectOption[]>(MASTER_WAREHOUSES);

  readonly demoProducts = signal<ProductOption[]>(MASTER_PRODUCTS);

  // ═══════════════════════════════════════════════════════
  //  RAW MATERIALS (for BOM line-item picker)
  // ═══════════════════════════════════════════════════════

  readonly rawMaterials = signal<RawMaterialOption[]>(MASTER_RAW_MATERIALS);

  // ═══════════════════════════════════════════════════════
  //  TAX & PRICING
  // ═══════════════════════════════════════════════════════

  readonly taxOptions = signal<SelectOption[]>(MASTER_TAX_OPTIONS);

  readonly taxMap: Record<number, number> = { 1: 18, 2: 12, 3: 5, 4: 0 };

  readonly currencyOptions = signal<SelectOption[]>(MASTER_CURRENCY_OPTIONS);

  // ═══════════════════════════════════════════════════════
  //  PAYMENT & DELIVERY TERMS
  // ═══════════════════════════════════════════════════════

  readonly paymentTermsOptions = signal<SelectOption[]>(MASTER_PAYMENT_TERMS);

  readonly deliveryOptions = signal<SelectOption[]>(MASTER_DELIVERY_OPTIONS);

  // ═══════════════════════════════════════════════════════
  //  DISCOUNT & TEMPLATE
  // ═══════════════════════════════════════════════════════

  readonly discountOptions = signal<SelectOption[]>(MASTER_DISCOUNT_OPTIONS);

  readonly templateOptions = signal<SelectOption[]>(MASTER_TEMPLATE_OPTIONS);
}

// ═══════════════════════════════════════════════════════════════════
//  STANDALONE EXPORTS
// ═══════════════════════════════════════════════════════════════════

export const MASTER_VENDORS: VendorOption[] = [
  { id: '1', code: 'VEN001', name: 'Krishna Timber & Plywood' },
  { id: '2', code: 'VEN002', name: 'Coimbatore Foam Industries' },
  { id: '3', code: 'VEN003', name: 'Lakshmi Fabrics & Textiles' },
  { id: '4', code: 'VEN004', name: 'Apex Hardware & Fasteners' },
  { id: '5', code: 'VEN005', name: 'Sundaram Spring Works' },
  { id: '6', code: 'VEN006', name: 'Selvaraj Packaging' },
];

export const MASTER_VENDOR_MAP: Record<string, { code: string; name: string }> = Object.fromEntries(
  MASTER_VENDORS.map(v => [v.id, { code: v.code, name: v.name }])
);

export const MASTER_CUSTOMERS: CustomerOption[] = [
  { value: 'C001', label: 'Sundaram Furnishings Pvt Ltd', gstin: '33AABCS4567K1ZP', pan: 'AABCS4567K', address: '24 Anna Salai, Coimbatore 641004', mobile: '9876543210', email: 'orders@sundaramfurnish.com' },
  { value: 'C002', label: 'Deepa Interiors & Decor', gstin: '33FGHIJ5678K1Z2', pan: 'FGHIJ5678K', address: 'MG Road, Bangalore 560001', mobile: '9876543211', email: 'deepa@interiorsdecor.com' },
  { value: 'C003', label: 'Sri Balaji Furniture House', gstin: '33LMNOP9012Q1Z7', pan: 'LMNOP9012Q', address: 'Gandhipuram, Coimbatore 641012', mobile: '9876543212', email: 'balaji@furniturehouse.com' },
  { value: 'C004', label: 'Royal Living Concepts', gstin: '33QRSTU3456V1Z9', pan: 'QRSTU3456V', address: 'T Nagar, Chennai 600017', mobile: '9876543213', email: 'info@royalliving.in' },
  { value: 'C005', label: 'Comfort Zone Furniture', gstin: '33WXYZ04567A1Z3', pan: 'WXYZ04567A', address: 'RS Puram, Coimbatore 641002', mobile: '9876543214', email: 'sales@comfortzone.in' },
  { value: 'C006', label: 'Elegant Home Solutions', gstin: '33BCDEF6789G1Z1', pan: 'BCDEF6789G', address: 'Anna Nagar, Chennai 600040', mobile: '9876543215', email: 'elegant@homesolutions.com' },
];

export const MASTER_CUSTOMER_MAP: Record<string, CustomerOption> = Object.fromEntries(
  MASTER_CUSTOMERS.map(c => [c.value, c])
);

export const MASTER_UNITS: UnitOption[] = [
  { value: 1, label: 'Nos' },
  { value: 2, label: 'Kg' },
  { value: 3, label: 'Litre' },
  { value: 4, label: 'Set' },
  { value: 5, label: 'Meter' },
  { value: 6, label: 'Sheet' },
  { value: 7, label: 'Pair' },
  { value: 8, label: 'Box' },
];

export const MASTER_UNIT_MAP: Record<number, string> = Object.fromEntries(
  MASTER_UNITS.map(u => [u.value, u.label])
);

export const MASTER_TAX_OPTIONS: SelectOption[] = [
  { value: '0', label: 'None (0%)' },
  { value: '5', label: 'GST 5%' },
  { value: '12', label: 'GST 12%' },
  { value: '18', label: 'GST 18%' },
  { value: '28', label: 'GST 28%' },
];

export const MASTER_TAX_MAP: Record<number, number> = { 1: 18, 2: 12, 3: 5, 4: 0 };

export const MASTER_CATEGORIES: SelectOption[] = [
  { value: '1', label: 'Sofa' },
  { value: '2', label: 'Recliner' },
  { value: '3', label: 'Dining' },
  { value: '4', label: 'Bed' },
  { value: '5', label: 'Office Chair' },
];

export const MASTER_SUBCATEGORIES: Record<number, SelectOption[]> = {
  1: [
    { value: '101', label: 'Fabric Sofa' },
    { value: '102', label: 'Leather Sofa' },
    { value: '103', label: 'L-Shape Sofa' },
    { value: '104', label: 'Recliner Sofa' },
  ],
  2: [
    { value: '201', label: 'Single Recliner' },
    { value: '202', label: 'Double Recliner' },
    { value: '203', label: 'Motorised Recliner' },
  ],
  3: [
    { value: '301', label: '4-Seater Dining' },
    { value: '302', label: '6-Seater Dining' },
    { value: '303', label: '8-Seater Dining' },
  ],
  4: [
    { value: '401', label: 'King Size Bed' },
    { value: '402', label: 'Queen Size Bed' },
    { value: '403', label: 'Storage Bed' },
  ],
  5: [
    { value: '501', label: 'Executive Chair' },
    { value: '502', label: 'Ergonomic Chair' },
    { value: '503', label: 'Conference Chair' },
  ],
};

export const MASTER_BRANDS: SelectOption[] = [
  { value: '1', label: 'SofaCraft Premium' },
  { value: '2', label: 'SofaCraft Classic' },
  { value: '3', label: 'Throne Recliners' },
];

export const MASTER_PRODUCT_TYPES: SelectOption[] = [
  { value: '1', label: 'Raw Material' },
  { value: '2', label: 'Goods' },
  { value: '3', label: 'Service (labour, delivery)' },
];

export const MASTER_PAYMENT_TERMS: SelectOption[] = [
  { value: 'immediate', label: 'Immediate' },
  { value: 'advance', label: 'Advance' },
  { value: 'cod', label: 'Cash on Delivery' },
  { value: 'net15', label: 'Net 15 Days' },
  { value: 'net30', label: 'Net 30 Days' },
  { value: 'net45', label: 'Net 45 Days' },
  { value: 'net60', label: 'Net 60 Days' },
];

export const MASTER_DELIVERY_OPTIONS: SelectOption[] = [
  { value: 'pickup', label: 'Self Pickup' },
  { value: 'delivery', label: 'Vendor Delivery' },
  { value: 'courier', label: 'Courier / Transport' },
];

export const MASTER_WAREHOUSES: SelectOption[] = [
  { value: '1', label: 'Raw Material Store – Coimbatore' },
  { value: '2', label: 'Finished Goods – Coimbatore' },
  { value: '3', label: 'FG Store – Salem' },
];

export const MASTER_CURRENCY_OPTIONS: SelectOption[] = [
  { value: 'INR', label: 'Indian Rupee' },
  { value: 'USD', label: 'US Dollar' },
  { value: 'AED', label: 'UAE Dirham' },
];

export const MASTER_PLACE_OF_SUPPLY: SelectOption[] = [
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'DL', label: 'Delhi' },
  { value: 'GJ', label: 'Gujarat' },
];

export const MASTER_DISCOUNT_OPTIONS: SelectOption[] = [
  { value: 'none', label: 'No Discount' },
  { value: 'percentage', label: 'Percentage %' },
  { value: 'fixed', label: 'Fixed Price' },
];

export const MASTER_TEMPLATE_OPTIONS: SelectOption[] = [
  { value: '', label: 'Default template' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'detailed', label: 'Detailed' },
];

// ═══════════════════════════════════════════════════════════════════
//  MASTER RAW MATERIALS — Used in BOM Raw Material picker
// ═══════════════════════════════════════════════════════════════════

export const MASTER_RAW_MATERIALS: RawMaterialOption[] = [
  // Wood & Plywood
  { id: 'RM-WD-001', code: 'RM-WD-001', name: 'Sheesham Wood Plank', unitId: 4, unitName: 'Set', costPerUnit: 3200, categoryTag: 'Wood' },
  { id: 'RM-WD-002', code: 'RM-WD-002', name: 'Silver Oak Wood Plank', unitId: 4, unitName: 'Set', costPerUnit: 2800, categoryTag: 'Wood' },
  { id: 'RM-PW-001', code: 'RM-PW-001', name: 'Plywood Sheet 12mm (8×4 ft)', unitId: 6, unitName: 'Sheet', costPerUnit: 1450, categoryTag: 'Plywood' },
  { id: 'RM-PW-002', code: 'RM-PW-002', name: 'Plywood Sheet 18mm (8×4 ft)', unitId: 6, unitName: 'Sheet', costPerUnit: 1850, categoryTag: 'Plywood' },
  { id: 'RM-PW-003', code: 'RM-PW-003', name: 'MDF Board 16mm (8×4 ft)', unitId: 6, unitName: 'Sheet', costPerUnit: 1100, categoryTag: 'Plywood' },

  // Foam
  { id: 'RM-FM-001', code: 'RM-FM-001', name: 'PU Foam Block HD-32 (Seat)', unitId: 1, unitName: 'Nos', costPerUnit: 850, categoryTag: 'Foam' },
  { id: 'RM-FM-002', code: 'RM-FM-002', name: 'PU Foam Block HD-28 (Back)', unitId: 1, unitName: 'Nos', costPerUnit: 650, categoryTag: 'Foam' },
  { id: 'RM-FM-003', code: 'RM-FM-003', name: 'Recliner Moulded Foam', unitId: 1, unitName: 'Nos', costPerUnit: 1200, categoryTag: 'Foam' },
  { id: 'RM-FM-004', code: 'RM-FM-004', name: 'Dacron Fibre Fill (1 Kg bag)', unitId: 2, unitName: 'Kg', costPerUnit: 280, categoryTag: 'Foam' },

  // Fabric
  { id: 'RM-FB-001', code: 'RM-FB-001', name: 'Linen Fabric (Beige)', unitId: 5, unitName: 'Meter', costPerUnit: 420, categoryTag: 'Fabric' },
  { id: 'RM-FB-002', code: 'RM-FB-002', name: 'Velvet Fabric (Royal Blue)', unitId: 5, unitName: 'Meter', costPerUnit: 550, categoryTag: 'Fabric' },
  { id: 'RM-FB-003', code: 'RM-FB-003', name: 'Leatherette (Brown)', unitId: 5, unitName: 'Meter', costPerUnit: 380, categoryTag: 'Fabric' },
  { id: 'RM-FB-004', code: 'RM-FB-004', name: 'Genuine Leather (Tan)', unitId: 5, unitName: 'Meter', costPerUnit: 1800, categoryTag: 'Leather' },
  { id: 'RM-FB-005', code: 'RM-FB-005', name: 'Chenille Fabric (Grey)', unitId: 5, unitName: 'Meter', costPerUnit: 480, categoryTag: 'Fabric' },

  // Springs & Mechanisms
  { id: 'RM-SP-001', code: 'RM-SP-001', name: 'Serpentine Spring Strip (Zig-Zag)', unitId: 5, unitName: 'Meter', costPerUnit: 95, categoryTag: 'Spring' },
  { id: 'RM-SP-002', code: 'RM-SP-002', name: 'Pocket Spring Unit (3-Seater)', unitId: 1, unitName: 'Nos', costPerUnit: 2400, categoryTag: 'Spring' },
  { id: 'RM-MC-001', code: 'RM-MC-001', name: 'Recliner Mechanism (Manual)', unitId: 1, unitName: 'Nos', costPerUnit: 3500, categoryTag: 'Mechanism' },
  { id: 'RM-MC-002', code: 'RM-MC-002', name: 'Recliner Mechanism (Motorised)', unitId: 1, unitName: 'Nos', costPerUnit: 8500, categoryTag: 'Mechanism' },

  // Hardware
  { id: 'RM-HW-001', code: 'RM-HW-001', name: 'M6 × 50mm Wood Screw', unitId: 8, unitName: 'Box', costPerUnit: 180, categoryTag: 'Hardware' },
  { id: 'RM-HW-002', code: 'RM-HW-002', name: 'L-Bracket (Galvanised)', unitId: 1, unitName: 'Nos', costPerUnit: 25, categoryTag: 'Hardware' },
  { id: 'RM-HW-003', code: 'RM-HW-003', name: 'Sofa Leg (Wooden, 4 in)', unitId: 1, unitName: 'Nos', costPerUnit: 85, categoryTag: 'Hardware' },
  { id: 'RM-HW-004', code: 'RM-HW-004', name: 'Sofa Leg (Chrome, 3 in)', unitId: 1, unitName: 'Nos', costPerUnit: 120, categoryTag: 'Hardware' },
  { id: 'RM-HW-005', code: 'RM-HW-005', name: 'Staple Pin 19mm (Box-5000)', unitId: 8, unitName: 'Box', costPerUnit: 320, categoryTag: 'Hardware' },
  { id: 'RM-HW-006', code: 'RM-HW-006', name: 'Velcro Strip (Hook & Loop)', unitId: 5, unitName: 'Meter', costPerUnit: 35, categoryTag: 'Hardware' },

  // Adhesive & Polish
  { id: 'RM-AD-001', code: 'RM-AD-001', name: 'Fevicol SH (5 Kg)', unitId: 2, unitName: 'Kg', costPerUnit: 110, categoryTag: 'Adhesive' },
  { id: 'RM-AD-002', code: 'RM-AD-002', name: 'Spray Adhesive (Fabric Bond)', unitId: 3, unitName: 'Litre', costPerUnit: 650, categoryTag: 'Adhesive' },
  { id: 'RM-PO-001', code: 'RM-PO-001', name: 'PU Polish (Matte)', unitId: 3, unitName: 'Litre', costPerUnit: 480, categoryTag: 'Polish' },
  { id: 'RM-PO-002', code: 'RM-PO-002', name: 'Teak Oil Finish', unitId: 3, unitName: 'Litre', costPerUnit: 350, categoryTag: 'Polish' },

  // Webbing & Filler
  { id: 'RM-WB-001', code: 'RM-WB-001', name: 'Jute Webbing (3 in)', unitId: 5, unitName: 'Meter', costPerUnit: 22, categoryTag: 'Webbing' },
  { id: 'RM-WB-002', code: 'RM-WB-002', name: 'Elastic Webbing (2 in)', unitId: 5, unitName: 'Meter', costPerUnit: 45, categoryTag: 'Webbing' },
  { id: 'RM-NW-001', code: 'RM-NW-001', name: 'Non-Woven Dust Cover', unitId: 5, unitName: 'Meter', costPerUnit: 30, categoryTag: 'Cover' },

  // Packaging
  { id: 'PKG-CB-001', code: 'PKG-CB-001', name: 'Corrugated Carton (Sofa)', unitId: 1, unitName: 'Nos', costPerUnit: 350, categoryTag: 'Packaging' },
  { id: 'PKG-BW-001', code: 'PKG-BW-001', name: 'Bubble Wrap Roll (1m wide)', unitId: 5, unitName: 'Meter', costPerUnit: 18, categoryTag: 'Packaging' },
  { id: 'PKG-SF-001', code: 'PKG-SF-001', name: 'Stretch Film Roll', unitId: 1, unitName: 'Nos', costPerUnit: 280, categoryTag: 'Packaging' },
  { id: 'PKG-CR-001', code: 'PKG-CR-001', name: 'Corner Protector (Foam)', unitId: 1, unitName: 'Nos', costPerUnit: 15, categoryTag: 'Packaging' },
];

export const MASTER_RAW_MATERIAL_MAP: Record<string, RawMaterialOption> = Object.fromEntries(
  MASTER_RAW_MATERIALS.map(r => [r.id, r])
);

// ═══════════════════════════════════════════════════════════════════
//  MASTER PRODUCTS — Sofa company finished goods
// ═══════════════════════════════════════════════════════════════════

export const MASTER_PRODUCTS: ProductOption[] = [
  { value: 'prod-001', code: 'PRD-00001', label: 'Yashika 3+1+1 Sofa Set',        price: 62500, costPrice: 38500, taxPct: 18, unitId: 4, categoryId: 1, categoryName: 'Sofa',         isPhysical: true  },
  { value: 'prod-002', code: 'PRD-00002', label: 'Royal Single Recliner',          price: 35000, costPrice: 21000, taxPct: 18, unitId: 1, categoryId: 2, categoryName: 'Recliner',     isPhysical: true  },
  { value: 'prod-003', code: 'PRD-00003', label: 'Milano L-Shape Sofa',            price: 85000, costPrice: 52000, taxPct: 18, unitId: 4, categoryId: 1, categoryName: 'Sofa',         isPhysical: true  },
  { value: 'prod-004', code: 'PRD-00004', label: 'Heritage 6-Seater Dining Set',   price: 45000, costPrice: 27000, taxPct: 18, unitId: 4, categoryId: 3, categoryName: 'Dining',       isPhysical: true  },
  { value: 'prod-005', code: 'PRD-00005', label: 'Luxe King Bed with Storage',     price: 58000, costPrice: 34000, taxPct: 18, unitId: 1, categoryId: 4, categoryName: 'Bed',          isPhysical: true  },
  { value: 'prod-006', code: 'PRD-00006', label: 'Executive High-Back Chair',      price: 18500, costPrice: 11000, taxPct: 18, unitId: 1, categoryId: 5, categoryName: 'Office Chair', isPhysical: true  },
  { value: 'prod-007', code: 'PRD-00007', label: 'Comfort 2-Seater Loveseat',      price: 28000, costPrice: 17000, taxPct: 18, unitId: 1, categoryId: 1, categoryName: 'Sofa',         isPhysical: true  },
  { value: 'prod-008', code: 'PRD-00008', label: 'Sofa Assembly & Delivery',       price: 2500,  costPrice: 0,     taxPct: 18, unitId: 1, categoryId: 1, categoryName: 'Sofa',         isPhysical: false },
  { value: 'prod-009', code: 'PRD-00009', label: 'Throne Motorised Recliner',      price: 72000, costPrice: 45000, taxPct: 18, unitId: 1, categoryId: 2, categoryName: 'Recliner',     isPhysical: true  },
  { value: 'prod-010', code: 'PRD-00010', label: 'Classic 3-Seater Chesterfield',  price: 95000, costPrice: 58000, taxPct: 18, unitId: 1, categoryId: 1, categoryName: 'Sofa',         isPhysical: true  },
  { value: 'prod-011', code: 'PRD-00011', label: 'Minimal 4-Seater Dining Set',    price: 32000, costPrice: 19500, taxPct: 18, unitId: 4, categoryId: 3, categoryName: 'Dining',       isPhysical: true  },
  { value: 'prod-012', code: 'PRD-00012', label: 'Ergonomic Mesh Office Chair',    price: 14500, costPrice: 8500,  taxPct: 18, unitId: 1, categoryId: 5, categoryName: 'Office Chair', isPhysical: true  },
];

export const MASTER_PRODUCT_MAP: Record<string, ProductOption> = Object.fromEntries(
  MASTER_PRODUCTS.map(p => [p.value, p])
);

export const MASTER_PRODUCT_CODE_MAP: Record<string, ProductOption> = Object.fromEntries(
  MASTER_PRODUCTS.map(p => [p.code, p])
);

// Legacy alias for backward compat
export const MASTER_DEMO_PRODUCTS = MASTER_PRODUCTS;

// ═══════════════════════════════════════════════════════════════════
//  LOOKUP MAPS
// ═══════════════════════════════════════════════════════════════════

export const MASTER_BRANCH_MAP: Record<string, string> = {
  'B1': 'Head Office & Factory – Coimbatore',
  'B2': 'Showroom – Chennai',
  'B3': 'Showroom – Bangalore',
  'B4': 'Warehouse – Salem',
};

export const MASTER_DEPARTMENT_MAP: Record<string, string> = {
  'PROD': 'Production',
  'DESIGN': 'Design & Prototyping',
  'UPHOL': 'Upholstery',
  'CARP': 'Carpentry',
  'QC': 'Quality Control',
  'SALES': 'Sales & Marketing',
  'WH': 'Warehouse & Stores',
  'FIN': 'Finance & Accounts',
  'HR': 'HR & Admin',
};

export const MASTER_DESIGNATION_MAP: Record<string, string> = {
  'GM': 'General Manager',
  'PM': 'Production Manager',
  'SU': 'Senior Upholsterer',
  'CARP': 'Carpenter',
  'QC_HEAD': 'QC Head',
  'SALES_EX': 'Sales Executive',
  'WH_SUPV': 'Warehouse Supervisor',
  'ACCT': 'Accountant',
  'HR_EX': 'HR Executive',
  'HELPER': 'Helper / Trainee',
};

export const MASTER_EXPENSE_CATEGORY_MAP: Record<string, string> = {
  'EC1': 'Raw Material Transport',
  'EC2': 'Courier & Shipping',
  'EC3': 'Vehicle & Delivery',
  'EC4': 'Factory Consumables',
  'EC5': 'Office Supplies',
};

export const MASTER_COST_CENTER_MAP: Record<string, string> = {
  'CC1': 'Factory Operations',
  'CC2': 'Showroom Operations',
  'CC3': 'Warehouse & Logistics',
};

export const MASTER_PROJECT_MAP: Record<string, string> = {
  'P1': 'New Recliner Line Launch',
  'P2': 'Bangalore Showroom Setup',
  'P3': 'Custom Order – Hotel Chain',
};

export const MASTER_LEDGER_ACCOUNT_MAP: Record<string, { code: string; name: string }> = {
  'acc-001': { code: 'CASH', name: 'Cash Account' },
  'acc-003': { code: 'RENT', name: 'Rent Expense Account' },
  'acc-004': { code: 'OFFSUP', name: 'Office Supplies Expense' },
  'acc-005': { code: 'BANK', name: 'Bank Account' },
  'acc-006': { code: 'SAL', name: 'Salary Expense Account' },
  'acc-007': { code: 'AR', name: 'Accounts Receivable' },
  'acc-008': { code: 'PC', name: 'Petty Cash Account' },
  'acc-009': { code: 'SALES', name: 'Sales Revenue Account' },
  'acc-013': { code: 'AP', name: 'Accounts Payable' },
  'acc-017': { code: 'PURCH', name: 'Purchases Account' },
  'acc-018': { code: 'GSTIN', name: 'GST Input Credit' },
  'acc-019': { code: 'GSTOUT', name: 'GST Output Liability' },
};

export const MASTER_CURRENCY_MAP: Record<string, string> = {
  'INR': 'Indian Rupee',
  'USD': 'US Dollar',
  'AED': 'UAE Dirham',
};
