import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Global } from '../global';
import { ShippingService } from '../service/api/shipping.service';
import { GlobalService } from '../service/api/global.service';

@Component({
  selector: 'app-rate-weight',
  templateUrl: './rate-weight.component.html',
  styleUrls: ['./rate-weight.component.scss']
})
export class RateWeightComponent implements OnInit {

  weighRangeForm: FormGroup;
  submitted: boolean;
  weightList: any = [];
  currency: any;
  displayName: string;
  displayTime: string;
  rangeStart: string;
  rangeEnd: string;
  rate: string;
  weightCount: string;
  constructor(private router: Router, private globals: Global, private fb: FormBuilder,private globalService: GlobalService, private shippingService: ShippingService) {
    this.currency = this.globals.currency;
  }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.weighRangeForm = this.fb.group({
      weighRange: this.fb.array([])
    });
    this.addEmployee();
    this.getWeightDetails();
  }

  weighRange(): FormArray {
    return this.weighRangeForm.get('weighRange') as FormArray;
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      DisplayName: new FormControl('', Validators.required),
      RatebyWeight: this.fb.array([])
    });
  }

  addEmployee() {
    this.weighRange().push(this.newEmployee());
  }

  ratebyWeightDetails(weightIndex: number): FormArray {
    return this.weighRange()
      .at(weightIndex)
      .get('RatebyWeight') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      RangeStart: new FormControl('', Validators.required),
      RangeEnd: new FormControl('', Validators.required),
      Rate: new FormControl('', Validators.required)
    });
  }

  addRow(weightIndex: number) {
    this.ratebyWeightDetails(weightIndex).push(this.newSkill());
  }

  onSubmit() {
    this.submitted = true;
    if (!this.weighRangeForm.valid) {
      return;
    }
    try {
      let arrayControl = this.weighRangeForm.value.weighRange[0].RatebyWeight;
      for (let i = 0; i < arrayControl.length; i++) {
        arrayControl[i]["Type"] = "RateByWeight";
        arrayControl[i]["DisplayName"] = this.weighRangeForm.value.weighRange[0].DisplayName;
        arrayControl[i]["DeliveryTime"] = this.weighRangeForm.value.weighRange[0].DeliveryTime;
        arrayControl[i]["CreatedBy"] = this.globals.userName;
      }
      this.shippingService.SaveRateByPriceDetails(arrayControl).subscribe((response) => {
        this.globalService.displayPopupMessage('Saved Successfully' , true);
      },
        error => {
          this.globalService.displayPopupMessage('Failure in Updating order Price Details', false);
        });
    } catch (err) {
      this.globalService.displayPopupMessage('Error' + err, false);
    }
  }
  getWeightDetails() {
    let data = "RateByWeight";
    this.shippingService.GetWeightDetails(data).subscribe((response) => {
      this.weightList = [];
      // this.weighRangeForm = this.fb.group({
      //   weighRange: this.fb.array([])
      // });
      Object.assign(this.weightList, response);
      for (let i = 0; i < this.weightList.length; i++) {
          this.addRow(0);
          this.displayName = this.weightList[0].displayName;
          this.displayTime = this.weightList[0].deliveryTime;
          this.rangeStart = this.weightList[i].rangeStart;
          this.rangeEnd = this.weightList[i].rangeEnd;
          this.rate = this.weightList[i].rate;

        // const eachvalue = this.weighRangeForm.controls.weighRange as FormArray;
        // eachvalue.push(this.fb.group({
        //   DisplayName: this.weightList[i].DisplayName,
        //   DeliveryTime: this.weightList[i].DeliveryTime,
        //   RangeStart: this.weightList[i].RangeStart,
        //   RangeEnd: this.weightList[i].RangeEnd,
        //   Rate: this.weightList[i].Rate,
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

