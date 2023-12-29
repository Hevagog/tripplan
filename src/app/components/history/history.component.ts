import { CommonModule } from '@angular/common';
import { TripObject } from 'assets/trip-object';
import { CurrencyPipe } from 'app/components/pipes/currency.pipe';
import { Component, Input, OnInit } from '@angular/core';
import { BuyTripService } from 'app/services/buy-trip.service';
import { CurrencyService } from 'app/services/currency.service';
import { HistoryTripComponent } from 'app/components/history-trip/history-trip.component';
import { HistoryFilterTripComponent } from 'app/components/history-filter-trip/history-filter-trip.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, HistoryTripComponent, CurrencyPipe, HistoryFilterTripComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  tripsInHistory: { [key: number]: TripObject } | undefined;
  tripsInHistoryList: TripObject[] = [];
  tripsInHistoryAmount: number | undefined;
  @Input() trip!: TripObject;
  selectedCurrency: string | undefined;
  defaultCurrency: string = 'złoty';
  sum = 0;

  ngOnInit(): void {
    this.buyTripService.tripsBought$.subscribe(total => {
      this.tripsInHistory = total;
      this.tripsInHistoryList = Object.values(total);
    });
    this.buyTripService.tripsBoughtAmount$.subscribe(total => {
      this.tripsInHistoryAmount = total[this.trip.index];
    });
  }

  constructor(private currencyService: CurrencyService,
    private buyTripService: BuyTripService) {
    this.currencyService.currentCurrency$.subscribe(currency => {
      this.selectedCurrency = currency;
    });
    this.currencyService.currentCurrency$.subscribe(currency => {
      this.selectedCurrency = currency;
    });
    this.buyTripService.tripsBought$.subscribe(total => {
      this.tripsInHistory = total;
    });
    this.buyTripService.tripsBoughtAmount$.subscribe(total => {
      this.tripsInHistoryAmount = total[this.trip.index];
    });
  }

}
