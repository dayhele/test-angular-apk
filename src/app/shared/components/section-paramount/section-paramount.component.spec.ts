import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionParamountComponent } from './section-paramount.component';

describe('SectionParamountComponent', () => {
  let component: SectionParamountComponent;
  let fixture: ComponentFixture<SectionParamountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionParamountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionParamountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
