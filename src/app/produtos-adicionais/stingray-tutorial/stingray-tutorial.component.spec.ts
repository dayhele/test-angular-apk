import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StingrayTutorialComponent } from './stingray-tutorial.component';

describe('StingrayTutorialComponent', () => {
  let component: StingrayTutorialComponent;
  let fixture: ComponentFixture<StingrayTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StingrayTutorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StingrayTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
