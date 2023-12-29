import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripObject } from 'assets/trip-object';

@Component({
  selector: 'app-history-filter-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history-filter-trip.component.html',
  styleUrl: './history-filter-trip.component.css'
})
export class HistoryFilterTripComponent implements OnInit {
  @Input() trips: TripObject[] | undefined;
  @Output() filterEvent = new EventEmitter<TripObject[]>();
  filterStatus: string | undefined;
  originalTrips: TripObject[] | undefined;

  ngOnInit(): void {
    this.originalTrips = this.trips ? [...this.trips] : undefined;
  }

  filterTripsByStatus(): void {
    let filteredTrips: TripObject[] | undefined;

    if (!this.filterStatus || !this.originalTrips) {
      filteredTrips = this.originalTrips;
    } else {
      filteredTrips = this.originalTrips.filter(trip => {
        const currentDate = new Date();
        const startDate = new Date(trip.startDate);
        const endDate = new Date(trip.endDate);

        if (currentDate < startDate && this.filterStatus === 'Przed') {
          return true;
        } else if (currentDate >= startDate && currentDate <= endDate && this.filterStatus === 'W trakcie') {
          return true;
        } else if (currentDate > endDate && this.filterStatus === 'Archiwalna') {
          return true;
        } else if (this.filterStatus === 'Wszystkie') {
          return true;
        }

        return false;
      });
    }

    this.filterEvent.emit(filteredTrips);
  }
}