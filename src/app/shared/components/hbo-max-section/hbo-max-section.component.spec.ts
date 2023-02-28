import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HboMaxSectionComponent } from './hbo-max-section.component';

describe('HboMaxSectionComponent', () => {
  let component: HboMaxSectionComponent;
  let fixture: ComponentFixture<HboMaxSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HboMaxSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HboMaxSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
