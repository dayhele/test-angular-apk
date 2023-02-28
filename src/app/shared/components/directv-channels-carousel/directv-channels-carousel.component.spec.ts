import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectvChannelsCarouselComponent } from './directv-channels-carousel.component';

describe('DirectvChannelsCarouselComponent', () => {
  let component: DirectvChannelsCarouselComponent;
  let fixture: ComponentFixture<DirectvChannelsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectvChannelsCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectvChannelsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
