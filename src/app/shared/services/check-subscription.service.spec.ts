import { TestBed } from '@angular/core/testing';

import { CheckSubscription } from './check-subscription.service';

describe('CheckAssinaturaService', () => {
  let service: CheckSubscription;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckSubscription);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
