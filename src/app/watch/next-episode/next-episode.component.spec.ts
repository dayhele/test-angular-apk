import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextEpisodeComponent } from './next-episode.component';

describe('NextEpisodeComponent', () => {
  let component: NextEpisodeComponent;
  let fixture: ComponentFixture<NextEpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextEpisodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
