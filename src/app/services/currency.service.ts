import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrencyPipe } from 'app/components/pipes/currency.pipe';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencySubject = new BehaviorSubject<string>('złoty');
  currentCurrency$ = this.currencySubject.asObservable();

  changeCurrency(currency: string) {
    this.currencySubject.next(currency);
  }

}
