import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallReservationComponent } from './overall-reservation.component';

describe('OverallReservationComponent', () => {
  let component: OverallReservationComponent;
  let fixture: ComponentFixture<OverallReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverallReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
