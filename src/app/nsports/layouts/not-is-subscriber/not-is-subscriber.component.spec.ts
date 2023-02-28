import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotIsSubscriberComponent } from './not-is-subscriber.component';

describe('NotIsSubscriberComponent', () => {
  let component: NotIsSubscriberComponent;
  let fixture: ComponentFixture<NotIsSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotIsSubscriberComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotIsSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
