import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductDataClient } from '../product-data-client';
import { CommonModule } from '@angular/common';
import { Product } from '../product';
import { RouterLink } from '@angular/router';
import { ResponsiveTable } from '../../../shared/components/responsive/responsive-table';
import { BomNode } from '../product-bom';
import { getBomByProductId, rolledUpBomCost } from '../product-bom.seed';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink,ResponsiveTable],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.paginatedProducts());
    
  }

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

  const start = current;                     
  const end = Math.min(total, current + 1);     

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

  clearSearch(): void {
    this.searchValue.set('');
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  onPageSizeChange(event: Event): void {
    this.pageSize.set(+(event.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }

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

  capitalize(val: string): string {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  statusChipClass(s: string): string {
    switch (s.toLowerCase()) {
      case 'active':       return 'chip-active';
      case 'inactive':     return 'chip-inactive';
      case 'discontinued': return 'chip-disc';
      default:             return '';
    }
  }

bomModalOpen = signal(false);
bomProduct   = signal<Product | null>(null);
bomNodes     = signal<BomNode[]>([]); 
bomRolledUpCost = computed(() => {
  const p = this.bomProduct();
  return p ? rolledUpBomCost(p.id) : 0;  
});
bomStats = computed(() => {
  const nodes = this.bomNodes();
  const levels = nodes.length ? Math.max(...nodes.map(n => n.level)) : 0;
  return { lines: nodes.length, levels };
});
 

 collapsedNodes = signal<Set<number>>(new Set());
 bomVisibleNodes = computed(() => {
  const nodes     = this.bomNodes();
  const collapsed = this.collapsedNodes();
  if (!collapsed.size) return nodes;
 
  const hiddenIds = new Set<number>();
 
  for (const node of nodes) {
    let parentId = node.parentId;
    let hidden   = false;
    while (parentId !== null) {
      if (collapsed.has(parentId)) { hidden = true; break; }
      const parent = nodes.find(n => n.id === parentId);
      parentId = parent?.parentId ?? null;
    }
    if (hidden) hiddenIds.add(node.id);
  }
 
  return nodes.filter(n => !hiddenIds.has(n.id));
});
 
hasChildren(nodeId: number): boolean {
  return this.bomNodes().some(n => n.parentId === nodeId);
}
 
isCollapsed(nodeId: number): boolean {
  return this.collapsedNodes().has(nodeId);
}
 
toggleBomNode(nodeId: number, event: Event): void {
  event.stopPropagation();
  this.collapsedNodes.update(set => {
    const next = new Set(set);
    next.has(nodeId) ? next.delete(nodeId) : next.add(nodeId);
    return next;
  });
}
 
expandAllBom(): void {
  this.collapsedNodes.set(new Set());
}
 
collapseAllBom(): void {
  const parentIds = new Set(
    this.bomNodes()
      .filter(n => this.hasChildren(n.id))
      .map(n => n.id)
  );
  this.collapsedNodes.set(parentIds);
}
 
openBomModal(product: Product): void {
  this.bomProduct.set(product);
  this.bomNodes.set(getBomByProductId(product.id));
  this.collapsedNodes.set(new Set()); 
  this.bomModalOpen.set(true);
  document.body.style.overflow = 'hidden';
}
 
closeBomModal(): void {
  this.bomModalOpen.set(false);
  this.bomProduct.set(null);
  this.bomNodes.set([]);
  this.collapsedNodes.set(new Set());
  document.body.style.overflow = '';
}
 
getChildCount(nodeId: number): number {
  const nodes = this.bomNodes();
  const directChildren = nodes.filter(n => n.parentId === nodeId);
  const countDescendants = (id: number): number => {
    const children = nodes.filter(n => n.parentId === id);
    return children.reduce((sum, c) => sum + 1 + countDescendants(c.id), 0);
  };
  return directChildren.reduce((sum, c) => sum + 1 + countDescendants(c.id), 0);
}
}
