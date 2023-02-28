import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectvGoSectionComponent } from './directv-go-section.component';

describe('DirectvGoSectionComponent', () => {
  let component: DirectvGoSectionComponent;
  let fixture: ComponentFixture<DirectvGoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectvGoSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectvGoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
