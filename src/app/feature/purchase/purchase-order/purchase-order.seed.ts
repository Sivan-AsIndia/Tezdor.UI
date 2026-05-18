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
      { id: 1, itemId: 101, productCode: 'ELEC001', productName: 'Laptop Pro 15', unitId: 1, unitName: 'Pcs', quantity: 10, receivedQuantity: 10, pendingQuantity: 0, unitPrice: 48000, taxPercent: 18, discount: 0, total: 566400 },
    ],
    subTotal: 480000, taxAmount: 86400, discountAmount: 0, shippingCharge: 500, grandTotal: 566900,
    status: 'received', createdAt: '2026-01-05',
  },
  {
    id: 2, poNumber: 'PO-2026-002',
    vendorId: '2', vendorCode: 'VEN002', vendorName: 'Metro Steel',
    orderDate: '2026-01-08', expectedDate: '2026-01-25',
    deliveryMethod: 'courier', paymentTerms: 'advance',
    lineItems: [
      { id: 1, itemId: 201, productCode: 'HARD001', productName: 'Steel Hammer 500g', unitId: 1, unitName: 'Pcs', quantity: 50, receivedQuantity: 0, pendingQuantity: 50, unitPrice: 180, taxPercent: 18, discount: 0, total: 10620 },
    ],
    subTotal: 9000, taxAmount: 1620, discountAmount: 0, shippingCharge: 200, grandTotal: 10820,
    status: 'draft', createdAt: '2026-01-08',
  },
  {
    id: 3, poNumber: 'PO-2026-003',
    vendorId: '3', vendorCode: 'VEN003', vendorName: 'PipeMart Co',
    orderDate: '2026-01-12', expectedDate: '2026-02-01',
    deliveryMethod: 'pickup', paymentTerms: 'advance',
    lineItems: [
      { id: 1, itemId: 301, productCode: 'STAT001', productName: 'A4 Paper Ream', unitId: 4, unitName: 'Box', quantity: 100, receivedQuantity: 60, pendingQuantity: 40, unitPrice: 220, taxPercent: 12, discount: 500, total: 24140 },
    ],
    subTotal: 22000, taxAmount: 2640, discountAmount: 500, shippingCharge: 0, grandTotal: 24140,
    status: 'partial', createdAt: '2026-01-12',
  },
  {
    id: 4, poNumber: 'PO-2026-004',
    vendorId: '4', vendorCode: 'VEN004', vendorName: 'Apex Hardware',
    orderDate: '2026-01-18', expectedDate: '2026-02-05',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    lineItems: [
      { id: 1, itemId: 401, productCode: 'HARD002', productName: 'Screwdriver Set 6pc', unitId: 4, unitName: 'Box', quantity: 30, receivedQuantity: 30, pendingQuantity: 0, unitPrice: 280, taxPercent: 18, discount: 0, total: 9912 },
    ],
    subTotal: 8400, taxAmount: 1512, discountAmount: 0, shippingCharge: 300, grandTotal: 10212,
    status: 'received', createdAt: '2026-01-18',
  },
  {
    id: 5, poNumber: 'PO-2026-005',
    vendorId: '5', vendorCode: 'VEN005', vendorName: 'Global Supplies',
    orderDate: '2026-01-22', expectedDate: '2026-02-10',
    deliveryMethod: 'delivery', paymentTerms: 'net15',
    lineItems: [
      { id: 1, itemId: 501, productCode: 'ELEC002', productName: 'Wireless Mouse MX3', unitId: 1, unitName: 'Pcs', quantity: 80, receivedQuantity: 80, pendingQuantity: 0, unitPrice: 1200, taxPercent: 18, discount: 0, total: 113280 },
    ],
    subTotal: 96000, taxAmount: 17280, discountAmount: 0, shippingCharge: 150, grandTotal: 113430,
    status: 'received', createdAt: '2026-01-22',
  },
  {
    id: 6, poNumber: 'PO-2026-006',
    vendorId: '6', vendorCode: 'VEN006', vendorName: 'BuildMart',
    orderDate: '2026-01-28', expectedDate: '2026-02-15',
    deliveryMethod: 'courier', paymentTerms: 'net60',
    lineItems: [
      { id: 1, itemId: 601, productCode: 'FOOD001', productName: 'Organic Honey 500g', unitId: 2, unitName: 'Kg', quantity: 40, receivedQuantity: 0, pendingQuantity: 40, unitPrice: 280, taxPercent: 5, discount: 0, total: 11760 },
    ],
    subTotal: 11200, taxAmount: 560, discountAmount: 0, shippingCharge: 1000, grandTotal: 12760,
    status: 'approved', createdAt: '2026-01-28',
  },
  {
    id: 7, poNumber: 'PO-2026-007',
    vendorId: '1', vendorCode: 'VEN001', vendorName: 'Krishna Timber',
    orderDate: '2026-02-01', expectedDate: '2026-02-18',
    deliveryMethod: 'delivery', paymentTerms: 'net60',
    lineItems: [
      { id: 1, itemId: 701, productCode: 'STAT002', productName: 'Gel Pen - Blue', unitId: 5, unitName: 'Dozen', quantity: 20, receivedQuantity: 20, pendingQuantity: 0, unitPrice: 8, taxPercent: 12, discount: 0, total: 179.20 },
    ],
    subTotal: 160, taxAmount: 19.20, discountAmount: 0, shippingCharge: 300, grandTotal: 479.20,
    status: 'received', createdAt: '2026-02-01',
  },
  {
    id: 8, poNumber: 'PO-2026-008',
    vendorId: '3', vendorCode: 'VEN003', vendorName: 'PipeMart Co',
    orderDate: '2026-02-04', expectedDate: '2026-02-20',
    deliveryMethod: 'pickup', paymentTerms: 'advance',
    lineItems: [
      { id: 1, itemId: 801, productCode: 'FOOD002', productName: 'Green Tea Bags 25pc', unitId: 4, unitName: 'Box', quantity: 50, receivedQuantity: 30, pendingQuantity: 20, unitPrice: 110, taxPercent: 5, discount: 0, total: 5775 },
    ],
    subTotal: 5500, taxAmount: 275, discountAmount: 0, shippingCharge: 0, grandTotal: 5775,
    status: 'partial', createdAt: '2026-02-04',
  },
  {
    id: 9, poNumber: 'PO-2026-009',
    vendorId: '2', vendorCode: 'VEN002', vendorName: 'Metro Steel',
    orderDate: '2026-02-10', expectedDate: '2026-02-28',
    deliveryMethod: 'delivery', paymentTerms: 'net30',
    lineItems: [
      { id: 1, itemId: 901, productCode: 'CLOTH001', productName: 'Cotton T-Shirt - Blue', unitId: 1, unitName: 'Pcs', quantity: 60, receivedQuantity: 0, pendingQuantity: 60, unitPrice: 250, taxPercent: 12, discount: 0, total: 16800 },
    ],
    subTotal: 15000, taxAmount: 1800, discountAmount: 0, shippingCharge: 500, grandTotal: 17300,
    status: 'sent_to_supplier', createdAt: '2026-02-10',
  },
  {
    id: 10, poNumber: 'PO-2026-010',
    vendorId: '4', vendorCode: 'VEN004', vendorName: 'Apex Hardware',
    orderDate: '2026-02-12', expectedDate: '2026-03-01',
    deliveryMethod: 'delivery', paymentTerms: 'net15',
    lineItems: [
      { id: 1, itemId: 1001, productCode: 'ELEC003', productName: 'USB Cable Type-C', unitId: 1, unitName: 'Pcs', quantity: 100, receivedQuantity: 100, pendingQuantity: 0, unitPrice: 80, taxPercent: 18, discount: 1000, total: 8440 },
    ],
    subTotal: 8000, taxAmount: 1440, discountAmount: 1000, shippingCharge: 800, grandTotal: 9240,
    status: 'received', createdAt: '2026-02-12',
  },
  {
    id: 11, poNumber: 'PO-2026-011',
    vendorId: '5', vendorCode: 'VEN005', vendorName: 'Global Supplies',
    orderDate: '2026-02-15', expectedDate: '2026-03-05',
    deliveryMethod: 'pickup', paymentTerms: 'advance',
    lineItems: [
      { id: 1, itemId: 1101, productCode: 'CLOTH002', productName: 'Denim Jeans - Black', unitId: 1, unitName: 'Pcs', quantity: 25, receivedQuantity: 0, pendingQuantity: 25, unitPrice: 800, taxPercent: 12, discount: 0, total: 22400 },
    ],
    subTotal: 20000, taxAmount: 2400, discountAmount: 0, shippingCharge: 0, grandTotal: 22400,
    status: 'draft', createdAt: '2026-02-15',
  },
  {
    id: 12, poNumber: 'PO-2026-012',
    vendorId: '6', vendorCode: 'VEN006', vendorName: 'BuildMart',
    orderDate: '2026-02-18', expectedDate: '2026-03-10',
    deliveryMethod: 'courier', paymentTerms: 'net30',
    lineItems: [
      { id: 1, itemId: 1201, productCode: 'SERV001', productName: 'Installation Service', unitId: 1, unitName: 'Pcs', quantity: 5, receivedQuantity: 0, pendingQuantity: 5, unitPrice: 599, taxPercent: 18, discount: 0, total: 3534.10 },
    ],
    subTotal: 2995, taxAmount: 539.10, discountAmount: 0, shippingCharge: 100, grandTotal: 3634.10,
    status: 'cancelled', createdAt: '2026-02-18',
  },
];
