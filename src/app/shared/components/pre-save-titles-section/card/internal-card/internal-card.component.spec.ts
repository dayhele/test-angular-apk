import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalCardComponent } from './internal-card.component';

describe('InternalCardComponent', () => {
  let component: InternalCardComponent;
  let fixture: ComponentFixture<InternalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
