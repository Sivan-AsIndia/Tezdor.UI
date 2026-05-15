import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { InvoiceStatus, PaymentStatus, PurchaseInvoice } from '../purchase-invoice';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { PurchaseInvoiceDataClient } from '../purchase-invoice-data-client';
import { ToastNotifier } from '../../../../core/services/toast';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { PrintService } from '../../../../core/print/print.service';

@Component({
  selector: 'app-purchase-invoice-view',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, DecimalPipe],
  templateUrl: './purchase-invoice-view.html',
  styleUrl: './purchase-invoice-view.css',
})
export class PurchaseInvoiceViewComponent implements OnInit {

  private readonly toast        = inject(ToastNotifier);
  private readonly router       = inject(Router);
  private readonly route        = inject(ActivatedRoute);
  private readonly service      = inject(PurchaseInvoiceDataClient);
  private readonly printService = inject(PrintService);

  invoice = signal<PurchaseInvoice | null>(null);
  loading = signal<boolean>(true);   // ← NEW: loading state
  error   = signal<string | null>(null); // ← NEW: error message

  subTotal = computed(() => {
    const inv = this.invoice();
    if (!inv?.lineItems?.length) return 0;
    return inv.lineItems.reduce((sum, r) => sum + (r.qty * r.unitCost), 0);
  });

  totalTax = computed(() => {
    const inv = this.invoice();
    if (!inv?.lineItems?.length) return 0;
    return inv.lineItems.reduce((sum, r) => {
      return sum + (r.qty * r.unitCost * (r.taxPercent / 100));
    }, 0);
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('[InvoiceView] id param =', idParam); // debug

    if (!idParam || isNaN(+idParam)) {
      this.error.set('Invalid invoice ID.');
      this.loading.set(false);
      return;
    }

    try {
      const inv = this.service.getById(+idParam);
      console.log('[InvoiceView] invoice =', inv); // debug

      if (!inv) {
        this.error.set('Invoice not found.');
        this.loading.set(false);
        return;
      }

      this.invoice.set(inv);
    } catch (err) {
      console.error('[InvoiceView] error =', err);
      this.error.set('Failed to load invoice.');
    } finally {
      this.loading.set(false);
    }
  }

  invStatusBadgeClass(s: InvoiceStatus | string): string {
    const map: Record<string, string> = {
      draft:     'inv-badge-secondary',
      posted:    'inv-badge-success',
      cancelled: 'inv-badge-danger',
    };
    return map[s] ?? 'inv-badge-secondary';
  }

  payStatusBadgeClass(s: PaymentStatus | string): string {
    const map: Record<string, string> = {
      unpaid:  'inv-badge-danger',
      partial: 'inv-badge-warning',
      paid:    'inv-badge-success',
    };
    return map[s] ?? 'inv-badge-secondary';
  }

  paymentPercent(inv: PurchaseInvoice): number {
    if (!inv.grandTotal || inv.grandTotal <= 0) return 0;
    return Math.min((inv.amountPaid / inv.grandTotal) * 100, 100);
  }

  capitalize(val: string): string {
    if (!val) return '—';
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  goBack(): void  { this.router.navigate(['/purchase-invoice']); }
  goEdit(id: number): void { this.router.navigate(['/purchaseinvoice-edit', id]); }

  printPage(): void {
    const inv = this.invoice();
    if (inv) this.printService.printPurchaseInvoice(inv);
  }
}