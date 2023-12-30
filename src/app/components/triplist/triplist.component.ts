import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripComponent } from 'app/components/trip/trip.component';
import { TripObject } from 'assets/trip-object';
import { CurrencyPipe } from 'app/components/pipes/currency.pipe';
import { OpTripService } from 'app/services/op-trip.service';
import { PaginationControlsComponentComponent } from '../pagination-controls-component/pagination-controls-component.component';

@Component({
  selector: 'app-triplist',
  standalone: true,
  imports: [CommonModule, TripComponent, CurrencyPipe, PaginationControlsComponentComponent, FormsModule],
  templateUrl: './triplist.component.html',
  styleUrl: './triplist.component.css'
})
export class TriplistComponent implements OnInit {
  @Input() selectedCurrency: string = 'euro';
  trips: TripObject[] = [];
  page = 1;
  @Input() pageSize = 25;
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

  get paginatedTrips() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.trips.slice(start, end);
  }

  onPageChange(page: number) {
    this.page = page;
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.page = 1; // Resetujemy stronę do 1, gdy zmieniamy ilość pozycji na stronie
  }

}