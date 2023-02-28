import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiNsportsBannerComponent } from './multi-nsports-banner.component';

describe('MultiNsportsBannerComponent', () => {
  let component: MultiNsportsBannerComponent;
  let fixture: ComponentFixture<MultiNsportsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiNsportsBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiNsportsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
