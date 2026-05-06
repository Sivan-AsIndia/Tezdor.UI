import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchaseorderlist } from './purchaseorderlist';

describe('Purchaseorderlist', () => {
  let component: Purchaseorderlist;
  let fixture: ComponentFixture<Purchaseorderlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Purchaseorderlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Purchaseorderlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
