import { TestBed } from '@angular/core/testing';

import { ChangePlanService } from './change-plan.service';

describe('ChangePlanService', () => {
  let service: ChangePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
