import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StingrayWebComponent } from './stingray-web.component';

describe('StingrayWebComponent', () => {
  let component: StingrayWebComponent;
  let fixture: ComponentFixture<StingrayWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StingrayWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StingrayWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
