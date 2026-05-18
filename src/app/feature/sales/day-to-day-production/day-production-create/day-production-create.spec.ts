import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayProductionCreate } from './day-production-create';

describe('DayProductionCreate', () => {
  let component: DayProductionCreate;
  let fixture: ComponentFixture<DayProductionCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayProductionCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(DayProductionCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
