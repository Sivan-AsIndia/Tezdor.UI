import { Component, computed, ElementRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PeFilters, ProductionEntry, ProductionStatus } from '../day-production';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResponsiveTable } from '../../../../shared/components/responsive/responsive-table';
import { INITIAL_PRODUCTION_ENTRIES } from '../day-production.seed';
import { DayProductionDataClient } from '../day-production-data-client';

@Component({
  selector: 'app-day-production-list',
  imports: [CommonModule, RouterLink, FormsModule,ResponsiveTable],
  templateUrl: './day-production-list.html',
  styleUrl: './day-production-list.css',
})
export class DayProductionListComponent implements OnInit{


  private router = inject(Router);
  private elRef  = inject(ElementRef);
   private service     = inject(DayProductionDataClient); 
  allEntries = this.service.entries;  
 ngOnInit() {
  console.log('FROM SERVICE:', this.allEntries());
}
  searchValue = signal('');
 
  onSearch(val: string)  { this.searchValue.set(val); this.currentPage.set(1); }
  clearSearch()          { this.searchValue.set(''); this.currentPage.set(1); }
 
  showFilter     = signal(false);
  filterTop      = 0;
  filterRight    = 16;
 
  readonly DEFAULT_FILTERS: PeFilters = { status: '', shift: '', dateFrom: '', dateTo: '' };
  appliedFilters = signal<PeFilters>({ ...this.DEFAULT_FILTERS });
  tempFilters    = signal<PeFilters>({ ...this.DEFAULT_FILTERS });
 
  statuses = signal<ProductionStatus[]>(['draft', 'submitted', 'approved', 'rejected']);
  shifts   = signal<string[]>(['Morning', 'Afternoon', 'Night', 'General']);
 
  activeFilterCount = computed(() => {
    const f = this.appliedFilters();
    return [f.status, f.shift, f.dateFrom, f.dateTo].filter(v => !!v).length;
  });
 

  
  toggleFilter(): void {
     if (this.showFilter()) this.tempFilters.set({ ...this.appliedFilters() });

    const btn = document.querySelector('.filter-btn') as HTMLElement;
    const rect = btn?.getBoundingClientRect();
    if (rect) {
      this.filterTop = rect.bottom + 8;
      this.filterRight = window.innerWidth - rect.right - 65;
    }
    this.showFilter.set(true);
  }

  closeFilter() { this.showFilter.set(false); }

 
  selectStatus(s: string) {
    this.tempFilters.update(f => ({ ...f, status: f.status === s ? '' : s }));
  }
  selectShift(sh: string) {
    this.tempFilters.update(f => ({ ...f, shift: f.shift === sh ? '' : sh }));
  }
  setDateFrom(v: string) { this.tempFilters.update(f => ({ ...f, dateFrom: v })); }
  setDateTo(v: string)   { this.tempFilters.update(f => ({ ...f, dateTo: v })); }
 
  applyFilters() {
    this.appliedFilters.set({ ...this.tempFilters() });
    this.currentPage.set(1);
    this.closeFilter();
  }
 
  resetFilters() {
    const clean = { ...this.DEFAULT_FILTERS };
    this.tempFilters.set(clean);
    this.appliedFilters.set(clean);
    this.currentPage.set(1);
  }
 
  statusChipClass(s: string): string {
    const map: Record<string, string> = {
      draft:     'chip-draft',
      submitted: 'chip-submitted',
      approved:  'chip-approved',
      rejected:  'chip-rejected',
    };
    return map[s] ?? '';
  }
 
  filteredEntries = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    const f = this.appliedFilters();
    return this.allEntries().filter(pe => {
      if (q) {
        const haystack = [
          pe.productionNo, pe.workOrderNo, pe.productName,
          pe.productCode, pe.supervisorName, pe.productionLine,
        ].join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (f.status && pe.status !== f.status) return false;
      if (f.shift && pe.shift !== f.shift) return false;
      if (f.dateFrom && pe.productionDate < f.dateFrom) return false;
      if (f.dateTo   && pe.productionDate > f.dateTo)   return false;
      return true;
    });
  });
 
  filteredCount = computed(() => this.filteredEntries().length);
 
  currentPage = signal(1);
  pageSize    = signal(10);
 
  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredCount() / this.pageSize()))
  );
 
  pagedEntries = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredEntries().slice(start, start + this.pageSize());
  });
 
  entryStart = computed(() => (this.currentPage() - 1) * this.pageSize() + 1);
  entryEnd   = computed(() => Math.min(this.currentPage() * this.pageSize(), this.filteredCount()));
 
  visiblePages = computed(() => {
    const total = this.totalPages();
    const cur   = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: number[] = [];
    const start = Math.max(2, cur - 2);
    const end   = Math.min(total - 1, cur + 2);
    pages.push(1);
    if (start > 2) pages.push(-1);
    for (let p = start; p <= end; p++) pages.push(p);
    if (end < total - 1) pages.push(-1);
    pages.push(total);
    return pages;
  });
 
  prevPage() { if (this.currentPage() > 1) this.currentPage.update(v => v - 1); }
  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(v => v + 1); }
  goPage(p: number) { if (p > 0) this.currentPage.set(p); }
 
  onPageSizeChange(val: string) {
    this.pageSize.set(+val);
    this.currentPage.set(1);
  }
 
  statusLabel(s: ProductionStatus): string {
    const map: Record<ProductionStatus, string> = {
      draft:     'Draft',
      submitted: 'Submitted',
      approved:  'Approved',
      rejected:  'Rejected',
    };
    return map[s] ?? s;
  }
 
  capitalize(s: string): string {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  }
 
  deleteTarget = signal<ProductionEntry | null>(null);
 
  openDelete(pe: ProductionEntry)  { this.deleteTarget.set(pe); }
  cancelDelete()                   { this.deleteTarget.set(null); }
 
confirmDelete() {
  const target = this.deleteTarget();
  if (!target) return;
  if (target.status !== 'draft') return;
  this.service.delete(target.id);

  this.deleteTarget.set(null);
}
 
  printSlip(pe: ProductionEntry) {
    this.router.navigate(['/day-production/edit', pe.id]);
    window.print()
  }
 
  @HostListener('document:keydown.escape')
  onEsc() { this.closeFilter(); }



  
}
