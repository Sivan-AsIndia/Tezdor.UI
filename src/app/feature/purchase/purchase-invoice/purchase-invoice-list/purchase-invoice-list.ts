import { Component, computed, inject, signal } from '@angular/core';
import { PurchaseInvoice, InvoiceStatus, PaymentStatus } from '../purchase-invoice';
import { PurchaseInvoiceDataClient } from '../purchase-invoice-data-client';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-purchase-invoice-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './purchase-invoice-list.html',
  styleUrl: './purchase-invoice-list.css',
})
export class PurchaseInvoiceListComponent {

  service = inject(PurchaseInvoiceDataClient);

  showFilter  = signal(false);
  searchValue = signal('');
  selectedInv = signal<PurchaseInvoice | null>(null);
  currentPage = signal(1);
  pageSize    = signal(10);
  filterTop   = 0;
  filterRight = 0;

  filters = signal<{
    invoiceStatus: InvoiceStatus | null;
    paymentStatus: PaymentStatus | null;
    supplier: string | null;
  }>({ invoiceStatus: null, paymentStatus: null, supplier: null });

  tempFilters = signal<{
    invoiceStatus: InvoiceStatus | null;
    paymentStatus: PaymentStatus | null;
    supplier: string | null;
  }>({ invoiceStatus: null, paymentStatus: null, supplier: null });

  invoiceStatuses: InvoiceStatus[] = ['draft', 'posted', 'cancelled'];
  paymentStatuses: PaymentStatus[] = ['unpaid', 'partial', 'paid'];

  suppliers = computed(() => {
    const all = this.service.invoices().map(i => i.supplierName).filter(Boolean);
    return [...new Set(all)].sort();
  });

  filteredInvoices = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    const f = this.filters();
    return this.service.invoices().filter(inv => {
      const matchSearch =
        !q ||
        inv.invoiceNo.toLowerCase().includes(q)                ||
        (inv.supplierInvoiceNo ?? '').toLowerCase().includes(q) ||
        (inv.supplierName ?? '').toLowerCase().includes(q)      ||
        (inv.supplierCode ?? '').toLowerCase().includes(q)      ||
        (inv.poRef ?? '').toLowerCase().includes(q);    

      const matchInvStatus = !f.invoiceStatus || inv.invoiceStatus === f.invoiceStatus;
      const matchPayStatus = !f.paymentStatus  || inv.paymentStatus === f.paymentStatus;
      const matchSupplier  = !f.supplier       || (inv.supplierName ?? '').toLowerCase() === f.supplier.toLowerCase();

      return matchSearch && matchInvStatus && matchPayStatus && matchSupplier;
    });
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredInvoices().length / this.pageSize()))
  );

  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  paginatedInvoices = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredInvoices().slice(start, start + this.pageSize());
  });

  activeFilterCount = computed(() =>
    [this.filters().invoiceStatus, this.filters().paymentStatus, this.filters().supplier]
      .filter(Boolean).length
  );

  onSearch(value: string): void {
    this.searchValue.set(value);
    this.currentPage.set(1);
  }

  clearSearch(): void {
    this.searchValue.set('');
    this.currentPage.set(1);
  }

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

  resetFilters(): void {
    const empty = { invoiceStatus: null, paymentStatus: null, supplier: null };
    this.tempFilters.set(empty);
    this.filters.set(empty);
    this.currentPage.set(1);
     this.closeFilter();
  }

  applyFilters(): void {
    this.filters.set({ ...this.tempFilters() });
    this.currentPage.set(1);
    this.closeFilter();
  }

  selectInvStatus(s: InvoiceStatus): void {
    this.tempFilters.update(f => ({ ...f, invoiceStatus: f.invoiceStatus === s ? null : s }));
  }

  selectPayStatus(s: PaymentStatus): void {
    this.tempFilters.update(f => ({ ...f, paymentStatus: f.paymentStatus === s ? null : s }));
  }

  selectSupplier(v: string): void {
    this.tempFilters.update(f => ({
      ...f,
      supplier: f.supplier?.toLowerCase() === v.toLowerCase() ? null : v,
    }));
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }

  onPageSizeChange(event: Event): void {
    this.pageSize.set(+(event.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }

  DeletePopupView(inv: PurchaseInvoice): void { this.selectedInv.set(inv); }

  confirmDelete(): void {
    const inv = this.selectedInv();
    if (inv) {
      this.service.deleteInvoice(inv.id);
      this.selectedInv.set(null);
    }
  }

  capitalize(val: string): string {
    if (!val) return '';
    return val.charAt(0).toUpperCase() + val.slice(1);
  }

  invStatusBadgeClass(s: InvoiceStatus): string {
    const map: Record<string, string> = {
      draft:     'bg-lightsecondary text-secondary',
      posted:    'bg-lightsuccess text-success',
      cancelled: 'bg-lighterror text-error',
    };
    return map[s] ?? '';
  }

  payStatusBadgeClass(s: PaymentStatus): string {
    const map: Record<string, string> = {
      unpaid:  'bg-lighterror text-error',
      partial: 'bg-lightwarning text-warning',
      paid:    'bg-lightsuccess text-success',
    };
    return map[s] ?? '';
  }

  invStatusChipClass(s: InvoiceStatus): string {
    const map: Record<string, string> = {
      draft:     'chip-pending',
      posted:    'chip-approved',
      cancelled: 'chip-cancelled',
    };
    return map[s] ?? '';
  }

  payStatusChipClass(s: PaymentStatus): string {
    const map: Record<string, string> = {
      unpaid:  'chip-cancelled',
      partial: 'chip-partial',
      paid:    'chip-approved',
    };
    return map[s] ?? '';
  }
}
