import { TestBed } from '@angular/core/testing';

import { DelTripService } from './del-trip.service';

describe('DelTripService', () => {
  let service: DelTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
