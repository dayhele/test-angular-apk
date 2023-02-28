import { TestBed } from '@angular/core/testing';

import { AnonymousRoutesService } from './anonymous-routes.service';

describe('AnonymousRoutesService', () => {
  let service: AnonymousRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnonymousRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
