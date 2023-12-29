import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTripComponent } from './cart-trip.component';

describe('CartTripComponent', () => {
  let component: CartTripComponent;
  let fixture: ComponentFixture<CartTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartTripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
