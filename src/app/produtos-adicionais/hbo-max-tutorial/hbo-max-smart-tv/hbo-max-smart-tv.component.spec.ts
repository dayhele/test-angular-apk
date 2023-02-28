import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HboMaxSmartTvComponent } from './hbo-max-smart-tv.component';

describe('HboMaxSmartTvComponent', () => {
  let component: HboMaxSmartTvComponent;
  let fixture: ComponentFixture<HboMaxSmartTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HboMaxSmartTvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HboMaxSmartTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
