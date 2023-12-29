import { Component } from '@angular/core';
import { AddtripComponent } from 'app/components/addtrip/addtrip.component';
import { TriplistComponent } from 'app/components/triplist/triplist.component';
import { FiltertripComponent } from 'app/components/filtertrip/filtertrip.component';
import { CurrencyConvertComponent } from 'app/components/currency-convert/currency-convert.component';
import { OverallReservationComponent } from 'app/components/overall-reservation/overall-reservation.component';
import { TopMenuComponent } from 'app/components/top-menu/top-menu.component';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [TriplistComponent, CurrencyConvertComponent, OverallReservationComponent, AddtripComponent, FiltertripComponent, TopMenuComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
}
