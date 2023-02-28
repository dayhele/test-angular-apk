import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPinComponent } from './modal-pin.component';

describe('ModalPinComponent', () => {
  let component: ModalPinComponent;
  let fixture: ComponentFixture<ModalPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
