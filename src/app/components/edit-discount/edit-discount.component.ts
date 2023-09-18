import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { UserService } from 'src/app/service/api/user.service';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.scss']
})
export class EditDiscountComponent implements OnInit {

  percentageForm: FormGroup;
  flatForm: FormGroup;
  showPercentageForm: boolean = false;
  showFlatForm: boolean = false;
  updateCouponList: any = [];
  couponId: any;
  startDateUtc: any;
  endDateUtc: any;
  submitted: boolean = false;
  FormValue: any;
  selected: any;
  showMinOrderErrorMesaage: boolean = false;
  showMinOrderFlatErrorMesaage: boolean = false;
  minDate: Date;

  constructor(private dialogRef: MatDialogRef<EditDiscountComponent>, private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any,
    private globalService: GlobalService) {
    this.percentageForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      DiscountPercentage: new FormControl('', Validators.required),
      StartDateUtc: new FormControl('', Validators.required),
      EndDateUtc: new FormControl('', Validators.required),
      RequiresCouponCode: new FormControl('', Validators.required),
      CouponCode: new FormControl('', Validators.required),
      MinOrderValue: new FormControl('', Validators.required),
      MaxDiscountAmount: new FormControl('', Validators.required),
    });

    this.flatForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      DiscountAmount: new FormControl('', Validators.required),
      StartDateUtc: new FormControl('', Validators.required),
      EndDateUtc: new FormControl('', Validators.required),
      RequiresCouponCode: new FormControl('', Validators.required),
      CouponCode: new FormControl('', Validators.required),
      MinOrderValue: new FormControl('', Validators.required),
      MaxDiscountAmount: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.presentdate();
    this.couponId = this.data.couponId
    if (this.couponId > 0) {
      this.getCouponById(this.couponId);
    }
  }

  presentdate() {
    const newdate = new Date();
    const date = newdate.getDate() < 10 ? `0${newdate.getDate()}` : newdate.getDate();
    const month = newdate.getMonth() + 1 < 10 ? `0${newdate.getMonth() + 1}` : newdate.getMonth() + 1;
    const year = newdate.getFullYear();
    const hours = newdate.getHours();
    const minute = newdate.getMinutes();
    this.minDate = new Date(`${year}-${month}-${date}T00:00:00`);
  }

  getCouponById(id) {
    this.userService.GetCouponById(id).subscribe((response) => {
      this.updateCouponList = {};
      Object.assign(this.updateCouponList, response);
      if (this.updateCouponList.startDateUtc != null) {
        this.startDateUtc = this.updateCouponList.startDateUtc;
      }
      if (this.updateCouponList.endDateUtc != null) {
        this.endDateUtc = this.updateCouponList.endDateUtc;
      }
      if (this.updateCouponList.usePercentage) {
        this.showPercentageForm = true;
        if (this.updateCouponList.requiresCouponCode) {
          this.selected = true;
        }
        else {
          this.selected = false;
        }
        this.percentageForm.setValue({
          Name: this.updateCouponList.name,
          DiscountPercentage: this.updateCouponList.discountPercentage,
          StartDateUtc: this.startDateUtc != null ? this.getLocalDate(this.startDateUtc) : null,
          EndDateUtc: this.endDateUtc != null ? this.getLocalDate(this.endDateUtc) : null,
          RequiresCouponCode: this.updateCouponList.requiresCouponCode,
          CouponCode: this.updateCouponList.couponCode,
          MinOrderValue: this.updateCouponList.minOrderValue,
          MaxDiscountAmount: this.updateCouponList.maxDiscountAmount,
        });
      }
      else {
        this.showFlatForm = true;
        if (this.updateCouponList.requiresCouponCode) {
          this.selected = true;
        }
        else {
          this.selected = false;
        }
        this.flatForm.setValue({
          Name: this.updateCouponList.name,
          DiscountAmount: this.updateCouponList.discountAmount,
          StartDateUtc: this.startDateUtc != null ? this.getLocalDate(this.startDateUtc) : null,
          EndDateUtc: this.endDateUtc != null ? this.getLocalDate(this.endDateUtc) : null,
          RequiresCouponCode: this.updateCouponList.requiresCouponCode,
          CouponCode: this.updateCouponList.couponCode,
          MinOrderValue: this.updateCouponList.minOrderValue,
          MaxDiscountAmount: this.updateCouponList.maxDiscountAmount,
        });
      }

    }, error => {

    });
  }

  getLocalDate(datetoChange) {
    if (datetoChange != null && datetoChange)
      return new Date(datetoChange + 'Z');
    else
      return datetoChange;
  }

  close() {
    this.dialogRef.close();
  }

  updateDiscountCoupon(form) {
    this.submitted = true;
    if (form == 'Percentage') {
      this.percentageForm.value.Id = this.couponId;
      if (this.percentageForm.valid) {
        this.percentageForm.value.UsePercentage = true;
        this.percentageForm.value.RequiresCouponCode = true;
        if (Number(this.percentageForm.value.MaxDiscountAmount) > Number(this.percentageForm.value.MinOrderValue)) {
          this.showMinOrderErrorMesaage = true;
          return;
        }
        if (this.percentageForm.value.StartDateUtc) {
          let startDateFormat = new Date(this.percentageForm.value.StartDateUtc);
          this.percentageForm.value.StartDateUtc = startDateFormat.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
        if (this.percentageForm.value.EndDateUtc) {
          let endDateFormat = new Date(this.percentageForm.value.EndDateUtc);
          this.percentageForm.value.EndDateUtc = endDateFormat.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
        this.FormValue = this.percentageForm.value;
        this.showMinOrderErrorMesaage = false;
      }
      else {
        return;
      }
    }
    if (form == 'Flat') {
      this.flatForm.value.Id = this.couponId;
      if (this.flatForm.valid) {
        this.percentageForm.value.UsePercentage = false;
        this.flatForm.value.RequiresCouponCode = true;
        if (Number(this.flatForm.value.DiscountAmount) > Number(this.flatForm.value.MinOrderValue)) {
          this.showMinOrderFlatErrorMesaage = true;
          return;
        }
        if (this.flatForm.value.StartDateUtc) {
          let startDateFormat = new Date(this.flatForm.value.StartDateUtc);
          this.flatForm.value.StartDateUtc = startDateFormat.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
        if (this.flatForm.value.EndDateUtc) {
          let endDateFormat = new Date(this.flatForm.value.EndDateUtc);
          this.flatForm.value.EndDateUtc = endDateFormat.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
        this.FormValue = this.flatForm.value;
        this.showMinOrderFlatErrorMesaage = false;
      }
      else {
        return;
      }
    }
    this.userService.updateDiscountCoupon(this.FormValue).subscribe((response) => {
      if (response) {
        this.globalService.displayPopupMessage('Discount coupon updated successfully', true);
        this.dialogRef.close(true)
      }
      else if (response == "Already Exists") {
        this.submitted = false;
        this.globalService.displayPopupMessage('Coupon Code Already Exists', false);
      }
      else {
        this.submitted = false;
        this.globalService.displayPopupMessage('Please retry, there seems to be a problem when updating Discount Coupon.', false);
      }
    }, error => {
      this.globalService.displayPopupMessage('Please retry, there seems to be a problem when updating Discount Coupon.', false);
    });
  }

}
