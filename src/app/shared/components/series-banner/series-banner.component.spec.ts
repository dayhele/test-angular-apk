import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesBannerComponent } from './series-banner.component';

describe('SeriesBannerComponent', () => {
  let component: SeriesBannerComponent;
  let fixture: ComponentFixture<SeriesBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
