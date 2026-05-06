import { Component, computed, inject } from '@angular/core';
import { PettyCashDataClient } from '../petty-cash-data-client';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReconciliationStatus } from '../petty-cash';
import { ToastNotifier } from '../../../../core/services/toast';

@Component({
  selector: 'app-petty-cash-detail',
  imports: [CommonModule,RouterModule],
  templateUrl: './petty-cash-detail.html',
  styleUrl: './petty-cash-detail.css',
})
export class PettyCashDetailComponent {

  private readonly service = inject(PettyCashDataClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
      private readonly toast = inject(ToastNotifier);

  // ===== GET ID =====
  id = this.route.snapshot.paramMap.get('id')!;

  // ===== DATA =====
  pettyCash = this.service.getPettyCash(this.id);

  reconciliationStatuses = ReconciliationStatus

  // ===== HELPERS =====
  formatAmount(val?: number) {
    return (val ?? 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2
    });
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Draft': return 'bg-secondary';
      case 'Approved': return 'bg-info';
      case 'Posted': return 'bg-success';
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-dark';
    }
  }

  // ===== CALCULATIONS =====
  closingBalance = computed(() => {
    const pc = this.pettyCash();
    if (!pc) return 0;

    return (
      (pc.openingCashBalance || 0)
      + (pc.disbursedAmount || 0)
      + (pc.replenishmentAmount || 0)
      - (pc.expenseAmount || 0)
      - (pc.returnedAmount || 0)
    );
  });



post(id: string) {
  this.service.post(id); // already exists
  this.toast.success("Petty-Cash posted successfully");
}

submit(id: string) {
  this.service.submit(id);
    this.toast.success("Petty-Cash submitted successfully");
}

approve(id: string) {
  this.service.approve(id);
      this.toast.success("Petty-Cash approved successfully");
}

reject(id: string) {
  this.service.reject(id);
      this.toast.success("Petty-Cash rejected successfully");
}

verifyReceipt(id: string) {
  this.service.verifyReceipt(id);
      this.toast.success("Petty-Cash verify successfully");
}

reconcile(id: string) {
  this.service.reconcile(id, 5000); // example physical cash
      this.toast.success("Petty-Cash reconcile successfully");
}

close(id: string) {
  this.service.close(id);
      this.toast.success("Petty-Cash closed successfully");
}

cancel(id: string) {
  this.service.cancel(id);
      this.toast.success("Petty-Cash cancelled successfully");
}

requestReplenishment(id: string) {
  this.service.requestReplenishment(id);
}

}