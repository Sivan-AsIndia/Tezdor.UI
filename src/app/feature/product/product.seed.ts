import { Product } from './product';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    ProductId: crypto.randomUUID(),
    TenantId: crypto.randomUUID(),
    CompanyId: crypto.randomUUID(),
    productCode: 'ELEC001',
    productName: 'Laptop Pro 15',
    categoryId: 1,
    categoryName: 'Electronics',
    brandId: 1,
    unitId: 1,
    barcode: '8901234567890',
    costPrice: 48000.0,
    sellingPrice: 55000.0,
    taxId: 1,
    images: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop',
        isPrimary: true,
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=400&fit=crop',
        isPrimary: false,
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop',
        isPrimary: false,
      },
    ],
    isInclusiveTax: false,
    discountType: 'none',
    discountValue: null,
    currentStock: 24,
    reorderLevel: 5,
    maxStockLevel: 100,
    description:
      'High-performance 15-inch laptop with Intel i7 processor, 16GB RAM, and 512GB SSD. Ideal for business and creative professionals.',
    metaTagTitle: 'Laptop Pro 15',
    metaTagDescription: 'Professional grade laptop for business users.',
    isPhysical: true,
    productTemplate: '',
    status: 'active',
    ProductType: 'Goods',
    createdAt: '2024-06-15',
    updatedAt: '2025-04-20',
  },
];

export const INITIAL_NEXT_ID = INITIAL_PRODUCTS.length + 1;
