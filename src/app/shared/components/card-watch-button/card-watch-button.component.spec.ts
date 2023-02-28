import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWatchButtonComponent } from './card-watch-button.component';

describe('CardWatchButtonComponent', () => {
  let component: CardWatchButtonComponent;
  let fixture: ComponentFixture<CardWatchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardWatchButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardWatchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
