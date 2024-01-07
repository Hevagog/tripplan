import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { TripObject } from 'assets/trip-object';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from 'app/components/pipes/currency.pipe';
import { OpTripService } from 'app/services/op-trip.service';
import { ReservationService } from 'app/services/reservation.service';
import { CurrencyService } from 'app/services/currency.service';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, CommentsComponent],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.css'
})
export class TripDetailsComponent implements OnInit {
  trip!: TripObject;
  safeHtml: SafeHtml | undefined;
  id: string | undefined;
  images: string[] | undefined;
  location: string | undefined;
  @Output() seatsChanged = new EventEmitter();
  @Output() delete = new EventEmitter();
  reservedSeats: number | undefined;
  selectedCurrency: string | undefined;
  newCurrency: number | undefined;

  constructor(private currencyService: CurrencyService,
    private opTripService: OpTripService,
    private reservationService: ReservationService,
    private sanitizer: DomSanitizer) {

    this.id = window.location.href.split('/').pop();
    this.opTripService.trips$.subscribe(total => {
      if (this.id) {
        this.trip = total.find(obj => obj.index === this.id);
        this.getImages();
        this.getLocation();
        console.log(this.images);
        this.reservationService.reservedSeatsAmount$.subscribe(seats => {
          this.reservedSeats = seats[this.id ?? ''];
        });
        this.reservationService.reservedSeatsAmount$.subscribe(seats => {
          this.reservedSeats = seats[this.trip.index];
        });
        this.currencyService.currentCurrency$.subscribe(currency => {
          this.selectedCurrency = currency;
          this.newCurrency = this.trip.price;
        });
      }
    });
  }

  ngOnInit(): void {
    console.log(this.id, this.trip);

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

  getImages() {
    this.images = [this.trip.image];
    if (this.trip.image2) {
      this.images.push(this.trip.image2);
    }
    if (this.trip.image3) {
      this.images.push(this.trip.image3);
    }
    if (this.trip.image4) {
      this.images.push(this.trip.image4);
    }
  }


  getLocation() {
    if (this.trip.location) {
      this.location = this.trip.location;
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.location);
    }
  }
}
