import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { PaymentService } from 'src/app/service/api/payment.service';
import { ShippingService } from 'src/app/service/api/shipping.service';

@Component({
  selector: 'app-delivery-status',
  templateUrl: './delivery-status.component.html',
  styleUrls: ['./delivery-status.component.scss']
})
export class DeliveryStatusComponent implements OnInit {

  orderId: any = '';

  constructor(public dialogRef: MatDialogRef<DeliveryStatusComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private shippingService: ShippingService, private globalService: GlobalService) { }

  ngOnInit() {
    if (this.data) {
      this.orderId = this.data;
    }
  }

  updateDeliveredStatus() {
    this.shippingService.changeDeliveredStatus(this.orderId).subscribe((response) => {
      this.globalService.displayPopupMessage('Order status changed successfully', true);
      this.dialogRef.close(true);
    },
      error => {
        this.globalService.displayPopupMessage('Error happened while changing order status', false);
        this.dialogRef.close(false);
      });
  }

  close() {
    this.dialogRef.close(false);
  }

}
