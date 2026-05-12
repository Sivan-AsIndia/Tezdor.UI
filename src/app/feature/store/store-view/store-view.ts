import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductSummary } from '../../product/product';
import { StockLedgerRow } from '../store';
import { StoreDataClient } from '../store-data-client';
import { CommonModule } from '@angular/common';
import { PrintService } from '../../../core/print/print.service';
import { ResponsiveTable } from '../../../shared/components/responsive/responsive-table';

@Component({
  selector: 'app-store-view',
  imports: [CommonModule, RouterLink,ResponsiveTable],
  templateUrl: './store-view.html',
  styleUrl: './store-view.css',
})
export class StoreViewComponent implements OnInit {


  private route = inject(ActivatedRoute);
  private service = inject(StoreDataClient);
  private printService = inject(PrintService);
  product = signal<ProductSummary | null>(null);
  ledgerRows = signal<StockLedgerRow[]>([]);

  today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });


  currentPage = signal(1);
  pageSize = signal(10);
  totalIn = computed(() => this.ledgerRows().reduce((s, r) => s + r.received, 0));
  totalOut = computed(() => this.ledgerRows().reduce((s, r) => s + r.issued, 0));
  closing = computed(() => {
    const rows = this.ledgerRows();
    return rows.length ? rows[rows.length - 1].closing : 0;
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.ledgerRows().length / this.pageSize()))
  );
  pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );
  paginatedLedger = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.ledgerRows().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('productCode') ?? '';

    const prod = this.service.productSummaries().find(p => p.productCode === code);
    this.product.set(prod ?? null);

    const rawRows = this.service.transactions()
      .filter(t => t.productCode === code)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let running = 0;
    const ledger: StockLedgerRow[] = rawRows.map((t, i) => {
      const oldStock = running;
      const received = t.type === 'IN' ? t.quantity : 0;
      const issued = t.type === 'OUT' ? t.quantity : 0;
      const total = oldStock + received;
      const closing = total - issued;
      running = closing;
      return {
        sNo: i + 1, date: t.date, vendorCode: t.vendorCode, vendorName: t.vendorName,
        productCode: t.productCode, productName: t.productName,
        oldStock, received, total, issued, closing
      };
    });

    this.ledgerRows.set(ledger);
  }


  printPage(): void {
    const prod = this.product();
    if (!prod) return;

    this.printService.printStoreLedger(
      {
        productCode: prod.productCode,
        productName: prod.productName,
        vendorName: prod.vendorName,
      },
      this.ledgerRows(),
      this.totalIn(),
      this.totalOut(),
      this.closing(),
    );
  }


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }
  onPageSizeChange(event: Event): void {
    this.pageSize.set(+(event.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }
}
