// purchaseorderview.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  PurchaseOrder,
  POStatus,
  PAYMENT_TERMS_OPTIONS,
  DELIVERY_OPTIONS,
  STATUS_OPTIONS,
} from '../purchase-order';
import { ToastNotifier }         from '../../../../core/services/toast';
import { PurchaseOrderDataClient } from '../purchase-order-data-client';

@Component({
  selector:    'app-purchaseorderview',
  standalone:  true,
  imports:     [CommonModule, RouterModule],
  templateUrl:'./purchase-order-view.html',
  styleUrl:    './purchase-order-view.css',
})
export class PurchaseOrderViewComponent implements OnInit {

  private route   = inject(ActivatedRoute);
  private router  = inject(Router);
  private toast   = inject(ToastNotifier);
  private service = inject(PurchaseOrderDataClient);

  po!: PurchaseOrder;

  paymentTermsOptions = PAYMENT_TERMS_OPTIONS;
  deliveryOptions     = DELIVERY_OPTIONS;
  statusOptions       = STATUS_OPTIONS;

  activeTab = signal<'overview' | 'vendor' | 'lineitems' | 'summary'>('overview');

  // ── Lifecycle ──────────────────────────────────────────────────────
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

  // ── Tab ────────────────────────────────────────────────────────────
  setTab(tab: 'overview' | 'vendor' | 'lineitems' | 'summary'): void {
    this.activeTab.set(tab);
  }

  // ── Helpers ────────────────────────────────────────────────────────

  /** Two-letter initials from vendor name for avatar */
  getVendorInitials(): string {
    if (!this.po?.vendorName) return '??';
    const parts = this.po.vendorName.trim().split(' ');
    const first = parts[0]?.charAt(0).toUpperCase() ?? '';
    const second = parts[1]?.charAt(0).toUpperCase() ?? '';
    return first + second;
  }

  /** CSS class for status text color (emp-meta span) */
  getStatusClass(status?: string): string {
    const map: Record<POStatus, string> = {
      pending:   'status-pending',
      approved:  'status-approved',
      received:  'status-received',
      partial:   'status-partial',
      cancelled: 'status-cancelled',
    };
    return map[status as POStatus] ?? 'status-pending';
  }

  /** CSS class for pf-chip colored badge */
  getChipClass(status?: string): string {
    const map: Record<POStatus, string> = {
      pending:   'pending',
      approved:  'approved',
      received:  'received',
      partial:   'partial',
      cancelled: 'cancelled',
    };
    return map[status as POStatus] ?? 'pending';
  }

  /** Status hint text from STATUS_OPTIONS */
  getStatusHint(status?: string): string {
    return this.statusOptions.find(s => s.value === status)?.hint ?? '';
  }

  /** Payment terms label */
  getPaymentTermsLabel(value?: string): string {
    return this.paymentTermsOptions.find(p => p.value === value)?.label ?? value ?? '—';
  }

  /** Delivery method label */
  getDeliveryLabel(value?: string): string {
    return this.deliveryOptions.find(d => d.value === value)?.label ?? value ?? '—';
  }

  // ── Actions ────────────────────────────────────────────────────────
  goBack(): void {
    this.router.navigate(['/purchase-order']);
  }

  printPO(): void {
    window.print();
  }
}
