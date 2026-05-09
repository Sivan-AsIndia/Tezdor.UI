// ── Sales Invoice Print Template ─────────────────────────────
// Generates the HTML content for printing a Sales Invoice.
// Layout matches the provided Invoice_Sample.jpg template.
// Includes all details from the sales-invoice-view page:
//   Company info, customer (Bill To / Ship To), line items,
//   tax summary (CGST/SGST/IGST), payment info, notes, and signatures.

import { SalesInvoice } from '../../feature/sales/sales-invoice';
import { COMPANY_INFO } from './company-info';
import { PRINT_COMMON_CSS } from './print-styles';
import { amountToWords, formatIndianNumber, formatPrintDate } from './number-to-words';

/**
 * Builds the full HTML document string for a Sales Invoice (Tax Invoice) print page.
 * Opens in a new browser window and triggers the native print dialog.
 *
 * @param inv - The SalesInvoice data object to print.
 * @returns   A complete HTML document string.
 */
export function buildSalesInvoicePrintHtml(inv: SalesInvoice): string {

  const company = COMPANY_INFO;

  // ── Compute line-item totals ───────────────────────────────
  const subTotal = inv.taxSummary.subTotal ?? inv.lineItems.reduce(
    (sum, r) => sum + (r.taxableAmount || r.quantity * r.unitPrice), 0,
  );

  const totalTaxAmount = inv.taxSummary.totalTaxAmount ?? inv.lineItems.reduce(
    (sum, r) => sum + r.cgstAmount + r.sgstAmount + r.igstAmount, 0,
  );

  // ── Build line-item rows ───────────────────────────────────
  const lineItemRows = inv.lineItems.map((item, idx) => {
    const taxAmt = item.cgstAmount + item.sgstAmount + item.igstAmount;
    const discountDisplay = item.discountPercent > 0 ? `${item.discountPercent}%` : '—';

    return `
      <tr>
        <td class="center">${idx + 1}</td>
        <td>
          <div style="font-weight:600;">${item.itemName || '—'}</div>
          <small style="color:#666;">${item.productCode}</small>
        </td>
        <td class="center">${item.hsnSacCode || '—'}</td>
        <td class="num">${formatIndianNumber(item.quantity, 0)}</td>
        <td class="center">${item.unitOfMeasure}</td>
        <td class="num">${formatIndianNumber(item.unitPrice, 2)}</td>
        <td class="center">${discountDisplay}</td>
        <td class="num">${formatIndianNumber(item.taxableAmount, 2)}</td>
        <td class="center">${item.gstRate}%</td>
        <td class="num">${formatIndianNumber(taxAmt, 2)}</td>
        <td class="num">${formatIndianNumber(item.lineTotal, 2)}</td>
      </tr>`;
  }).join('');

  // Pad with empty rows so the table looks consistent
  const minRows = 6;
  const emptyCount = Math.max(0, minRows - inv.lineItems.length);
  const emptyRows = Array(emptyCount).fill(
    `<tr class="empty-row">
      <td>&nbsp;</td><td></td><td></td><td></td><td></td>
      <td></td><td></td><td></td><td></td><td></td><td></td>
    </tr>`,
  ).join('');

  // ── Group taxes by GST rate for the tax breakdown table ────
  interface TaxGroup {
    gstRate:     number;
    taxable:     number;
    centralTax:  number;
    stateTax:    number;
    igst:        number;
  }

  const taxGroups = new Map<number, TaxGroup>();

  for (const item of inv.lineItems) {
    const existing = taxGroups.get(item.gstRate);
    if (existing) {
      existing.taxable    += item.taxableAmount;
      existing.centralTax += item.cgstAmount;
      existing.stateTax   += item.sgstAmount;
      existing.igst       += item.igstAmount;
    } else {
      taxGroups.set(item.gstRate, {
        gstRate:    item.gstRate,
        taxable:    item.taxableAmount,
        centralTax: item.cgstAmount,
        stateTax:   item.sgstAmount,
        igst:       item.igstAmount,
      });
    }
  }

  // Build tax breakdown rows
  let taxBreakdownRows = '';
  let totalTaxable = 0;
  let totalCentral = 0;
  let totalState   = 0;
  let totalIGST    = 0;
  let totalTaxAmt  = 0;

  for (const [, group] of taxGroups) {
    const totalForGroup = group.centralTax + group.stateTax + group.igst;
    taxBreakdownRows += `
      <tr>
        <td class="num">${formatIndianNumber(group.taxable, 2)}</td>
        <td class="center">${group.gstRate / 2}%</td>
        <td class="num">${formatIndianNumber(group.centralTax, 2)}</td>
        <td class="center">${group.gstRate / 2}%</td>
        <td class="num">${formatIndianNumber(group.stateTax, 2)}</td>
        <td class="num">${formatIndianNumber(totalForGroup, 2)}</td>
      </tr>`;
    totalTaxable += group.taxable;
    totalCentral += group.centralTax;
    totalState   += group.stateTax;
    totalIGST    += group.igst;
    totalTaxAmt  += totalForGroup;
  }

  // ── Resolve invoice type label ─────────────────────────────
  const invoiceTypeLabel: Record<string, string> = {
    tax_invoice: 'Tax Invoice',
    proforma:    'Proforma Invoice',
    credit_note: 'Credit Note',
  };
  const docTitle = invoiceTypeLabel[inv.invoiceType] ?? 'Tax Invoice';

  // ── Payment terms label ────────────────────────────────────
  const paymentTermsLabel: Record<string, string> = {
    net30:   'Net 30 Days',
    net15:   'Net 15 Days',
    net60:   'Net 60 Days',
    advance: 'Advance',
    cod:     'Cash on Delivery',
  };
  const payTerms = paymentTermsLabel[inv.payment.paymentTerms] ?? inv.payment.paymentTerms ?? '—';

  // ── Payment mode label ─────────────────────────────────────
  const paymentModeLabel: Record<string, string> = {
    neft:   'NEFT',
    upi:    'UPI',
    cash:   'Cash',
    cheque: 'Cheque',
    card:   'Card',
  };
  const payMode = inv.payment.paymentMode
    ? (paymentModeLabel[inv.payment.paymentMode] ?? inv.payment.paymentMode)
    : '—';

  // ── Grand total & round off ────────────────────────────────
  const grandTotal   = inv.taxSummary.grandTotal;
  const roundOff     = inv.taxSummary.roundOff ?? 0;
  const invoiceTotal = inv.taxSummary.invoiceTotal ?? grandTotal;

  // ── Build the full HTML document ───────────────────────────
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sales Invoice - ${inv.invoiceNumber}</title>
  <style>${PRINT_COMMON_CSS}</style>
</head>
<body onload="window.print();">
  <div class="print-page">

    <!-- ═══ Document Title ═══ -->
    <div class="doc-title">${docTitle}</div>
    <div class="doc-copy-label">(TRIPLICATE FOR SUPPLIER)</div>

    <!-- ═══ Company Info + Invoice Meta ═══ -->
    <div class="header-section">
      <div class="company-block">
        <div class="company-name">${inv.companyName || company.name}</div>
        <div class="company-detail">
          ${inv.companyAddress || (company.addressLine1 + '<br>' + company.addressLine2)}<br>
          GSTIN: ${inv.companyGSTIN || company.gstin}
          ${inv.companyPAN ? ' · PAN: ' + inv.companyPAN : ''}
        </div>
        ${inv.companyPhone || inv.companyEmail ? `
        <div class="company-detail" style="margin-top:2px;">
          ${inv.companyPhone ? '☎ ' + inv.companyPhone : ''}
          ${inv.companyPhone && inv.companyEmail ? ' · ' : ''}
          ${inv.companyEmail ? '✉ ' + inv.companyEmail : ''}
        </div>` : ''}
      </div>
      <div class="meta-block">
        <div class="meta-row">
          <span class="meta-label">Invoice No.</span>
          <span class="meta-value" style="color:#1a5276;">${inv.invoiceNumber}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Invoice Date</span>
          <span class="meta-value">${formatPrintDate(inv.invoiceDate)}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Due Date</span>
          <span class="meta-value">${formatPrintDate(inv.dueDate??undefined)}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Financial Year</span>
          <span class="meta-value">${inv.financialYear || '—'}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Invoice Status</span>
          <span class="meta-value">${capitalize(inv.status)}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Payment Status</span>
          <span class="meta-value">${capitalize(inv.payment.paymentStatus)}</span>
        </div>
        ${inv.referencePONo ? `
        <div class="meta-row">
          <span class="meta-label">PO Reference</span>
          <span class="meta-value">${inv.referencePONo}</span>
        </div>` : ''}
        <div class="meta-row">
          <span class="meta-label">Payment Terms</span>
          <span class="meta-value">${payTerms}</span>
        </div>
      </div>
    </div>

    <!-- ═══ Customer (Bill To) & Ship To ═══ -->
    <div class="party-section">
      <div class="party-block">
        <div class="party-title">Bill To</div>
        <div class="party-name">${inv.customerName}</div>
        <div>${inv.billingAddress}</div>
        ${inv.cityStatePincode ? `<div>${inv.cityStatePincode}</div>` : ''}
        ${inv.customerGSTIN ? `<div class="party-gstin">GSTIN: ${inv.customerGSTIN}</div>` : ''}
        ${inv.customerPAN ? `<div>PAN: ${inv.customerPAN}</div>` : ''}
        ${inv.phoneEmail ? `<div>${inv.phoneEmail}</div>` : ''}
      </div>
      <div class="party-block">
        <div class="party-title">Ship To</div>
        <div class="party-name">${inv.customerName}</div>
        <div>${inv.shippingAddress || inv.billingAddress}</div>
        ${inv.placeOfSupply ? `<div>Place of Supply: ${inv.placeOfSupply}</div>` : ''}
      </div>
    </div>

    <!-- ═══ Line Items Table ═══ -->
    <table class="items-table">
      <thead>
        <tr>
          <th class="center" style="width:35px">Sl No.</th>
          <th>Name &amp; Description of Goods</th>
          <th class="center">HSN/SAC</th>
          <th class="num">Qty</th>
          <th class="center">Unit</th>
          <th class="num">Rate (₹)</th>
          <th class="center">Disc.</th>
          <th class="num">Taxable (₹)</th>
          <th class="center">GST %</th>
          <th class="num">Tax (₹)</th>
          <th class="num">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        ${lineItemRows}
        ${emptyRows}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="7" class="text-right"><strong>Sub-Total</strong></td>
          <td class="num">${formatIndianNumber(subTotal, 2)}</td>
          <td></td>
          <td class="num">${formatIndianNumber(totalTaxAmount, 2)}</td>
          <td class="num">${formatIndianNumber(subTotal + totalTaxAmount, 2)}</td>
        </tr>
      </tfoot>
    </table>

    <!-- ═══ Tax Summary Rows (CGST, SGST, IGST) ═══ -->
    <table class="items-table" style="border-top:none;">
      <tbody>
        ${inv.taxSummary.totalCGST > 0 ? `
        <tr>
          <td colspan="8" class="text-right"><strong>CGST on Sales</strong></td>
          <td class="center">${taxGroups.size === 1 ? `${[...taxGroups.values()][0].gstRate / 2}%` : 'Mixed'}</td>
          <td colspan="2" class="num">${formatIndianNumber(inv.taxSummary.totalCGST, 2)}</td>
        </tr>` : ''}
        ${inv.taxSummary.totalSGST > 0 ? `
        <tr>
          <td colspan="8" class="text-right"><strong>SGST on Sales</strong></td>
          <td class="center">${taxGroups.size === 1 ? `${[...taxGroups.values()][0].gstRate / 2}%` : 'Mixed'}</td>
          <td colspan="2" class="num">${formatIndianNumber(inv.taxSummary.totalSGST, 2)}</td>
        </tr>` : ''}
        ${inv.taxSummary.totalIGST > 0 ? `
        <tr>
          <td colspan="8" class="text-right"><strong>IGST on Sales</strong></td>
          <td class="center">${taxGroups.size === 1 ? `${[...taxGroups.values()][0].gstRate}%` : 'Mixed'}</td>
          <td colspan="2" class="num">${formatIndianNumber(inv.taxSummary.totalIGST, 2)}</td>
        </tr>` : ''}
        ${roundOff !== 0 ? `
        <tr>
          <td colspan="9" class="text-right"><strong>Round Off</strong></td>
          <td colspan="2" class="num">${roundOff >= 0 ? '+' : ''}${formatIndianNumber(roundOff, 2)}</td>
        </tr>` : ''}
        <tr style="background:#f0f0f0; font-weight:700;">
          <td colspan="8" class="text-right"><strong>Grand Total</strong></td>
          <td></td>
          <td colspan="2" class="num" style="font-size:13px; color:#c0392b;">
            ₹ ${formatIndianNumber(grandTotal, 2)}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ═══ Amount in Words ═══ -->
    <div style="border:1px solid #333; border-top:none; padding:6px 12px; font-size:11px;">
      <strong>Amount Chargeable (in words):</strong><br>
      <em>${inv.taxSummary.amountInWords || amountToWords(grandTotal)}</em>
    </div>

    <!-- ═══ Tax Breakdown Table (GST-rate wise) ═══ -->
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
          <td class="num">${formatIndianNumber(totalTaxable, 2)}</td>
          <td></td>
          <td class="num">${formatIndianNumber(totalCentral, 2)}</td>
          <td></td>
          <td class="num">${formatIndianNumber(totalState, 2)}</td>
          <td class="num">${formatIndianNumber(totalTaxAmt, 2)}</td>
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
            <td>₹ ${formatIndianNumber(grandTotal, 2)}</td>
          </tr>
          <tr>
            <td>Amount Paid</td>
            <td style="color:#27ae60;">₹ ${formatIndianNumber(inv.payment.amountPaid, 2)}</td>
          </tr>
          ${inv.payment.paymentMode ? `
          <tr>
            <td>Payment Mode</td>
            <td>${payMode}</td>
          </tr>` : ''}
          ${inv.payment.transactionRefNo ? `
          <tr>
            <td>Transaction Ref</td>
            <td>${inv.payment.transactionRefNo}</td>
          </tr>` : ''}
          <tr class="grand-row">
            <td>Balance Due</td>
            <td style="color:${inv.payment.balanceDue > 0 ? '#c0392b' : '#27ae60'};">
              ₹ ${formatIndianNumber(inv.payment.balanceDue, 2)}
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
        <small>for ${inv.companyName || company.name}</small><br><br>
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

/** Helper: capitalize first letter of a string. */
function capitalize(val: string): string {
  if (!val) return '—';
  return val.charAt(0).toUpperCase() + val.slice(1).replace(/_/g, ' ');
}
