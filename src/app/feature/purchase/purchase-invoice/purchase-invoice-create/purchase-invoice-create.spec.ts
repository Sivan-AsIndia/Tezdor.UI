import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchaseinvoicecreate } from './purchaseinvoicecreate';

describe('Purchaseinvoicecreate', () => {
  let component: Purchaseinvoicecreate;
  let fixture: ComponentFixture<Purchaseinvoicecreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Purchaseinvoicecreate],
    }).compileComponents();

    fixture = TestBed.createComponent(Purchaseinvoicecreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
