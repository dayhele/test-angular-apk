import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaulSectionComponent } from './default-section.component';

describe('DefaulSectionComponent', () => {
  let component: DefaulSectionComponent;
  let fixture: ComponentFixture<DefaulSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaulSectionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaulSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
