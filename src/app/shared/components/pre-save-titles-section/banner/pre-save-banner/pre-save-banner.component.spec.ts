import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaveBannerComponent } from './pre-save-banner.component';

describe('PreSaveBannerComponent', () => {
  let component: PreSaveBannerComponent;
  let fixture: ComponentFixture<PreSaveBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaveBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaveBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
