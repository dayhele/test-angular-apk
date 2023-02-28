import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultSectionDescriptionComponent } from './default-section-description.component';

describe('DefaultSectionDescriptionComponent', () => {
  let component: DefaultSectionDescriptionComponent;
  let fixture: ComponentFixture<DefaultSectionDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultSectionDescriptionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSectionDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
