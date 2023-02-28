import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsSectionComponent } from './sports-section.component';

describe('SportsSectionComponent', () => {
  let component: SportsSectionComponent;
  let fixture: ComponentFixture<SportsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
