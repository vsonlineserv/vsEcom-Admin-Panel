import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Global } from 'src/app/global';
import { GlobalService } from 'src/app/service/api/global.service';

@Component({
  selector: 'app-share-products',
  templateUrl: './share-products.component.html',
  styleUrls: ['./share-products.component.scss']
})
export class ShareProductsComponent implements OnInit {

  productId: any;
  productName: any;
  name: any;
  couponCode: any;
  discountPercentage: any;
  discountAmount: any;
  usePercentage: any;
  endDateUtc: any;
  link: any;
  sharingProduct: boolean = false;
  sharingSiteLink: boolean = false;
  sharingDiscount: boolean = false;
  sharingDiscountFlate: boolean = false;
  showEndDate: boolean = false;
  percentage: any;
  siteName:any;
  phoneNumber:any;
  permaLink: any = '';

  constructor(public dialogRef: MatDialogRef<ShareProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public global: Global, private globalService: GlobalService) {
    this.productId = this.data.ProductId;
    this.productName = this.data.ProductName;
    this.permaLink = this.data.PermaLink;
    this.name = this.data.Name;
    this.couponCode = this.data.CouponCode;
    this.discountPercentage = this.data.DiscountPercentage;
    this.discountAmount = this.data.DiscountAmount;
    this.usePercentage = this.data.UsePercentage;
    this.endDateUtc = this.data.EndDateUtc;
    this.percentage = '%';
    this.siteName = this.global.storeName;
    this.phoneNumber = this.global.currentUserInfo.phoneNumber;
  }

  ngOnInit() {
    if ((this.productName != '' && this.productId != '') && (this.name == undefined && this.couponCode == undefined)) {
      this.sharingProduct = true;
    }
    else if ((this.name != '' && this.couponCode != '') && (this.productName == undefined && this.productId == undefined)) {
      if (this.usePercentage == true) {
        this.sharingDiscountFlate = true;
      }
      else {
        this.sharingDiscountFlate = false;
      }
      this.sharingDiscount = true;
    }
    else {
      this.sharingSiteLink = true;
    }
    this.link = encodeURI(this.link);
  }

  dialogClose() {
    this.dialogRef.close();
  }

  copyProductLink() {
    navigator.clipboard.writeText("Buy " +  this.productName + " from " + this.siteName +"\n" + this.link +"\n" +"You can contact us in  " + this.phoneNumber +" for any queries.");
    this.dialogRef.close();
    this.globalService.displayPopupMessage("Product link copied successfully", true);
  }

  copySiteLink() {
    navigator.clipboard.writeText( "Visit our store " + this.siteName + " in this link and order your favourite products. You can contact us in " + this.phoneNumber +" for any queries. NJOY Shopping! " + this.link );
    this.dialogRef.close();
    this.globalService.displayPopupMessage("Site link copied successfully", true);
  }

  copyDiscountLink() {
    if(this.sharingDiscountFlate == true){
      navigator.clipboard.writeText("Get Exciting offer "+this.discountPercentage +" "+ this.percentage +" off using Code "+this.couponCode+" from our "+ this.siteName +". Visit "+ this.link);
    }
    else{
    navigator.clipboard.writeText("Get Exciting offer "+this.global.currency +this.discountAmount+" off using Code "+this.couponCode+" from our "+ this.siteName +". Visit "+ this.link);
    }
    this.dialogRef.close();
    this.globalService.displayPopupMessage("Discount link copied successfully", true);
  }

  findDate(val) {
    const userLocale = navigator.language;
    const datePipe = new DatePipe(userLocale);
    let l1 = new Date().toISOString();
    let l2 = val + 'Z';
    let l3 = l2.split("T");
    let l4 = l1.split("T");
    if (l3[0] === l4[0]) {
      let todayPipedDate = datePipe.transform(l2);
      return "Today, " + todayPipedDate
    }
    else {
      let pipedDate = datePipe.transform(val + 'Z', 'MMM dd,yyyy');
      return pipedDate;
    }
  }
}
