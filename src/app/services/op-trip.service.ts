import { Injectable, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TripObject } from 'assets/trip-object';
import {
  collection, collectionData, deleteDoc,
  doc, Firestore, limit, orderBy, query, runTransaction,
  setDoc, startAt, addDoc
} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class OpTripService {
  tripsCollection;
  trips$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);

  // private _tripsLength: number = 0;
  // firestore: Firestore = inject(Firestore);
  // private _trips = new BehaviorSubject<TripObject[]>(mock_data.trips);
  // trips$ = this._trips.asObservable();

  constructor() {
    this.tripsCollection = collection(this.firestore, 'trips');
    this.trips$ = collectionData(this.tripsCollection, { idField: 'index' });
    console.log(this.trips$);
  }

  addTrip(trip: TripObject) {
    const temp_trip = trip;
    // temp_trip.index = this._tripsLength;
    // this._tripsLength++;
    addDoc(this.tripsCollection, temp_trip).then(() => {
      console.log('Trip added successfully');
    }).catch((error: any) => {
      console.error('Error adding trip: ', error);
    });
  }

  delTrip(trip: TripObject) {
    const tripDoc = doc(this.firestore, this.tripsCollection.path, trip.index.toString());
    console.log(trip.index.toString());
    deleteDoc(tripDoc).then(() => { }).catch((error: any) => {
      console.error('Error deleting trip: ', error);
    });
  }

}