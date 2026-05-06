import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GeneralLedgerEntry } from '../general-ledger-entry';
import { GeneralLedgerEntryClient } from '../general-ledger-entry-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general-ledger-entry-detail',
  imports: [CommonModule,RouterModule],
  templateUrl: './general-ledger-entry-detail.html',
  styleUrl: './general-ledger-entry-detail.css',
})
export class GeneralLedgerEntryDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly gleService = inject(GeneralLedgerEntryClient);

  entry = signal<GeneralLedgerEntry | null>(null);

  paramMap = toSignal(this.route.paramMap);

  activeTab = signal<'overview' | 'audit'>('overview');



  constructor() {
    effect(() => {
      const params = this.paramMap();
      if (!params) return;

      const id = params.get('id');
      if (!id) return;

      const data = this.gleService.getById(id);
      this.entry.set(data ?? null);
    });
  }

  print() {
    window.print();
  }

  setTab(tab: 'overview' | 'audit') {
    this.activeTab.set(tab);
  }

  formatDate(date?: string) {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-GB');
  }

  formatDateTime(date?: string) {
    if (!date) return '-';
    return new Date(date).toLocaleString('en-GB');
  }
}
