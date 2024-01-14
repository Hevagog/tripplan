import { Component, Input } from '@angular/core';
import { ReservationService } from 'app/services/reservation.service';
import { CurrencyService } from 'app/services/currency.service';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from 'app/components/pipes/currency.pipe';


@Component({
  selector: 'app-overall-reservation',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  providers: [CurrencyPipe],
  templateUrl: './overall-reservation.component.html',
  styleUrl: './overall-reservation.component.css'
})
export class OverallReservationComponent {
  @Input() totalReservedSeats: number | undefined;
  @Input() totalReservedValue: number | undefined;
  selectedCurrency: string | undefined;
  defaultCurrency: string = 'złoty';
  newCurrency: number | undefined;

  constructor(private reservationService: ReservationService, private currencyService: CurrencyService, private currencyPipe: CurrencyPipe) {
    this.reservationService.totalReservedSeats$.subscribe(total => {
      this.totalReservedSeats = total;
    });
    this.reservationService.totalReservedValue$.subscribe(total => {
      this.totalReservedValue = total;
    });
    this.currencyService.currentCurrency$.subscribe(currency => {
      this.selectedCurrency = currency;
    });
  }
}
