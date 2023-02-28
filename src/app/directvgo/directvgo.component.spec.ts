import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectvgoComponent } from './directvgo.component';

describe('DirectvgoComponent', () => {
  let component: DirectvgoComponent;
  let fixture: ComponentFixture<DirectvgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectvgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectvgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
