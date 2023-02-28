import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNsportsComponent } from './card-nsports.component';

describe('CardNsportsComponent', () => {
  let component: CardNsportsComponent;
  let fixture: ComponentFixture<CardNsportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardNsportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNsportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
