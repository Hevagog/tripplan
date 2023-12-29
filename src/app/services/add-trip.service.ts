import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TripObject } from 'assets/trip-object';

@Injectable({
  providedIn: 'root'
})
export class AddTripService {
  private _trips = new BehaviorSubject<TripObject[]>([]);
  trips$ = this._trips.asObservable();

  addTrip(trip: TripObject) {
    this._trips.next([...this._trips.value, trip]);
    this.clearTrip();
  }

  clearTrip() {
    this._trips.next([]);
  }
}
