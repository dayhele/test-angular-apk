import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSearchResultsCounterComponent } from './section-search-results-counter.component';

describe('SectionSearchResultsCounterComponent', () => {
  let component: SectionSearchResultsCounterComponent;
  let fixture: ComponentFixture<SectionSearchResultsCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionSearchResultsCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSearchResultsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
