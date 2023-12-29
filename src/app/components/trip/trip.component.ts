import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from 'app/components/pipes/currency.pipe';
import { TripObject } from 'assets/trip-object';
import { ReservationService } from 'app/services/reservation.service';
import { CurrencyService } from 'app/services/currency.service';
import { OpTripService } from 'app/services/op-trip.service';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent implements OnInit {
  @Input() trip!: TripObject;
  @Input() selectedCurrency: string | undefined;
  newCurrency: number | undefined;
  @Output() delete = new EventEmitter();
  @Output() seatsChanged = new EventEmitter();
  @Input() reservedSeats: number | undefined;

  constructor(private reservationService: ReservationService,
    private currencyService: CurrencyService,
    private opTripService: OpTripService) {
    this.trip = {} as TripObject;
    this.currencyService.currentCurrency$.subscribe(currency => {
      this.selectedCurrency = currency;
      this.newCurrency = this.trip.price;
    });
    this.reservationService.reservedSeatsAmount$.subscribe(seats => {
      this.reservedSeats = seats[this.trip.index];
    });

  }

  ngOnInit() {
    this.reservationService.reservedSeatsAmount$.subscribe(seats => {
      this.reservedSeats = seats[this.trip.index];
    });
  }

  addSeat() {
    if (this.trip.availableSeats > 0) {
      this.trip.availableSeats--;
      this.reservationService.addSeatWithPrice(this.trip);
      this.seatsChanged.emit();
    }
  }

  removeSeat() {
    if (this.reservedSeats ?? 0 > 0) {
      this.trip.availableSeats++;
      this.reservationService.removeSeatWithPrice(this.trip);
      this.seatsChanged.emit();
    }
  }

  addToCart() {
    this.reservationService.addTripToCart(this.trip, this.reservedSeats || 0);
    this.reservedSeats = 0;
    this.seatsChanged.emit();
  }


  deleteTrip() {
    this.reservationService.removeAllSeatsWithPrice(this.trip);
    this.opTripService.delTrip(this.trip);
    this.delete.emit(this.trip);
  }

  rate(rating: number) {
    this.trip.rating = rating;
  }

  highlight(button: HTMLElement, index: number, card: HTMLElement) {
    const circles = card.getElementsByClassName('circle');
    for (let i = 0; i <= index; i++) {
      const circle = circles[i] as HTMLElement;
      circle.style.boxShadow = '0 0 10px green';
    }
  }

  unhighlight(button: HTMLElement, index: number, card: HTMLElement) {
    const circles = card.getElementsByClassName('circle');
    for (let i = 0; i <= index; i++) {
      const circle = circles[i] as HTMLElement;
      circle.style.boxShadow = '';
    }
  }



}
