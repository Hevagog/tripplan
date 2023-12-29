import { CommonModule } from '@angular/common';
import { TripObject } from 'assets/trip-object';
import { Component, OnInit } from '@angular/core';
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
  trips: TripObject[] = [];
  tripsDirections: string[] = [];
  selectedDirection: string = this.tripsDirections[0];
  submitted: boolean = false;
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
  }, {
    validators: [
      // this.lessThan('startDate', 'endDate'),
      // this.lessThan('ratingLow', 'ratingHigh'),
      // this.atLeastOneFieldValidator(['country', 'price', 'startDate', 'endDate', 'ratingLow', 'ratingHigh']),
      // this.fieldsTogetherValidator('startDate', 'endDate'),
      // this.fieldsTogetherValidator('ratingLow', 'ratingHigh')
    ]
  });

  constructor(private opTripService: OpTripService) {
    this.opTripService.trips$.subscribe(trips => {
      this.trips = trips;
      console.log(this.trips);
      this.updateTrips();
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.filterForm.valid) {
      console.log(this.filterForm.value);

      this.submitted = false;
    }
    else {
      console.log('invalid');
    }
  }

  filterTrips() {
    price: this.selectedPrice;
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



  atLeastOneFieldValidator(fields: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      for (let field of fields) {
        let value = control.get(field)?.value;
        if (value !== null && value !== '') {
          return null; // If any field has a value, validation passes
        }
      }
      return { atLeastOneField: true }; // If no fields have a value, validation fails
    };
  }
  // fieldsTogetherValidator(field1: string, field2: string): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     let value1 = control.get(field1)?.value;
  //     let value2 = control.get(field2)?.value;
  //     if ((value1 === null || value1 === '') && (value2 === null || value2 === '')) {
  //       return null; // If both fields are empty, validation passes
  //     }
  //     if (value1 !== null && value1 !== '' && value2 !== null && value2 !== '') {
  //       return null; // If both fields are filled, validation passes
  //     }
  //     return { fieldsTogether: true }; // If only one field is filled, validation fails
  //   };
  // }

  lessThan(from: string, to: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      let f = group.get(from);
      let t = group.get(to);
      if (!f || !f.value) {
        return { 'startDateRequired': true };
      }
      if (!t || !t.value) {
        return { 'endDateRequired': true };
      }
      if (f.value > t.value) {
        return { 'dateRange': true };
      }
      return null;
    };
  }

}
