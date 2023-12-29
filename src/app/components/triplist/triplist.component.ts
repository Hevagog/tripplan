import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from 'app/components/trip/trip.component';
import { TripObject } from 'assets/trip-object';
import { CurrencyPipe } from 'app/components/pipes/currency.pipe';
import { OpTripService } from 'app/services/op-trip.service';

@Component({
  selector: 'app-triplist',
  standalone: true,
  imports: [CommonModule, TripComponent, CurrencyPipe],
  templateUrl: './triplist.component.html',
  styleUrl: './triplist.component.css'
})
export class TriplistComponent implements OnInit {
  @Input() selectedCurrency: string = 'euro';
  trips: TripObject[] = [];
  largestPrice: number | undefined;
  smallestPrice: number | undefined;

  constructor(private opTripService: OpTripService) {
    this.opTripService.trips$.subscribe(trip => {
      this.trips = trip;
      this.updatePrices();
    });
  }

  ngOnInit() {
    this.updatePrices();
  }

  updatePrices() {
    const availableTrips = this.trips.filter(trip => trip.availableSeats > 0);
    this.largestPrice = Math.max(...availableTrips.map(trip => trip.price));
    this.smallestPrice = Math.min(...availableTrips.map(trip => trip.price));

  }

  onSeatsChanged() {
    this.updatePrices();
  }

  deleteTrip(trip: TripObject) {
    const index = this.trips.indexOf(trip);
    if (index > -1) {
      this.trips.splice(index, 1);
    }
    this.updatePrices();
  }

  getPriceClass(price: number) {
    if (price === this.smallestPrice) {
      return 'cheapest';
    } else if (price === this.largestPrice) {
      return 'most-expensive';
    }
    return '';
  }
}