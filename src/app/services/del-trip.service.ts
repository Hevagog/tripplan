import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TripObject } from 'assets/trip-object';

@Injectable({
  providedIn: 'root'
})
export class DelTripService {
  private _trips = new BehaviorSubject<TripObject[]>([]);
  trips$ = this._trips.asObservable();

  delTrip(trip: TripObject) {
    const updatedTrips = this._trips.value.filter(t => t !== trip);
    this._trips.next(updatedTrips);
  }

  clearTrips() {
    this._trips.next([]);
  }
}
