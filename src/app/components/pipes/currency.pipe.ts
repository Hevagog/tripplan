import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {

  conversionRates: { [key: string]: number } = {
    'złoty': 1,
    'euro': 0.22,
    'dolar': 0.26
  };

  transform(value: number, fromCurrency: string, toCurrency: string): number {
    return value * this.conversionRates[toCurrency] / this.conversionRates[fromCurrency];
  }

}
