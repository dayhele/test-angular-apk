import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StingrayAppComponent } from './stingray-app.component';

describe('StingrayAppComponent', () => {
  let component: StingrayAppComponent;
  let fixture: ComponentFixture<StingrayAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StingrayAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StingrayAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
