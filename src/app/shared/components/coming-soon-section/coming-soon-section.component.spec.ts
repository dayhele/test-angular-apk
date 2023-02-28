import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingSoonSectionComponent } from './coming-soon-section.component';

describe('ComingSoonSectionComponent', () => {
  let component: ComingSoonSectionComponent;
  let fixture: ComponentFixture<ComingSoonSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComingSoonSectionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComingSoonSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
