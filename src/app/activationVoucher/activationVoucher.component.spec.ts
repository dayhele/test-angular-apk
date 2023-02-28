import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationVoucherComponent } from './activationVoucher.component';

describe('ActivationVoucherComponent', () => {
  let component: ActivationVoucherComponent;
  let fixture: ComponentFixture<ActivationVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
