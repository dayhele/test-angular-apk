import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionEpisodeSeasonComponent } from './section-episode-season.component';

describe('SectionEpisodeSeasonComponent', () => {
  let component: SectionEpisodeSeasonComponent;
  let fixture: ComponentFixture<SectionEpisodeSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionEpisodeSeasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionEpisodeSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
