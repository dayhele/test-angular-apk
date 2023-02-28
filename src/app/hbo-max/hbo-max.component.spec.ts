import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HboMaxComponent } from './hbo-max.component';

describe('HboMaxComponent', () => {
  let component: HboMaxComponent;
  let fixture: ComponentFixture<HboMaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HboMaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HboMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
