import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvProgramScheduledSectionComponent } from './tv-program-scheduled-section.component';

describe('TvProgramScheduledSectionComponent', () => {
  let component: TvProgramScheduledSectionComponent;
  let fixture: ComponentFixture<TvProgramScheduledSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvProgramScheduledSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvProgramScheduledSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
