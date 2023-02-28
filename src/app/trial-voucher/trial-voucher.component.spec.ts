import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialVoucherComponent } from './trial-voucher.component';

describe('TrialVoucherComponent', () => {
  let component: TrialVoucherComponent;
  let fixture: ComponentFixture<TrialVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrialVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
