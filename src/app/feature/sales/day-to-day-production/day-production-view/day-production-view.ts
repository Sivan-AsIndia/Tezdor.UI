import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { WorkOrderDataClient } from '../../work-order/work-order-data-client';
import {
  ConsumptionRow,
  LINE_OPTIONS,
  ProductionEntry,
  SHIFT_OPTIONS,
} from '../day-production';
import { DayProductionDataClient } from '../day-production-data-client';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-day-production-view',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './day-production-view.html',
  styleUrl: './day-production-view.css',
})
export class DayProductionViewComponent {

  private router  = inject(Router);
  private service = inject(DayProductionDataClient);
  private woSvc   = inject(WorkOrderDataClient);

  /** Route param — numeric string id */
  id = input<string>();

  /** Loaded entry (null = not found) */
  entry = computed<ProductionEntry | null>(() => {
    const raw = this.id();
    if (!raw) return null;
    return this.service.getById(Number(raw)) ?? null;
  });

  /** Consumptions shorthand */
  consumptions = computed<ConsumptionRow[]>(
    () => this.entry()?.consumptions ?? [],
  );

  /** Yield % */
  yieldPct = computed(() => {
    const e = this.entry();
    if (!e || !e.producedQty) return 0;
    return (e.goodQty / e.producedQty) * 100;
  });

  /** Over-use row count */
  overUseCount = computed(() =>
    this.consumptions().filter(
      (r) => r.plannedQty !== null && r.actualQty > r.plannedQty,
    ).length,
  );

  /** Net cost variance */
  netVarianceValue = computed(() =>
    this.consumptions().reduce((sum, row) => {
      const v =
        row.plannedQty !== null
          ? row.actualQty - row.plannedQty
          : row.actualQty;
      return sum + v * (row.costPerUnit ?? 0);
    }, 0),
  );

  // ── Status helpers ──

  statusLabel = computed(() => {
    const s = this.entry()?.status;
    const map: Record<string, string> = {
      draft:     'Draft',
      submitted: 'Submitted for Approval',
      approved:  'Approved',
      rejected:  'Rejected',
    };
    return map[s ?? ''] ?? s ?? '—';
  });

  statusClass = computed(() => {
    const s = this.entry()?.status ?? '';
    return `dpv-status-pill dpv-status-pill--${s}`;
  });

  // ── Shift label ──
  shiftLabel = computed(() => {
    const s = this.entry()?.shift ?? '';
    return SHIFT_OPTIONS.find((o) => o.value === s)?.label ?? s;
  });

  // ── Line label ── (was missing → template error fixed)
  lineLabel = computed(() => {
    const l = this.entry()?.productionLine ?? '';
    return LINE_OPTIONS.find((o) => o.value === l)?.label ?? l ?? '—';
  });

  // ── Variance helpers ──

  getVariance(row: ConsumptionRow): number {
    return row.plannedQty !== null
      ? row.actualQty - row.plannedQty
      : row.actualQty;
  }

  getVarianceClass(row: ConsumptionRow): string {
    const v = this.getVariance(row);
    if (v > 0) return 'dpv-var dpv-var--over';
    if (v < 0) return 'dpv-var dpv-var--under';
    return 'dpv-var dpv-var--zero';
  }

  // ── Date formatter ──

  formatDate(iso?: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleString('en-IN', {
      day:    '2-digit',
      month:  'short',
      year:   'numeric',
      hour:   '2-digit',
      minute: '2-digit',
    });
  }

  // ── Actions ──

  onEdit(): void {
    this.router.navigate(['/day-production', this.id(), 'edit']);
  }

  onCancel(): void {
    this.router.navigate(['/day-production']);
  }

  onPrint(): void {
    window.print();
  }

  onApprove(): void {
    const e = this.entry();
    if (!e) return;
    this.service.update({
      ...e,
      status:    'approved',
      updatedAt: new Date().toISOString(),
    });
    this.router.navigate(['/day-production']);
  }

  onReject(): void {
    const e = this.entry();
    if (!e) return;
    this.service.update({
      ...e,
      status:    'rejected',
      updatedAt: new Date().toISOString(),
    });
    this.router.navigate(['/day-production']);
  }
}