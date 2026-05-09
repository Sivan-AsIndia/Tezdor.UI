// ── Product View Component ───────────────────────────────────
// ✅ Angular 21 — uses input() signal for route param binding,
//    computed() for derived state, no OnInit/NgZone.

import { Component, inject, input, signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDataClient } from '../product-data-client';
import { Product } from '../product';
import { CommonModule, DecimalPipe } from '@angular/common';
import { PrintService } from '../../../core/print/print.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css',
})
export class ProductViewComponent {

  private router  = inject(Router);
  private service = inject(ProductDataClient);
  private printService = inject(PrintService);

  /**
   * ✅ Angular 21 input() signal — binds the ':id' route param
   *    automatically via withComponentInputBinding() in app.config.
   *    No OnInit, no ActivatedRoute snapshot needed.
   */
  id = input<string>();

  // ✅ PRODUCT — derived from the route param via computed()
  product = computed<Product | null>(() => {
    const routeId = this.id();
    if (!routeId) return null;
    return this.service.getById(+routeId) ?? null;
  });

  // ✅ IMAGES — derived from product
  images = computed(() => {
    const p = this.product();
    if (!p || !Array.isArray(p.images)) return [];
    return p.images;
  });

  // ✅ SELECTED IMAGE
  selectedIndex = signal(0);

  // ✅ ZOOM STATES
  showZoom = signal(false);
  zoomTransform = signal<Record<string, string>>({});

  /**
   * ✅ effect() replaces ngOnInit() — runs whenever product() changes.
   *    Sets the selected image to the primary image index.
   *    Navigates away if the product ID is invalid.
   */
  constructor() {
    effect(() => {
      const p = this.product();
      const routeId = this.id();

      if (routeId && !p) {
        // Invalid product ID → redirect to list
        this.router.navigate(['/products']);
        return;
      }

      if (p) {
        const imgs = Array.isArray(p.images) ? p.images : [];
        const primaryIndex = imgs.findIndex(img => img.isPrimary);
        this.selectedIndex.set(primaryIndex !== -1 ? primaryIndex : 0);
      }
    });
  }

  // ✅ CLICK THUMB
  selectImage(index: number) {
    this.selectedIndex.set(index);
    this.showZoom.set(false);
  }

  startZoom() {
    this.showZoom.set(true);
  }

  stopZoom() {
    this.showZoom.set(false);
    this.zoomTransform.set({
      transform: 'scale(1)',
      transformOrigin: 'center',
    });
  }

  moveLens(event: MouseEvent) {
    if (!this.images().length) return;

    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const zoomLevel = 2;

    this.zoomTransform.set({
      transform: `scale(${zoomLevel})`,
      transformOrigin: `${x * 100}% ${y * 100}%`,
    });
  }

  print() {
    const p = this.product();
    if (p) {
      this.printService.printProduct(p);
    }
  }

  // ✅ HELPERS
  getCategoryLabel(id: number) {
    return ['Electronics', 'Clothing', 'Food', 'Books'][id - 1] ?? '-';
  }

  getBrandLabel(id?: number) {
    return id ? (['Apple', 'Samsung', 'Nike', 'Generic'][id - 1] ?? '-') : '-';
  }

  getUnitLabel(id: number) {
    return ['Pcs', 'Kg', 'Litre', 'Box', 'Dozen'][id - 1] ?? '-';
  }

  getTaxLabel(id?: number) {
    return id ? (['18% GST', '5% GST', '12% GST'][id - 1] ?? '-') : 'No Tax';
  }
}
