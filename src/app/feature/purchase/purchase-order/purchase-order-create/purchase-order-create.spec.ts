import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchaseordercreate } from './purchaseordercreate';

describe('Purchaseordercreate', () => {
  let component: Purchaseordercreate;
  let fixture: ComponentFixture<Purchaseordercreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Purchaseordercreate],
    }).compileComponents();

    fixture = TestBed.createComponent(Purchaseordercreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
