import { Component, computed, inject, signal } from '@angular/core';
import { ProductDataClient } from '../product-data-client';
import { CommonModule } from '@angular/common';
import { Product } from '../product';
import { RouterLink } from '@angular/router';
import { ResponsiveTable } from '../../../shared/components/responsive/responsive-table';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink,ResponsiveTable],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent {

  showFilter      = signal(false);
  service         = inject(ProductDataClient);
  searchValue     = signal('');
  selectedProduct = signal<Product | null>(null);
  currentPage     = signal(1);
  pageSize        = signal(10);
visiblePages = computed(() => {
  const current = this.currentPage();
  const total = this.totalPages();
  if (total <= 1) return [1];

  const start = current;                        // current page
  const end = Math.min(total, current + 1);     // next page

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

  filters = signal<{ status: string | null; category: string | null }>({
    status: null,
    category: null,
  });

  tempFilters = signal<{ status: string | null; category: string | null }>({
  status: null,
  category: null,
});

  statuses = computed(() => {
    const all = this.service.products().map(p => p.status?.toLowerCase()).filter(Boolean);
    return [...new Set(all)].sort() as string[];
  });

  categories = computed(() => {
    const all = this.service.products().map(p => p.categoryName).filter(Boolean);
    return [...new Set(all)].sort() as string[];
  });

  // ── Filtered Products ─────────────────────────────
  filteredProducts = computed(() => {
    const search = this.searchValue().toLowerCase().trim();
    const f      = this.filters();

    return this.service.products().filter(p => {
      const matchSearch =
        !search ||
        p.productName?.toLowerCase().includes(search) ||
        p.productCode?.toLowerCase().includes(search) ||
        p.categoryName?.toLowerCase().includes(search) ||
        p.status?.toLowerCase().includes(search);
      const matchStatus =
        !f.status ||
        p.status?.toLowerCase() === f.status.toLowerCase();

      const matchCategory =
        !f.category ||
        p.categoryName?.toLowerCase() === f.category.toLowerCase();

      return matchSearch && matchStatus && matchCategory;
    });
  });

  // ── Pagination ────────────────────────────────────
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
    [this.filters().status, this.filters().category].filter(Boolean).length
  );

  // ── Filter Actions ────────────────────────────────
toggleFilter(): void {
  if (this.showFilter()) {
    this.closeFilter();
  } else {
    this.tempFilters.set({ ...this.filters() });

    const btn = document.querySelector('.filter-btn') as HTMLElement;
    const rect = btn?.getBoundingClientRect();
    if (rect) {
      this.filterTop  = rect.bottom + 8;
      this.filterRight = window.innerWidth - rect.right + -65;
    }
    this.showFilter.set(true);
  }
}


filterTop  = 0;
filterRight = 0;

  closeFilter() { this.showFilter.set(false); }

 selectStatus(s: string): void {
  this.tempFilters.update(f => ({
    ...f,
    status: f.status?.toLowerCase() === s.toLowerCase() ? null : s.toLowerCase(),
  }));
}

selectCategory(c: string): void {
  this.tempFilters.update(f => ({
    ...f,
    category: f.category?.toLowerCase() === c.toLowerCase() ? null : c.toLowerCase(),
  }));
}

resetFilters(): void {
  this.tempFilters.set({ status: null, category: null });
  this.filters.set({ status: null, category: null });
   this.closeFilter();

}
applyFilters(): void {
  this.filters.set({ ...this.tempFilters() });
  this.currentPage.set(1);
  this.closeFilter();
}

  // ── Search ────────────────────────────────────────
  clearSearch(): void {
    this.searchValue.set('');
    this.currentPage.set(1);
  }

  // ── Pagination Actions ────────────────────────────
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onPageSizeChange(event: Event): void {
    this.pageSize.set(+(event.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }

  // ── Delete ────────────────────────────────────────
  DeletePopupView(product: Product): void {
    this.selectedProduct.set(product);
  }

  confirmDelete(): void {
    const product = this.selectedProduct();
    if (product) {
      this.service.deleteProduct(product.id);
      this.selectedProduct.set(null);
    }
  }

  // ── Helpers ───────────────────────────────────────
  // 'active' → 'Active' for display
  capitalize(val: string): string {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  // CSS class per status for colored chips
  statusChipClass(s: string): string {
    switch (s.toLowerCase()) {
      case 'active':       return 'chip-active';
      case 'inactive':     return 'chip-inactive';
      case 'discontinued': return 'chip-disc';
      default:             return '';
    }
  }
}
