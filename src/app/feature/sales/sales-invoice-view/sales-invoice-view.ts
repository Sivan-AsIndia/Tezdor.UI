import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  TitleCasePipe
} from '@angular/common';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { ToastNotifier } from '../../../core/services/toast';

import {
  SalesInvoice,
  SalesInvoiceStatus
} from '../sales-invoice';

import { SalesInvoiceDataClient } from '../sales-invoice-data-client';

@Component({
  selector: 'app-sales-invoice-view',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    DecimalPipe,
    TitleCasePipe,RouterLink
  ],
  templateUrl: './sales-invoice-view.html',
  styleUrl: './sales-invoice-view.css',
})
export class SalesInvoiceView {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private invoiceService =
    inject(SalesInvoiceDataClient);

  private toast =
    inject(ToastNotifier);

  invoice = signal<SalesInvoice | null>(null);

  canEdit = computed(() => {

    const inv = this.invoice();

    if (!inv) return false;

    return inv.status !== 'cancelled';
  });

  canCancel = computed(() => {

    const inv = this.invoice();

    if (!inv) return false;

    return inv.status === 'draft';
  });

  canRaiseCreditNote = computed(() => {

    const inv = this.invoice();

    if (!inv) return false;

    return inv.status === 'paid'
      || inv.status === 'partially_paid';
  });

  totalItemQty = computed(() => {

    const inv = this.invoice();

    if (!inv) return 0;

    return inv.lineItems.reduce(
      (sum, row) =>
        sum + Number(row.quantity || 0),
      0
    );
  });

  totalTax = computed(() => {

    return this.invoice()?.taxSummary
      .totalTaxAmount || 0;
  });

  balanceDue = computed(() => {

    return this.invoice()?.payment
      .balanceDue || 0;
  });

  amountPaid = computed(() => {

    return this.invoice()?.payment
      .amountPaid || 0;
  });


  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {

      this.toast.error(
        'Invalid invoice id'
      );

      this.router.navigate([
        '/sales-invoice'
      ]);

      return;
    }

    const data =
      this.invoiceService
        .getInvoiceById(id);

    if (!data) {

      this.toast.error(
        'Invoice not found'
      );

      this.router.navigate([
        '/sales-invoice'
      ]);

      return;
    }

    this.invoice.set(data);
  }


  onBack(): void {

    this.router.navigate([
      '/sales-invoice'
    ]);
  }

  onEdit(): void {

    const inv = this.invoice();

    if (!inv) return;

    this.router.navigate([
      '/sales-invoice/edit',
      inv.id
    ]);
  }


  onPrint(): void {

    window.print();
  }

  onDownloadPDF(): void {

    this.toast.success(
      'PDF download started'
    );
  }

  onCancel(): void {

    this.toast.success(
      'Invoice cancelled'
    );
  }

  onCreditNote(): void {

    this.toast.success(
      'Credit note action triggered'
    );
  }


  statusIcon(
    status: SalesInvoiceStatus
  ): string {

    switch (status) {

      case 'draft':
        return 'file';

      case 'sent':
        return 'send';

      case 'partially_paid':
        return 'clock-hour-4';

      case 'paid':
        return 'circle-check';

      case 'cancelled':
        return 'ban';

      case 'overdue':
        return 'alert-circle';

      default:
        return 'info-circle';
    }
  }

  payStatusIcon(
    status: string
  ): string {

    switch (status) {

      case 'paid':
        return 'circle-check';

      case 'partial':
        return 'clock-hour-4';

      case 'unpaid':
        return 'alert-circle';

      default:
        return 'wallet';
    }
  }
}