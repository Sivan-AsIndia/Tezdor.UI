import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import {
  PurchaseOrder,
  POStatus,
  PAYMENT_TERMS_OPTIONS,
  DELIVERY_OPTIONS,
  STATUS_OPTIONS,
} from '../purchase-order';
import { ToastNotifier } from '../../../../core/services/toast';
import { PurchaseOrderDataClient } from '../purchase-order-data-client';
import { PrintService } from '../../../../core/print/print.service';

@Component({
  selector: 'app-purchaseorderview',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink],
  templateUrl: './purchase-order-view.html',
  styleUrl: './purchase-order-view.css',
})
export class PurchaseOrderViewComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toast = inject(ToastNotifier);
  private service = inject(PurchaseOrderDataClient);
  private printService = inject(PrintService);

  po!: PurchaseOrder;

  paymentTermsOptions = PAYMENT_TERMS_OPTIONS;
  deliveryOptions = DELIVERY_OPTIONS;
  statusOptions = STATUS_OPTIONS;

  activeTab = signal<'overview' | 'vendor' | 'lineitems' | 'summary'>('overview');


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.toast.error('Invalid Purchase Order ID.');
      this.router.navigate(['/purchase-order']);
      return;
    }
    const found = this.service.getById(+id);
    if (!found) {
      this.toast.error('Purchase Order not found.');
      this.router.navigate(['/purchase-order']);
      return;
    }
    this.po = found;
  }


  setTab(tab: 'overview' | 'vendor' | 'lineitems' | 'summary'): void {
    this.activeTab.set(tab);
  }

  getBarPct(value: number, base: number): number {
  if (!base || base === 0) return 0;
  const pct = (value / base) * 100;
  return Math.min(Math.round(pct), 100);
}

  getVendorInitials(): string {
    if (!this.po?.vendorName) return '??';
    const parts = this.po.vendorName.trim().split(' ');
    const first = parts[0]?.charAt(0).toUpperCase() ?? '';
    const second = parts[1]?.charAt(0).toUpperCase() ?? '';
    return first + second;
  }

  getStatusClass(status?: string): string {
    const map: Record<POStatus, string> = {
      draft: 'status-draft',
      approved: 'status-approved',
      sent_to_supplier: 'status-sent',
      partial: 'status-partial',
      received: 'status-received',
      cancelled: 'status-cancelled',
    };
    return map[status as POStatus] ?? 'status-draft';
  }

  getChipClass(status?: string): string {
    const map: Record<POStatus, string> = {
      draft: 'draft',
      approved: 'approved',
      sent_to_supplier: 'sent',
      partial: 'partial',
      received: 'received',
      cancelled: 'cancelled',
    };
    return map[status as POStatus] ?? 'draft';
  }

  getStatusHint(status?: string): string {
    return this.statusOptions.find(s => s.value === status)?.hint ?? '';
  }

  getPaymentTermsLabel(value?: string): string {
    return this.paymentTermsOptions.find(p => p.value === value)?.label ?? value ?? '—';
  }

  getDeliveryLabel(value?: string): string {
    return this.deliveryOptions.find(d => d.value === value)?.label ?? value ?? '—';
  }

  goBack(): void {
    this.router.navigate(['/purchase-order']);
  }

  printPO(): void {
    this.printService.printPurchaseOrder(this.po);
  }
}
