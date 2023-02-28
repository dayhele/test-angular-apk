import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMaisComponent } from './ver-mais.component';

describe('VerMaisComponent', () => {
  let component: VerMaisComponent;
  let fixture: ComponentFixture<VerMaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
