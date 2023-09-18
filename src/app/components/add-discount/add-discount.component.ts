import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { UserService } from 'src/app/service/api/user.service';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {

  ShowPrevious: any;
  initialNextValue: any = 0;
  percentageForm: FormGroup;
  submitted: boolean = false;
  @ViewChild('f', { static: false }) myNgForm;
  showPercentageForm: boolean = false;
  showFlatForm: boolean = false;
  flatForm: FormGroup;
  FormValue: any;
  updateCouponList: any = [];
  startDateUtc: any = '';
  endDateUtc: any = '';
  showMinOrderErrorMesaage: boolean = false;
  showFlatMinOrderErrorMesaage: boolean = false;
  minDate: Date;

  constructor(public dialogRef: MatDialogRef<AddDiscountComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private globalService: GlobalService,
    private userservice: UserService) {

    this.percentageForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      DiscountPercentage: new FormControl('', Validators.required),
      StartDateUtc: new FormControl('', Validators.required),
      EndDateUtc: new FormControl('', Validators.required),
      RequiresCouponCode: new FormControl(''),
      CouponCode: new FormControl('', Validators.required),
      MinOrderValue: new FormControl('', Validators.required),
      MaxDiscountAmount: new FormControl('', Validators.required),
      UsePercentage: new FormControl('')
    });

    this.flatForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      DiscountAmount: new FormControl('', Validators.required),
      StartDateUtc: new FormControl('', Validators.required),
      EndDateUtc: new FormControl('', Validators.required),
      RequiresCouponCode: new FormControl('',),
      CouponCode: new FormControl('', Validators.required),
      MinOrderValue: new FormControl('', Validators.required),
      MaxDiscountAmount: new FormControl(''),
      UsePercentage: new FormControl('')
    });
  }

  ngOnInit() {
    this.presentdate()
  }

  close() {
    this.dialogRef.close();
  }
  
  presentdate(){
      const newdate = new Date();
      const date = newdate.getDate() < 10 ? `0${newdate.getDate()}` : newdate.getDate();
      const month = newdate.getMonth() + 1 < 10 ? `0${newdate.getMonth() + 1}` : newdate.getMonth() + 1;
      const year = newdate.getFullYear();
      const hours = newdate.getHours();
      const minute = newdate.getMinutes();  
      this.minDate = new Date(`${year}-${month}-${date}T00:00:00`);
  }

  nextContent(value, type) {
    if (type == "Percentage") {
      this.showPercentageForm = true;
      this.showFlatForm = false;
    }
    else if (type == "Flat") {
      this.showFlatForm = true;
      this.showPercentageForm = false;
    }
    let modelPopUPInnerContent = document.getElementsByClassName("modelPopUPInnerContent");
    if ('previous' === value && this.initialNextValue > 0) {
      for (var j = 0; j < modelPopUPInnerContent.length; j++) {
        modelPopUPInnerContent[j].classList.remove("modelPopUpInputShow");
        modelPopUPInnerContent[j].classList.remove("modelPopUpInputShowLeftToRight");
      }
      this.initialNextValue--;
      this.ShowPrevious = this.initialNextValue;
      modelPopUPInnerContent[this.initialNextValue].classList.add("modelPopUpInputShowLeftToRight");

    } else if ('next' === value && this.initialNextValue < modelPopUPInnerContent.length - 1) {
      for (var j = 0; j < modelPopUPInnerContent.length; j++) {
        modelPopUPInnerContent[j].classList.remove("modelPopUpInputShow");
        modelPopUPInnerContent[j].classList.remove("modelPopUpInputShowLeftToRight");
      }
      this.initialNextValue++;
      this.ShowPrevious = this.initialNextValue;
      modelPopUPInnerContent[this.initialNextValue].classList.add("modelPopUpInputShow");
    }
  }

  addDiscountCoupon(form) {
    this.submitted = true;
    if (form == 'Percentage') {
      if (this.percentageForm.valid) {
        this.percentageForm.value.RequiresCouponCode = true;
        this.percentageForm.value.UsePercentage = true;
        if(Number(this.percentageForm.value.MaxDiscountAmount)> Number(this.percentageForm.value.MinOrderValue)){
          this.showMinOrderErrorMesaage = true;
          return;
        }
        if (this.percentageForm.value.StartDateUtc != null) {
          let startDateFormat = new Date(this.percentageForm.value.StartDateUtc);
          this.percentageForm.value.StartDateUtc = startDateFormat.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
        if (this.percentageForm.value.EndDateUtc != null) {
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
      if (this.flatForm.valid) {
        this.flatForm.value.UsePercentage = false;
        this.flatForm.value.RequiresCouponCode = true;
        this.flatForm.value.MaxDiscountAmount = null;
        if(Number(this.flatForm.value.DiscountAmount) > Number(this.flatForm.value.MinOrderValue)){
          this.showFlatMinOrderErrorMesaage = true;
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
        this.showFlatMinOrderErrorMesaage = false;
      }
      else {
        return;
      }
    }
    this.userservice.addDiscountCoupon(this.FormValue).subscribe((response) => {
      if (response == "Success") {
        this.submitted = false;
        this.myNgForm.resetForm();
        this.dialogRef.close(true);
        this.globalService.displayPopupMessage('Discount coupon added successfully', true);
      }
      else if (response == "Already Exists") {
        this.submitted = false;
        this.globalService.displayPopupMessage('Coupon Code Already Exists', false);
      }
      else {
        this.submitted = false;
        this.globalService.displayPopupMessage('Please retry, there seems to be a problem when adding Discount Coupon.', false);
      }
    }, error => {
      this.globalService.displayPopupMessage('Please retry, there seems to be a problem when adding Discount Coupon.', false);
    });
  }

}