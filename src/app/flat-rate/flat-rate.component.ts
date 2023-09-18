import { Global } from 'src/app/global';
import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../service/api/shipping.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { GlobalService } from '../service/api/global.service';

@Component({
  selector: 'app-flat-rate',
  templateUrl: './flat-rate.component.html',
  styleUrls: ['./flat-rate.component.scss']
})
export class FlatRateComponent implements OnInit {

  FlatRateForm: FormGroup;
  submitted: boolean;
  flatRateDetails: any = [];
  constructor(private router: Router, private globals: Global, private shippingService: ShippingService,
    private globalService: GlobalService) {
    this.FlatRateForm = new FormGroup({
      DisplayName: new FormControl('', Validators.required),
      DeliveryTime: new FormControl('', Validators.required),
      Rate: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.globalService.GetEngineToken();

    this.getFlatRateDetails();
  }

  flatRateSave() {
    this.submitted = true;
    if (!this.FlatRateForm.valid) {
      return;
    }
    try {
      this.FlatRateForm.value.Type = 'FlatRate';
      this.FlatRateForm.value.CreatedBy = this.globals.userName;
      this.shippingService.SaveShippingDetails(this.FlatRateForm.value).subscribe((response) => {
        this.globalService.displayPopupMessage('Saved Successfully', true);
      },
        error => {
          this.globalService.displayPopupMessage('Failure in Updating Flat Rate Details', false);
        });
    } catch (err) {
      this.globalService.displayPopupMessage('Error' + err, false);
    }
  }
  getFlatRateDetails() {
    let data = 'FlatRate';
    this.shippingService.GetShippingDetails(data).subscribe((response) => {
      Object.assign(this.flatRateDetails, response);
      this.FlatRateForm.patchValue({
        DisplayName: this.flatRateDetails.displayName,
        DeliveryTime: this.flatRateDetails.deliveryTime,
        Rate: this.flatRateDetails.rate
      });
    },
      error => {
        this.globalService.displayPopupMessage('Error' , false);
      });
  }

  goback() {
    history.back();
  }

}
