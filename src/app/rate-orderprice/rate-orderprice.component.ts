import { Global } from 'src/app/global';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ShippingService } from '../service/api/shipping.service';
import { GlobalService } from '../service/api/global.service';

@Component({
  selector: 'app-rate-orderprice',
  templateUrl: './rate-orderprice.component.html',
  styleUrls: ['./rate-orderprice.component.scss']
})
export class RateOrderpriceComponent implements OnInit {

  orderPrice: FormGroup;
  submitted: boolean;
  orderPriceDetails: any = [];
  priceList: any = [];
  currency: any;
  displayName: string;
  displayTime: string;
  rangeStart: string;
  rangeEnd: string;
  rate: string;
  constructor(private router: Router, private globals: Global, private fb: FormBuilder,
    private globalService: GlobalService,
    private shippingService: ShippingService) {
    this.currency = this.globals.currency;
  }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.orderPrice = this.fb.group({
      ratebyorderPrice: this.fb.array([])
    });
    this.addEmployee();
    this.getPriceDetails();
  }

  ratebyorderPrice(): FormArray {
    return this.orderPrice.get('ratebyorderPrice') as FormArray;
  }


  newEmployee(): FormGroup {
    return this.fb.group({
      DisplayName: new FormControl('', Validators.required),
      pricingDetails: this.fb.array([])
    });
  }



  addEmployee() {
    this.ratebyorderPrice().push(this.newEmployee());
  }

  addPrice(addIndex: number): FormArray {
    return this.ratebyorderPrice()
      .at(addIndex)
      .get('pricingDetails') as FormArray;
  }

  newRow(): FormGroup {
    return this.fb.group({
      RangeStart: new FormControl('', Validators.required),
      RangeEnd: new FormControl('', Validators.required),
      Rate: new FormControl('', Validators.required)
    });
  }

  addRow(addIndex: number) {
    this.addPrice(addIndex).push(this.newRow());
  }

  onSubmit() {
    this.submitted = true;
    if (!this.orderPrice.valid) {
      return;
    }
    try {
      let arrayControl = this.orderPrice.value.ratebyorderPrice[0].pricingDetails;
      for (let i = 0; i < arrayControl.length; i++) {
        arrayControl[i]["Type"] = "RateByPrice";
        arrayControl[i]["DisplayName"] = this.orderPrice.value.ratebyorderPrice[0].DisplayName;
        arrayControl[i]["DeliveryTime"] = this.orderPrice.value.ratebyorderPrice[0].DeliveryTime;
        arrayControl[i]["CreatedBy"] = this.globals.userName;
      }
      this.shippingService.SaveRateByPriceDetails(arrayControl).subscribe((response) => {
        this.globalService.displayPopupMessage('Saved Successfully', true);

      },
        error => {
          this.globalService.displayPopupMessage('Failure in Updating order Price Details', false);
        });
    } catch (err) {
      this.globalService.displayPopupMessage('Error' + err, false);
    }
  }
  
  getPriceDetails() {
    let data = "RateByPrice";
    this.shippingService.GetWeightDetails(data).subscribe((response) => {
      this.priceList = [];
      // this.orderPrice = this.fb.group({
      //   ratebyorderPrice: this.fb.array([])
      // });
      Object.assign(this.priceList, response);

      for (let i = 0; i < this.priceList.length; i++) {
        this.addRow(0);
        this.displayName = this.priceList[0].displayName;
        this.displayTime = this.priceList[0].deliveryTime;
        this.rangeStart = this.priceList[i].rangeStart;
        this.rangeEnd = this.priceList[i].rangeEnd;
        this.rate = this.priceList[i].rate;
        // const eachvalue = this.orderPrice.controls.ratebyorderPrice as FormArray;
        // eachvalue.push(this.fb.group({
        //   DisplayName: this.priceList[i].DisplayName,
        //   DeliveryTime: this.priceList[i].DeliveryTime,
        //   RangeStart: this.priceList[i].RangeStart,
        //   RangeEnd: this.priceList[i].RangeEnd,
        //   Rate: this.priceList[i].Rate,
        // }))
      }
    },
      error => {
        //this._globalService.getError(error.error);
      });
  }

  goback() {
    history.back();
  }

}
