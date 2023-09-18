import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { ShippingService } from 'src/app/service/api/shipping.service';

@Component({
  selector: 'app-add-shipping',
  templateUrl: './add-shipping.component.html',
  styleUrls: ['./add-shipping.component.scss']
})
export class AddShippingComponent implements OnInit {

  orderDetailsForm: FormGroup;
  pickupLocationList: any = [];

  constructor(public dialogRef: MatDialogRef<AddShippingComponent>, private shippingService: ShippingService, private globalService: GlobalService) {
    this.orderDetailsForm = new FormGroup({
      PickupLocation: new FormControl('', Validators.required),
      Length: new FormControl('', [Validators.required, Validators.min(0.5)]),
      Breadth: new FormControl('', [Validators.required, Validators.min(0.5)]),
      Height: new FormControl('', [Validators.required, Validators.min(0.5)]),
      Weight: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  ngOnInit() {
    this.getPickupLocations();
  }

  getPickupLocations() {
    this.shippingService.GetPickupLocations().subscribe((response) => {
      Object.assign(this.pickupLocationList, response['data']['shipping_address']);
    },
      error => {
        this.globalService.displayPopupMessage('Error in getting pickup locations', false);
      });
  }

  createShiprocketOrder() {
    let orderDetails = {
      pickupLocation: this.orderDetailsForm.value.PickupLocation,
      length: Number(this.orderDetailsForm.value.Length),
      breadth: Number(this.orderDetailsForm.value.Breadth),
      height: Number(this.orderDetailsForm.value.Height),
      weight: Number(this.orderDetailsForm.value.Weight),
      createOrder: true
    }
    this.dialogRef.close(orderDetails)
  }

  close() {
    let orderDetails = {
      createOrder: false
    }
    this.dialogRef.close(orderDetails);
  }

}
