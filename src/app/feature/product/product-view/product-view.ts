import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDataClient } from '../product-data-client';
import { Product } from '../product';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css',
})
export class ProductViewComponent implements OnInit {

  private route   = inject(ActivatedRoute);
  private router  = inject(Router);
  private service = inject(ProductDataClient);

  // ✅ PRODUCT
  product = signal<Product | null>(null);

  // ✅ IMAGES
  images = computed(() => this.product()?.images ?? []);

  // ✅ SELECTED IMAGE
  selectedIndex = signal(0);

  // ✅ ZOOM STATES
  showZoom = signal(false);
  lensStyle = signal<Record<string, string>>({});
  zoomStyle = signal<Record<string, string>>({});

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const found = this.service.getById(+id);

      if (found) {
        this.product.set(found);

        const imgs = found.images ?? [];
        const primaryIndex = imgs.findIndex(img => img.isPrimary);

        this.selectedIndex.set(primaryIndex !== -1 ? primaryIndex : 0);
      } else {
        this.router.navigate(['/productlist']);
      }
    }
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
    transformOrigin: 'center'
  });
}
  zoomTransform = signal<Record<string, string>>({});

moveLens(event: MouseEvent) {
  if (!this.images().length) return;

  const container = event.currentTarget as HTMLElement;
  const rect = container.getBoundingClientRect();

  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  const zoomLevel = 2;

  this.zoomTransform.set({
    transform: `scale(${zoomLevel})`,
    transformOrigin: `${x * 100}% ${y * 100}%`
  });
}

  print() {
    window.print();
  }


  
  // ✅ HELPERS
  getCategoryLabel(id: number) {
    return ['Electronics','Clothing','Food','Books'][id - 1] ?? '-';
  }

  getBrandLabel(id?: number) {
    return id ? (['Apple','Samsung','Nike','Generic'][id - 1] ?? '-') : '-';
  }

  getUnitLabel(id: number) {
    return ['Pcs','Kg','Litre','Box','Dozen'][id - 1] ?? '-';
  }

  getTaxLabel(id?: number) {
    return id ? (['18% GST','5% GST','12% GST'][id - 1] ?? '-') : 'No Tax';
  }
}