import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSectionSeasonComponent } from './default-section-season.component';

describe('DefaultSectionSeasonComponent', () => {
  let component: DefaultSectionSeasonComponent;
  let fixture: ComponentFixture<DefaultSectionSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultSectionSeasonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSectionSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
