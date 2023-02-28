import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanUpgradeSuccessComponent } from './plan-upgrade-success.component';

describe('PlanUpgradeSuccessComponent', () => {
  let component: PlanUpgradeSuccessComponent;
  let fixture: ComponentFixture<PlanUpgradeSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanUpgradeSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanUpgradeSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
