import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { InvoiceStatus, PaymentStatus, PurchaseInvoice } from '../purchase-invoice';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { PurchaseInvoiceDataClient } from '../purchase-invoice-data-client';
import { ToastNotifier } from '../../../../core/services/toast';
import { CommonModule } from '@angular/common';
import { PrintService } from '../../../../core/print/print.service';

@Component({
  selector: 'app-purchase-invoice-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './purchase-invoice-view.html',
  styleUrl: './purchase-invoice-view.css',
})
export class PurchaseInvoiceViewComponent implements OnInit {

  private readonly toast   = inject(ToastNotifier);
  private readonly router  = inject(Router);
  private readonly route   = inject(ActivatedRoute);
  private readonly service = inject(PurchaseInvoiceDataClient);
  private readonly printService = inject(PrintService);

  invoice = signal<PurchaseInvoice | null>(null);

  subTotal = computed(() => {
    const inv = this.invoice();
    if (!inv) return 0;
    return inv.lineItems.reduce((sum, r) => sum + r.qty * r.unitCost, 0);
  });

  totalTax = computed(() => {
    const inv = this.invoice();
    if (!inv) return 0;
    return inv.lineItems.reduce((sum, r) => {
      const base = r.qty * r.unitCost;
      return sum + base * (r.taxPercent / 100);
    }, 0);
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.toast.error('Invalid invoice ID.');
      this.router.navigate(['/purchase-invoice']);
      return;
    }

    const inv = this.service.getById(+idParam);
    if (!inv) {
      this.toast.error('Invoice not found.');
      this.router.navigate(['/purchase-invoice']);
      return;
    }

    this.invoice.set(inv);
  }
  invStatusBadgeClass(s: InvoiceStatus | string): string {
    const map: Record<string, string> = {
      draft:     'bg-lightsecondary text-secondary',
      posted:    'bg-lightsuccess text-success',
      cancelled: 'bg-lighterror text-error',
    };
    return map[s] ?? '';
  }

  payStatusBadgeClass(s: PaymentStatus | string): string {
    const map: Record<string, string> = {
      unpaid:  'bg-lighterror text-error',
      partial: 'bg-lightwarning text-warning',
      paid:    'bg-lightsuccess text-success',
    };
    return map[s] ?? '';
  }

  capitalize(val: string): string {
    if (!val) return '—';
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  goBack(): void { this.router.navigate(['/purchase-invoice']); }

  goEdit(id: number): void { this.router.navigate(['/purchaseinvoice-edit', id]); }

  printPage(): void {
    const inv = this.invoice();
    if (inv) {
      this.printService.printPurchaseInvoice(inv);
    }
  }
}
