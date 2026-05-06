import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVieweComponent } from './productview';

describe('ProductVieweComponent', () => {
  let component: ProductVieweComponent;
  let fixture: ComponentFixture<ProductVieweComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductVieweComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductVieweComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
