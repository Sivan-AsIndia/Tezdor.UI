// ── Product Detail Print Component ───────────────────────────
// Standalone Angular component placeholder for the product print template.
// Primary print flow uses PrintService (opens new window).

import { Component, input } from '@angular/core';
import { Product } from '../../../feature/product/product';

@Component({
  selector: 'app-product-detail-print',
  standalone: true,
  template: `
    <div class="print-preview-placeholder text-center text-muted p-4">
      <i class="ti ti-printer" style="font-size:48px;"></i>
      <p class="mt-2">Product detail print uses a dedicated print window.</p>
      <p>Click the <strong>Print</strong> button on the detail page to generate the document.</p>
    </div>
  `,
})
export class ProductDetailPrintComponent {
  /** The Product data to be printed. */
  product = input.required<Product>();
}
