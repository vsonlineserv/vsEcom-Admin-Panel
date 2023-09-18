import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Global } from '../global';
import { ShippingService } from '../service/api/shipping.service';
import { Router } from '@angular/router';
import { GlobalService } from '../service/api/global.service';

@Component({
  selector: 'app-shipping-pickup',
  templateUrl: './shipping-pickup.component.html',
  styleUrls: ['./shipping-pickup.component.scss']
})
export class ShippingPickupComponent implements OnInit {


  carrierForm: FormGroup;
  submitted = false;
  carrierDetails: any = [];
  constructor(private router: Router, private global: Global,private globalService: GlobalService,
     private shippingService: ShippingService) {
    this.carrierForm = new FormGroup({
      CarrierName: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.getCarrierDetails();
  }

  addCarrier() {
    this.submitted = true;
    if (!this.carrierForm.valid) {
      return;
    }
    try {
      this.carrierForm.value.CreatedBy = this.global.userName;
      this.shippingService.addCarrierDetails(this.carrierForm.value).subscribe((response) => {
        this.globalService.displayPopupMessage('Saved Successfully' , true);
        this.getCarrierDetails();
      },
        error => {
          this.globalService.displayPopupMessage(error.error.Message , false);
        });
    } catch (err) {
      this.globalService.displayPopupMessage('Error' + err, false);
    }
  }

  setUp() {

  }

  getCarrierDetails() {
    this.shippingService.GetCarrierDetails().subscribe((response) => {
      Object.assign(this.carrierDetails, response);
      // this.carrierForm.patchValue({
      //   CarrierName: this.carrierDetails.CarrierName,
      // });
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  goback() {
    history.back();
  }

}

