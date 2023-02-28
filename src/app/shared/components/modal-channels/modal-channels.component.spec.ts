import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChannelsComponent } from './modal-channels.component';

describe('ModalChannelsComponent', () => {
  let component: ModalChannelsComponent;
  let fixture: ComponentFixture<ModalChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChannelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
