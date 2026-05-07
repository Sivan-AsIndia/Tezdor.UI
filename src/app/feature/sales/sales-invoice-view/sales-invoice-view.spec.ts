import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceView } from './sales-invoice-view';

describe('SalesInvoiceView', () => {
  let component: SalesInvoiceView;
  let fixture: ComponentFixture<SalesInvoiceView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesInvoiceView],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesInvoiceView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
