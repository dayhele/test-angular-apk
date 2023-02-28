import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconesPlanosComponent } from './icones-planos.component';

describe('IconesPlanosComponent', () => {
  let component: IconesPlanosComponent;
  let fixture: ComponentFixture<IconesPlanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconesPlanosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconesPlanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
