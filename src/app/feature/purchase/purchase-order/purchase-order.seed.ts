import { PurchaseOrder } from "./purchase-order";

export const SAMPLE_ORDERS: PurchaseOrder[] = [
  {
    id: 1, poNumber: 'PO-2026-001',
    vendorId: '1', vendorCode: 'VEN001', vendorName: 'Krishna Timber & Plywood',
    orderDate: '2026-01-05', expectedDate: '2026-01-20',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    shippingAddress: '42, Industrial Estate, Ambattur, Coimbatore - 641058',
    notes: 'Sheesham planks to be kiln-dried, moisture < 12%.',
    lineItems: [
      { id: 1, itemId: 101, productCode: 'PRD-00001', productName: 'Yashika 3+1+1 Sofa Set', unitId: 4, unitName: 'Set', quantity: 5, receivedQuantity: 5, pendingQuantity: 0, unitPrice: 38500, taxPercent: 18, discount: 0, total: 227150 },
    ],
    subTotal: 192500, taxAmount: 34650, discountAmount: 0, shippingCharge: 500, grandTotal: 227650,
    status: 'received', createdAt: '2026-01-05',
  },
  {
    id: 2, poNumber: 'PO-2026-002',
    vendorId: '2', vendorCode: 'VEN002', vendorName: 'Coimbatore Foam Industries',
    orderDate: '2026-01-08', expectedDate: '2026-01-25',
    deliveryMethod: 'delivery', paymentTerms: 'advance',
    lineItems: [
      { id: 1, itemId: 201, productCode: 'PRD-00002', productName: 'Royal Single Recliner', unitId: 1, unitName: 'Nos', quantity: 10, receivedQuantity: 0, pendingQuantity: 10, unitPrice: 21000, taxPercent: 18, discount: 0, total: 247800 },
    ],
    subTotal: 210000, taxAmount: 37800, discountAmount: 0, shippingCharge: 200, grandTotal: 248000,
    status: 'draft', createdAt: '2026-01-08',
  },
  {
    id: 3, poNumber: 'PO-2026-003',
    vendorId: '3', vendorCode: 'VEN003', vendorName: 'Lakshmi Fabrics & Textiles',
    orderDate: '2026-01-12', expectedDate: '2026-02-01',
    deliveryMethod: 'pickup', paymentTerms: 'advance',
    lineItems: [
      { id: 1, itemId: 301, productCode: 'PRD-00003', productName: 'Milano L-Shape Sofa', unitId: 4, unitName: 'Set', quantity: 3, receivedQuantity: 2, pendingQuantity: 1, unitPrice: 52000, taxPercent: 18, discount: 500, total: 183580 },
    ],
    subTotal: 156000, taxAmount: 28080, discountAmount: 500, shippingCharge: 0, grandTotal: 183580,
    status: 'partial', createdAt: '2026-01-12',
  },
  {
    id: 4, poNumber: 'PO-2026-004',
    vendorId: '4', vendorCode: 'VEN004', vendorName: 'Apex Hardware & Fasteners',
    orderDate: '2026-01-18', expectedDate: '2026-02-05',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    lineItems: [
      { id: 1, itemId: 401, productCode: 'PRD-00006', productName: 'Executive High-Back Chair', unitId: 1, unitName: 'Nos', quantity: 15, receivedQuantity: 15, pendingQuantity: 0, unitPrice: 11000, taxPercent: 18, discount: 0, total: 194700 },
    ],
    subTotal: 165000, taxAmount: 29700, discountAmount: 0, shippingCharge: 300, grandTotal: 195000,
    status: 'received', createdAt: '2026-01-18',
  },
  {
    id: 5, poNumber: 'PO-2026-005',
    vendorId: '5', vendorCode: 'VEN005', vendorName: 'Sundaram Spring Works',
    orderDate: '2026-01-22', expectedDate: '2026-02-10',
    deliveryMethod: 'delivery', paymentTerms: 'net15',
    lineItems: [
      { id: 1, itemId: 501, productCode: 'PRD-00007', productName: 'Comfort 2-Seater Loveseat', unitId: 1, unitName: 'Nos', quantity: 8, receivedQuantity: 8, pendingQuantity: 0, unitPrice: 17000, taxPercent: 18, discount: 0, total: 160480 },
    ],
    subTotal: 136000, taxAmount: 24480, discountAmount: 0, shippingCharge: 150, grandTotal: 160630,
    status: 'received', createdAt: '2026-01-22',
  },
  {
    id: 6, poNumber: 'PO-2026-006',
    vendorId: '6', vendorCode: 'VEN006', vendorName: 'Selvaraj Packaging',
    orderDate: '2026-01-28', expectedDate: '2026-02-15',
    deliveryMethod: 'courier', paymentTerms: 'net60',
    lineItems: [
      { id: 1, itemId: 601, productCode: 'PRD-00004', productName: 'Heritage 6-Seater Dining Set', unitId: 4, unitName: 'Set', quantity: 4, receivedQuantity: 0, pendingQuantity: 4, unitPrice: 27000, taxPercent: 18, discount: 0, total: 127440 },
    ],
    subTotal: 108000, taxAmount: 19440, discountAmount: 0, shippingCharge: 1000, grandTotal: 128440,
    status: 'approved', createdAt: '2026-01-28',
  },
  {
    id: 7, poNumber: 'PO-2026-007',
    vendorId: '1', vendorCode: 'VEN001', vendorName: 'Krishna Timber & Plywood',
    orderDate: '2026-02-01', expectedDate: '2026-02-18',
    deliveryMethod: 'delivery', paymentTerms: 'net60',
    lineItems: [
      { id: 1, itemId: 701, productCode: 'PRD-00012', productName: 'Ergonomic Mesh Office Chair', unitId: 1, unitName: 'Nos', quantity: 20, receivedQuantity: 20, pendingQuantity: 0, unitPrice: 8500, taxPercent: 18, discount: 0, total: 200600 },
    ],
    subTotal: 170000, taxAmount: 30600, discountAmount: 0, shippingCharge: 300, grandTotal: 200900,
    status: 'received', createdAt: '2026-02-01',
  },
  {
    id: 8, poNumber: 'PO-2026-008',
    vendorId: '3', vendorCode: 'VEN003', vendorName: 'Lakshmi Fabrics & Textiles',
    orderDate: '2026-02-04', expectedDate: '2026-02-20',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    lineItems: [
      { id: 1, itemId: 801, productCode: 'PRD-00011', productName: 'Minimal 4-Seater Dining Set', unitId: 4, unitName: 'Set', quantity: 6, receivedQuantity: 6, pendingQuantity: 0, unitPrice: 19500, taxPercent: 18, discount: 0, total: 138060 },
    ],
    subTotal: 117000, taxAmount: 21060, discountAmount: 0, shippingCharge: 500, grandTotal: 138560,
    status: 'received', createdAt: '2026-02-04',
  },
  {
    id: 9, poNumber: 'PO-2026-009',
    vendorId: '2', vendorCode: 'VEN002', vendorName: 'Coimbatore Foam Industries',
    orderDate: '2026-02-08', expectedDate: '2026-03-01',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    lineItems: [
      { id: 1, itemId: 901, productCode: 'PRD-00009', productName: 'Throne Motorised Recliner', unitId: 1, unitName: 'Nos', quantity: 3, receivedQuantity: 3, pendingQuantity: 0, unitPrice: 45000, taxPercent: 18, discount: 0, total: 159300 },
    ],
    subTotal: 135000, taxAmount: 24300, discountAmount: 0, shippingCharge: 500, grandTotal: 159800,
    status: 'received', createdAt: '2026-02-08',
  },
  {
    id: 10, poNumber: 'PO-2026-010',
    vendorId: '4', vendorCode: 'VEN004', vendorName: 'Apex Hardware & Fasteners',
    orderDate: '2026-02-12', expectedDate: '2026-03-05',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    lineItems: [
      { id: 1, itemId: 1001, productCode: 'PRD-00010', productName: 'Classic 3-Seater Chesterfield', unitId: 1, unitName: 'Nos', quantity: 2, receivedQuantity: 2, pendingQuantity: 0, unitPrice: 58000, taxPercent: 18, discount: 0, total: 136880 },
    ],
    subTotal: 116000, taxAmount: 20880, discountAmount: 0, shippingCharge: 800, grandTotal: 137680,
    status: 'received', createdAt: '2026-02-12',
  },
  {
    id: 11, poNumber: 'PO-2026-011',
    vendorId: '1', vendorCode: 'VEN001', vendorName: 'Krishna Timber & Plywood',
    orderDate: '2026-02-18', expectedDate: '2026-03-10',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    lineItems: [
      { id: 1, itemId: 1101, productCode: 'PRD-00005', productName: 'Luxe King Bed with Storage', unitId: 1, unitName: 'Nos', quantity: 4, receivedQuantity: 4, pendingQuantity: 0, unitPrice: 34000, taxPercent: 18, discount: 0, total: 160480 },
    ],
    subTotal: 136000, taxAmount: 24480, discountAmount: 0, shippingCharge: 600, grandTotal: 161080,
    status: 'received', createdAt: '2026-02-18',
  },
];
