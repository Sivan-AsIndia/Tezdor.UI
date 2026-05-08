import { PurchaseInvoice } from "./purchase-invoice";

export const SAMPLE_INVOICES: PurchaseInvoice[] = [
  {
    id: 1, invoiceNo: 'PINV-2026-001',
    supplierInvoiceNo: 'KT-INV-4521',
    invoiceDate: '2026-01-10', paymentDueDate: '2026-02-10',
    supplierId: '1', supplierCode: 'VEN001', supplierName: 'Krishna Timber',
    poRef: 'PO-2026-001',
    lineItems: [
      { id: 1, productId: '1', productCode: 'PRD110', productName: '8x4x9mm Plywood', unitId: 1, unitName: 'Pcs', qty: 60, unitCost: 450, taxPercent: 18, lineTotal: 31860 },
      { id: 2, productId: '2', productCode: 'PRD111', productName: 'Teak Wood Plank', unitId: 6, unitName: 'Mtr', qty: 20, unitCost: 800, taxPercent: 18, lineTotal: 18880 },
    ],
    grandTotal: 50740, amountPaid: 50740, balanceDue: 0,
    paymentStatus: 'paid', invoiceStatus: 'posted', createdAt: '2026-01-10',
  },
  {
    id: 2, invoiceNo: 'PINV-2026-002',
    supplierInvoiceNo: 'MS-2026-0088',
    invoiceDate: '2026-01-15', paymentDueDate: '2026-03-01',
    supplierId: '2', supplierCode: 'VEN002', supplierName: 'Metro Steel',
    poRef: 'PO-2026-002',
    lineItems: [
      { id: 1, productId: '3', productCode: 'PRD200', productName: 'Steel Rod 10mm', unitId: 2, unitName: 'Kg', qty: 100, unitCost: 85, taxPercent: 18, lineTotal: 10030 },
    ],
    grandTotal: 10030, amountPaid: 5000, balanceDue: 5030,
    paymentStatus: 'partial', invoiceStatus: 'posted', createdAt: '2026-01-15',
  },
  {
    id: 3, invoiceNo: 'PINV-2026-003',
    supplierInvoiceNo: 'PM-INV-2200',
    invoiceDate: '2026-01-20', paymentDueDate: '2026-01-20',
    supplierId: '3', supplierCode: 'VEN003', supplierName: 'PipeMart Co',
    poRef: 'PO-2026-003',
    lineItems: [
      { id: 1, productId: '4', productCode: 'PRD305', productName: 'PVC Pipe 25mm', unitId: 6, unitName: 'Mtr', qty: 200, unitCost: 55, taxPercent: 12, lineTotal: 12320 },
      { id: 2, productId: '5', productCode: 'PRD306', productName: 'PVC Elbow 25mm', unitId: 1, unitName: 'Pcs', qty: 50, unitCost: 18, taxPercent: 12, lineTotal: 1008 },
    ],
    grandTotal: 13328, amountPaid: 0, balanceDue: 13328,
    paymentStatus: 'unpaid', invoiceStatus: 'posted', createdAt: '2026-01-20',
  },
  {
    id: 4, invoiceNo: 'PINV-2026-004',
    supplierInvoiceNo: '',
    invoiceDate: '2026-02-01', paymentDueDate: '',
    supplierId: '4', supplierCode: 'VEN004', supplierName: 'Apex Hardware',
    poRef: '',
    lineItems: [
      { id: 1, productId: '6', productCode: 'PRD400', productName: 'Bolt M12 x 50mm', unitId: 4, unitName: 'Box', qty: 10, unitCost: 350, taxPercent: 18, lineTotal: 4130 },
    ],
    grandTotal: 4130, amountPaid: 0, balanceDue: 4130,
    paymentStatus: 'unpaid', invoiceStatus: 'draft', createdAt: '2026-02-01',
  },
  {
    id: 5, invoiceNo: 'PINV-2026-005',
    supplierInvoiceNo: 'GS-INV-7710',
    invoiceDate: '2026-02-05', paymentDueDate: '2026-03-05',
    supplierId: '5', supplierCode: 'VEN005', supplierName: 'Global Supplies',
    poRef: 'PO-2026-007',
    lineItems: [
      { id: 1, productId: '7', productCode: 'PRD500', productName: 'Safety Helmet', unitId: 1, unitName: 'Pcs', qty: 25, unitCost: 380, taxPercent: 12, lineTotal: 10640 },
      { id: 2, productId: '8', productCode: 'PRD501', productName: 'Safety Gloves', unitId: 5, unitName: 'Dozen', qty: 10, unitCost: 280, taxPercent: 12, lineTotal: 3136 },
    ],
    grandTotal: 13776, amountPaid: 13776, balanceDue: 0,
    paymentStatus: 'paid', invoiceStatus: 'posted', createdAt: '2026-02-05',
  },
];
