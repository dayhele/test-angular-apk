import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSavesComponent } from './pre-saves.component';

describe('PreSavesComponent', () => {
  let component: PreSavesComponent;
  let fixture: ComponentFixture<PreSavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
