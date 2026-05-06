import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipUi } from './tooltip-ui';

describe('TooltipUi', () => {
  let component: TooltipUi;
  let fixture: ComponentFixture<TooltipUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipUi],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
