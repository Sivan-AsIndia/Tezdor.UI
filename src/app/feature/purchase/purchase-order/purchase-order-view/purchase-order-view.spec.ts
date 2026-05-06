import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchaseorderview } from './purchaseorderview';

describe('Purchaseorderview', () => {
  let component: Purchaseorderview;
  let fixture: ComponentFixture<Purchaseorderview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Purchaseorderview],
    }).compileComponents();

    fixture = TestBed.createComponent(Purchaseorderview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
