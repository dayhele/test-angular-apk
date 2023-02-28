import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HboMaxAppComponent } from './hbo-max-app.component';

describe('HboMaxAppComponent', () => {
  let component: HboMaxAppComponent;
  let fixture: ComponentFixture<HboMaxAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HboMaxAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HboMaxAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
