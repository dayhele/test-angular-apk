import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderPreSaveButtonComponent } from './reminder-pre-save-button.component';

describe('ReminderPreSaveButtonComponent', () => {
  let component: ReminderPreSaveButtonComponent;
  let fixture: ComponentFixture<ReminderPreSaveButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderPreSaveButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderPreSaveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
