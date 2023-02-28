import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSaveWarnBellComponent } from './pre-save-warn-bell.component';

describe('PreSaveWarnBellComponent', () => {
  let component: PreSaveWarnBellComponent;
  let fixture: ComponentFixture<PreSaveWarnBellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSaveWarnBellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSaveWarnBellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
