import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLedgerEntry } from './general-ledger-entry';

describe('GeneralLedgerEntry', () => {
  let component: GeneralLedgerEntry;
  let fixture: ComponentFixture<GeneralLedgerEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralLedgerEntry],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralLedgerEntry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
