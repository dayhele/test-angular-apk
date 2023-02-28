import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryInsertPasswordComponent } from './password-recovery-insert-password.component';

describe('PasswordRecoveryInsertPasswordComponent', () => {
  let component: PasswordRecoveryInsertPasswordComponent;
  let fixture: ComponentFixture<PasswordRecoveryInsertPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordRecoveryInsertPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecoveryInsertPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
