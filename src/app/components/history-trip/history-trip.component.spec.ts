import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTripComponent } from './history-trip.component';

describe('HistoryTripComponent', () => {
  let component: HistoryTripComponent;
  let fixture: ComponentFixture<HistoryTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryTripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
