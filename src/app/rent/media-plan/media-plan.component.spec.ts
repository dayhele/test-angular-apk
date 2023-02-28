import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaPlanComponent } from './media-plan.component';

describe('MediaPlanComponent', () => {
  let component: MediaPlanComponent;
  let fixture: ComponentFixture<MediaPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaPlanComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
