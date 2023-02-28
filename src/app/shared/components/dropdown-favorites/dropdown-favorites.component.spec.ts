import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFavoritesComponent } from './dropdown-favorites.component';

describe('DropdownFavoritesComponent', () => {
  let component: DropdownFavoritesComponent;
  let fixture: ComponentFixture<DropdownFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownFavoritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
