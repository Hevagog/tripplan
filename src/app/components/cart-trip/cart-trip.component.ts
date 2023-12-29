import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from 'app/components/pipes/currency.pipe';
import { TripObject } from 'assets/trip-object';
import { ReservationService } from 'app/services/reservation.service';
import { CurrencyService } from 'app/services/currency.service';
import { BuyTripService } from 'app/services/buy-trip.service';

@Component({
  selector: 'app-cart-trip',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart-trip.component.html',
  styleUrl: './cart-trip.component.css'
})
export class CartTripComponent implements OnInit {
  tripsInCart: { [key: string]: TripObject } | undefined;
  tripsInCartAmount: number | undefined;
  @Input() trip!: TripObject;
  @Input() selectedCurrency: string | undefined;
  newCurrency: number | undefined;

  ngOnInit(): void {
    this.reservationService.tripsInCartAmount$.subscribe(total => {
      console.log(total);
      this.tripsInCartAmount = total[this.trip.index];
    });
  }

  constructor(private reservationService: ReservationService,
    private currencyService: CurrencyService,
    private buyTripService: BuyTripService) {
    this.trip = {} as TripObject;
    this.currencyService.currentCurrency$.subscribe(currency => {
      this.selectedCurrency = currency;
      this.newCurrency = this.trip.price;
    });
    this.reservationService.tripsInCart$.subscribe(total => {
      this.tripsInCart = total;
    });

    this.reservationService.tripsInCartAmount$.subscribe(total => {
      this.tripsInCartAmount = total[this.trip.index];
    });

  }

  addSeat() {
    if (this.trip.availableSeats > 0) {
      this.trip.availableSeats--;
      this.reservationService.addSeatsInCart(this.trip);
    }
  }

  removeSeat() {
    if (this.tripsInCartAmount !== undefined && this.tripsInCartAmount > 0) {
      this.trip.availableSeats++;
      this.reservationService.removeSeatInCart(this.trip);
      console.log(this.trip.index);
    }
  }

  buy() {
    this.buyTripService.buyTrip(this.trip, this.tripsInCartAmount ?? 0);
    this.reservationService.removeTripFromCart(this.trip.index);
  }


}
