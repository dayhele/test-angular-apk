import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilaserComponent } from './multilaser.component';

describe('MultilaserComponent', () => {
  let component: MultilaserComponent;
  let fixture: ComponentFixture<MultilaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultilaserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
