import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingCalculationsComponent } from './shipping-calculations.component';

describe('ShippingCalculationsComponent', () => {
  let component: ShippingCalculationsComponent;
  let fixture: ComponentFixture<ShippingCalculationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingCalculationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
