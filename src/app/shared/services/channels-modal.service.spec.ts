import { TestBed } from '@angular/core/testing';

import { ChannelsModalService } from './channels-modal.service';

describe('ChannelsModalService', () => {
  let service: ChannelsModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelsModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
