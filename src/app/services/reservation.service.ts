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
export class ReservationService {
  firestore: Firestore = inject(Firestore);
  tripsCollection;
  trips$: Observable<any[]>;

  private _totalReservedSeats = new BehaviorSubject<number>(0);
  private _totalReservedValue = new BehaviorSubject<number>(0);
  private _reservedSeats = new BehaviorSubject<{ [key: string]: number }>({});
  totalReservedSeats$ = this._totalReservedSeats.asObservable();
  totalReservedValue$ = this._totalReservedValue.asObservable();
  reservedSeatsAmount$ = this._reservedSeats.asObservable();

  private _tripsInCartAmount = new BehaviorSubject<{ [key: string]: number }>({});
  private _tripsInCart = new BehaviorSubject<{ [key: string]: TripObject }>({});
  tripsInCartAmount$ = this._tripsInCartAmount.asObservable();
  tripsInCart$ = this._tripsInCart.asObservable();

  constructor() {
    this.tripsCollection = collection(this.firestore, 'trips');
    this.trips$ = collectionData(this.tripsCollection, { idField: 'index' });

    this._reservedSeats.next({});
    this._tripsInCart.next({});
  }

  addSeatWithPrice(trip: TripObject) {
    var tripDoc = doc(this.firestore, this.tripsCollection.path, trip.index.toString());

    let reservedSeats = { ...this._reservedSeats.value };
    if (!reservedSeats.hasOwnProperty(trip.index)) {
      reservedSeats[trip.index] = 0;
    }
    reservedSeats[trip.index] += 1;
    this._reservedSeats.next(reservedSeats);

    this._totalReservedSeats.next(this._totalReservedSeats.value + 1);
    this._totalReservedValue.next(this._totalReservedValue.value + trip.price);

    setDoc(tripDoc, { availableSeats: trip.availableSeats }, { merge: true }).then(() => {
      console.log('Trip updated successfully');
    }).catch((error: any) => {
      console.error('Error updating trip: ', error);
    });

  }

  addSeatsInCart(trip: TripObject) {
    var tripDoc = doc(this.firestore, this.tripsCollection.path, trip.index.toString());

    const trips = { ...this._tripsInCart.value };
    const tripAmount = { ...this._tripsInCartAmount.value };
    if (trips.hasOwnProperty(trip.index)) {
      tripAmount[trip.index] += 1;
    } else {
      trips[trip.index] = trip;
      tripAmount[trip.index] = 1;
    }
    this._tripsInCart.next(trips);
    this._tripsInCartAmount.next(tripAmount);

    setDoc(tripDoc, { availableSeats: trip.availableSeats }, { merge: true }).then(() => {
      console.log('Trip updated successfully');
    }).catch((error: any) => {
      console.error('Error updating trip: ', error);
    });
  }

  removeSeatInCart(trip: TripObject) {
    var tripDoc = doc(this.firestore, this.tripsCollection.path, trip.index.toString());

    const trips = { ...this._tripsInCart.value };
    const tripAmount = { ...this._tripsInCartAmount.value };
    if (trips.hasOwnProperty(trip.index)) {
      if (tripAmount[trip.index] === 1) {
        this.removeTripFromCart(trip.index);
      } else {
        tripAmount[trip.index] -= 1;
        this._tripsInCartAmount.next(tripAmount);
      }
    }
    setDoc(tripDoc, { availableSeats: trip.availableSeats }, { merge: true }).then(() => {
      console.log('Trip updated successfully');
    }).catch((error: any) => {
      console.error('Error updating trip: ', error);
    });
  }

  removeSeatWithPrice(trip: TripObject) {
    var tripDoc = doc(this.firestore, this.tripsCollection.path, trip.index.toString());

    let reservedSeats = { ...this._reservedSeats.value };
    if (!reservedSeats.hasOwnProperty(trip.index)) {
      console.error('Trying to remove seat from non-existing trip');
    }
    reservedSeats[trip.index] -= 1;
    this._reservedSeats.next(reservedSeats);

    this._totalReservedSeats.next(this._totalReservedSeats.value - 1);
    this._totalReservedValue.next(this._totalReservedValue.value - trip.price);

    if (reservedSeats[trip.index] === 0) {
      this.removeTripFromCart(trip.index);
    }

    setDoc(tripDoc, { availableSeats: trip.availableSeats }, { merge: true }).then(() => {
      console.log('Trip updated successfully');
    }).catch((error: any) => {
      console.error('Error updating trip: ', error);
    });
  }

  removeAllSeatsWithPrice(trip: TripObject) {
    let reservedSeats = { ...this._reservedSeats.value };
    if (!reservedSeats.hasOwnProperty(trip.index)) {
      console.error('Trying to remove seat from non-existing trip');
    }
    this._totalReservedSeats.next(this._totalReservedSeats.value - reservedSeats[trip.index]);
    this._totalReservedValue.next(this._totalReservedValue.value - reservedSeats[trip.index] * trip.price);
    reservedSeats[trip.index] = 0;
    this._reservedSeats.next(reservedSeats);
    this.removeTripFromCart(trip.index);
  }

  addTripToCart(trip: TripObject, seats: number) {
    const trips = { ...this._tripsInCart.value };
    const tripAmount = { ...this._tripsInCartAmount.value };
    if (trips.hasOwnProperty(trip.index)) {
      tripAmount[trip.index] += seats;
    } else {
      trips[trip.index] = trip;
      tripAmount[trip.index] = seats;
    }
    this._tripsInCart.next(trips);
    this._tripsInCartAmount.next(tripAmount);
    this.removeTripFromReservedSeats(trip.index, trip.price);
  }

  removeTripFromReservedSeats(index: number, price: number) {
    let reservedSeats = { ...this._reservedSeats.value };
    if (!reservedSeats.hasOwnProperty(index)) {
      console.error('Trying to remove seat from non-existing trip');
    }
    this._totalReservedSeats.next(this._totalReservedSeats.value - reservedSeats[index]);
    this._totalReservedValue.next(this._totalReservedValue.value - reservedSeats[index] * price);
    reservedSeats[index] = 0;
    this._reservedSeats.next(reservedSeats);
  }

  removeTripFromCart(index: number) {
    const trips = { ...this._tripsInCart.value };
    const tripAmount = { ...this._tripsInCartAmount.value };
    if (trips.hasOwnProperty(index)) {
      delete trips[index];
      delete tripAmount[index];
      this._tripsInCart.next(trips);
      this._tripsInCartAmount.next(tripAmount);
    }
  }

  clean_reserved_seats() {
    this._totalReservedSeats.next(0);
    this._totalReservedValue.next(0);
  }

  cleanAll() {
    this._tripsInCart.next({});
    this._tripsInCartAmount.next({});
  }
}
