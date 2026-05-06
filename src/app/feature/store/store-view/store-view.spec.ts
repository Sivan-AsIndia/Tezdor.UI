import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Storeview } from './storeview';

describe('Storeview', () => {
  let component: Storeview;
  let fixture: ComponentFixture<Storeview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Storeview],
    }).compileComponents();

    fixture = TestBed.createComponent(Storeview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
