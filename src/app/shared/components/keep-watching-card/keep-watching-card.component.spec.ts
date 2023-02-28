import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeepWatchingCardComponent } from './keep-watching-card.component';

describe('KeepWatchingCardComponent', () => {
  let component: KeepWatchingCardComponent;
  let fixture: ComponentFixture<KeepWatchingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeepWatchingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeepWatchingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
