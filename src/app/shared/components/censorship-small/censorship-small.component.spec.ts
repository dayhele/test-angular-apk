import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CensorshipSmallComponent } from './censorship-small.component';

describe('CensorshipSmallComponent', () => {
  let component: CensorshipSmallComponent;
  let fixture: ComponentFixture<CensorshipSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CensorshipSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CensorshipSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
