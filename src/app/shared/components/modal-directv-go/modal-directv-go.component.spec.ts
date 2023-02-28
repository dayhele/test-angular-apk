import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDirectvGoComponent } from './modal-directv-go.component';

describe('ModalDirectvGoComponent', () => {
  let component: ModalDirectvGoComponent;
  let fixture: ComponentFixture<ModalDirectvGoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDirectvGoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDirectvGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
