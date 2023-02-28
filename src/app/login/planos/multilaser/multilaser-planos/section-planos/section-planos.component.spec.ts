import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPlanosComponent } from './section-planos.component';

describe('SectionPlanosComponent', () => {
  let component: SectionPlanosComponent;
  let fixture: ComponentFixture<SectionPlanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionPlanosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPlanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
