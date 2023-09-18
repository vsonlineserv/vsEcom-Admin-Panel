import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../service/api/shipping.service';
import { Router } from '@angular/router';
import { Global } from '../global';
import { GlobalService } from '../service/api/global.service';

@Component({
  selector: 'app-shipping-calculations',
  templateUrl: './shipping-calculations.component.html',
  styleUrls: ['./shipping-calculations.component.scss']
})
export class ShippingCalculationsComponent implements OnInit {

  freeShippingChecked: boolean;
  flatRateChecked: boolean;
  rateWeightChecked: boolean;
  rateOrderPriceChecked: boolean;
  
  constructor( private global: Global, private router: Router,private globalService: GlobalService, private shippingService: ShippingService) { }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.getSelectedShippingType();
  }


  freeShipping() {
    this.freeShippingChecked = true;
    this.flatRateChecked = false;
    this.rateWeightChecked = false;
    this.rateOrderPriceChecked = false;
    this.saveDetails('FreeShipping');
    this.router.navigate(['/home/free-shipping']);
  }

  flatRate() {
    this.freeShippingChecked = false;
    this.flatRateChecked = true;
    this.rateWeightChecked = false;
    this.rateOrderPriceChecked = false;
    this.saveDetails('FlatRate');
    this.router.navigate(['/home/flat-rate']);
  }

  rateWeight() {
    this.freeShippingChecked = false;
    this.flatRateChecked = false;
    this.rateWeightChecked = true;
    this.rateOrderPriceChecked = false;
    this.saveDetails('RateByWeight');
    this.router.navigate(['/home/rate-weight']);
  }

  rateOrderPrice() {
    this.freeShippingChecked = false;
    this.flatRateChecked = false;
    this.rateWeightChecked = false;
    this.rateOrderPriceChecked = true;
    this.saveDetails('RateByPrice');
    this.router.navigate(['/home/rate-orderprice']);
  }

  saveDetails(type) {
    this.shippingService.saveShippingType(type).subscribe((response) => {
    },
      error => {
        this.globalService.displayPopupMessage(error.error, false);
      });
  }

  getSelectedShippingType() {
    this.shippingService.getSelectedShippingType().subscribe((response) => {
      if (response == 'FreeShipping') {
        this.freeShippingChecked = true;
      }
      else if (response == 'FlatRate') {
        this.flatRateChecked = true;
      }
      else if (response == 'RateByWeight') {
        this.rateWeightChecked = true;
      }
      else if (response == 'RateByPrice') {
        this.rateOrderPriceChecked = true;
      }
    },
      error => {
        this.globalService.displayPopupMessage(error.error, false);
      });
  }

  goback() {
    history.back();
  }

}
