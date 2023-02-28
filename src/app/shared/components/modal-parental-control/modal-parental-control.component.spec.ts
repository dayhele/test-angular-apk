import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParentalControlComponent } from './modal-parental-control.component';

describe('ModalParentalControlComponent', () => {
  let component: ModalParentalControlComponent;
  let fixture: ComponentFixture<ModalParentalControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalParentalControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalParentalControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
