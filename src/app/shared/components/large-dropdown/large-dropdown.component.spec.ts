import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeDropdownComponent } from './large-dropdown.component';

describe('LargeDropdownComponent', () => {
  let component: LargeDropdownComponent;
  let fixture: ComponentFixture<LargeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LargeDropdownComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
