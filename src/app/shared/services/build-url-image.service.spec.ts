import { TestBed } from '@angular/core/testing';

import { BuildUrlImageService } from './build-url-image.service';

describe('BuildUrlImageService', () => {
  let service: BuildUrlImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildUrlImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
