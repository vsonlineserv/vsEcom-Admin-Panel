import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { PaymentService } from 'src/app/service/api/payment.service';
import { PaymentStatusComponent } from '../payment-status/payment-status.component';

@Component({
  selector: 'app-order-confirmation-popup',
  templateUrl: './order-confirmation-popup.component.html',
  styleUrls: ['./order-confirmation-popup.component.scss']
})
export class OrderConfirmationPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderConfirmationPopupComponent>) { }

  ngOnInit() {

  }

  orderConfirmed() {
    this.dialogRef.close(true);
  }
  
  close() {
    this.dialogRef.close(false);
  }

}
