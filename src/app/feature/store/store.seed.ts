import { StoreMaintain } from "./store";

// Store transactions reflect actual PO receives, SI dispatches, adjustments, returns, transfers
//
// ═══════════════════════════ CLOSING STOCK SUMMARY ═══════════════════════════
// PRD-00001 (Yashika 3+1+1 Sofa Set):       5 IN – 3 OUT                  =  2
// PRD-00002 (Royal Single Recliner):         6 IN – 2 OUT                  =  4
// PRD-00003 (Milano L-Shape Sofa):           2 IN – 1 OUT                  =  1
// PRD-00004 (Heritage 6-Seater Dining Set):  4 IN – 1 OUT                  =  3
// PRD-00006 (Executive High-Back Chair):    15 IN – 5 OUT                  = 10
// PRD-00007 (Comfort 2-Seater Loveseat):     8 IN – 3 OUT                  =  5
// PRD-00012 (Ergonomic Mesh Office Chair):  20 IN – 8 OUT                  = 12
// PRD-00009 (Throne Motorised Recliner):     3 IN – 1 OUT                  =  2
// PRD-00010 (Classic 3-Seater Chesterfield): 2 IN – 1 OUT                  =  1
// PRD-00005 (Luxe King Bed with Storage):    4 IN – 2 OUT – 1 ADJ          =  1
// ═════════════════════════════════════════════════════════════════════════════

export const STORE_MAINTAIN: StoreMaintain[] = [

  // ─── PO Receives (IN) ─────────────────────────────────────────────
  { id: 1,  date: '2026-01-05', vendorCode: 'VEN001', vendorName: 'Krishna Timber & Plywood',    productCode: 'PRD-00001', productName: 'Yashika 3+1+1 Sofa Set',        type: 'IN', quantity: 5,  referenceType: 'Purchase Order', referenceId: 'PO-2026-001' },
  { id: 2,  date: '2026-01-12', vendorCode: 'VEN003', vendorName: 'Lakshmi Fabrics & Textiles',  productCode: 'PRD-00003', productName: 'Milano L-Shape Sofa',            type: 'IN', quantity: 2,  referenceType: 'Purchase Order', referenceId: 'PO-2026-003' },
  { id: 3,  date: '2026-01-18', vendorCode: 'VEN004', vendorName: 'Apex Hardware & Fasteners',   productCode: 'PRD-00006', productName: 'Executive High-Back Chair',      type: 'IN', quantity: 15, referenceType: 'Purchase Order', referenceId: 'PO-2026-004' },
  { id: 4,  date: '2026-01-22', vendorCode: 'VEN005', vendorName: 'Sundaram Spring Works',       productCode: 'PRD-00007', productName: 'Comfort 2-Seater Loveseat',      type: 'IN', quantity: 8,  referenceType: 'Purchase Order', referenceId: 'PO-2026-005' },
  { id: 5,  date: '2026-02-01', vendorCode: 'VEN001', vendorName: 'Krishna Timber & Plywood',    productCode: 'PRD-00012', productName: 'Ergonomic Mesh Office Chair',    type: 'IN', quantity: 20, referenceType: 'Purchase Order', referenceId: 'PO-2026-007' },
  { id: 6,  date: '2026-02-08', vendorCode: 'VEN002', vendorName: 'Coimbatore Foam Industries',  productCode: 'PRD-00009', productName: 'Throne Motorised Recliner',      type: 'IN', quantity: 3,  referenceType: 'Purchase Order', referenceId: 'PO-2026-009' },
  { id: 7,  date: '2026-02-12', vendorCode: 'VEN004', vendorName: 'Apex Hardware & Fasteners',   productCode: 'PRD-00010', productName: 'Classic 3-Seater Chesterfield',  type: 'IN', quantity: 2,  referenceType: 'Purchase Order', referenceId: 'PO-2026-010' },
  { id: 8,  date: '2026-02-18', vendorCode: 'VEN001', vendorName: 'Krishna Timber & Plywood',    productCode: 'PRD-00005', productName: 'Luxe King Bed with Storage',     type: 'IN', quantity: 4,  referenceType: 'Purchase Order', referenceId: 'PO-2026-011' },

  // ─── Sales Invoice Dispatches (OUT) ───────────────────────────────
  { id: 9,  date: '2026-01-10', vendorCode: '',       vendorName: 'Sundaram Furnishings Pvt Ltd', productCode: 'PRD-00001', productName: 'Yashika 3+1+1 Sofa Set',        type: 'OUT', quantity: 2,  referenceType: 'Invoice', referenceId: 'INV-2026-001' },
  { id: 10, date: '2026-01-15', vendorCode: '',       vendorName: 'Sri Balaji Furniture House',   productCode: 'PRD-00006', productName: 'Executive High-Back Chair',      type: 'OUT', quantity: 5,  referenceType: 'Invoice', referenceId: 'INV-2026-002' },
  { id: 11, date: '2026-02-15', vendorCode: '',       vendorName: 'Royal Living Concepts',        productCode: 'PRD-00007', productName: 'Comfort 2-Seater Loveseat',      type: 'OUT', quantity: 3,  referenceType: 'Invoice', referenceId: 'INV-2026-004' },
  { id: 12, date: '2026-03-01', vendorCode: '',       vendorName: 'Deepa Interiors & Decor',      productCode: 'PRD-00001', productName: 'Yashika 3+1+1 Sofa Set',        type: 'OUT', quantity: 1,  referenceType: 'Invoice', referenceId: 'INV-2026-005' },
  { id: 13, date: '2026-03-05', vendorCode: '',       vendorName: 'Comfort Zone Furniture',       productCode: 'PRD-00012', productName: 'Ergonomic Mesh Office Chair',    type: 'OUT', quantity: 8,  referenceType: 'Invoice', referenceId: 'INV-2026-003' },
  { id: 14, date: '2026-03-10', vendorCode: '',       vendorName: 'Elegant Home Solutions',       productCode: 'PRD-00003', productName: 'Milano L-Shape Sofa',            type: 'OUT', quantity: 1,  referenceType: 'Invoice', referenceId: 'INV-2026-008' },
  { id: 15, date: '2026-03-12', vendorCode: '',       vendorName: 'Sundaram Furnishings Pvt Ltd', productCode: 'PRD-00009', productName: 'Throne Motorised Recliner',      type: 'OUT', quantity: 1,  referenceType: 'Invoice', referenceId: 'INV-2026-009' },
  { id: 16, date: '2026-03-15', vendorCode: '',       vendorName: 'Royal Living Concepts',        productCode: 'PRD-00010', productName: 'Classic 3-Seater Chesterfield',  type: 'OUT', quantity: 1,  referenceType: 'Invoice', referenceId: 'INV-2026-010' },
  { id: 17, date: '2026-03-18', vendorCode: '',       vendorName: 'Deepa Interiors & Decor',      productCode: 'PRD-00005', productName: 'Luxe King Bed with Storage',     type: 'OUT', quantity: 2,  referenceType: 'Invoice', referenceId: 'INV-2026-011' },

  // ─── Manual Adjustment (ADJUSTMENT) ───────────────────────────────
  { id: 18, date: '2026-03-20', vendorCode: '',       vendorName: '',                              productCode: 'PRD-00005', productName: 'Luxe King Bed with Storage',     type: 'ADJUSTMENT', quantity: 1, notes: 'Transport damage – headboard scratched beyond repair' },

  // ─── Warehouse Transfer (TRANSFER) ────────────────────────────────
  { id: 19, date: '2026-03-22', vendorCode: '',       vendorName: '',                              productCode: 'PRD-00006', productName: 'Executive High-Back Chair',      type: 'TRANSFER', quantity: 3, notes: 'Transferred from FG Coimbatore to FG Salem store' },

  // ─── Additional Transactions ──────────────────────────────────────
  { id: 20, date: '2026-04-02', vendorCode: 'VEN002', vendorName: 'Coimbatore Foam Industries',  productCode: 'PRD-00002', productName: 'Royal Single Recliner',          type: 'IN', quantity: 6,  referenceType: 'Purchase Order', referenceId: 'PO-2026-012' },
  { id: 21, date: '2026-04-08', vendorCode: '',       vendorName: 'Sri Balaji Furniture House',   productCode: 'PRD-00002', productName: 'Royal Single Recliner',          type: 'OUT', quantity: 2,  referenceType: 'Invoice', referenceId: 'INV-2026-013' },
  { id: 22, date: '2026-04-12', vendorCode: 'VEN003', vendorName: 'Lakshmi Fabrics & Textiles',  productCode: 'PRD-00004', productName: 'Heritage 6-Seater Dining Set',   type: 'IN', quantity: 4,  referenceType: 'Purchase Order', referenceId: 'PO-2026-013' },
  { id: 23, date: '2026-04-15', vendorCode: '',       vendorName: 'Comfort Zone Furniture',       productCode: 'PRD-00004', productName: 'Heritage 6-Seater Dining Set',   type: 'OUT', quantity: 1,  referenceType: 'Invoice', referenceId: 'INV-2026-014' },
];
