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
  price: number;
  taxPct: number;
  unitId: number;
}

@Injectable({ providedIn: 'root' })
export class MasterDataClient {

  // ═══════════════════════════════════════════════════════
  //  ORGANIZATION
  // ═══════════════════════════════════════════════════════

  // 🔹 Departments
  readonly departments = signal<Option[]>([
    { id: 'IT', name: 'IT' },
    { id: 'HR', name: 'HR' },
    { id: 'FIN', name: 'Finance' }
  ]);

  // 🔹 Designations
  readonly designations = signal<Option[]>([
    { id: 'DEV', name: 'Developer' },
    { id: 'TL', name: 'Team Lead' },
    { id: 'MGR', name: 'Manager' }
  ]);

  // 🔹 Roles
  readonly roles = signal<Option[]>([
    { id: 'ADMIN', name: 'Administrator' },
    { id: 'SUPER_ADMIN', name: 'Super Admin' },
    { id: 'HR_EXEC', name: 'HR Executive' },
    { id: 'HR_MANAGER', name: 'HR Manager' },
    { id: 'FIN_MANAGER', name: 'Finance Manager' },
    { id: 'ACCOUNTANT', name: 'Accountant' },
    { id: 'TEAM_LEAD', name: 'Team Lead' },
    { id: 'PROJECT_MANAGER', name: 'Project Manager' },
    { id: 'DEV', name: 'Developer' },
    { id: 'QA', name: 'QA Engineer' },
    { id: 'SUPPORT', name: 'Support Engineer' },
    { id: 'SALES', name: 'Sales Executive' },
    { id: 'OPS', name: 'Operations Executive' },
    { id: 'EMP', name: 'Employee' }
  ]);

  branches = signal([
    { branchId: 'B1', branchName: 'Head Office' },
    { branchId: 'B2', branchName: 'Chennai Branch' },
    { branchId: 'B3', branchName: 'Coimbatore Branch' },
    { branchId: 'B4', branchName: 'Madurai Branch' }
  ]);

  costCenters = signal([
    { costCenterId: 'CC1', costCenterName: 'Admin Cost Center' },
    { costCenterId: 'CC2', costCenterName: 'Project Cost Center' },
    { costCenterId: 'CC3', costCenterName: 'Branch Operations' }
  ]);

  projects = signal([
    { projectId: 'P1', projectName: 'Construction Project' },
    { projectId: 'P2', projectName: 'IT Implementation' },
    { projectId: 'P3', projectName: 'Retail Expansion' }
  ]);

  // ═══════════════════════════════════════════════════════
  //  GEOGRAPHY
  // ═══════════════════════════════════════════════════════

  // 🔹 Cities
  readonly cities = signal<Option[]>([
    { id: 'CHN', name: 'Chennai' },
    { id: 'MDU', name: 'Madurai' },
    { id: 'BLR', name: 'Bangalore' }
  ]);

  // 🔹 States
  readonly states = signal<Option[]>([
    { id: 'TN', name: 'Tamil Nadu' },
    { id: 'KA', name: 'Karnataka' },
    { id: 'KL', name: 'Kerala' }
  ]);

  // 🔹 Countries
  readonly countries = signal<Option[]>([
    { id: 'IN', name: 'India' },
    { id: 'US', name: 'USA' },
    { id: 'AE', name: 'UAE' }
  ]);

  // 🔹 Place of Supply (for GST)
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
    { id: 'PHD', name: 'Ph.D' }
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
    { id: 'RBL', name: 'RBL Bank' }
  ]);

  // ═══════════════════════════════════════════════════════
  //  FINANCE / ACCOUNTING
  // ═══════════════════════════════════════════════════════

  expenseCategories = signal([
    { id: 'EC1', name: 'Stationery' },
    { id: 'EC2', name: 'Courier' },
    { id: 'EC3', name: 'Transport' },
    { id: 'EC4', name: 'Refreshments' },
    { id: 'EC5', name: 'Parking' }
  ]);

  expenseLedgerAccount = signal([
    { accountId: 'acc-003', accountCode: 'RENT', accountName: 'Rent Expense Account' },
    { accountId: 'acc-001', accountCode: 'CASH', accountName: 'Cash Account' },
    { accountId: 'acc-004', accountCode: 'OFFSUP', accountName: 'Office Supplies Expense' },
    { accountId: 'acc-005', accountCode: 'BANK', accountName: 'Bank Account' },
    { accountId: 'acc-006', accountCode: 'SAL', accountName: 'Salary Expense Account' },
    { accountId: 'acc-007', accountCode: 'AR', accountName: 'Accounts Receivable' },
    { accountId: 'acc-008', accountCode: 'PC', accountName: 'Petty Cash Account' }
  ]);

  taxCodes = signal([
    { id: 'GST5', name: 'GST 5%' },
    { id: 'GST12', name: 'GST 12%' },
    { id: 'GST18', name: 'GST 18%' }
  ]);

  currencies = signal([
    { currencyId: 'INR', currencyCode: 'INR' },
    { currencyId: 'USD', currencyCode: 'USD' },
    { currencyId: 'EUR', currencyCode: 'EUR' }
  ]);

  fiscalYears = signal([
    { id: 'FY25', name: '2026-2027', start: '2026-04-01', end: '2027-03-31' }
  ]);

  accountingPeriods = signal([
    { id: 'APR26', name: 'April 2026', start: '2026-04-01', end: '2026-04-30' },
    { id: 'MAY26', name: 'May 2026', start: '2026-05-01', end: '2026-05-31' }
  ]);

  // ═══════════════════════════════════════════════════════
  //  VENDORS (used across Purchase Order, Purchase Invoice, Store)
  // ═══════════════════════════════════════════════════════

  readonly vendors = signal<VendorOption[]>([
    { id: '1', code: 'VEN001', name: 'Krishna Timber' },
    { id: '2', code: 'VEN002', name: 'Metro Steel' },
    { id: '3', code: 'VEN003', name: 'PipeMart Co' },
    { id: '4', code: 'VEN004', name: 'Apex Hardware' },
    { id: '5', code: 'VEN005', name: 'Global Supplies' },
    { id: '6', code: 'VEN006', name: 'BuildMart' },
  ]);

  // 🔹 Helper: vendor lookup map  { '1': { code: 'VEN001', name: '...' }, ... }
  getVendorMap(): Record<string, { code: string; name: string }> {
    const map: Record<string, { code: string; name: string }> = {};
    for (const v of this.vendors()) {
      map[v.id] = { code: v.code, name: v.name };
    }
    return map;
  }

  // 🔹 Helper: vendor dropdown options  { code: '1', name: 'Krishna Timber' }
  getVendorDropdown(): { code: string; name: string }[] {
    return this.vendors().map(v => ({ code: v.id, name: v.name }));
  }

  // 🔹 Helper: supplier select options (for purchase invoice)
  getSupplierSelectOptions(): SelectOption[] {
    return this.vendors().map(v => ({
      value: v.id,
      label: `${v.name} (${v.code})`
    }));
  }

  // ═══════════════════════════════════════════════════════
  //  CUSTOMERS (used across Sales Invoice)
  // ═══════════════════════════════════════════════════════

  readonly customers = signal<CustomerOption[]>([
    {
      value: 'C001',
      label: 'Arjun Traders Pvt Ltd',
      gstin: '33ABCDE1234F1Z5',
      address: 'T Nagar, Chennai',
      mobile: '9876543210',
      email: 'arjun@traders.com',
    },
    {
      value: 'C002',
      label: 'Lakshmi Constructions',
      gstin: '33FGHIJ5678K1Z2',
      address: 'Anna Nagar, Chennai',
      mobile: '9876543211',
      email: 'lakshmi@constructions.com',
    },
    {
      value: 'C003',
      label: 'Sri Balaji Enterprises',
      gstin: '33LMNOP9012Q1Z7',
      address: 'Velachery, Chennai',
      mobile: '9876543212',
      email: 'balaji@enterprises.com',
    },
  ]);

  // ═══════════════════════════════════════════════════════
  //  PRODUCTS & INVENTORY
  // ═══════════════════════════════════════════════════════

  // 🔹 Unit of Measurement (used across PO, PI, Sales Invoice, Product)
  readonly units = signal<UnitOption[]>([
    { value: 1, label: 'Pcs' },
    { value: 2, label: 'Kg' },
    { value: 3, label: 'Litre' },
    { value: 4, label: 'Box' },
    { value: 5, label: 'Dozen' },
    { value: 6, label: 'Mtr' },
  ]);

  readonly unitOptions = signal([

  {
    unitId: 'nos',
    unitName: 'Nos'
  },

  {
    unitId: 'kg',
    unitName: 'Kg'
  },

  {
    unitId: 'g',
    unitName: 'Gram'
  },

  {
    unitId: 'ltr',
    unitName: 'Litre'
  },

  {
    unitId: 'ml',
    unitName: 'mL'
  },

  {
    unitId: 'mtr',
    unitName: 'Meter'
  },

  {
    unitId: 'cm',
    unitName: 'Centimeter'
  },

  {
    unitId: 'box',
    unitName: 'Box'
  },

  {
    unitId: 'doz',
    unitName: 'Dozen'
  },

  {
    unitId: 'set',
    unitName: 'Set'
  },

  {
    unitId: 'hr',
    unitName: 'Hour'
  },

  {
    unitId: 'min',
    unitName: 'Minute'
  },

  {
    unitId: 'sheet',
    unitName: 'Sheet'
  },

  {
    unitId: 'pack',
    unitName: 'Pack'
  },

  {
    unitId: 'pair',
    unitName: 'Pair'
  }

]);

getUnitById(
  unitId: string | null | undefined
) {

  if (!unitId) {
    return null;
  }

  return this.unitOptions()

    .find(x =>

      x.unitId === unitId

    ) || null;

}

  // 🔹 Product Categories
  readonly categories = signal<SelectOption[]>([
    { value: '1', label: 'Electronics' },
    { value: '2', label: 'Clothing' },
    { value: '3', label: 'Food & Beverages' },
    { value: '4', label: 'Hardware' },
    { value: '5', label: 'Stationery' },
  ]);

  // 🔹 Product Brands
  readonly brands = signal<SelectOption[]>([
    { value: '1', label: 'Dell' },
    { value: '2', label: 'HP' },
    { value: '3', label: 'Apple' },
  ]);

  // 🔹 Product Types
  readonly productTypes = signal<SelectOption[]>([
    { value: '1', label: 'Goods' },
    { value: '2', label: 'Service (labour, delivery)' },
  ]);

  // 🔹 Warehouses
  readonly warehouses = signal<SelectOption[]>([
    { value: '1', label: 'Main Warehouse' },
    { value: '2', label: 'Secondary Warehouse' },
    { value: '3', label: 'Retail Warehouse' },
  ]);

  // 🔹 Demo Products for Sales Invoice line items
  readonly demoProducts = signal<ProductOption[]>([
    { value: 'P001', label: 'Plywood 18mm BWP Grade', price: 1850, taxPct: 18, unitId: 4 },
    { value: 'P002', label: 'Teak Wood Prime Grade', price: 12500, taxPct: 18, unitId: 3 },
    { value: 'P003', label: 'MDF Board 12mm', price: 950, taxPct: 12, unitId: 4 },
    { value: 'P004', label: 'Veneer Sheet 4x8', price: 2200, taxPct: 18, unitId: 4 },
    { value: 'P005', label: 'Particle Board 16mm', price: 680, taxPct: 12, unitId: 4 },
    { value: 'P006', label: 'Laminate Sheet (Merino)', price: 1400, taxPct: 18, unitId: 4 },
    { value: 'P007', label: 'Edge Band Tape 22mm', price: 350, taxPct: 18, unitId: 6 },
    { value: 'P008', label: 'Hinge Soft Close', price: 180, taxPct: 18, unitId: 1 },
    { value: 'P009', label: 'Drawer Channel 18in', price: 420, taxPct: 18, unitId: 5 },
    { value: 'P010', label: 'Wood Adhesive 5L', price: 750, taxPct: 18, unitId: 1 },
  ]);

  // ═══════════════════════════════════════════════════════
  //  TAX & PRICING
  // ═══════════════════════════════════════════════════════

  // 🔹 Tax Options (used across PO, PI, Sales Invoice, Product)
  readonly taxOptions = signal<SelectOption[]>([
    { value: '0', label: 'None (0%)' },
    { value: '5', label: 'GST 5%' },
    { value: '12', label: 'GST 12%' },
    { value: '18', label: 'GST 18%' },
    { value: '28', label: 'GST 28%' },
  ]);

  // 🔹 Tax Map: taxId → percentage
  readonly taxMap: Record<number, number> = { 1: 18, 2: 12, 3: 5, 4: 0 };

  // 🔹 Currency Options (for PO / PI dropdowns)
  readonly currencyOptions = signal<SelectOption[]>([
    { value: 'INR', label: 'Indian Rupee' },
    { value: 'USD', label: 'US Dollar' },
    { value: 'AED', label: 'UAE Dirham' },
  ]);

  // ═══════════════════════════════════════════════════════
  //  PAYMENT & DELIVERY TERMS
  // ═══════════════════════════════════════════════════════

  // 🔹 Payment Terms (used across PO, PI, Sales Invoice)
  readonly paymentTermsOptions = signal<SelectOption[]>([
    { value: 'immediate', label: 'Immediate' },
    { value: 'advance', label: 'Advance' },
    { value: 'cod', label: 'Cash on Delivery' },
    { value: 'net15', label: 'Net 15 Days' },
    { value: 'net30', label: 'Net 30 Days' },
    { value: 'net45', label: 'Net 45 Days' },
    { value: 'net60', label: 'Net 60 Days' },
  ]);

  // 🔹 Delivery Methods (used across PO)
  readonly deliveryOptions = signal<SelectOption[]>([
    { value: 'pickup', label: 'Self Pickup' },
    { value: 'delivery', label: 'Vendor Delivery' },
    { value: 'courier', label: 'Courier / Transport' },
  ]);

  // ═══════════════════════════════════════════════════════
  //  DISCOUNT & TEMPLATE
  // ═══════════════════════════════════════════════════════

  readonly discountOptions = signal<SelectOption[]>([
    { value: 'none', label: 'No Discount' },
    { value: 'percentage', label: 'Percentage %' },
    { value: 'fixed', label: 'Fixed Price' },
  ]);

  readonly templateOptions = signal<SelectOption[]>([
    { value: '', label: 'Default template' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'detailed', label: 'Detailed' },
  ]);
}

// ═══════════════════════════════════════════════════════════════════
//  STANDALONE EXPORTS  (for non-injectable contexts: model files,
//  print templates, etc. — same data, importable without DI)
// ═══════════════════════════════════════════════════════════════════

export const MASTER_VENDORS: VendorOption[] = [
  { id: '1', code: 'VEN001', name: 'Krishna Timber' },
  { id: '2', code: 'VEN002', name: 'Metro Steel' },
  { id: '3', code: 'VEN003', name: 'PipeMart Co' },
  { id: '4', code: 'VEN004', name: 'Apex Hardware' },
  { id: '5', code: 'VEN005', name: 'Global Supplies' },
  { id: '6', code: 'VEN006', name: 'BuildMart' },
];

export const MASTER_VENDOR_MAP: Record<string, { code: string; name: string }> = Object.fromEntries(
  MASTER_VENDORS.map(v => [v.id, { code: v.code, name: v.name }])
);

export const MASTER_CUSTOMERS: CustomerOption[] = [
  { value: 'C001', label: 'Arjun Traders Pvt Ltd', gstin: '33ABCDE1234F1Z5', address: 'T Nagar, Chennai', mobile: '9876543210', email: 'arjun@traders.com' },
  { value: 'C002', label: 'Lakshmi Constructions', gstin: '33FGHIJ5678K1Z2', address: 'Anna Nagar, Chennai', mobile: '9876543211', email: 'lakshmi@constructions.com' },
  { value: 'C003', label: 'Sri Balaji Enterprises', gstin: '33LMNOP9012Q1Z7', address: 'Velachery, Chennai', mobile: '9876543212', email: 'balaji@enterprises.com' },
];

export const MASTER_UNITS: UnitOption[] = [
  { value: 1, label: 'Pcs' },
  { value: 2, label: 'Kg' },
  { value: 3, label: 'Litre' },
  { value: 4, label: 'Box' },
  { value: 5, label: 'Dozen' },
  { value: 6, label: 'Mtr' },
];

export const MASTER_TAX_OPTIONS: SelectOption[] = [
  { value: '0', label: 'None (0%)' },
  { value: '5', label: 'GST 5%' },
  { value: '12', label: 'GST 12%' },
  { value: '18', label: 'GST 18%' },
  { value: '28', label: 'GST 28%' },
];

export const MASTER_TAX_MAP: Record<number, number> = { 1: 18, 2: 12, 3: 5, 4: 0 };

export const MASTER_CATEGORIES: SelectOption[] = [
  { value: '1', label: 'Electronics' },
  { value: '2', label: 'Clothing' },
  { value: '3', label: 'Food & Beverages' },
  { value: '4', label: 'Hardware' },
  { value: '5', label: 'Stationery' },
];

export const MASTER_BRANDS: SelectOption[] = [
  { value: '1', label: 'Dell' },
  { value: '2', label: 'HP' },
  { value: '3', label: 'Apple' },
];

export const MASTER_PRODUCT_TYPES: SelectOption[] = [
  { value: '1', label: 'Goods' },
  { value: '2', label: 'Service (labour, delivery)' },
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
  { value: '1', label: 'Main Warehouse' },
  { value: '2', label: 'Secondary Warehouse' },
  { value: '3', label: 'Retail Warehouse' },
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

export const MASTER_DEMO_PRODUCTS: ProductOption[] = [
  { value: 'P001', label: 'Plywood 18mm BWP Grade', price: 1850, taxPct: 18, unitId: 4 },
  { value: 'P002', label: 'Teak Wood Prime Grade', price: 12500, taxPct: 18, unitId: 3 },
  { value: 'P003', label: 'MDF Board 12mm', price: 950, taxPct: 12, unitId: 4 },
  { value: 'P004', label: 'Veneer Sheet 4x8', price: 2200, taxPct: 18, unitId: 4 },
  { value: 'P005', label: 'Particle Board 16mm', price: 680, taxPct: 12, unitId: 4 },
  { value: 'P006', label: 'Laminate Sheet (Merino)', price: 1400, taxPct: 18, unitId: 4 },
  { value: 'P007', label: 'Edge Band Tape 22mm', price: 350, taxPct: 18, unitId: 6 },
  { value: 'P008', label: 'Hinge Soft Close', price: 180, taxPct: 18, unitId: 1 },
  { value: 'P009', label: 'Drawer Channel 18in', price: 420, taxPct: 18, unitId: 5 },
  { value: 'P010', label: 'Wood Adhesive 5L', price: 750, taxPct: 18, unitId: 1 },
];
