import { TestBed } from '@angular/core/testing';

import { PreSaveService } from './pre-save.service';

describe('PreSaveService', () => {
  let service: PreSaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreSaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
