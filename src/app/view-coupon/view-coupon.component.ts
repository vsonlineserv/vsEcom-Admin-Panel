import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../service/api/global.service';
import { UserService } from '../service/api/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { AddDiscountComponent } from '../components/add-discount/add-discount.component';
import { Global } from '../global';
import { DatePipe } from '@angular/common';
import { EditDiscountComponent } from '../components/edit-discount/edit-discount.component';
import { ShareProductsComponent } from '../components/share-products/share-products.component';
import { DeleteDiscountComponent } from '../components/delete-discount/delete-discount.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface Coupon {
  Name: string;
  DiscountTypeId: number;
  UsePercentage: number;
  DiscountPercentage: number;
  DiscountAmount: number;
  StartDateUtc: Date;
  EndDateUtc: Date;
  RequiresCouponCode: string;
  CouponCode: string;
  MinOrderValue: number;
  MaxDiscountAmount: number;
}

@Component({
  selector: 'app-view-coupon',
  templateUrl: './view-coupon.component.html',
  styleUrls: ['./view-coupon.component.scss']
})
export class ViewCouponComponent implements OnInit {

  pageNumber: number = 1;
  totalPages: number;
  userCouponList: any;
  discountViewList: boolean;
  dataSource: MatTableDataSource<Coupon>;
  displayedColumns: string[] = ['Name', 'DiscountTypeId', 'UsePercentage', 'DiscountPercentage', 'StartDateUtc', 'EndDateUtc', 'RequiresCouponCode', 'CouponCode', 'MinOrderValue', 'MaxDiscountAmount', 'Action'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  viewCouponShowHide: any = 1;
  page: number = 1;
  selected: any;
  selectedOption: any;
  couponsFilterObj: any = {
    days: 0,
    month: 0,
    activeCoupons: false,
    startTime: '',
    endTime: '',
    searchString: ''
  };
  showStartEndDate: boolean = false;
  startDateFilter: any = '';
  enddateFilter: any = '';
  showcouponsFilter: boolean = false;
  showFilterDay: any;
  showFilterData: any;
  branchEnquiry: any = [];
  noEnquiryShowHide: any = 1;
  discountCouponDetails: any = [ ];
  couponStatus: boolean = false;

  constructor(private userService: UserService, private router: Router, private globalService: GlobalService, private matDialog: MatDialog, public global: Global) {
  }

  ngOnInit() {
    this.getCoupon();
    this.selectedOption = 'all';
    this.selected = 'all';
    this.showFilterDay = 'all';
    this.showFilterData = "";
  }


  getCoupon() {
    this.userService.getUserCoupon().subscribe((response) => {
      this.userCouponList = [];
      Object.assign(this.userCouponList, response);
      this.dataSource = new MatTableDataSource<Coupon>(this.userCouponList);
      this.viewCouponShowHide = this.userCouponList.length;
    }, error => {

    });
  }

  goback() {
    history.back();
  }

  editDiscountCouponPopup(id, usePercentage) {
    const dialogConfig = new MatDialogConfig();
    let data = {
      couponId: id
    }
    if(usePercentage == true){
      dialogConfig.height = "480px";
    }
    else{
      dialogConfig.height = "405px";
    }
    dialogConfig.data = data;
    dialogConfig.width = "650px";
    dialogConfig.disableClose = true;
    let dialogRef = this.matDialog.open(EditDiscountComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.getCoupon();
      }
    });
  }

  openAddDiscountPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "650px";
    dialogConfig.height = "fit-content";
    dialogConfig.disableClose = true;
    let dialogRef = this.matDialog.open(AddDiscountComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.getCoupon();
      }
    });
  }

  findDate(val) {
    const userLocale = navigator.language;
    const datePipe = new DatePipe(userLocale);
    let l1 = new Date().toISOString();
    let l2 = l1.split("T");
    let l3 = new Date(val).toISOString();
    let l4 = l3.split("T");
    if (l2[0] === l4[0]) {
      return "Today";
    }
    else {
      let pipedDate = datePipe.transform(val + 'Z', 'MMM dd,yyyy');
      return pipedDate;
    }
  }

  findEndDate(val) {
    const userLocale = navigator.language;
    const datePipe = new DatePipe(userLocale);
    let l1 = new Date().toISOString();
    let l2 = l1.split("T");
    let l3 = new Date(val).toISOString();
    let l4 = l3.split("T");
    if (l2[0] === l4[0]) {
      return "Today";
    }
    else if(l2[0] > l4[0]){
      let pipedDate = datePipe.transform(val + 'Z', 'MMM dd,yyyy');
      return pipedDate;
    }
    else{
      let pipedDate = datePipe.transform(val + 'Z', 'MMM dd,yyyy');
      return pipedDate;
    }
  }
  
  findErrorEndDate(val) {
    let l1 = new Date().toISOString();
    let l2 = l1.split("T");
    let l3 = new Date(val).toISOString();
    let l4 = l3.split("T");
    if (l2[0] === l4[0]) {
      return false;
    }
    else if(l2[0] > l4[0]){
      return true;
    }
    else{
      return false;
    }
  }

  searchCoupons(event) {
    this.showFilterData = event.target.value;
    if (this.showFilterData == undefined) {
      this.showFilterData = "";
    }
    this.couponsFilter();
  }

  couponsFilterDay(event) {
    this.showFilterDay = event;
    this.couponsFilter();
  }

  activeDiscountFilter(event) {
    this.showcouponsFilter = event.checked;
    this.couponsFilter();
  }

  couponsFilter() {
    this.couponsFilterObj.days = null;
    this.couponsFilterObj.month = null;
    if (this.showcouponsFilter == false && this.showFilterDay == 'all') {
      this.couponsFilterObj.activeCoupons = this.showcouponsFilter;
      this.couponsFilterObj.startTime = '';
      this.couponsFilterObj.endTime = '';
      this.couponsFilterObj.searchString = this.showFilterData;
      this.showStartEndDate = false;
      this.getDiscountCouponsByFilter();
    } else if (this.showcouponsFilter == false && this.showFilterDay == 'week') {
      this.couponsFilterObj.activeCoupons = this.showcouponsFilter;
      this.couponsFilterObj.searchString = this.showFilterData;

      this.couponsFilterObj.days = 7;
      this.showStartEndDate = false;
      this.getDiscountCouponsByFilter();
    } else if (this.showcouponsFilter == false && this.showFilterDay == 'month') {
      this.couponsFilterObj.activeCoupons = this.showcouponsFilter;
      this.couponsFilterObj.searchString = this.showFilterData;

      this.couponsFilterObj.days = 30;
      this.showStartEndDate = false;
      this.getDiscountCouponsByFilter();
    } else if (this.showcouponsFilter == false && this.showFilterDay == 'custom') {
      this.couponsFilterObj.activeCoupons = this.showcouponsFilter;
      this.couponsFilterObj.searchString = this.showFilterData;

      this.showStartEndDate = true;
      this.getDiscountCouponsByFilter();
      return;
    }
    else if (this.showcouponsFilter == true && this.showFilterDay == 'all') {
      this.couponsFilterObj.activeCoupons = this.showcouponsFilter;
      this.couponsFilterObj.searchString = this.showFilterData;

      this.showStartEndDate = false;
      this.couponsFilterObj.startTime = '';
      this.couponsFilterObj.endTime = '';
      this.getDiscountCouponsByFilter();
    }
    else if (this.showcouponsFilter == true && this.showFilterDay == 'week') {
      this.couponsFilterObj.activeCoupons = this.showcouponsFilter;
      this.couponsFilterObj.searchString = this.showFilterData;

      this.showStartEndDate = false;
      this.couponsFilterObj.days = 7;
      this.getDiscountCouponsByFilter();

    }
    else if (this.showcouponsFilter == true && this.showFilterDay == 'month') {
      this.couponsFilterObj.activeCoupons = this.showcouponsFilter;
      this.couponsFilterObj.searchString = this.showFilterData;

      this.showStartEndDate = false;
      this.couponsFilterObj.days = 30;
      this.getDiscountCouponsByFilter();

    }
    else if (this.showcouponsFilter == true && this.showFilterDay == 'custom') {
      this.couponsFilterObj.activeCoupons = this.showcouponsFilter;
      this.couponsFilterObj.searchString = this.showFilterData;

      this.showStartEndDate = true;
      this.getDiscountCouponsByFilter();
    }
  }

  dateFilter() {
    if (this.startDateFilter != '' && this.enddateFilter != '') {
      this.couponsFilterObj.startTime = new Date(this.startDateFilter).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).toString();
      this.couponsFilterObj.endTime = new Date(this.enddateFilter).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).toString();
      this.getDiscountCouponsByFilter();
    }
  }

  getDiscountCouponsByFilter() {
    this.userService.getDiscountCouponsByFilter(this.couponsFilterObj).subscribe(response => {
      this.userCouponList = [];
      Object.assign(this.userCouponList, response);
      // this.userCouponList.forEach(e => {
      //   if (e.startDateUtc != null) {
      //     const startDate = e.startDateUtc.slice(6, 19)
      //     e.startDateUtc = new Date(parseInt(startDate))
      //   }
      //   if (e.endDateUtc != null) {
      //     const endDate = e.endDateUtc.slice(6, 19)
      //     e.endDateUtc = new Date(parseInt(endDate))
      //   }
      // });
      this.dataSource = new MatTableDataSource< Coupon >(this.userCouponList);
    }, error => {

    });;
  }

  shareProducts(name, couponCode, discountPercentage, discountAmount, usePercentage, endDateUtc) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      Name: name, 
      CouponCode: couponCode,
      DiscountPercentage: discountPercentage,
      DiscountAmount: discountAmount,
      EndDateUtc: endDateUtc,
      UsePercentage: usePercentage
    };
    dialogConfig.width = "450px";
    dialogConfig.panelClass = "custom-dialog-container"
    let dialogRef = this.matDialog.open(ShareProductsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
    });
  }

  deleteDiscount(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      discountId: id 
    };
    let dialogRef = this.matDialog.open(DeleteDiscountComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if(value == true){
        this.getCoupon();
      }
    });
  }

  handlePageEvent(event) {
    this.page = event.pageIndex + 1;
  }

}
