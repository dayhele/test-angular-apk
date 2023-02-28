import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLibertadoresComponent } from './section-libertadores.component';

describe('SectionLibertadoresComponent', () => {
  let component: SectionLibertadoresComponent;
  let fixture: ComponentFixture<SectionLibertadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionLibertadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionLibertadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
