import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSlideComponent } from './section-slide.component';

describe('SectionSlideComponent', () => {
  let component: SectionSlideComponent;
  let fixture: ComponentFixture<SectionSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
