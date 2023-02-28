import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNoContentComponent } from './modal-no-content.component';

describe('ModalNoContentComponent', () => {
  let component: ModalNoContentComponent;
  let fixture: ComponentFixture<ModalNoContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNoContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
