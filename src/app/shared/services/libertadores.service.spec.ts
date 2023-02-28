import { TestBed } from '@angular/core/testing';

import { LibertadoresService } from './libertadores.service';

describe('LibertadoresService', () => {
  let service: LibertadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibertadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
