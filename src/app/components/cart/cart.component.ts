import { CommonModule } from '@angular/common';
import { TripObject } from 'assets/trip-object';
import { Component, Output } from '@angular/core';
import { CurrencyPipe } from 'app/components/pipes/currency.pipe';
import { BuyTripService } from 'app/services/buy-trip.service';
import { CurrencyService } from 'app/services/currency.service';
import { CartTripComponent } from 'app/components/cart-trip/cart-trip.component';
import { ReservationService } from 'app/services/reservation.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartTripComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  tripsInCart: { [key: string]: TripObject } | undefined;
  tripsInCartList: TripObject[] = [];
  tripsInCartAmount: { [key: string]: number } | undefined;
  selectedCurrency: string | undefined;
  defaultCurrency: string = 'złoty';
  sum = 0;
  @Output() index: number = 0;

  constructor(private reservationService: ReservationService,
    private currencyService: CurrencyService,
    private buyTripService: BuyTripService) {
    this.currencyService.currentCurrency$.subscribe(currency => {
      this.selectedCurrency = currency;
      this.calculateSum();
    });
    this.reservationService.tripsInCart$.subscribe(total => {
      this.tripsInCart = total;
      this.tripsInCartList = Object.values(total);
    });
    this.reservationService.tripsInCartAmount$.subscribe(total => {
      this.tripsInCartAmount = total;
      this.calculateSum();
    });
  }

  calculateSum() {
    if (this.tripsInCart !== undefined && this.tripsInCartAmount !== undefined) {
      this.sum = 0;
      for (let i of Object.keys(this.tripsInCart)) {

        this.sum += this.tripsInCart[i].price * this.tripsInCartAmount[i];
      }
    }
  }

  buyAll() {
    if (this.tripsInCart !== undefined && this.tripsInCartAmount !== undefined) {
      this.buyTripService.buyAllTrips(this.tripsInCart, this.tripsInCartAmount);
      this.reservationService.cleanAll();
    }
  }
}