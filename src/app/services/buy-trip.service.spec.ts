import { TestBed } from '@angular/core/testing';

import { BuyTripService } from './buy-trip.service';

describe('BuyTripService', () => {
  let service: BuyTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
