import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDisconnectedComponent } from './popup-disconnected.component';

describe('PopupDisconnectedComponent', () => {
  let component: PopupDisconnectedComponent;
  let fixture: ComponentFixture<PopupDisconnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDisconnectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDisconnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
