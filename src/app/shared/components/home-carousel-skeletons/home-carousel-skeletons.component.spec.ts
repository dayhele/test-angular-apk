import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarouselSkeletonsComponent } from './home-carousel-skeletons.component';

describe('HomeCarouselSkeletonsComponent', () => {
  let component: HomeCarouselSkeletonsComponent;
  let fixture: ComponentFixture<HomeCarouselSkeletonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCarouselSkeletonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCarouselSkeletonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
