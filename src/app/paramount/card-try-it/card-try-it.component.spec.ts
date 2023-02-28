import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTryItComponent } from './card-try-it.component';

describe('CardTryItComponent', () => {
  let component: CardTryItComponent;
  let fixture: ComponentFixture<CardTryItComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTryItComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTryItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
