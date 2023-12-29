import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { OpTripService } from 'app/services/op-trip.service';
import { TripObject } from 'assets/trip-object';
import { CurrencyService } from 'app/services/currency.service';

@Component({
  selector: 'app-addtrip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addtrip.component.html',
  styleUrl: './addtrip.component.css'
})
export class AddtripComponent {
  dates: string = "";
  submitted: boolean = false;
  selectedCurrency: string | undefined;

  constructor(private currencyService: CurrencyService, private opTripService: OpTripService) {
    this.currencyService.currentCurrency$.subscribe(currency => {
      this.selectedCurrency = currency;
    });
  }
  tripForm = new FormGroup({
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    maxSeats: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', Validators.required),
    rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
  }, { validators: this.dateLessThan('startDate', 'endDate') });

  onSubmit() {
    this.submitted = true;
    if (this.tripForm.valid) {
      const formToSend = {
        name: this.tripForm.value.name,
        country: this.tripForm.value.country,
        startDate: this.tripForm.value.startDate,
        endDate: this.tripForm.value.endDate,
        price: this.tripForm.value.price,
        currency: this.selectedCurrency,
        maxSeats: this.tripForm.value.maxSeats,
        description: this.tripForm.value.description,
        image: "../assets/images/default.jpg",
        availableSeats: this.tripForm.value.maxSeats,
        rating: this.tripForm.value.rating,
      } as unknown as TripObject;
      this.opTripService.addTrip(formToSend as unknown as TripObject);
      this.tripForm.reset();
      this.submitted = false;
    }
    else {
      console.log('invalid');
    }
  }

  dateLessThan(from: string, to: string): ValidatorFn {
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