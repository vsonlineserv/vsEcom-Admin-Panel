import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingPickupComponent } from './shipping-pickup.component';

describe('ShippingPickupComponent', () => {
  let component: ShippingPickupComponent;
  let fixture: ComponentFixture<ShippingPickupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingPickupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
