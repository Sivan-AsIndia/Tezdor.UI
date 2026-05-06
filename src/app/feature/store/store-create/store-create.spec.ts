import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Storecreate } from './storecreate';

describe('Storecreate', () => {
  let component: Storecreate;
  let fixture: ComponentFixture<Storecreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Storecreate],
    }).compileComponents();

    fixture = TestBed.createComponent(Storecreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
