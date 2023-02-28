import { TestBed } from '@angular/core/testing';

import { MoviesAndSeriesService } from './movies-and-series.service';

describe('MoviesAndSeriesService', () => {
  let service: MoviesAndSeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesAndSeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
