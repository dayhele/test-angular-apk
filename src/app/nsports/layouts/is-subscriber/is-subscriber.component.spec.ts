import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsSubscriberComponent } from './is-subscriber.component';

describe('IsSubscriberComponent', () => {
  let component: IsSubscriberComponent;
  let fixture: ComponentFixture<IsSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsSubscriberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
