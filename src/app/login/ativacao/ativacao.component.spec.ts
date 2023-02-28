import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivacaoComponent } from './ativacao.component';

describe('AtivacaoComponent', () => {
  let component: AtivacaoComponent;
  let fixture: ComponentFixture<AtivacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtivacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtivacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
