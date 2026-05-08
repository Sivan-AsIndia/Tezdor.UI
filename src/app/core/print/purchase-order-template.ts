// ── Purchase Order Print Template ─────────────────────────────
// Generates the HTML content for printing a Purchase Order.
// Layout matches the provided Order_Sample.jpg template.

import { PurchaseOrder, PAYMENT_TERMS_OPTIONS, DELIVERY_OPTIONS } from '../../feature/purchase/purchase-order/purchase-order';
import { COMPANY_INFO } from './company-info';
import { PRINT_COMMON_CSS } from './print-styles';
import { amountToWords, formatIndianNumber, formatPrintDate } from './number-to-words';

/**
 * Builds the full HTML document string for a Purchase Order print page.
 * The generated HTML opens in a new window and triggers the browser print dialog.
 */
export function buildPurchaseOrderPrintHtml(po: PurchaseOrder): string {

  const company = COMPANY_INFO;

  // Resolve labels for payment terms and delivery method
  const paymentLabel = PAYMENT_TERMS_OPTIONS.find(p => p.value === po.paymentTerms)?.label ?? po.paymentTerms ?? '—';
  const deliveryLabel = DELIVERY_OPTIONS.find(d => d.value === po.deliveryMethod)?.label ?? po.deliveryMethod ?? '—';

  // Compute CGST and SGST (split GST 50/50 for intra-state)
  const halfTax = po.taxAmount / 2;

  // Determine the dominant tax rate from line items
  const taxRates = [...new Set(po.lineItems.map(li => li.taxPercent))];
  const taxRateLabel = taxRates.length === 1 ? `${taxRates[0]}%` : 'Mixed';
  const halfRateLabel = taxRates.length === 1 ? `${taxRates[0] / 2}%` : 'Mixed';

  // Valid Until: order date + 15 days (as shown in sample)
  const orderDate = new Date(po.orderDate);
  const validUntil = new Date(orderDate);
  validUntil.setDate(validUntil.getDate() + 15);

  // Build line item rows
  const lineItemRows = po.lineItems.map((item, idx) => {
    const taxableValue = item.quantity * item.unitPrice - item.discount;
    const cgst = taxableValue * (item.taxPercent / 100) / 2;
    const sgst = cgst;
    const amount = taxableValue + cgst + sgst;

    return `
      <tr>
        <td class="center">${idx + 1}</td>
        <td>${item.productName}</td>
        <td class="center">${item.productCode || '—'}</td>
        <td class="center">${item.quantity}<br><small>${item.unitName}</small></td>
        <td class="num">${formatIndianNumber(item.unitPrice)}</td>
        <td class="num">${formatIndianNumber(taxableValue)}</td>
        <td class="num">${formatIndianNumber(cgst)}<br><small>${item.taxPercent / 2}%</small></td>
        <td class="num">${formatIndianNumber(sgst)}<br><small>${item.taxPercent / 2}%</small></td>
        <td class="num">${formatIndianNumber(amount)}</td>
      </tr>`;
  }).join('');

  // Pad with empty rows to maintain table height (minimum 8 rows)
  const minRows = 8;
  const emptyCount = Math.max(0, minRows - po.lineItems.length);
  const emptyRows = Array(emptyCount).fill(
    `<tr class="empty-row">
      <td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>`
  ).join('');

  // Compute taxable value total
  const totalTaxable = po.subTotal - po.discountAmount;

  // Shipping address or default
  const shippingAddr = po.shippingAddress || `${company.addressLine1} ${company.addressLine2}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Purchase Order - ${po.poNumber}</title>
  <style>${PRINT_COMMON_CSS}</style>
</head>
<body onload="window.print();">
  <div class="print-page">

    <!-- ═══ Document Title ═══ -->
    <div class="doc-title">Purchase Order</div>
    <div class="doc-copy-label">Original Copy</div>

    <!-- ═══ Company + PO Meta ═══ -->
    <div class="header-section">
      <div class="company-block">
        <div class="company-name">${company.name}</div>
        <div class="company-detail">
          ${company.addressLine1}<br>
          ${company.addressLine2}<br>
          ${company.phone}<br>
          <strong>GSTIN:</strong> ${company.gstin}
        </div>
      </div>
      <div class="meta-block">
        <div class="meta-row">
          <span class="meta-label">PO No:</span>
          <span class="meta-value" style="color:#1a5276; font-size:13px;">${po.poNumber}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Amount Due:</span>
          <span class="meta-value amount">INR ${formatIndianNumber(po.grandTotal)}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Issue Date:</span>
          <span class="meta-value">${formatPrintDate(po.orderDate)}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Valid Until:</span>
          <span class="meta-value">${formatPrintDate(validUntil.toISOString())}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Expected Delivery:</span>
          <span class="meta-value">${formatPrintDate(po.expectedDate)}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Payment Terms:</span>
          <span class="meta-value">${paymentLabel}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Delivery Method:</span>
          <span class="meta-value">${deliveryLabel}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Status:</span>
          <span class="meta-value">${po.status.charAt(0).toUpperCase() + po.status.slice(1)}</span>
        </div>
      </div>
    </div>

    <!-- ═══ Vendor (Bill To) & Shipping (Ship To) ═══ -->
    <div class="party-section">
      <div class="party-block">
        <div class="party-title">Vendor (Bill to)</div>
        <div class="party-name">${po.vendorName}</div>
        <div>Vendor Code: ${po.vendorCode}</div>
        ${po.vendorAddress ? `<div>${po.vendorAddress}</div>` : ''}
        ${po.vendorGst ? `<div class="party-gstin">GSTIN: ${po.vendorGst}</div>` : ''}
      </div>
      <div class="party-block">
        <div class="party-title">Ship To</div>
        <div class="party-name">${company.name}</div>
        <div>${shippingAddr}</div>
        <div class="party-gstin">GSTIN: ${company.gstin}</div>
      </div>
    </div>

    <!-- ═══ Line Items Table ═══ -->
    <table class="items-table">
      <thead>
        <tr>
          <th class="center" style="width:35px">S.No</th>
          <th>Item</th>
          <th class="center">Code</th>
          <th class="center">Qty UoM</th>
          <th class="num">Price (INR)</th>
          <th class="num">Taxable Value (INR)</th>
          <th class="num">CGST (INR)</th>
          <th class="num">SGST (INR)</th>
          <th class="num">Amount (INR)</th>
        </tr>
      </thead>
      <tbody>
        ${lineItemRows}
        ${emptyRows}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-right"><strong>Total @${taxRateLabel}</strong></td>
          <td class="num"></td>
          <td class="num">${formatIndianNumber(totalTaxable)}</td>
          <td class="num">${formatIndianNumber(halfTax)}</td>
          <td class="num">${formatIndianNumber(halfTax)}</td>
          <td class="num">${formatIndianNumber(po.grandTotal)}</td>
        </tr>
      </tfoot>
    </table>

    <!-- ═══ Totals Summary ═══ -->
    <div class="totals-section">
      <div class="totals-grid">
        <table class="totals-table">
          <tr>
            <td>Total Taxable Value</td>
            <td>₹ ${formatIndianNumber(totalTaxable)}</td>
          </tr>
          ${po.discountAmount > 0 ? `
          <tr>
            <td>Total Discount</td>
            <td style="color:#c0392b;">− ₹ ${formatIndianNumber(po.discountAmount)}</td>
          </tr>` : ''}
          <tr>
            <td>Total Tax Amount</td>
            <td>₹ ${formatIndianNumber(po.taxAmount)}</td>
          </tr>
          ${po.shippingCharge > 0 ? `
          <tr>
            <td>Shipping Charge</td>
            <td>₹ ${formatIndianNumber(po.shippingCharge)}</td>
          </tr>` : ''}
          <tr class="grand-row">
            <td>Total Value (in figure)</td>
            <td>₹ ${formatIndianNumber(po.grandTotal)}</td>
          </tr>
        </table>
      </div>
      <div class="amount-words mt-2">
        <strong>Total Value (in words):</strong> ${amountToWords(po.grandTotal)}
      </div>
    </div>

    ${po.notes ? `
    <!-- ═══ Notes ═══ -->
    <div style="border:1px solid #333; border-top:none; padding:6px 12px; font-size:11px;">
      <strong>Notes / Remarks:</strong> ${po.notes}
    </div>` : ''}

    <!-- ═══ Signatures ═══ -->
    <div class="signature-section">
      <div class="signature-label">Provider Signature</div>
      <div class="signature-label">Receiver Signature</div>
    </div>

    <!-- ═══ Footer Notice ═══ -->
    <div class="generated-notice">
      This is a Computer Generated Purchase Order
    </div>

  </div>
</body>
</html>`;
}
