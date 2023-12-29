import { CommonModule } from '@angular/common';
import { TripObject } from 'assets/trip-object';
import { CurrencyPipe } from 'app/components/pipes/currency.pipe';
import { Component, Input, OnInit } from '@angular/core';
import { BuyTripService } from 'app/services/buy-trip.service';
import { CurrencyService } from 'app/services/currency.service';
import { ReservationService } from 'app/services/reservation.service';

@Component({
  selector: 'app-history-trip',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './history-trip.component.html',
  styleUrl: './history-trip.component.css'
})
export class HistoryTripComponent implements OnInit {
  tripsInHistory: TripObject[] | undefined;
  tripsInHistoryAmount: number | undefined;
  tripsBoughtTime: Date | undefined;
  @Input() trip!: TripObject;
  @Input() selectedCurrency: string | undefined;
  newCurrency: number | undefined;

  ngOnInit(): void {
    this.buyTripService.tripsBoughtAmount$.subscribe(total => {
      this.tripsInHistoryAmount = total[this.trip.index];
    });
    this.buyTripService.tripsBoughtTime$.subscribe(total => {
      this.tripsBoughtTime = total[this.trip.index];
    });
  }

  constructor(private buyTripService: BuyTripService,
    private currencyService: CurrencyService) {
    this.tripsInHistory = [];
    this.trip = {} as TripObject;
    this.currencyService.currentCurrency$.subscribe(currency => {
      this.selectedCurrency = currency;
      this.newCurrency = this.trip.price;
    });
    this.buyTripService.tripsBoughtAmount$.subscribe(total => {
      this.tripsInHistoryAmount = total[this.trip.index];
    });
    this.buyTripService.tripsBoughtTime$.subscribe(total => {
      this.tripsBoughtTime = total[this.trip.index];
    });

  }

  getTripStatus(): string {
    const currentDate = new Date();
    const startDate = new Date(this.trip.startDate);
    const endDate = new Date(this.trip.endDate);

    if (currentDate < startDate) {
      return 'Przed';
    } else if (currentDate >= startDate && currentDate <= endDate) {
      return 'W trakcie';
    } else {
      return 'Archiwalna';
    }
  }


}
