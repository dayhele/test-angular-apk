import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashAppComponent } from './splash-app.component';

describe('SplashAppComponent', () => {
  let component: SplashAppComponent;
  let fixture: ComponentFixture<SplashAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
