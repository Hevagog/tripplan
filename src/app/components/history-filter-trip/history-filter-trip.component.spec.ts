import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryFilterTripComponent } from './history-filter-trip.component';

describe('HistoryFilterTripComponent', () => {
  let component: HistoryFilterTripComponent;
  let fixture: ComponentFixture<HistoryFilterTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryFilterTripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryFilterTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
