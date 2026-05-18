import { StoreMaintain } from "./store";

// Store transactions reflect actual PO receives, SI dispatches, adjustments, returns, transfers
//
// ═══════════════════════════ CLOSING STOCK SUMMARY ═══════════════════════════
// ELEC001 (Laptop Pro 15):       10 IN – 5 OUT – 3 OUT + 1 RETURN           =  3
// STAT001 (A4 Paper Ream):       60 IN                                       = 60
// HARD002 (Screwdriver Set 6pc): 30 IN – 15 OUT                              = 15
// ELEC002 (Wireless Mouse MX3):  80 IN – 20 OUT – 2 ADJ                     = 58
// STAT002 (Gel Pen - Blue):      20 IN – 5 TRANSFER                          = 15  (WH02 gets 5)
// FOOD002 (Green Tea Bags 25pc): 30 IN – 10 OUT                              = 20
// ELEC003 (USB Cable Type-C):   100 IN – 50 OUT                              = 50
// HARD001 (Steel Hammer 500g):   25 IN – 3 ADJ(expired)                      = 22
// ═════════════════════════════════════════════════════════════════════════════

export const STORE_MAINTAIN: StoreMaintain[] = [

  // ─── PO Receives (IN) ─────────────────────────────────────────────
  { id: 1,  date: '2026-01-05', vendorCode: 'VEN001', vendorName: 'Krishna Timber',  productCode: 'ELEC001', productName: 'Laptop Pro 15',       type: 'IN', quantity: 10,  referenceType: 'Purchase Order', referenceId: 'PO-2026-001' },
  { id: 2,  date: '2026-01-12', vendorCode: 'VEN003', vendorName: 'PipeMart Co',     productCode: 'STAT001', productName: 'A4 Paper Ream',       type: 'IN', quantity: 60,  referenceType: 'Purchase Order', referenceId: 'PO-2026-003' },
  { id: 3,  date: '2026-01-18', vendorCode: 'VEN004', vendorName: 'Apex Hardware',   productCode: 'HARD002', productName: 'Screwdriver Set 6pc', type: 'IN', quantity: 30,  referenceType: 'Purchase Order', referenceId: 'PO-2026-004' },
  { id: 4,  date: '2026-01-22', vendorCode: 'VEN005', vendorName: 'Global Supplies', productCode: 'ELEC002', productName: 'Wireless Mouse MX3',  type: 'IN', quantity: 80,  referenceType: 'Purchase Order', referenceId: 'PO-2026-005' },
  { id: 5,  date: '2026-02-01', vendorCode: 'VEN001', vendorName: 'Krishna Timber',  productCode: 'STAT002', productName: 'Gel Pen - Blue',      type: 'IN', quantity: 20,  referenceType: 'Purchase Order', referenceId: 'PO-2026-007' },
  { id: 6,  date: '2026-02-04', vendorCode: 'VEN003', vendorName: 'PipeMart Co',     productCode: 'FOOD002', productName: 'Green Tea Bags 25pc', type: 'IN', quantity: 30,  referenceType: 'Purchase Order', referenceId: 'PO-2026-008' },
  { id: 7,  date: '2026-02-12', vendorCode: 'VEN004', vendorName: 'Apex Hardware',   productCode: 'ELEC003', productName: 'USB Cable Type-C',    type: 'IN', quantity: 100, referenceType: 'Purchase Order', referenceId: 'PO-2026-010' },
  { id: 8,  date: '2026-02-18', vendorCode: 'VEN004', vendorName: 'Apex Hardware',   productCode: 'HARD001', productName: 'Steel Hammer 500g',   type: 'IN', quantity: 25,  referenceType: 'Purchase Order', referenceId: 'PO-2026-011' },

  // ─── Sales Invoice Dispatches (OUT) ───────────────────────────────
  { id: 9,  date: '2026-01-10', vendorCode: '',       vendorName: 'Arjun Traders Pvt Ltd',  productCode: 'ELEC001', productName: 'Laptop Pro 15',       type: 'OUT', quantity: 5,  referenceType: 'Invoice', referenceId: 'INV-2026-001' },
  { id: 10, date: '2026-01-15', vendorCode: '',       vendorName: 'Lakshmi Constructions',  productCode: 'HARD002', productName: 'Screwdriver Set 6pc', type: 'OUT', quantity: 15, referenceType: 'Invoice', referenceId: 'INV-2026-002' },
  { id: 11, date: '2026-02-15', vendorCode: '',       vendorName: 'Arjun Traders Pvt Ltd',  productCode: 'ELEC003', productName: 'USB Cable Type-C',    type: 'OUT', quantity: 50, referenceType: 'Invoice', referenceId: 'INV-2026-004' },
  { id: 12, date: '2026-03-01', vendorCode: '',       vendorName: 'Deepa Interiors',        productCode: 'ELEC001', productName: 'Laptop Pro 15',       type: 'OUT', quantity: 3,  referenceType: 'Invoice', referenceId: 'INV-2026-005' },
  { id: 13, date: '2026-03-05', vendorCode: '',       vendorName: 'Sri Balaji Enterprises', productCode: 'ELEC002', productName: 'Wireless Mouse MX3',  type: 'OUT', quantity: 20, referenceType: 'Invoice', referenceId: 'INV-2026-003' },
  { id: 14, date: '2026-03-10', vendorCode: '',       vendorName: 'Kavitha Electronics',    productCode: 'FOOD002', productName: 'Green Tea Bags 25pc', type: 'OUT', quantity: 10, referenceType: 'Invoice', referenceId: 'INV-2026-008' },

  // ─── Customer Return (RETURN) ─────────────────────────────────────
  { id: 15, date: '2026-03-12', vendorCode: '',       vendorName: 'Deepa Interiors',        productCode: 'ELEC001', productName: 'Laptop Pro 15',       type: 'RETURN', quantity: 1, referenceType: 'Invoice', referenceId: 'INV-2026-005', notes: 'Customer returned 1 defective unit' },

  // ─── Manual Adjustment (ADJUSTMENT) ───────────────────────────────
  { id: 16, date: '2026-02-20', vendorCode: '',       vendorName: '',                        productCode: 'ELEC002', productName: 'Wireless Mouse MX3',  type: 'ADJUSTMENT', quantity: 2, notes: 'Damaged goods written off – physical count short' },
  { id: 17, date: '2026-03-15', vendorCode: '',       vendorName: '',                        productCode: 'HARD001', productName: 'Steel Hammer 500g',   type: 'ADJUSTMENT', quantity: 3, notes: 'Expired stock removed from shelf' },

  // ─── Warehouse Transfer (TRANSFER) ────────────────────────────────
  { id: 18, date: '2026-03-18', vendorCode: '',       vendorName: '',                        productCode: 'STAT002', productName: 'Gel Pen - Blue',      type: 'TRANSFER', quantity: 5, notes: 'Transferred from Main Warehouse to Secondary Store' },
];
