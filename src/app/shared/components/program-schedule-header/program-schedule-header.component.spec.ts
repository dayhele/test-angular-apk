import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramScheduleHeaderComponent } from './program-schedule-header.component';

describe('ProgramScheduleHeaderComponent', () => {
  let component: ProgramScheduleHeaderComponent;
  let fixture: ComponentFixture<ProgramScheduleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramScheduleHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramScheduleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
