import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeClassificationListComponent } from './age-classification-list.component';

describe('AgeClassificationListComponent', () => {
  let component: AgeClassificationListComponent;
  let fixture: ComponentFixture<AgeClassificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgeClassificationListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeClassificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
