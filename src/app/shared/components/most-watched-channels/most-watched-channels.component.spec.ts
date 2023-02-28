import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostWatchedChannelsComponent } from './most-watched-channels.component';

describe('MostWatchedChannelsComponent', () => {
  let component: MostWatchedChannelsComponent;
  let fixture: ComponentFixture<MostWatchedChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostWatchedChannelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostWatchedChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
