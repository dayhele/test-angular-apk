/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChromecastService } from './chromecast.service';

describe('Service: Chromecast', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChromecastService]
    });
  });

  it('should ...', inject([ChromecastService], (service: ChromecastService) => {
    expect(service).toBeTruthy();
  }));
});
