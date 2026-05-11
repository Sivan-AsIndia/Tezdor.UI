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
      { id: 1, itemId: 101, productCode: 'PRD110', productName: '8x4x9mm Plywood', unitId: 1, unitName: 'Pcs', quantity: 60, receivedQuantity: 60, pendingQuantity: 0, unitPrice: 450, taxPercent: 18, discount: 0, total: 31860 },
    ],
    subTotal: 27000, taxAmount: 4860, discountAmount: 0, shippingCharge: 500, grandTotal: 32360,
    status: 'received', createdAt: '2026-01-05',
  },
  {
    id: 2, poNumber: 'PO-2026-002',
    vendorId: '2', vendorCode: 'VEN002', vendorName: 'Metro Steel',
    orderDate: '2026-01-08', expectedDate: '2026-01-25',
    deliveryMethod: 'courier', paymentTerms: 'advance',
    lineItems: [
      { id: 1, itemId: 201, productCode: 'PRD200', productName: 'Steel Rod 10mm', unitId: 2, unitName: 'Kg', quantity: 100, receivedQuantity: 0, pendingQuantity: 100, unitPrice: 85, taxPercent: 18, discount: 0, total: 10030 },
    ],
    subTotal: 8500, taxAmount: 1530, discountAmount: 0, shippingCharge: 200, grandTotal: 10230,
    status: 'draft', createdAt: '2026-01-08',
  },
  {
    id: 3, poNumber: 'PO-2026-003',
    vendorId: '3', vendorCode: 'VEN003', vendorName: 'PipeMart Co',
    orderDate: '2026-01-12', expectedDate: '2026-02-01',
    deliveryMethod: 'pickup', paymentTerms: 'advance',
    lineItems: [
      { id: 1, itemId: 301, productCode: 'PRD305', productName: 'PVC Pipe 25mm', unitId: 6, unitName: 'Mtr', quantity: 200, receivedQuantity: 100, pendingQuantity: 100, unitPrice: 55, taxPercent: 12, discount: 500, total: 11820 },
    ],
    subTotal: 11000, taxAmount: 1320, discountAmount: 500, shippingCharge: 0, grandTotal: 11820,
    status: 'partial', createdAt: '2026-01-12',
  },
  {
    id: 4, poNumber: 'PO-2026-004',
    vendorId: '1', vendorCode: 'VEN001', vendorName: 'Krishna Timber',
    orderDate: '2026-01-18', expectedDate: '2026-02-05',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    lineItems: [
      { id: 1, itemId: 103, productCode: 'PRD111', productName: 'Teak Wood Plank', unitId: 6, unitName: 'Mtr', quantity: 20, receivedQuantity: 20, pendingQuantity: 0, unitPrice: 800, taxPercent: 18, discount: 0, total: 18880 },
    ],
    subTotal: 16000, taxAmount: 2880, discountAmount: 0, shippingCharge: 300, grandTotal: 19180,
    status: 'received', createdAt: '2026-01-18',
  },
  {
    id: 5, poNumber: 'PO-2026-005',
    vendorId: '4', vendorCode: 'VEN004', vendorName: 'Apex Hardware',
    orderDate: '2026-01-22', expectedDate: '2026-02-10',
    deliveryMethod: 'delivery', paymentTerms: 'net15',
    lineItems: [
      { id: 1, itemId: 401, productCode: 'PRD400', productName: 'Bolt M12 x 50mm', unitId: 4, unitName: 'Box', quantity: 10, receivedQuantity: 0, pendingQuantity: 10, unitPrice: 350, taxPercent: 18, discount: 0, total: 4130 },
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
      { id: 1, itemId: 202, productCode: 'PRD201', productName: 'MS Flat Bar 40x6mm', unitId: 2, unitName: 'Kg', quantity: 500, receivedQuantity: 0, pendingQuantity: 500, unitPrice: 82, taxPercent: 18, discount: 0, total: 48380 },
    ],
    subTotal: 41000, taxAmount: 7380, discountAmount: 0, shippingCharge: 1000, grandTotal: 49380,
    status: 'approved', createdAt: '2026-01-28',
  },
  {
    id: 7, poNumber: 'PO-2026-007',
    vendorId: '5', vendorCode: 'VEN005', vendorName: 'Global Supplies',
    orderDate: '2026-02-01', expectedDate: '2026-02-18',
    deliveryMethod: 'delivery', paymentTerms: 'net60',
    lineItems: [
      { id: 1, itemId: 501, productCode: 'PRD500', productName: 'Safety Helmet', unitId: 1, unitName: 'Pcs', quantity: 25, receivedQuantity: 25, pendingQuantity: 0, unitPrice: 380, taxPercent: 12, discount: 0, total: 10640 },
    ],
    subTotal: 9500, taxAmount: 1140, discountAmount: 0, shippingCharge: 300, grandTotal: 10940,
    status: 'received', createdAt: '2026-02-01',
  },
  {
    id: 8, poNumber: 'PO-2026-008',
    vendorId: '3', vendorCode: 'VEN003', vendorName: 'PipeMart Co',
    orderDate: '2026-02-04', expectedDate: '2026-02-20',
    deliveryMethod: 'pickup', paymentTerms: 'advance',
    lineItems: [
      { id: 1, itemId: 303, productCode: 'PRD306', productName: 'PVC Elbow 25mm', unitId: 1, unitName: 'Pcs', quantity: 50, receivedQuantity: 20, pendingQuantity: 30, unitPrice: 18, taxPercent: 12, discount: 0, total: 1008 },
    ],
    subTotal: 900, taxAmount: 108, discountAmount: 0, shippingCharge: 0, grandTotal: 1008,
    status: 'partial', createdAt: '2026-02-04',
  },
  {
    id: 9, poNumber: 'PO-2026-009',
    vendorId: '6', vendorCode: 'VEN006', vendorName: 'BuildMart',
    orderDate: '2026-02-10', expectedDate: '2026-02-28',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    lineItems: [
      { id: 1, itemId: 601, productCode: 'PRD600', productName: 'Cement Bag 50kg', unitId: 1, unitName: 'Bag', quantity: 50, receivedQuantity: 0, pendingQuantity: 50, unitPrice: 420, taxPercent: 18, discount: 0, total: 24780 },
    ],
    subTotal: 21000, taxAmount: 3780, discountAmount: 0, shippingCharge: 500, grandTotal: 25280,
    status: 'sent_to_supplier', createdAt: '2026-02-10',
  },
  {
    id: 10, poNumber: 'PO-2026-010',
    vendorId: '1', vendorCode: 'VEN001', vendorName: 'Krishna Timber',
    orderDate: '2026-02-12', expectedDate: '2026-03-01',
    deliveryMethod: 'delivery', paymentTerms: 'net15',
    lineItems: [
      { id: 1, itemId: 104, productCode: 'PRD112', productName: 'Block Board 19mm', unitId: 1, unitName: 'Pcs', quantity: 40, receivedQuantity: 15, pendingQuantity: 25, unitPrice: 1200, taxPercent: 18, discount: 1000, total: 55640 },
    ],
    subTotal: 48000, taxAmount: 8640, discountAmount: 1000, shippingCharge: 800, grandTotal: 56440,
    status: 'partial', createdAt: '2026-02-12',
  },
  {
    id: 11, poNumber: 'PO-2026-011',
    vendorId: '3', vendorCode: 'VEN003', vendorName: 'PipeMart Co',
    orderDate: '2026-02-15', expectedDate: '2026-03-05',
    deliveryMethod: 'pickup', paymentTerms: 'advance',
    lineItems: [
      { id: 1, itemId: 304, productCode: 'PRD308', productName: 'CPVC Pipe 20mm', unitId: 6, unitName: 'Mtr', quantity: 100, receivedQuantity: 0, pendingQuantity: 100, unitPrice: 72, taxPercent: 12, discount: 0, total: 8064 },
    ],
    subTotal: 7200, taxAmount: 864, discountAmount: 0, shippingCharge: 0, grandTotal: 8064,
    status: 'draft', createdAt: '2026-02-15',
  },
  {
    id: 12, poNumber: 'PO-2026-012',
    vendorId: '5', vendorCode: 'VEN005', vendorName: 'Global Supplies',
    orderDate: '2026-02-18', expectedDate: '2026-03-10',
    deliveryMethod: 'courier', paymentTerms: 'net30',
    lineItems: [
      { id: 1, itemId: 502, productCode: 'PRD501', productName: 'Safety Gloves', unitId: 5, unitName: 'Dozen', quantity: 10, receivedQuantity: 10, pendingQuantity: 0, unitPrice: 280, taxPercent: 12, discount: 0, total: 3136 },
    ],
    subTotal: 2800, taxAmount: 336, discountAmount: 0, shippingCharge: 100, grandTotal: 3236,
    status: 'received', createdAt: '2026-02-18',
  },
];