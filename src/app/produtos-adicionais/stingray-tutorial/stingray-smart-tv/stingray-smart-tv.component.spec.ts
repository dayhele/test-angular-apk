import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StingraySmartTvComponent } from './stingray-smart-tv.component';

describe('StingraySmartTvComponent', () => {
  let component: StingraySmartTvComponent;
  let fixture: ComponentFixture<StingraySmartTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StingraySmartTvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StingraySmartTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
