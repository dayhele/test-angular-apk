import { TestBed } from '@angular/core/testing';

import { HitoricService } from './hitoric.service';

describe('HitoricService', () => {
  let service: HitoricService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HitoricService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
