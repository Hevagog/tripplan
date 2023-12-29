import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltertripComponent } from './filtertrip.component';

describe('FiltertripComponent', () => {
  let component: FiltertripComponent;
  let fixture: ComponentFixture<FiltertripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltertripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltertripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
