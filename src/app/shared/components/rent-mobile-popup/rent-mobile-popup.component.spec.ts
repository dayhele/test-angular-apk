import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentMobilePopupComponent } from './rent-mobile-popup.component';

describe('RentMobilePopupComponent', () => {
  let component: RentMobilePopupComponent;
  let fixture: ComponentFixture<RentMobilePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentMobilePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentMobilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
