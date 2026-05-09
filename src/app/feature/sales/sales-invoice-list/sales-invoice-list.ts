import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InvoiceType, SalesInvoice, SalesInvoiceStatus } from '../sales-invoice';
import { SAMPLE_INVOICES } from '../sales-invoice.seed';
import { SalesInvoiceDataClient } from '../sales-invoice-data-client';
import { ResponsiveTable } from '../../../shared/components/responsive/responsive-table';

@Component({
  selector: 'app-sales-invoice-list',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe, RouterLink,ResponsiveTable],
  templateUrl: './sales-invoice-list.html',
  styleUrl: './sales-invoice-list.css',
})
export class SalesInvoiceListComponent implements OnInit {

  siService = inject(SalesInvoiceDataClient);
  searchValue = signal('');
  statusFilter = signal<SalesInvoiceStatus | ''>('');
  typeFilter = signal<InvoiceType | ''>('');
  showFilter = signal(false);
  filterTop = 48;
  filterRight = 0;
  allInvoices = this.siService.getInvoices();

  statuses = signal<SalesInvoiceStatus[]>([
    'draft', 'sent', 'partially_paid', 'paid', 'overdue', 'cancelled'
  ]);
  invoiceTypes = signal<InvoiceType[]>([
    'tax_invoice', 'proforma', 'credit_note'
  ]);

  tempFilters = signal<{ status: SalesInvoiceStatus | ''; type: InvoiceType | '' }>({
    status: '',
    type: '',
  });

  pageSize = signal(10);
  currentPage = signal(1);

  deleteTarget = signal<SalesInvoice | null>(null);

  activeFilterCount = computed(() => {
    let count = 0;
    if (this.statusFilter()) count++;
    if (this.typeFilter()) count++;
    return count;
  });

  filteredInvoices = computed(() => {
    const q = this.searchValue().toLowerCase().trim();
    const status = this.statusFilter();
    const type = this.typeFilter();

    return this.allInvoices().filter(inv => {
      const matchQ = !q || [
        inv.invoiceNumber, inv.customerName,
        inv.invoiceDate, inv.status,
        inv.taxSummary.invoiceTotal.toString(),
      ].some(f => f.toLowerCase().includes(q));

      const matchStatus = !status || inv.status === status;
      const matchType = !type || inv.invoiceType === type;

      return matchQ && matchStatus && matchType;
    });
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredInvoices().length / this.pageSize()))
  );

  pageNumbers = computed(() => {
    const total = this.totalPages();
    const cur = this.currentPage();
    const pages: (number | '...')[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (cur > 3) pages.push('...');
      for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) pages.push(i);
      if (cur < total - 2) pages.push('...');
      pages.push(total);
    }
    return pages;
  });

  pagedInvoices = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredInvoices().slice(start, start + this.pageSize());
  });

  totalCount = computed(() => this.allInvoices().length);
  filteredCount = computed(() => this.filteredInvoices().length);
  totalOutstanding = computed(() =>
    this.allInvoices().reduce((s, i) => s + i.payment.balanceDue, 0)
  );
  totalRevenue = computed(() =>
    this.allInvoices().reduce((s, i) => s + i.taxSummary.invoiceTotal, 0)
  );
  overdueCount = computed(() =>
    this.allInvoices().filter(i => i.status === 'overdue').length
  );

  entryStart = computed(() =>
    this.filteredInvoices().length === 0 ? 0
      : (this.currentPage() - 1) * this.pageSize() + 1
  );
  entryEnd = computed(() =>
    Math.min(this.currentPage() * this.pageSize(), this.filteredInvoices().length)
  );

  ngOnInit() {
    console.log(this.allInvoices());

  }

  onSearch(val: string) {
    this.searchValue.set(val);
    this.currentPage.set(1);
  }

  clearSearch() {
    this.searchValue.set('');
    this.currentPage.set(1);
  }

  onStatusFilter(val: string) {
    this.statusFilter.set(val as SalesInvoiceStatus | '');
    this.currentPage.set(1);
  }

  onTypeFilter(val: string) {
    this.typeFilter.set(val as InvoiceType | '');
    this.currentPage.set(1);
  }

  toggleFilter(): void {
    if (this.showFilter()) { this.closeFilter(); return; }
    this.tempFilters.set({
      status: this.statusFilter(),
      type: this.typeFilter(),
    });

    const btn = document.querySelector('.filter-btn') as HTMLElement;
    const rect = btn?.getBoundingClientRect();
    if (rect) {
      this.filterTop = rect.bottom + 8;
      this.filterRight = window.innerWidth - rect.right - 65;
    }
    this.showFilter.set(true);
  }

  closeFilter() { this.showFilter.set(false); }

  selectStatus(s: SalesInvoiceStatus) {
    this.tempFilters.update(f => ({ ...f, status: f.status === s ? '' : s }));
  }

  selectType(t: InvoiceType) {
    this.tempFilters.update(f => ({ ...f, type: f.type === t ? '' : t }));
  }

  applyFilters() {
    const f = this.tempFilters();
    this.onStatusFilter(f.status);
    this.onTypeFilter(f.type);
    this.showFilter.set(false);
  }

  resetFilters() {
    this.tempFilters.set({ status: '', type: '' });
    this.onStatusFilter('');
    this.onTypeFilter('');
  }

  onPageSizeChange(val: string) {
    this.pageSize.set(+val);
    this.currentPage.set(1);
  }

  goPage(p: number | '...') {
    if (p === '...') return;
    this.currentPage.set(p);
  }

  prevPage() {
    if (this.currentPage() > 1) this.currentPage.update(p => p - 1);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1);
  }

  openDelete(inv: SalesInvoice) { this.deleteTarget.set(inv); }
  cancelDelete() { this.deleteTarget.set(null); }

  confirmDelete() {

    const target = this.deleteTarget();

    if (!target) return;

    this.siService.deleteInvoice(
      target.id
    );

    this.deleteTarget.set(null);

    if (this.currentPage() > this.totalPages()) {
      this.currentPage.set(
        this.totalPages()
      );
    }
  }
  statusLabel(s: string): string {
    const map: Record<string, string> = {
      draft: 'Draft', sent: 'Sent', paid: 'Paid',
      partially_paid: 'Partial', overdue: 'Overdue', cancelled: 'Cancelled',
    };
    return map[s] ?? s;
  }

  typeLabel(t: string): string {
    const map: Record<string, string> = {
      tax_invoice: 'Tax Invoice', proforma: 'Proforma',
      credit_note: 'Credit Note', debit_note: 'Debit Note',
    };
    return map[t] ?? t;
  }

  capitalize(val: string): string {
    return val.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  statusChipClass(s: string): string {
    const map: Record<string, string> = {
      draft: 'chip-draft', sent: 'chip-sent', paid: 'chip-paid',
      partially_paid: 'chip-partial', overdue: 'chip-overdue', cancelled: 'chip-cancelled',
    };
    return map[s] ?? '';
  }

  typeChipClass(t: string): string {
    const map: Record<string, string> = {
      tax_invoice: 'chip-tax', proforma: 'chip-proforma',
      credit_note: 'chip-credit', debit_note: 'chip-debit',
    };
    return map[t] ?? '';
  }
}