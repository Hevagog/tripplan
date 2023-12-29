import { TestBed } from '@angular/core/testing';

import { OpTripService } from './op-trip.service';

describe('OpTripService', () => {
  let service: OpTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
