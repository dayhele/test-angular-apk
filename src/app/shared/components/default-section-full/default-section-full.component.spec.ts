import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSectionFullComponent } from './default-section-full.component';

describe('DefaultSectionFullComponent', () => {
  let component: DefaultSectionFullComponent;
  let fixture: ComponentFixture<DefaultSectionFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultSectionFullComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSectionFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
