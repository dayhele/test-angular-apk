import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCorouselComponent } from './card-corousel.component';

describe('CardCorouselComponent', () => {
  let component: CardCorouselComponent;
  let fixture: ComponentFixture<CardCorouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCorouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCorouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
