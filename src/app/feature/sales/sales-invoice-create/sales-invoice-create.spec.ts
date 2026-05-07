import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceCreate } from './sales-invoice-create';

describe('SalesInvoiceCreate', () => {
  let component: SalesInvoiceCreate;
  let fixture: ComponentFixture<SalesInvoiceCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesInvoiceCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesInvoiceCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
