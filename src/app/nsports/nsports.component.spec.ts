import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsportsComponent } from './nsports.component';

describe('NsportsComponent', () => {
  let component: NsportsComponent;
  let fixture: ComponentFixture<NsportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NsportsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NsportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
