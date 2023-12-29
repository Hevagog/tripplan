import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TripComponent } from 'app/components/trip/trip.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { TriplistComponent } from 'app/components/triplist/triplist.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CurrencyConvertComponent } from './components/currency-convert/currency-convert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TripComponent, TriplistComponent, PageNotFoundComponent, CurrencyConvertComponent, MainPageComponent, TopMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tripplan';
}
