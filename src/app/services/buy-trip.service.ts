import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { TripObject } from 'assets/trip-object';
import {
  collection, collectionData, deleteDoc, doc,
  Firestore, limit, orderBy, query, runTransaction,
  setDoc, startAt, addDoc
} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class BuyTripService {
  firestore: Firestore = inject(Firestore);
  tripsCollection;
  trips$: Observable<any[]>;

  private _tripsBought = new BehaviorSubject<{ [key: number]: TripObject }>({});
  private _tripsBoughtAmount = new BehaviorSubject<{ [key: number]: number }>({});
  private _tripsBoughtTime = new BehaviorSubject<{ [key: number]: Date }>({});
  tripsBought$ = this._tripsBought.asObservable();
  tripsBoughtAmount$ = this._tripsBoughtAmount.asObservable();
  tripsBoughtTime$ = this._tripsBoughtTime.asObservable();

  constructor() {
    this.tripsCollection = collection(this.firestore, 'trips');
    this.trips$ = collectionData(this.tripsCollection, { idField: 'index' });

    this._tripsBought.next({});
    this._tripsBoughtAmount.next({});
    this._tripsBoughtTime.next({});
  }

  buyTrip(trip: TripObject, amount: number) {
    const tripsBought = { ...this._tripsBought.value };
    const tripsBoughtAmount = { ...this._tripsBoughtAmount.value };
    const tripsBoughtTime = { ...this._tripsBoughtTime.value };

    tripsBought[trip.index] = trip;
    tripsBoughtAmount[trip.index] = amount;
    tripsBoughtTime[trip.index] = new Date();

    this._tripsBought.next(tripsBought);
    this._tripsBoughtAmount.next(tripsBoughtAmount);
    this._tripsBoughtTime.next(tripsBoughtTime);

    console.log(this._tripsBought.value);
    console.log(this._tripsBoughtAmount.value);
    console.log(this._tripsBoughtTime.value);
  }

  buyAllTrips(trips: { [key: number]: TripObject }, amount: { [key: number]: number }) {
    const tripsBought = { ...this._tripsBought.value };
    const tripsBoughtAmount = { ...this._tripsBoughtAmount.value };
    const tripsBoughtTime = { ...this._tripsBoughtTime.value };

    Object.values(trips).forEach((trip, index) => {
      tripsBought[trip.index] = trip;
      tripsBoughtAmount[trip.index] = amount[index];
      tripsBoughtTime[trip.index] = new Date();
    });

    this._tripsBought.next(tripsBought);
    this._tripsBoughtAmount.next(tripsBoughtAmount);
    this._tripsBoughtTime.next(tripsBoughtTime);

    console.log(this._tripsBought.value);
    console.log(this._tripsBoughtAmount.value);
    console.log(this._tripsBoughtTime.value);
  }
}