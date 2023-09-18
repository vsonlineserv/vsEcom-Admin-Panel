import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/service/api/global.service';
import { ShippingService } from 'src/app/service/api/shipping.service';
import { Global } from '../../global';

@Component({
  selector: 'app-shiprocket',
  templateUrl: './shiprocket.component.html',
  styleUrls: ['./shiprocket.component.scss']
})
export class ShiprocketComponent implements OnInit {


  shiprocketForm: FormGroup;
  submitted = false;
  loader: boolean = false;
  updateUser: boolean = false;
  showVisibleIcon: boolean = false;

  constructor(public dialogRef: MatDialogRef<ShiprocketComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private global: Global, private globalService: GlobalService, private shippingService: ShippingService) {
    this.shiprocketForm = new FormGroup({
      Username: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    if (this.data == 'fromUpdate') {
      this.updateUser = true;
    }
    this.globalService.GetEngineToken();
  }

  addApiUser() {
    this.submitted = true;
    if (!this.shiprocketForm.valid) {
      return;
    }
    this.shippingService.addApiUser(this.shiprocketForm.value).subscribe((response) => {
      this.globalService.displayPopupMessage(response, true);
      this.dialogRef.close(true);
    },
      error => {
        this.globalService.displayPopupMessage(error.error, false);
      });
  }

  visible() {
    let npw : any;
    npw = document.getElementById("newPassword");
    if (npw.type === "password") {
      npw.type = "text";
      this.showVisibleIcon = true;
    } else {
      npw.type = "password";
      this.showVisibleIcon = false;
    }
  }

  updateApiUser() {
    this.submitted = true;
    if (!this.shiprocketForm.valid) {
      return;
    }
    this.shippingService.updateApiUser(this.shiprocketForm.value).subscribe((response) => {
      this.globalService.displayPopupMessage(response, true);
      this.dialogRef.close(true);
    },
      error => {
        this.globalService.displayPopupMessage(error.error, false);
      });
  }

  close() {
    this.dialogRef.close(false);
  }

}
