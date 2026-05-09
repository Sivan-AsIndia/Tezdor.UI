import { Component, computed, inject, signal } from '@angular/core';
import { StoreDataClient } from '../store-data-client';
import { StockLedgerRow } from '../store';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductSummary } from '../../product/product';
import { ResponsiveTable } from '../../../shared/components/responsive/responsive-table';

@Component({
  selector: 'app-store-list',
  imports: [CommonModule,RouterLink,ResponsiveTable],
  templateUrl:'./store-list.html',
  styleUrl: './store-list.css',
})
export class StoreListComponent {
  service = inject(StoreDataClient);
  searchValue  = signal('');
  currentPage  = signal(1);
  pageSize     = signal(10);
  selectedProduct   = signal<ProductSummary | null>(null);
  ledgerRows        = signal<StockLedgerRow[]>([]);
  ledgerPage        = signal(1);
  ledgerPageSize    = signal(10);
  showFilter   = signal(false);
  filterTop    = 0;
  filterRight  = 0;

  filters = signal<{ vendor: string | null }>({ vendor: null });
  tempFilters = signal<{ vendor: string | null }>({ vendor: null });
  vendors = computed(() => {
    const all = this.service.productSummaries().map(p => p.vendorName);
    return [...new Set(all)].sort();
  });
  filteredProducts = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    const f = this.filters();

    return this.service.productSummaries().filter(p => {
      const matchSearch =
        !q ||
        p.productName.toLowerCase().includes(q) ||
        p.productCode.toLowerCase().includes(q) ||
        p.vendorName.toLowerCase().includes(q)  ||
        p.vendorCode.toLowerCase().includes(q);

      const matchVendor =
        !f.vendor || p.vendorName.toLowerCase() === f.vendor.toLowerCase();

      return matchSearch && matchVendor;
    });
  });

  // ── Pagination ────────────────────────────────────────
  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredProducts().length / this.pageSize()))
  );
  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );
  paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredProducts().slice(start, start + this.pageSize());
  });

  activeFilterCount = computed(() =>
    [this.filters().vendor].filter(Boolean).length
  );

  // ── Ledger pagination ─────────────────────────────────
  ledgerTotalPages = computed(() =>
    Math.max(1, Math.ceil(this.ledgerRows().length / this.ledgerPageSize()))
  );
  ledgerPageNumbers = computed(() =>
    Array.from({ length: this.ledgerTotalPages() }, (_, i) => i + 1)
  );
  paginatedLedger = computed(() => {
    const start = (this.ledgerPage() - 1) * this.ledgerPageSize();
    return this.ledgerRows().slice(start, start + this.ledgerPageSize());
  });

  // ── Summary totals shown inside popup header ──────────
  ledgerTotalIn  = computed(() => this.ledgerRows().reduce((s, r) => s + r.received, 0));
  ledgerTotalOut = computed(() => this.ledgerRows().reduce((s, r) => s + r.issued, 0));
  ledgerClosing  = computed(() => {
    const rows = this.ledgerRows();
    return rows.length ? rows[rows.length - 1].closing : 0;
  });

  // ── Filter actions ────────────────────────────────────
  toggleFilter(): void {
    if (this.showFilter()) {
      this.closeFilter();
    } else {
      this.tempFilters.set({ ...this.filters() });
      const btn  = document.querySelector('.filter-btn') as HTMLElement;
      const rect = btn?.getBoundingClientRect();
      if (rect) {
        this.filterTop   = rect.bottom + 8;
        this.filterRight = window.innerWidth - rect.right+ -65;
      }
      this.showFilter.set(true);
    }
  }
  closeFilter():  void { this.showFilter.set(false); }
  resetFilters(): void {
    this.tempFilters.set({ vendor: null });
    this.filters.set({ vendor: null });
     this.closeFilter();
  }
  applyFilters(): void {
    this.filters.set({ ...this.tempFilters() });
    this.currentPage.set(1);
    this.closeFilter();
  }
  selectVendor(v: string): void {
    this.tempFilters.update(f => ({
      ...f,
      vendor: f.vendor?.toLowerCase() === v.toLowerCase() ? null : v.toLowerCase(),
    }));
  }

  // ── Search ────────────────────────────────────────────
  clearSearch(): void {
    this.searchValue.set('');
    this.currentPage.set(1);
  }

  // ── Pagination actions ────────────────────────────────
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }
  onPageSizeChange(event: Event): void {
    this.pageSize.set(+(event.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }

  // ── History popup ─────────────────────────────────────
  openHistory(product: ProductSummary): void {
    this.selectedProduct.set(product);
    this.ledgerRows.set(this.service.getLedgerRows(product.productCode));
    this.ledgerPage.set(1);
  }
  closeHistory(): void {
    this.selectedProduct.set(null);
    this.ledgerRows.set([]);
  }
  goToLedgerPage(page: number): void {
    if (page >= 1 && page <= this.ledgerTotalPages()) this.ledgerPage.set(page);
  }

  // ── Stock status chip ─────────────────────────────────
  stockStatusClass(closing: number): string {
    if (closing <= 0)  return 'chip-out';
    if (closing <= 20) return 'chip-low';
    return 'chip-ok';
  }
  stockStatusLabel(closing: number): string {
    if (closing <= 0)  return 'Out of Stock';
    if (closing <= 20) return 'Low Stock';
    return 'In Stock';
  }
  
}
