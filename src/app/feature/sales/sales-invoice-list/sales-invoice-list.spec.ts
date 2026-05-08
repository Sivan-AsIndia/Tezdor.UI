import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceList } from './sales-invoice-list';

describe('SalesInvoiceList', () => {
  let component: SalesInvoiceList;
  let fixture: ComponentFixture<SalesInvoiceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesInvoiceList],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesInvoiceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
