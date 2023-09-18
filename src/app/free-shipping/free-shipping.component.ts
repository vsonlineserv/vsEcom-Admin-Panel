import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ShippingService } from '../service/api/shipping.service';
import { Router } from '@angular/router';
import { Global } from '../global';
import { GlobalService } from '../service/api/global.service';

@Component({
  selector: 'app-free-shipping',
  templateUrl: './free-shipping.component.html',
  styleUrls: ['./free-shipping.component.scss']
})
export class FreeShippingComponent implements OnInit {
  FreeShippingForm: FormGroup;
  submitted: boolean;
  shippingDetails: any = [];
  constructor(private router: Router, private globals: Global, private shippingService: ShippingService,
    private globalService: GlobalService) {
    this.FreeShippingForm = new FormGroup({
      DisplayName: new FormControl('', Validators.required),
      DeliveryTime: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.getFreeShippingDetails();
  }

  freeshippingSave() {
    this.submitted = true;
    if (!this.FreeShippingForm.valid) {
      return;
    }
    try {
      this.FreeShippingForm.value.Type = 'FreeShipping';
      this.FreeShippingForm.value.CreatedBy = this.globals.userName;
      this.shippingService.SaveShippingDetails(this.FreeShippingForm.value).subscribe((response) => {
        this.globalService.displayPopupMessage('Details Saved Successfully' , true);
      },
        error => {
          this.globalService.displayPopupMessage('Failure in Updating Free Shipping Details' , false);
        });
    } catch (err) {
      this.globalService.displayPopupMessage('Error' + err , false);
    }
  }
  getFreeShippingDetails() {
    let data = 'FreeShipping';
    this.shippingService.GetShippingDetails(data).subscribe((response) => {
      Object.assign(this.shippingDetails, response);
      this.FreeShippingForm.patchValue({
        DisplayName: this.shippingDetails.displayName,
        DeliveryTime: this.shippingDetails.deliveryTime,
      });
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  goback() {
    history.back();
  }

}
