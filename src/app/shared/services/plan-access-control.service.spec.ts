import { TestBed } from '@angular/core/testing';

import { PlanAccessControlService } from './plan-access-control.service';

describe('PlanAccessControlService', () => {
  let service: PlanAccessControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanAccessControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
