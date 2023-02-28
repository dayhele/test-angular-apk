import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectvgoButtonComponent } from './directvgo-button.component';

describe('DirectvgoButtonComponent', () => {
  let component: DirectvgoButtonComponent;
  let fixture: ComponentFixture<DirectvgoButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectvgoButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectvgoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
