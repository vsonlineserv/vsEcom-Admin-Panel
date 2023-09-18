import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-message',
  templateUrl: './common-message.component.html',
  styleUrls: ['./common-message.component.scss']
})
export class CommonMessageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CommonMessageComponent>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  close(value) {
    if (value == 'login') {
      this.router.navigate(['/login']);
      this.dialogRef.close();
    }

    else if (value == 'category') {
      this.router.navigate(['/home/category']);
      this.dialogRef.close();
    }

    else if (value == 'payment') {
      this.router.navigate(['/home/payment']);
      this.dialogRef.close();
    }else {
      this.dialogRef.close();
    }
  }

}
