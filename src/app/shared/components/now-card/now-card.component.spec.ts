import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowCardComponent } from './now-card.component';

describe('NowCardComponent', () => {
  let component: NowCardComponent;
  let fixture: ComponentFixture<NowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
