import { TestBed } from '@angular/core/testing';

import { AtivacaoSmsService } from './ativacao-sms.service';

describe('AtivacaoSmsService', () => {
  let service: AtivacaoSmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtivacaoSmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
