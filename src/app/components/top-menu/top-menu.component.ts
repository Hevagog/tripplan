import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyConvertComponent } from '../currency-convert/currency-convert.component';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [RouterLink, CurrencyConvertComponent],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {


}
