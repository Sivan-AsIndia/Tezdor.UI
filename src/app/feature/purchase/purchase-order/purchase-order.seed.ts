import { PurchaseOrder } from "./purchase-order";

export const SAMPLE_ORDERS: PurchaseOrder[] = [
  {
    id: 1, poNumber: 'PO-2026-001',
    vendorId: '1', vendorCode: 'VEN001', vendorName: 'Krishna Timber',
    orderDate: '2026-01-05', expectedDate: '2026-01-20',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    shippingAddress: '12, Wood Lane, Chennai - 600001',
    notes: 'Urgent delivery required.',
    lineItems: [
      { id: 1, productCode: 'PRD110', productName: '8x4x9mm Plywood', unitId: 1, unitName: 'Pcs', quantity: 60, unitPrice: 450, taxPercent: 18, discount: 0, total: 31860 },
      { id: 2, productCode: 'PRD111', productName: 'Teak Wood Plank', unitId: 6, unitName: 'Mtr', quantity: 20, unitPrice: 800, taxPercent: 18, discount: 200, total: 18640 },
    ],
    subTotal: 43000, taxAmount: 7740, discountAmount: 200, shippingCharge: 500, grandTotal: 51040,
    status: 'received', createdAt: '2026-01-05',
  },
  {
    id: 2, poNumber: 'PO-2026-002',
    vendorId: '2', vendorCode: 'VEN002', vendorName: 'Metro Steel',
    orderDate: '2026-01-08', expectedDate: '2026-01-25',
    deliveryMethod: 'courier', paymentTerms: 'net45',
    lineItems: [
      { id: 1, productCode: 'PRD200', productName: 'Steel Rod 10mm', unitId: 2, unitName: 'Kg', quantity: 100, unitPrice: 85, taxPercent: 18, discount: 0, total: 10030 },
    ],
    subTotal: 8500, taxAmount: 1530, discountAmount: 0, shippingCharge: 200, grandTotal: 10230,
    status: 'approved', createdAt: '2026-01-08',
  },
  {
    id: 3, poNumber: 'PO-2026-003',
    vendorId: '3', vendorCode: 'VEN003', vendorName: 'PipeMart Co',
    orderDate: '2026-01-12', expectedDate: '2026-02-01',
    deliveryMethod: 'pickup', paymentTerms: 'immediate',
    lineItems: [
      { id: 1, productCode: 'PRD305', productName: 'PVC Pipe 25mm', unitId: 6, unitName: 'Mtr', quantity: 200, unitPrice: 55, taxPercent: 12, discount: 500, total: 11820 },
      { id: 2, productCode: 'PRD306', productName: 'PVC Elbow 25mm', unitId: 1, unitName: 'Pcs', quantity: 50, unitPrice: 18, taxPercent: 12, discount: 0, total: 1008 },
    ],
    subTotal: 12400, taxAmount: 1461, discountAmount: 500, shippingCharge: 0, grandTotal: 13361,
    status: 'pending', createdAt: '2026-01-12',
  },
  {
    id: 4, poNumber: 'PO-2026-004',
    vendorId: '1', vendorCode: 'VEN001', vendorName: 'Krishna Timber',
    orderDate: '2026-01-18', expectedDate: '2026-02-05',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    lineItems: [
      { id: 1, productCode: 'PRD112', productName: 'Block Board 19mm', unitId: 1, unitName: 'Pcs', quantity: 40, unitPrice: 1200, taxPercent: 18, discount: 1000, total: 57640 },
    ],
    subTotal: 48000, taxAmount: 8532, discountAmount: 1000, shippingCharge: 800, grandTotal: 56332,
    status: 'partial', createdAt: '2026-01-18',
  },
  {
    id: 5, poNumber: 'PO-2026-005',
    vendorId: '4', vendorCode: 'VEN004', vendorName: 'Apex Hardware',
    orderDate: '2026-01-22', expectedDate: '2026-02-10',
    deliveryMethod: 'delivery', paymentTerms: 'net15',
    lineItems: [
      { id: 1, productCode: 'PRD400', productName: 'Bolt M12 x 50mm', unitId: 4, unitName: 'Box', quantity: 10, unitPrice: 350, taxPercent: 18, discount: 0, total: 4130 },
    ],
    subTotal: 3500, taxAmount: 630, discountAmount: 0, shippingCharge: 150, grandTotal: 4280,
    status: 'cancelled', createdAt: '2026-01-22',
  },
  {
    id: 6, poNumber: 'PO-2026-006',
    vendorId: '2', vendorCode: 'VEN002', vendorName: 'Metro Steel',
    orderDate: '2026-01-28', expectedDate: '2026-02-15',
    deliveryMethod: 'courier', paymentTerms: 'net60',
    lineItems: [
      { id: 1, productCode: 'PRD201', productName: 'MS Flat Bar 40x6mm', unitId: 2, unitName: 'Kg', quantity: 500, unitPrice: 82, taxPercent: 18, discount: 2000, total: 46380 },
    ],
    subTotal: 41000, taxAmount: 7092, discountAmount: 2000, shippingCharge: 1000, grandTotal: 47092,
    status: 'approved', createdAt: '2026-01-28',
  },
  {
    id: 7, poNumber: 'PO-2026-007',
    vendorId: '5', vendorCode: 'VEN005', vendorName: 'Global Supplies',
    orderDate: '2026-02-01', expectedDate: '2026-02-18',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    lineItems: [
      { id: 1, productCode: 'PRD500', productName: 'Safety Helmet', unitId: 1, unitName: 'Pcs', quantity: 25, unitPrice: 380, taxPercent: 12, discount: 0, total: 10640 },
      { id: 2, productCode: 'PRD501', productName: 'Safety Gloves', unitId: 5, unitName: 'Dozen', quantity: 10, unitPrice: 280, taxPercent: 12, discount: 0, total: 3136 },
    ],
    subTotal: 12300, taxAmount: 1476, discountAmount: 0, shippingCharge: 300, grandTotal: 14076,
    status: 'received', createdAt: '2026-02-01',
  },
  {
    id: 8, poNumber: 'PO-2026-008',
    vendorId: '3', vendorCode: 'VEN003', vendorName: 'PipeMart Co',
    orderDate: '2026-02-04', expectedDate: '2026-02-20',
    deliveryMethod: 'pickup', paymentTerms: 'immediate',
    lineItems: [
      { id: 1, productCode: 'PRD308', productName: 'CPVC Pipe 20mm', unitId: 6, unitName: 'Mtr', quantity: 100, unitPrice: 72, taxPercent: 12, discount: 0, total: 8064 },
    ],
    subTotal: 7200, taxAmount: 864, discountAmount: 0, shippingCharge: 0, grandTotal: 8064,
    status: 'pending', createdAt: '2026-02-04',
  },
];
