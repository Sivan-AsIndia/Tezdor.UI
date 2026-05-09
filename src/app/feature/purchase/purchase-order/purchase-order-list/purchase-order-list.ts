import { Component, computed, inject, signal } from '@angular/core';
import { PurchaseOrder, POStatus } from '../purchase-order';
import { PurchaseOrderDataClient } from '../purchase-order-data-client';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-order-list',
  imports: [RouterLink,CommonModule],
  templateUrl:'./purchase-order-list.html',
  styleUrl: './purchase-order-list.css',
})
export class PurchaseOrderListComponent {
  
  service = inject(PurchaseOrderDataClient);

  showFilter   = signal(false);
  searchValue  = signal('');
  selectedPO   = signal<PurchaseOrder | null>(null);
  currentPage  = signal(1);
  pageSize     = signal(10);
  filterTop    = 0;
  filterRight  = 0;

  filters     = signal<{ status: POStatus | null; vendor: string | null }>({ status: null, vendor: null });
  tempFilters = signal<{ status: POStatus | null; vendor: string | null }>({ status: null, vendor: null });

  statuses = computed(() => {
    const all = this.service.orders().map(o => o.status);
    return [...new Set(all)].sort() as POStatus[];
  });

  vendors = computed(() => {
    const all = this.service.orders().map(o => o.vendorName).filter(Boolean);
    return [...new Set(all)].sort() as string[];
  });

  filteredOrders = computed(() => {
    const search = this.searchValue().toLowerCase().trim();
    const f      = this.filters();

    return this.service.orders().filter(o => {
      const matchSearch =
        !search ||
        o.poNumber.toLowerCase().includes(search)   ||
        o.vendorName.toLowerCase().includes(search) ||
        o.vendorCode.toLowerCase().includes(search) ||
        o.status.includes(search);

      const matchStatus = !f.status || o.status === f.status;
      const matchVendor = !f.vendor || o.vendorName.toLowerCase() === f.vendor.toLowerCase();

      return matchSearch && matchStatus && matchVendor;
    });
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredOrders().length / this.pageSize()))
  );

  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  paginatedOrders = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredOrders().slice(start, start + this.pageSize());
  });

  activeFilterCount = computed(() =>
    [this.filters().status, this.filters().vendor].filter(Boolean).length
  );

  toggleFilter(): void {
    if (this.showFilter()) { this.closeFilter(); return; }
    this.tempFilters.set({ ...this.filters() });
    const btn  = document.querySelector('.filter-btn') as HTMLElement;
    const rect = btn?.getBoundingClientRect();
    if (rect) {
      this.filterTop   = rect.bottom + 8;
      this.filterRight = window.innerWidth - rect.right+ -65;
    }
    this.showFilter.set(true);
  }

  closeFilter(): void { this.showFilter.set(false); }

  selectStatus(s: POStatus): void {
    this.tempFilters.update(f => ({
      ...f,
      status: f.status === s ? null : s,
    }));
  }

  selectVendor(v: string): void {
    this.tempFilters.update(f => ({
      ...f,
      vendor: f.vendor?.toLowerCase() === v.toLowerCase() ? null : v,
    }));
  }

  resetFilters(): void {
    this.tempFilters.set({ status: null, vendor: null });
    this.filters.set({ status: null, vendor: null });
     this.closeFilter();
  }

  applyFilters(): void {
    this.filters.set({ ...this.tempFilters() });
    this.currentPage.set(1);
    this.closeFilter();
  }

  clearSearch(): void {
    this.searchValue.set('');
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }

  onPageSizeChange(event: Event): void {
    this.pageSize.set(+(event.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }

  DeletePopupView(po: PurchaseOrder): void { this.selectedPO.set(po); }

  confirmDelete(): void {
    const po = this.selectedPO();
    if (po) {
      this.service.deletePO(po.id);
      this.selectedPO.set(null);
    }
  }

statusBadgeClass(s: POStatus): string {
  const map: Record<POStatus, string> = {
    draft:            'bg-lightsecondary text-secondary',
    approved:         'bg-lightsuccess text-success',
    sent_to_supplier: 'bg-lightwarning text-warning',
    partial:          'bg-lightprimary text-primary',
    received:         'bg-lightinfo text-info',
    cancelled:        'bg-lighterror text-error',
  };
  return map[s] ?? '';
}

statusChipClass(s: POStatus): string {
  const map: Record<POStatus, string> = {
    draft:            'chip-draft',
    approved:         'chip-approved',
    sent_to_supplier: 'chip-sent',
    partial:          'chip-partial',
    received:         'chip-received',
    cancelled:        'chip-cancelled',
  };
  return map[s] ?? '';
}

capitalize(val: string): string {
  return val
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

}
