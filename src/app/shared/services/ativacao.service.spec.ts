import { TestBed } from '@angular/core/testing';

import { AtivacaoService } from './ativacao.service';

describe('AtivacaoService', () => {
  let service: AtivacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtivacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
