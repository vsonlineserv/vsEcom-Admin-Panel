import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../service/api/global.service';
import { UserService } from '../service/api/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {

  couponForm: FormGroup;
  userCouponObj: any;
  showUpdate = false;
  couponIdEdit: any;
  updateCouponList: any = {};
  submitted:boolean= false;
  startDateUtc:any='';
  endDateUtc: any = '';
  @ViewChild('f', { static: false }) myNgForm;
  
  constructor(private userservice: UserService, private router: Router, private globalService: GlobalService, private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.couponIdEdit = this.router.getCurrentNavigation().extras.state['couponId'];
      }
    });
    this.couponForm = new FormGroup({
      Id: new FormControl(''),
      Name: new FormControl('', Validators.required),
      DiscountTypeId: new FormControl('', Validators.required),
      UsePercentage: new FormControl('', Validators.required),
      DiscountPercentage: new FormControl('', Validators.required),
      DiscountAmount: new FormControl('', Validators.required),
      StartDateUtc: new FormControl('', Validators.required),
      EndDateUtc: new FormControl('', Validators.required),
      RequiresCouponCode: new FormControl('', Validators.required),
      CouponCode: new FormControl('', Validators.required),
      MinOrderValue: new FormControl('', Validators.required),
      MaxDiscountAmount: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {

    this.globalService.GetEngineToken();
    if (this.couponIdEdit > 0) {
      this.getCouponById(this.couponIdEdit);
      this.showUpdate = true;
    }
    else {
      this.showUpdate = false;
    }
    
  }

  // addCoupon() {
  //   this.submitted=true;
  //   if (this.couponForm.valid){
  //     this.couponForm.value.StartDateUtc;
  //     let startDate= new Date(this.couponForm.value.StartDateUtc);
  //     this.couponForm.value.StartDateUtc = startDate.toLocaleDateString('en-US',{ year: 'numeric', month: '2-digit', day: '2-digit' });
  //     let endDate= new Date(this.couponForm.value.EndDateUtc);
  //     this.couponForm.value.EndDateUtc = endDate.toLocaleDateString('en-US',{ year: 'numeric', month: '2-digit', day: '2-digit' });
  //     this.userservice.addUserCoupon(this.couponForm.value).subscribe((response) => {

  //       if(response!='') {
  //         this.submitted=false;
  //         this.myNgForm.resetForm();
  //         this.globalService.displayPopupMessage('Discount is added successfully', true);
    
          
  //       } else {
          
  //         this.globalService.displayPopupMessage('There is some error while adding Discount', false);
         
  //       }
  //     }, error => {
  //       this.globalService.displayPopupMessage('Please retry, there seems to be a problem when updating Discount.', false);
  //     });
      

  //   }

  // }

  // updateCoupon() {
  //   this.submitted=true;
  //   if (this.couponForm.valid) {
  //     this.couponForm.value.StartDateUtc;
  //     let startDate= new Date(this.couponForm.value.StartDateUtc);
  //     this.couponForm.value.StartDateUtc = startDate.toLocaleDateString();
  //     this.couponForm.value.EndDateUtc;
  //     let endDate= new Date(this.couponForm.value.EndDateUtc);
  //     this.couponForm.value.EndDateUtc = endDate.toLocaleDateString();
  //     this.userservice.updateCoupon(this.couponForm.value).subscribe((response) => {
  //       if(response!='') {
  //         this.globalService.displayPopupMessage('Discount is updated successfully', true);
  //       }else{
  //         this.globalService.displayPopupMessage('There is some error while updating Discount', false);
  //       }
  //   }, error => {
  //     this.globalService.displayPopupMessage('Please retry, there seems to be a problem when updating Discount.', false);
  //   });
  //   }

  // }

  getCouponById(id) {
    this.userservice.GetCouponById(id).subscribe((response) => {
      this.updateCouponList = {};
      Object.assign(this.updateCouponList, JSON.parse(response.toString()));

        let endDate =  this.updateCouponList[0].EndDateUtc.slice(6,19);
        this.endDateUtc = new Date(parseInt(endDate)).toLocaleDateString();
        
        let startDate =  this.updateCouponList[0].StartDateUtc.slice(6,19);
        this.startDateUtc = new Date(parseInt(startDate)).toLocaleDateString();

      this.couponForm.setValue({
      
        Id: this.updateCouponList[0].Id,
        Name: this.updateCouponList[0].Name,
        DiscountTypeId: this.updateCouponList[0].DiscountTypeId,
        UsePercentage:  this.updateCouponList[0].UsePercentage ? '1':'0',
        DiscountPercentage: this.updateCouponList[0].DiscountPercentage,
        DiscountAmount: this.updateCouponList[0].DiscountAmount,
        StartDateUtc: this.getLocalDate(this.startDateUtc),
        EndDateUtc: this.getLocalDate(this.endDateUtc),
        RequiresCouponCode: this.updateCouponList[0].RequiresCouponCode ? '1':'0',
        CouponCode: this.updateCouponList[0].CouponCode,
        MinOrderValue: this.updateCouponList[0].MinOrderValue,
        MaxDiscountAmount: this.updateCouponList[0].MaxDiscountAmount,

      });
    }, error => {

    });
  }

  getLocalDate(datetoChange) {
    if(datetoChange !=null && datetoChange)
      return new Date(datetoChange + 'Z');
    else 
    return datetoChange;
  }

  goback() {
    history.back();
  }

}
