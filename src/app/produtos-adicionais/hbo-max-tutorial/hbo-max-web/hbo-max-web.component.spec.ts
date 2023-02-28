import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HboMaxWebComponent } from './hbo-max-web.component';

describe('HboMaxWebComponent', () => {
  let component: HboMaxWebComponent;
  let fixture: ComponentFixture<HboMaxWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HboMaxWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HboMaxWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
