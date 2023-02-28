import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastDownloadAppComponent } from './toast-download-app.component';

describe('ToastDownloadAppComponent', () => {
  let component: ToastDownloadAppComponent;
  let fixture: ComponentFixture<ToastDownloadAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastDownloadAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastDownloadAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
