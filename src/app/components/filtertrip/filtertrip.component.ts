import { CommonModule } from '@angular/common';
import { TripObject } from 'assets/trip-object';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OpTripService } from 'app/services/op-trip.service';
import { FormGroup, ReactiveFormsModule, FormsModule, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-filtertrip',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filtertrip.component.html',
  styleUrl: './filtertrip.component.css'
})

export class FiltertripComponent implements OnInit {
  @Input() trips: TripObject[] = [];
  @Output() filterEvent = new EventEmitter<TripObject[]>();
  tripsDirections: string[] = [];
  selectedDirection: string = this.tripsDirections[0];
  largestPrice: number | undefined;
  smallestPrice: number | undefined;
  selectedPrice: number | undefined;

  filterForm = new FormGroup({
    country: new FormControl(''),
    price: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    ratingLow: new FormControl(''),
    ratingHigh: new FormControl(''),
  });

  constructor(private opTripService: OpTripService) {
    this.opTripService.trips$.subscribe(trips => {
      this.trips = trips;
      this.updateTrips();
    });
  }


  onSubmit() {
    if (this.filterForm.valid) {
      this.getTrips();
      let filteredTrips: TripObject[] = this.trips;

      if (this.filterForm.value.country) {
        filteredTrips = filteredTrips.filter(trip => trip.country === this.filterForm.value.country);
      }
      if (this.filterForm.value.price) {
        const price = parseFloat(this.filterForm.value.price);
        filteredTrips = filteredTrips.filter(trip => trip.price <= price);
      }
      if (this.filterForm.value.ratingLow) {
        const ratingLow = parseFloat(this.filterForm.value.ratingLow);
        filteredTrips = filteredTrips.filter(trip => trip.rating >= ratingLow);
      }
      if (this.filterForm.value.ratingHigh) {
        const ratingHigh = parseFloat(this.filterForm.value.ratingHigh);
        filteredTrips = filteredTrips.filter(trip => trip.rating <= ratingHigh);
      }
      if (this.filterForm.value.startDate) {
        const startDate = new Date(this.filterForm.value.startDate);
        filteredTrips = filteredTrips.filter(trip => new Date(trip.startDate) >= startDate);
      }
      if (this.filterForm.value.endDate) {
        const endDate = new Date(this.filterForm.value.endDate);
        filteredTrips = filteredTrips.filter(trip => new Date(trip.endDate) <= endDate);
      }

      if (filteredTrips) {
        console.log(filteredTrips);
        this.filterEvent.emit(filteredTrips);
      }
    } else {
      console.log('invalid');
    }
  }


  checkValidity() {
    if (this.filterForm.value.ratingLow && this.filterForm.value.ratingHigh && (+this.filterForm.value.ratingLow > +this.filterForm.value.ratingHigh)) {
      return true;
    }
    if (this.filterForm.value.ratingLow && (+this.filterForm.value.ratingLow > 5 || +this.filterForm.value.ratingLow < 0)) {
      return true;
    }
    return false;
  }


  filterTrips() {
    price: this.selectedPrice;
  }

  clearInputs() {
    this.filterForm.reset();
    this.opTripService.trips$.subscribe(trips => {
      this.trips = trips;
      this.updateTrips();
      this.filterEvent.emit(this.trips);
    });
  }
  getTrips() {
    this.opTripService.trips$.subscribe(trips => {
      this.trips = trips;
      this.updateTrips();
    });
  }

  ngOnInit() {
    this.updateTrips();
    this.selectedPrice = this.smallestPrice;
  }

  updateTrips() {
    this.tripsDirections = this.trips.map(trip => trip.country);
    const availableTrips = this.trips.filter(trip => trip.availableSeats > 0);
    this.largestPrice = Math.max(...availableTrips.map(trip => trip.price));
    this.smallestPrice = Math.min(...availableTrips.map(trip => trip.price));
  }



}
