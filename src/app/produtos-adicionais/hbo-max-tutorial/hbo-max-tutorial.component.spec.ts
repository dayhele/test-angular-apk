import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HboMaxTutorialComponent } from './hbo-max-tutorial.component';

describe('HboMaxTutorialComponent', () => {
  let component: HboMaxTutorialComponent;
  let fixture: ComponentFixture<HboMaxTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HboMaxTutorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HboMaxTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
