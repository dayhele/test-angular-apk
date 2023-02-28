import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHereComponent } from './new-here.component';

describe('NewHereComponent', () => {
  let component: NewHereComponent;
  let fixture: ComponentFixture<NewHereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
