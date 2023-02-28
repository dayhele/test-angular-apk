import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectvGoComponent } from './directv-go.component';

describe('DirectvGoComponent', () => {
  let component: DirectvGoComponent;
  let fixture: ComponentFixture<DirectvGoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectvGoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectvGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
