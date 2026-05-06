import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchaseinvoiceview } from './purchaseinvoiceview';

describe('Purchaseinvoiceview', () => {
  let component: Purchaseinvoiceview;
  let fixture: ComponentFixture<Purchaseinvoiceview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Purchaseinvoiceview],
    }).compileComponents();

    fixture = TestBed.createComponent(Purchaseinvoiceview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
