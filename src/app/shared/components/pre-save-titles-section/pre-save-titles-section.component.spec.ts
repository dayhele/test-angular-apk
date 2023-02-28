import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaveTitlesSectionComponent } from './pre-save-titles-section.component';

describe('PreSaveTitlesSectionComponent', () => {
  let component: PreSaveTitlesSectionComponent;
  let fixture: ComponentFixture<PreSaveTitlesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaveTitlesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaveTitlesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
