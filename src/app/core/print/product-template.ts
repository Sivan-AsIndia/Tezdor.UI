// ── Product Detail Print Template ────────────────────────────
// Generates the HTML content for printing a Product Profile.
// Design follows the teacher_detail.html reference template.

import { Product, CATEGORY_OPTIONS, BRAND_OPTIONS, UNIT_OPTIONS, TAX_OPTIONS } from '../../feature/product/product';
import { COMPANY_INFO } from './company-info';
import { PROFILE_PRINT_CSS } from './profile-print-styles';
import { formatPrintDate, formatIndianNumber } from './number-to-words';

/**
 * Builds the full HTML document string for a Product Detail print page.
 *
 * @param p - The Product data object to print.
 * @returns A complete HTML document string.
 */
export function buildProductPrintHtml(p: Product): string {

  const company = COMPANY_INFO;
  const today = formatPrintDate(new Date().toISOString());

  const categoryLabel = CATEGORY_OPTIONS.find(c => c.value === String(p.categoryId))?.label ?? '—';
  const brandLabel    = BRAND_OPTIONS.find(b => b.value === String(p.brandId))?.label ?? '—';
  const unitLabel     = UNIT_OPTIONS.find(u => u.value === p.unitId)?.label ?? '—';
  const taxLabel      = TAX_OPTIONS.find(t => t.value === String(p.taxId))?.label ?? 'No Tax';

  const statusBadge = p.status === 'active'
    ? '<span class="badge badge-active">Active</span>'
    : p.status === 'inactive'
    ? '<span class="badge badge-danger">Inactive</span>'
    : '<span class="badge badge-warning">Discontinued</span>';

  // Margin calculation
  const margin = p.sellingPrice - p.costPrice;
  const marginPct = p.costPrice > 0
    ? ((margin / p.costPrice) * 100).toFixed(1) + '%'
    : '—';

  // Stock health
  const stockLevel = (p.reorderLevel && p.currentStock <= p.reorderLevel)
    ? '<span style="color:#c0392b;font-weight:600;">⚠ Low Stock</span>'
    : '<span style="color:#27ae60;font-weight:600;">Healthy</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Product Detail - ${p.productCode}</title>
  <style>${PROFILE_PRINT_CSS}</style>
</head>
<body onload="window.print();">
<div class="page">

  <!-- ═══ Header ═══ -->
  <div class="header">
    <div>
      <div class="company-name">${company.name}</div>
      <div class="company-sub">${company.addressLine1}</div>
      <div class="company-sub">${company.addressLine2} | Ph: ${company.phone}</div>
    </div>
    <div>
      <div class="report-title">Product Detail</div>
      <div class="report-date">${today}</div>
    </div>
  </div>

  <!-- ═══ Hero ═══ -->
  <div class="hero">
    <div class="avatar" style="background:#E8F4FD;color:#1565C0;">
      <span style="font-size:24px;">📦</span>
    </div>
    <div>
      <div class="name">${p.productName}</div>
      <div class="meta">
        <span class="code">${p.productCode}</span>
        <span class="dot"></span>
        <span class="role">${categoryLabel}</span>
        <span class="dot"></span>
        ${statusBadge}
      </div>
    </div>
  </div>

  <!-- ═══ KPI Stats ═══ -->
  <div class="stat-cards">
    <div class="stat-card">
      <div class="stat-card-label">Cost Price</div>
      <div class="stat-card-value">₹${formatIndianNumber(p.costPrice, 2)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Selling Price</div>
      <div class="stat-card-value accent">₹${formatIndianNumber(p.sellingPrice, 2)}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Current Stock</div>
      <div class="stat-card-value green">${p.currentStock} ${unitLabel}</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Margin</div>
      <div class="stat-card-value">${marginPct}</div>
    </div>
  </div>

  <!-- ═══ Basic Information ═══ -->
  <div class="section-title">Basic Information</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Product Code</div><div class="field-value mono">${p.productCode}</div></div>
    <div class="field"><div class="field-label">Product Name</div><div class="field-value">${p.productName}</div></div>
    <div class="field"><div class="field-label">Category</div><div class="field-value">${categoryLabel}</div></div>
    <div class="field"><div class="field-label">Brand</div><div class="field-value">${brandLabel}</div></div>
    <div class="field"><div class="field-label">Unit of Measure</div><div class="field-value">${unitLabel}</div></div>
    <div class="field"><div class="field-label">Barcode / SKU</div><div class="field-value mono">${p.barcode ?? '—'}</div></div>
    <div class="field"><div class="field-label">Product Type</div><div class="field-value">${p.ProductType ?? '—'}</div></div>
    <div class="field"><div class="field-label">Physical Product</div><div class="field-value">${p.isPhysical ? 'Yes' : 'No'}</div></div>
  </div>

  <!-- ═══ Pricing & Taxation ═══ -->
  <div class="section-title">Pricing & Taxation</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Cost Price</div><div class="field-value">₹${formatIndianNumber(p.costPrice, 2)}</div></div>
    <div class="field"><div class="field-label">Selling Price</div><div class="field-value accent">₹${formatIndianNumber(p.sellingPrice, 2)}</div></div>
    <div class="field"><div class="field-label">Tax / GST</div><div class="field-value">${taxLabel}</div></div>
    <div class="field"><div class="field-label">Tax Inclusive</div><div class="field-value">${p.isInclusiveTax ? 'Yes' : 'No'}</div></div>
    <div class="field"><div class="field-label">Discount Type</div><div class="field-value">${p.discountType ?? 'None'}</div></div>
    <div class="field"><div class="field-label">Discount Value</div><div class="field-value">${p.discountValue ?? '—'}</div></div>
  </div>

  <!-- ═══ Stock Settings ═══ -->
  <div class="section-title">Stock Settings</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Current Stock</div><div class="field-value">${p.currentStock} ${unitLabel} &nbsp;${stockLevel}</div></div>
    <div class="field"><div class="field-label">Reorder Level</div><div class="field-value">${p.reorderLevel ?? '—'}</div></div>
    <div class="field"><div class="field-label">Max Stock Level</div><div class="field-value">${p.maxStockLevel ?? '—'}</div></div>
    <div class="field"><div class="field-label">Status</div><div class="field-value">${p.status}</div></div>
  </div>

  ${p.description ? `
  <!-- ═══ Description ═══ -->
  <div class="section-title">Description</div>
  <div style="font-size:12px;color:#333;margin-bottom:22px;line-height:1.6;">${p.description}</div>
  ` : ''}

  <!-- ═══ Audit Information ═══ -->
  <div class="section-title">Audit Information</div>
  <div class="field-grid">
    <div class="field"><div class="field-label">Created At</div><div class="field-value">${p.createdAt ?? '—'}</div></div>
    <div class="field"><div class="field-label">Last Updated</div><div class="field-value">${p.updatedAt ?? '—'}</div></div>
  </div>

  <!-- ═══ Footer ═══ -->
  <div class="footer">
    <span>Printed by: Admin | SofaCraft ERP</span>
    <span>Confidential — For internal use only</span>
  </div>

</div>
</body>
</html>`;
}
