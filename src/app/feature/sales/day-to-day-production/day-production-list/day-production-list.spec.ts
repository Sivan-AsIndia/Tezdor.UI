import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayProductionList } from './day-production-list';

describe('DayProductionList', () => {
  let component: DayProductionList;
  let fixture: ComponentFixture<DayProductionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayProductionList],
    }).compileComponents();

    fixture = TestBed.createComponent(DayProductionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
