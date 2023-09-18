import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmationPopupComponent } from './order-confirmation-popup.component';

describe('OrderConfirmationPopupComponent', () => {
  let component: OrderConfirmationPopupComponent;
  let fixture: ComponentFixture<OrderConfirmationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderConfirmationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
