import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvProgramScheduledCardComponent } from './tv-program-scheduled-card.component';

describe('TvProgramScheduledCardComponent', () => {
  let component: TvProgramScheduledCardComponent;
  let fixture: ComponentFixture<TvProgramScheduledCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvProgramScheduledCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvProgramScheduledCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
