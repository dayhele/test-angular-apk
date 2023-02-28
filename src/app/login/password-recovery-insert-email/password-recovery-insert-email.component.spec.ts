import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryInsertEmailComponent } from './password-recovery-insert-email.component';

describe('PasswordRecoveryInsertEmailComponent', () => {
  let component: PasswordRecoveryInsertEmailComponent;
  let fixture: ComponentFixture<PasswordRecoveryInsertEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordRecoveryInsertEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecoveryInsertEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
