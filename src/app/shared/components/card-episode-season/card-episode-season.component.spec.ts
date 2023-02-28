import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEpisodeSeasonComponent } from './card-episode-season.component';

describe('CardEpisodeSeasonComponent', () => {
  let component: CardEpisodeSeasonComponent;
  let fixture: ComponentFixture<CardEpisodeSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardEpisodeSeasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEpisodeSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
