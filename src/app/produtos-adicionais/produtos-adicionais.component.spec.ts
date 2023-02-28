import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosAdicionaisComponent } from './produtos-adicionais.component';

describe('ProdutosAdicionaisComponent', () => {
  let component: ProdutosAdicionaisComponent;
  let fixture: ComponentFixture<ProdutosAdicionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosAdicionaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosAdicionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
