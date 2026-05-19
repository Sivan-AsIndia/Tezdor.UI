import { computed, Injectable, signal } from '@angular/core';
import { INITIAL_NEXT_ID, INITIAL_PRODUCTS } from './product.seed';
import { Product } from './product';


@Injectable({
  providedIn: 'root',
})
export class ProductDataClient {

  private nextId = INITIAL_NEXT_ID;

  products = signal<Product[]>(INITIAL_PRODUCTS);

  productCount = computed(() => this.products().length);

  addProduct(data: Omit<Product, 'id'>) {
    const newProduct: Product = { id: this.nextId++, ...data };
    this.products.update(list => [...list, newProduct]);
    console.log(this.products());
    
  }

  getById(id: number) {
    return this.products().find(p => p.id === id);
  }

  updateProduct(updated: Product) {
    this.products.update(list =>
      list.map(p => p.id === updated.id ? updated : p)
    );
  }

  deleteProduct(id: number) {
    this.products.update(list => list.filter(p => p.id !== id));
  }
}