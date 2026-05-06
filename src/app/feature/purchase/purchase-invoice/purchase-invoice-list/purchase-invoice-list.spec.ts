import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchaseinvoicelist } from './purchaseinvoicelist';

describe('Purchaseinvoicelist', () => {
  let component: Purchaseinvoicelist;
  let fixture: ComponentFixture<Purchaseinvoicelist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Purchaseinvoicelist],
    }).compileComponents();

    fixture = TestBed.createComponent(Purchaseinvoicelist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
