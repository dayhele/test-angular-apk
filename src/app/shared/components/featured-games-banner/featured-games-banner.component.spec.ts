import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedGamesBannerComponent } from './featured-games-banner.component';

describe('FeaturedGamesBannerComponent', () => {
  let component: FeaturedGamesBannerComponent;
  let fixture: ComponentFixture<FeaturedGamesBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedGamesBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedGamesBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
