import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { PaymentService } from 'src/app/service/api/payment.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {

  orderId: any = '';

  constructor(public dialogRef: MatDialogRef<PaymentStatusComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private paymentService: PaymentService, private globalService: GlobalService) { }

  ngOnInit() {
    if (this.data) {
      this.orderId = this.data;
    }
  }

  updatePaymentStatus() {
    this.paymentService.changePaymentStatus(this.orderId).subscribe((response) => {
      this.globalService.displayPopupMessage('Payment status changed successfully', true);
      this.dialogRef.close(true);
    },
      error => {
        this.globalService.displayPopupMessage('Error happened while changing payment status', false);
        this.dialogRef.close(false);
      });
  }

  close() {
    this.dialogRef.close(false);
  }

}
