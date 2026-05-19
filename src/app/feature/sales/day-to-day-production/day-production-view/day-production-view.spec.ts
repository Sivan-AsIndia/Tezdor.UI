import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayProductionView } from './day-production-view';

describe('DayProductionView', () => {
  let component: DayProductionView;
  let fixture: ComponentFixture<DayProductionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayProductionView],
    }).compileComponents();

    fixture = TestBed.createComponent(DayProductionView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
