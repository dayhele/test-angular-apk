import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownProfilePinComponent } from './dropdown-profile-pin.component';

describe('DropdownProfilePinComponent', () => {
  let component: DropdownProfilePinComponent;
  let fixture: ComponentFixture<DropdownProfilePinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownProfilePinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownProfilePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
