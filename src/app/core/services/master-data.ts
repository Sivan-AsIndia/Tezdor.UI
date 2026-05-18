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

@Injectable({ providedIn: 'root' })
export class MasterDataClient {

  // ═══════════════════════════════════════════════════════
  //  ORGANIZATION
  // ═══════════════════════════════════════════════════════

  readonly departments = signal<Option[]>([
    { id: 'IT', name: 'IT' },
    { id: 'HR', name: 'HR' },
    { id: 'FIN', name: 'Finance' }
  ]);

  readonly designations = signal<Option[]>([
    { id: 'DEV', name: 'Developer' },
    { id: 'TL', name: 'Team Lead' },
    { id: 'MGR', name: 'Manager' }
  ]);

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

  readonly cities = signal<Option[]>([
    { id: 'CHN', name: 'Chennai' },
    { id: 'MDU', name: 'Madurai' },
    { id: 'BLR', name: 'Bangalore' }
  ]);

  readonly states = signal<Option[]>([
    { id: 'TN', name: 'Tamil Nadu' },
    { id: 'KA', name: 'Karnataka' },
    { id: 'KL', name: 'Kerala' }
  ]);

  readonly countries = signal<Option[]>([
    { id: 'IN', name: 'India' },
    { id: 'US', name: 'USA' },
    { id: 'AE', name: 'UAE' }
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
    { id: 'GST18', name: 'GST 18%' }
  ]);

  currencies = signal([
    { currencyId: 'INR', currencyCode: 'INR' },
    { currencyId: 'USD', currencyCode: 'USD' },
    { currencyId: 'EUR', currencyCode: 'EUR' }
  ]);

  fiscalYears = signal([
    { id: 'FY25', name: '2025-2026', start: '2025-04-01', end: '2026-03-31' },
    { id: 'FY26', name: '2026-2027', start: '2026-04-01', end: '2027-03-31' }
  ]);

  accountingPeriods = signal([
    { id: 'JAN26', name: 'January 2026', start: '2026-01-01', end: '2026-01-31' },
    { id: 'FEB26', name: 'February 2026', start: '2026-02-01', end: '2026-02-28' },
    { id: 'MAR26', name: 'March 2026', start: '2026-03-01', end: '2026-03-31' },
    { id: 'APR26', name: 'April 2026', start: '2026-04-01', end: '2026-04-30' },
    { id: 'MAY26', name: 'May 2026', start: '2026-05-01', end: '2026-05-31' }
  ]);

  // ═══════════════════════════════════════════════════════
  //  VENDORS (used across Purchase Order, Purchase Invoice, Store)
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
      label: `${v.name} (${v.code})`
    }));
  }

  // ═══════════════════════════════════════════════════════
  //  CUSTOMERS (used across Sales Invoice)
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
  { value: 'C001', label: 'Arjun Traders Pvt Ltd', gstin: '33ABCDE1234F1Z5', pan: 'ABCDE1234F', address: 'T Nagar, Chennai', mobile: '9876543210', email: 'arjun@traders.com' },
  { value: 'C002', label: 'Lakshmi Constructions', gstin: '33FGHIJ5678K1Z2', pan: 'FGHIJ5678K', address: 'Anna Nagar, Chennai', mobile: '9876543211', email: 'lakshmi@constructions.com' },
  { value: 'C003', label: 'Sri Balaji Enterprises', gstin: '33LMNOP9012Q1Z7', pan: 'LMNOP9012Q', address: 'Velachery, Chennai', mobile: '9876543212', email: 'balaji@enterprises.com' },
  { value: 'C004', label: 'Deepa Interiors', gstin: '33QRSTU3456V1Z9', pan: 'QRSTU3456V', address: 'Porur, Chennai', mobile: '9876543213', email: 'deepa@interiors.com' },
  { value: 'C005', label: 'Murugan Agencies', gstin: '33WXYZ04567A1Z3', pan: 'WXYZ04567A', address: 'Tambaram, Chennai', mobile: '9876543214', email: 'murugan@agencies.com' },
  { value: 'C006', label: 'Kavitha Electronics', gstin: '33BCDEF6789G1Z1', pan: 'BCDEF6789G', address: 'Chromepet, Chennai', mobile: '9876543215', email: 'kavitha@electronics.com' },
];

export const MASTER_CUSTOMER_MAP: Record<string, CustomerOption> = Object.fromEntries(
  MASTER_CUSTOMERS.map(c => [c.value, c])
);

export const MASTER_UNITS: UnitOption[] = [
  { value: 1, label: 'Pcs' },
  { value: 2, label: 'Kg' },
  { value: 3, label: 'Litre' },
  { value: 4, label: 'Box' },
  { value: 5, label: 'Dozen' },
  { value: 6, label: 'Mtr' },
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

// ═══════════════════════════════════════════════════════════════════
//  MASTER PRODUCTS – Single source of truth for all product dropdowns
//  Derived from product.seed.ts product data. Used in PO, PI, SI, Store.
// ═══════════════════════════════════════════════════════════════════

export const MASTER_PRODUCTS: ProductOption[] = [
  { value: 'prod-001', code: 'ELEC001', label: 'Laptop Pro 15',          price: 55000, costPrice: 48000, taxPct: 18, unitId: 1, categoryId: 1, categoryName: 'Electronics',       isPhysical: true  },
  { value: 'prod-002', code: 'ELEC002', label: 'Wireless Mouse MX3',     price: 1599,  costPrice: 1200,  taxPct: 18, unitId: 1, categoryId: 1, categoryName: 'Electronics',       isPhysical: true  },
  { value: 'prod-003', code: 'CLOTH001', label: 'Cotton T-Shirt - Blue', price: 499,   costPrice: 250,   taxPct: 12, unitId: 1, categoryId: 2, categoryName: 'Clothing',          isPhysical: true  },
  { value: 'prod-004', code: 'FOOD001', label: 'Organic Honey 500g',     price: 399,   costPrice: 280,   taxPct: 5,  unitId: 2, categoryId: 3, categoryName: 'Food & Beverages',  isPhysical: true  },
  { value: 'prod-005', code: 'HARD001', label: 'Steel Hammer 500g',      price: 299,   costPrice: 180,   taxPct: 18, unitId: 1, categoryId: 4, categoryName: 'Hardware',           isPhysical: true  },
  { value: 'prod-006', code: 'STAT001', label: 'A4 Paper Ream',          price: 299,   costPrice: 220,   taxPct: 12, unitId: 4, categoryId: 5, categoryName: 'Stationery',         isPhysical: true  },
  { value: 'prod-007', code: 'ELEC003', label: 'USB Cable Type-C',       price: 149,   costPrice: 80,    taxPct: 18, unitId: 1, categoryId: 1, categoryName: 'Electronics',       isPhysical: true  },
  { value: 'prod-008', code: 'SERV001', label: 'Installation Service',   price: 599,   costPrice: 0,     taxPct: 18, unitId: 1, categoryId: 1, categoryName: 'Electronics',       isPhysical: false },
  { value: 'prod-009', code: 'CLOTH002', label: 'Denim Jeans - Black',   price: 1299,  costPrice: 800,   taxPct: 12, unitId: 1, categoryId: 2, categoryName: 'Clothing',          isPhysical: true  },
  { value: 'prod-010', code: 'HARD002', label: 'Screwdriver Set 6pc',    price: 449,   costPrice: 280,   taxPct: 18, unitId: 4, categoryId: 4, categoryName: 'Hardware',           isPhysical: true  },
  { value: 'prod-011', code: 'FOOD002', label: 'Green Tea Bags 25pc',    price: 199,   costPrice: 110,   taxPct: 5,  unitId: 4, categoryId: 3, categoryName: 'Food & Beverages',  isPhysical: true  },
  { value: 'prod-012', code: 'STAT002', label: 'Gel Pen - Blue',         price: 15,    costPrice: 8,     taxPct: 12, unitId: 5, categoryId: 5, categoryName: 'Stationery',         isPhysical: true  },
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
//  LOOKUP MAPS – for resolving IDs → Names across all pages
// ═══════════════════════════════════════════════════════════════════

export const MASTER_BRANCH_MAP: Record<string, string> = {
  'B1': 'Head Office',
  'B2': 'Chennai Branch',
  'B3': 'Coimbatore Branch',
  'B4': 'Madurai Branch',
};

export const MASTER_DEPARTMENT_MAP: Record<string, string> = {
  'IT': 'IT',
  'HR': 'HR',
  'FIN': 'Finance',
};

export const MASTER_DESIGNATION_MAP: Record<string, string> = {
  'DEV': 'Developer',
  'TL': 'Team Lead',
  'MGR': 'Manager',
};

export const MASTER_EXPENSE_CATEGORY_MAP: Record<string, string> = {
  'EC1': 'Stationery',
  'EC2': 'Courier',
  'EC3': 'Transport',
  'EC4': 'Refreshments',
  'EC5': 'Parking',
};

export const MASTER_COST_CENTER_MAP: Record<string, string> = {
  'CC1': 'Admin Cost Center',
  'CC2': 'Project Cost Center',
  'CC3': 'Branch Operations',
};

export const MASTER_PROJECT_MAP: Record<string, string> = {
  'P1': 'Construction Project',
  'P2': 'IT Implementation',
  'P3': 'Retail Expansion',
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
