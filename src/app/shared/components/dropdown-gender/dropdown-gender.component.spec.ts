import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownGenderComponent } from './dropdown-gender.component';

describe('DropdownGenderComponent', () => {
  let component: DropdownGenderComponent;
  let fixture: ComponentFixture<DropdownGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
