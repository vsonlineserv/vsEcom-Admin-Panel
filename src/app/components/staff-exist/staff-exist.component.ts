import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { PaymentService } from 'src/app/service/api/payment.service';

@Component({
  selector: 'app-staff-exist',
  templateUrl: './staff-exist.component.html',
  styleUrls: ['./staff-exist.component.scss']
})
export class StaffExistComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StaffExistComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private paymentService: PaymentService, private globalService: GlobalService) { }

  ngOnInit() {
  }

  addExistingUser() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }

}
