import { Component, ChangeDetectorRef } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-convert',
  standalone: true,
  imports: [],
  templateUrl: './currency-convert.component.html',
  styleUrl: './currency-convert.component.css'
})
export class CurrencyConvertComponent {
  currentCurrency: string = 'złoty';

  constructor(private currencyService: CurrencyService, private cdRef: ChangeDetectorRef) { }

  changeCurrency(currency: string) {
    this.currentCurrency = currency;
    this.currencyService.changeCurrency(currency);
    this.cdRef.detectChanges();
  }
}
