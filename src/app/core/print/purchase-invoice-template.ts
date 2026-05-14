// ── Purchase Invoice Print Template ──────────────────────────
// Generates the HTML content for printing a Purchase Invoice.
// Layout matches the provided purchase invoice sample template.
// Meta block uses a 2-column grid layout with red border.

import { PurchaseInvoice } from '../../feature/purchase/purchase-invoice/purchase-invoice';
import { COMPANY_INFO } from './company-info';
import { PRINT_COMMON_CSS } from './print-styles';
import { amountToWords, formatIndianNumber, formatPrintDate } from './number-to-words';

/**
 * Builds the full HTML document string for a Purchase Invoice (Tax Invoice) print page.
 */
export function buildPurchaseInvoicePrintHtml(inv: PurchaseInvoice): string {

  const company = COMPANY_INFO;

  // Compute sub-total and tax from line items
  const subTotal = inv.lineItems.reduce((sum, r) => sum + r.qty * r.unitCost, 0);
  const totalTax = inv.lineItems.reduce((sum, r) => {
    return sum + (r.qty * r.unitCost * r.taxPercent / 100);
  }, 0);

  // Build line item rows
  const lineItemRows = inv.lineItems.map((item, idx) => {
    const base = item.qty * item.unitCost;
    const taxAmt = base * (item.taxPercent / 100);
    return `
      <tr>
        <td class="center">${idx + 1}</td>
        <td>
          <div style="font-weight:600;">${item.productName || '—'}</div>
          <small style="color:#666;">${item.productCode}</small>
        </td>
        <td class="center">${item.unitName}</td>
        <td class="num">${formatIndianNumber(item.qty)}</td>
        <td class="num">${formatIndianNumber(item.unitCost)}</td>
        <td class="center">${item.taxPercent}%</td>
        <td class="num">${formatIndianNumber(taxAmt, 2)}</td>
        <td class="num">${formatIndianNumber(item.lineTotal)}</td>
      </tr>`;
  }).join('');

  // Pad with empty rows
  const minRows = 6;
  const emptyCount = Math.max(0, minRows - inv.lineItems.length);
  const emptyRows = Array(emptyCount).fill(
    `<tr class="empty-row">
      <td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>`
  ).join('');

  // Group taxes by HSN/rate for the tax breakdown table
  interface TaxGroup {
    taxPercent: number;
    taxable: number;
    centralTax: number;
    stateTax: number;
  }

  const taxGroups = new Map<number, TaxGroup>();
  for (const item of inv.lineItems) {
    const base = item.qty * item.unitCost;
    const halfTax = base * (item.taxPercent / 100) / 2;
    const existing = taxGroups.get(item.taxPercent);
    if (existing) {
      existing.taxable += base;
      existing.centralTax += halfTax;
      existing.stateTax += halfTax;
    } else {
      taxGroups.set(item.taxPercent, {
        taxPercent: item.taxPercent,
        taxable: base,
        centralTax: halfTax,
        stateTax: halfTax,
      });
    }
  }

  // Build tax breakdown rows
  let taxBreakdownRows = '';
  let totalTaxable = 0;
  let totalCentral = 0;
  let totalState = 0;
  let totalTaxAmt = 0;

  for (const [, group] of taxGroups) {
    const totalForGroup = group.centralTax + group.stateTax;
    taxBreakdownRows += `
      <tr>
        <td class="num">${formatIndianNumber(group.taxable)}</td>
        <td class="center">${group.taxPercent / 2}%</td>
        <td class="num">${formatIndianNumber(group.centralTax)}</td>
        <td class="center">${group.taxPercent / 2}%</td>
        <td class="num">${formatIndianNumber(group.stateTax)}</td>
        <td class="num">${formatIndianNumber(totalForGroup)}</td>
      </tr>`;
    totalTaxable += group.taxable;
    totalCentral += group.centralTax;
    totalState += group.stateTax;
    totalTaxAmt += totalForGroup;
  }

  // Freight / custom duty extras
  const freightCharges = inv.freightCharges ?? 0;
  const customDuty = inv.customDuty ?? 0;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Purchase Invoice - ${inv.invoiceNo}</title>
  <style>${PRINT_COMMON_CSS}</style>
</head>
<body onload="window.print();">
  <div class="print-page">

    <!-- ═══ Document Title ═══ -->
    <div class="doc-title">Tax Invoice</div>
    <div class="doc-copy-label">(TRIPLICATE FOR SUPPLIER)</div>

    <!-- ═══ Seller Info + Invoice Meta (2-Column Grid) ═══ -->
    <div class="header-section">
      <div class="company-block">
        <div class="company-name">${company.name}</div>
        <div class="company-detail">
          ${company.addressLine1}<br>
          ${company.addressLine2}<br>
          GSTIN: ${company.gstin}
        </div>
      </div>
      <div class="meta-block">
        <div class="meta-grid">
          <div class="meta-cell">
            <span class="meta-label">Invoice No.</span>
            <span class="meta-value highlight">${inv.invoiceNo}</span>
          </div>
          <div class="meta-cell">
            <span class="meta-label">Supplier Inv No.</span>
            <span class="meta-value">${inv.supplierInvoiceNo || '—'}</span>
          </div>
          <div class="meta-cell">
            <span class="meta-label">Invoice Date</span>
            <span class="meta-value">${formatPrintDate(inv.invoiceDate)}</span>
          </div>
          <div class="meta-cell">
            <span class="meta-label">Payment Due Date</span>
            <span class="meta-value">${formatPrintDate(inv.paymentDueDate)}</span>
          </div>
          <div class="meta-cell">
            <span class="meta-label">Invoice Status</span>
            <span class="meta-value">${inv.invoiceStatus.charAt(0).toUpperCase() + inv.invoiceStatus.slice(1)}</span>
          </div>
          <div class="meta-cell">
            <span class="meta-label">Payment Status</span>
            <span class="meta-value">${inv.paymentStatus.charAt(0).toUpperCase() + inv.paymentStatus.slice(1)}</span>
          </div>
          ${inv.poRef ? `
          <div class="meta-cell meta-cell--full">
            <span class="meta-label">PO Reference</span>
            <span class="meta-value">${inv.poRef}</span>
          </div>` : ''}
        </div>
      </div>
    </div>

    <!-- ═══ Supplier (Bill To) & Consignee (Ship To) ═══ -->
    <div class="party-section">
      <div class="party-block">
        <div class="party-title">Supplier (Bill to)</div>
        <div class="party-name">${inv.supplierName}</div>
        <div>Supplier Code: ${inv.supplierCode}</div>
      </div>
      <div class="party-block">
        <div class="party-title">Consignee (Ship to)</div>
        <div class="party-name">${company.name}</div>
        <div>${company.addressLine1}</div>
        <div>${company.addressLine2}</div>
        <div class="party-gstin">GSTIN: ${company.gstin}</div>
      </div>
    </div>

    <!-- ═══ Line Items Table ═══ -->
    <table class="items-table">
      <thead>
        <tr>
          <th class="center" style="width:35px">Sl No.</th>
          <th>Name &amp; Description of Goods</th>
          <th class="center">Unit</th>
          <th class="num">Quantity</th>
          <th class="num">Rate</th>
          <th class="center">Tax %</th>
          <th class="num">Tax Amt (₹)</th>
          <th class="num">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${lineItemRows}
        ${emptyRows}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-right"><strong>Sub-Total</strong></td>
          <td></td>
          <td class="num">${formatIndianNumber(totalTax, 2)}</td>
          <td class="num">${formatIndianNumber(subTotal)}</td>
        </tr>
      </tfoot>
    </table>

    <!-- ═══ Tax Summary Rows (CGST, SGST) ═══ -->
    <table class="items-table" style="border-top:none;">
      <tbody>
        <tr>
          <td colspan="5" class="text-right"><strong>CGST on Sales</strong></td>
          <td class="center">${taxGroups.size === 1 ? `${[...taxGroups.values()][0].taxPercent / 2}%` : 'Mixed'}</td>
          <td colspan="2" class="num">${formatIndianNumber(totalCentral, 2)}</td>
        </tr>
        <tr>
          <td colspan="5" class="text-right"><strong>SGST on Sales</strong></td>
          <td class="center">${taxGroups.size === 1 ? `${[...taxGroups.values()][0].taxPercent / 2}%` : 'Mixed'}</td>
          <td colspan="2" class="num">${formatIndianNumber(totalState, 2)}</td>
        </tr>
        ${freightCharges > 0 ? `
        <tr>
          <td colspan="6" class="text-right"><strong>${inv.freightLabel || 'Freight Charges'}</strong></td>
          <td colspan="2" class="num">${formatIndianNumber(freightCharges, 2)}</td>
        </tr>` : ''}
        ${customDuty > 0 ? `
        <tr>
          <td colspan="6" class="text-right"><strong>${inv.customDutyLabel || 'Custom Duty'}</strong></td>
          <td colspan="2" class="num">${formatIndianNumber(customDuty, 2)}</td>
        </tr>` : ''}
        <tr style="background:#f0f0f0; font-weight:700;">
          <td colspan="5" class="text-right"><strong>Total</strong></td>
          <td></td>
          <td colspan="2" class="num" style="font-size:13px; color:#c0392b;">${formatIndianNumber(inv.grandTotal)}</td>
        </tr>
      </tbody>
    </table>

    <!-- ═══ Amount in Words ═══ -->
    <div style="border:1px solid #333; border-top:none; padding:6px 12px; font-size:11px;">
      <strong>Amount Chargeable (in words):</strong><br>
      <em>${amountToWords(inv.grandTotal)}</em>
    </div>

    <!-- ═══ Tax Breakdown Table (HSN-wise) ═══ -->
    <table class="tax-table">
      <thead>
        <tr>
          <th>Taxable Value</th>
          <th colspan="2">Central Tax</th>
          <th colspan="2">State Tax</th>
          <th>Total Tax Amount</th>
        </tr>
        <tr>
          <th></th>
          <th>Rate</th>
          <th>Amount</th>
          <th>Rate</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${taxBreakdownRows}
        <tr style="font-weight:700; background:#f0f0f0;">
          <td class="num">${formatIndianNumber(totalTaxable)}</td>
          <td></td>
          <td class="num">${formatIndianNumber(totalCentral)}</td>
          <td></td>
          <td class="num">${formatIndianNumber(totalState)}</td>
          <td class="num">${formatIndianNumber(totalTaxAmt)}</td>
        </tr>
      </tbody>
    </table>

    <!-- ═══ Tax in Words ═══ -->
    <div style="border:1px solid #333; border-top:none; padding:6px 12px; font-size:11px;">
      <strong>Tax Amount (in words):</strong>
      <em>${amountToWords(totalTaxAmt)}</em>
    </div>

    <!-- ═══ Payment Summary ═══ -->
    <div class="totals-section" style="border-top: none;">
      <div class="totals-grid">
        <table class="totals-table">
          <tr>
            <td>Grand Total</td>
            <td>₹ ${formatIndianNumber(inv.grandTotal, 2)}</td>
          </tr>
          <tr>
            <td>Amount Paid</td>
            <td style="color:#27ae60;">₹ ${formatIndianNumber(inv.amountPaid, 2)}</td>
          </tr>
          <tr class="grand-row">
            <td>Balance Due</td>
            <td style="color:${inv.balanceDue > 0 ? '#c0392b' : '#27ae60'};">
              ₹ ${formatIndianNumber(inv.balanceDue, 2)}
            </td>
          </tr>
        </table>
      </div>
    </div>

    ${inv.notes ? `
    <!-- ═══ Notes ═══ -->
    <div style="border:1px solid #333; border-top:none; padding:6px 12px; font-size:11px;">
      <strong>Notes / Remarks:</strong> ${inv.notes}
    </div>` : ''}

    <!-- ═══ Declaration + Bank Details ═══ -->
    <div class="footer-section">
      <div class="declaration-block">
        <strong>Declaration</strong><br>
        We declare that this invoice shows the actual price of
        the goods described and that all particulars are true and
        correct.
      </div>
      <div class="bank-block">
        <div class="bank-title">Company's Bank Details</div>
        <div class="bank-row">
          <span class="bank-label">Bank Name</span>
          <span class="bank-value">: ${company.bankName}</span>
        </div>
        <div class="bank-row">
          <span class="bank-label">A/c No.</span>
          <span class="bank-value">: ${company.bankAccountNo}</span>
        </div>
        <div class="bank-row">
          <span class="bank-label">Branch &amp; IFSC Code</span>
          <span class="bank-value">: ${company.bankIfsc}</span>
        </div>
      </div>
    </div>

    <!-- ═══ Signatures ═══ -->
    <div class="signature-section">
      <div class="signature-label">Customer's Seal and Signature</div>
      <div style="text-align:right;">
        <small>for ${company.name}</small><br><br>
        <div class="signature-label">Authorised Signatory</div>
      </div>
    </div>

    <!-- ═══ Footer Notice ═══ -->
    <div class="generated-notice">
      This is a Computer Generated Invoice
    </div>

  </div>
</body>
</html>`;
}
