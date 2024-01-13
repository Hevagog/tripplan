import { CommonModule } from '@angular/common';
import { TripObject } from 'assets/trip-object';
import { Component, OnInit } from '@angular/core';
import { BuyTripService } from 'app/services/buy-trip.service';
import { HistoryTripComponent } from 'app/components/history-trip/history-trip.component';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, HistoryTripComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {
  tripsInHistory: TripObject[] | undefined;
  upcomingTrips: TripObject[] | undefined;

  ngOnInit(): void {
    this.buyTripService.tripsBought$.subscribe(total => {
      this.tripsInHistory = Object.values(total);
      this.checkUpcomingTrips();
    });
  }

  constructor(public buyTripService: BuyTripService) {
    this.buyTripService.tripsBought$.subscribe(total => {
      this.tripsInHistory = Object.values(total);
      this.checkUpcomingTrips();
    });
  }

  private checkUpcomingTrips(): void {
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    oneMonthFromNow.setHours(0, 0, 0, 0);
    this.upcomingTrips = this.tripsInHistory?.filter(trip => {
      const tripStartDate = new Date(trip.startDate);
      tripStartDate.setHours(0, 0, 0, 0);
      return tripStartDate <= oneMonthFromNow && tripStartDate >= new Date();
    });
  }
}

