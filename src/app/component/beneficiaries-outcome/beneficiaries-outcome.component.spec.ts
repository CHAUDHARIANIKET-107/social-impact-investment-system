import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesOutcomeComponent } from './beneficiaries-outcome.component';

describe('BeneficiariesOutcomeComponent', () => {
  let component: BeneficiariesOutcomeComponent;
  let fixture: ComponentFixture<BeneficiariesOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiariesOutcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficiariesOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
