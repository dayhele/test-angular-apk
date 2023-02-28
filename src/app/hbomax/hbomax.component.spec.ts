import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HbomaxComponent } from './hbomax.component';

describe('HbomaxComponent', () => {
  let component: HbomaxComponent;
  let fixture: ComponentFixture<HbomaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HbomaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HbomaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
