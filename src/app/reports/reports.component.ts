import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../global';
import { ReportsService } from '../service/api/reports.service';
import { Chart } from "chart.js";
import { GlobalService } from '../service/api/global.service';
import { StoreService } from '../service/api/store.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  @ViewChild('doughnutCanvas', { static: false }) private doughnutCanvas: ElementRef;
  selected: string;
  selectedOption: string;
  ordersiteid: any;
  customerList: any = [];
  customerRes: any = [];
  retaillerList: any = [];
  retaillerRes: any = [];
  sellingList: any = [];
  ordersumList: any = [];
  orderStatusList: any = [];
  productSummary: any = [];
  branchEnquiry: any = [];
  chart: any = [];
  labelpaymentMethod: any = [];
  datapaymentMethod: any = [];
  barCanvas: any;
  loader: boolean = false;
  TotalUserCount: any = 0;
  topCategoriesList: any = [];
  reportsFilterObj: any = {
    day: null,
    month: 0,
    notReplied: false,
    startTime: '',
    endTime: '',
    searchByName: ''
  };
  startDateFilter: any = '';
  enddateFilter: any = '';
  showStartEndDate: boolean = false;
  sellingProductsMax: any;
  sellingProductsQuantity: any = [];
  progressBarColor: any;
  filterTab: boolean = false;
  enquiryCount: any = 0;
  ordersumCategoryList: any = [];
  filterTabTopCategories: boolean = false;
  enquirylist: any = [];
  revenueAmount: any = 0;
  revenueFilter: string = '';
  filterLastDays1: boolean = false;
  filterHeading1: any;
  filterLastDays2: boolean = false;
  filterHeading2: any;
  filterTabSales: boolean = false;
  productCount: any = 0;
  ordersCount: any = 0;
  Last30DaysFilterObj : any = {
    day: null,
    month: 0,
    notReplied: false,
    startTime: '',
    endTime: '',
    searchByName: ''
  };

  constructor(private router: Router, private globalService: GlobalService, private storeService: StoreService, public global: Global, private reportsService: ReportsService) { 
    this.Last30DaysFilterObj.days = 30;
  }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.loader = true;
    this.getOrdersummaryList();
    this.getOrderSummaryByCategory();
    this.getSellingProductList();
    this.getOrderStatusList();
    this.getchart();
    this.Last30DaysFilterObj.days = 30;
    this.filterValChangeLastDays1('month');
    this.filterValChangeLastDays2('month');
  }

  getOrdersummaryList() {
    this.reportsService.GetOrdersummaryList().subscribe((response) => {
      this.loader = false;
      Object.assign(this.ordersumList, response);
      for (let i = 0; i < this.ordersumList.length; i++) {
        if (this.ordersumList[i].quantity == null) {
          this.ordersumList[i].quantity = 0
        }
        if (this.ordersumList[i].salesValue == null) {
          this.ordersumList[i].salesValue = 0
        }
      }
    },
      error => {
        //alert('Error');
      });
  }

  getOrderSummaryByCategory() {
    this.reportsService.GetOrderSummaryByCategory().subscribe((response) => {
      this.loader = false;
      Object.assign(this.ordersumCategoryList, response);
    },
      error => {
        //alert('Error');
      });
  }

  getSellingProductList() {
    this.reportsService.GetSellingProductList().subscribe((response) => {
      Object.assign(this.sellingList, response);
      for (let i = 0; i < this.sellingList.length; i++) {

        this.sellingProductsQuantity.push(this.sellingList[i].quantity);
      }
      this.sellingProductsMax = Math.max.apply(null, this.sellingProductsQuantity);
    },
      error => {
        //alert('Error');
      });
  }

  getOrderStatusList() {
    this.reportsService.GetOrderStatusList().subscribe((response) => {
      Object.assign(this.orderStatusList, response);
    },
      error => {
        //alert('Error');
      });
  }

  getchart() {
    this.reportsService.GetOrderStatusList().subscribe((response) => {
      Object.assign(this.chart, response);
      var detail = this.chart;
      var label = [];
      var data = [];
      var groupresult = this.groupBy(this.chart, 'paymentMethodString', 'orderCount');
      for (var i = 0; i < groupresult.length; i++) {
        label.push(groupresult[i]["paymentMethodString"]);
        data.push(groupresult[i]["orderCount"]);
        this.labelpaymentMethod = label;
        this.datapaymentMethod = data;
      }
      this.doughnutCanvas = new Chart(this.doughnutCanvas.nativeElement, {
        type: "doughnut",
        data: {
          labels: this.labelpaymentMethod,
          datasets: [{
            data: this.datapaymentMethod,
            backgroundColor: [
              "#878BB6",
              "#4ACAB4",
              "#FF8153",
              "#FFEA88"
            ]

          }]
        }
      });
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });

  }

  groupBy(array, col, value) {
    var r = [], o = {};
    array.forEach(function (a) {
      if (!o[a[col]]) {
        o[a[col]] = {};
        o[a[col]][col] = a[col];
        o[a[col]][value] = 0;
        r.push(o[a[col]]);
      }
      o[a[col]][value] += +a[value];
    });
    return r;
  };

  goback() {
    history.back();
  }

  dateFilter() {
    if (this.startDateFilter != '' && this.enddateFilter != '') {
      this.reportsFilterObj.startTime = new Date(this.startDateFilter).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).toString();
      this.reportsFilterObj.endTime = new Date(this.enddateFilter).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).toString();
      this.getSellingProductListFilter();
      this.getOrderStatusListFilter();
      this.getBranchEnquiryFilter();
      this.getUserCountFilter();
    }
  }

  getSellingProductListFilter() {
    this.reportsService.GetSellingProductListFilter(this.reportsFilterObj).subscribe((response) => {
      this.sellingList = [];
      this.sellingProductsQuantity = [];
      Object.assign(this.sellingList, response);
      for (let i = 0; i < this.sellingList.length; i++) {
        this.sellingProductsQuantity.push(this.sellingList[i].quantity);
      }
      this.sellingProductsMax = Math.max.apply(null, this.sellingProductsQuantity);
    },
      error => {
        //alert('Error');
      });
  }

  getOrderStatusListFilter() {
    this.reportsService.GetOrderStatusListFilter(this.reportsFilterObj).subscribe((response) => {
      this.orderStatusList = [];
      Object.assign(this.orderStatusList, response);
    },
      error => {
        //alert('Error');
      });
  }

  getBranchEnquiryFilter() {
    this.reportsService.GetBranchEnquiryFilter(this.reportsFilterObj).subscribe((response) => {
      this.branchEnquiry = [];
      Object.assign(this.branchEnquiry, response);
    },
      error => {
        //alert('Error');
      });
  }

  getTopCategoriesFilter() {
    this.reportsService.GetTopCategoriesFilter(this.reportsFilterObj).subscribe((response) => {
      this.ordersumCategoryList = [];
      Object.assign(this.ordersumCategoryList, response);
    },
      error => {
      });
  }

  filterTabView() {
    if (this.filterTab == true) {
      this.getSellingProductList();
      this.filterTab = false;
    } else {
      this.filterTab = true;
    }
  }

  filterGetSellingProducts(value) {
    if (value == "day") {
      this.reportsFilterObj.days = 0;
    }
    else if (value == "week") {
      this.reportsFilterObj.days = 7;
    }
    else if (value == "month") {
      this.reportsFilterObj.days = 30;
    }
    this.getSellingProductListFilter();
  }

  filterViewTopCategories() {
    if (this.filterTabTopCategories == true) {
      this.filterTabTopCategories = false;
      this.getOrderSummaryByCategory();
    } else {
      this.filterTabTopCategories = true;
    }
  }

  filterValChangeTopCategories(value) {
    if (value == "day") {
      this.reportsFilterObj.days = 0;
    }
    else if (value == "week") {
      this.reportsFilterObj.days = 7;
    }
    else if (value == "month") {
      this.reportsFilterObj.days = 30;
    }
    this.getTopCategoriesFilter();
  }

  filterViewOrderSummary() {
    if (this.filterTabSales == true) {
      this.filterTabSales = false;
      this.getOrderStatusList();
    } else {
      this.filterTabSales = true;
    }
  }

  filterValChangeOrderSummary(value) {
    if (value == "day") {
      this.reportsFilterObj.days = 0;
    }
    else if (value == "week") {
      this.reportsFilterObj.days = 7;
    }
    else if (value == "month") {
      this.reportsFilterObj.days = 30;
    }
    this.getOrderStatusListFilter();
  }

  filterViewLastDays1() {
    this.filterHeading1 = 'Last 30 Days'
    if (this.filterLastDays1 == true) {
      this.filterLastDays1 = false;
      this.filterValChangeLastDays1('month');
    } else {
      this.filterLastDays1 = true;
    }
  }

  filterValChangeLastDays1(event) { 
    this.Last30DaysFilterObj.days = '';
    this.Last30DaysFilterObj.month = '';
    if (event == 'all') {
      this.Last30DaysFilterObj.startTime = '';
      this.Last30DaysFilterObj.endTime = '';
      this.showStartEndDate = false;
    }
    else if (event == 'day') {
      this.Last30DaysFilterObj.days = 1;
      this.showStartEndDate = false;
      this.revenueFilter = 'Today';
      this.filterHeading1 = 'Today';

    } else if (event == 'week') {
      this.Last30DaysFilterObj.days = 7;
      this.showStartEndDate = false;
      this.revenueFilter = 'This Week';
      this.filterHeading1 = "Last Week's"

    }
    else if (event == 'month') {
      this.Last30DaysFilterObj.days = 30;
      this.showStartEndDate = false;
      this.revenueFilter = 'This Month';
      this.filterHeading1 = 'Last 30 Days';
    } else if (event == 'custom') {
      this.showStartEndDate = true;
      return;
    }
    this.getUserCountFilter();
    this.getQueriesFilter();
    this.getRevenueFilter(this.revenueFilter);
  }

  getUserCountFilter() {
    this.reportsService.GetUserCountFilter(this.Last30DaysFilterObj).subscribe((response) => {
      if (response) {
        this.TotalUserCount = response;
      } else {
        this.TotalUserCount = 0;
      }
    },
      error => {

      });
  }

  getQueriesFilter() {
    this.storeService.getInboxMailsFilter(this.Last30DaysFilterObj).subscribe(response => {
      this.enquirylist = []
      Object.assign(this.enquirylist, response);
      if (this.enquirylist.length > 0) {
        this.enquiryCount = this.enquirylist.length;
      }
      else {
        this.enquiryCount = 0;
      }
    }, error => {

    });;
  }

  getRevenueFilter(filter) {
    this.reportsService.GetOrdersummaryList().subscribe((response) => {
      Object.assign(this.ordersumList, response);
      for (let i = 0; i < this.ordersumList.length; i++) {
        if (this.ordersumList[i].days == filter) {
          if (this.ordersumList[i].salesValue == null) {
            this.revenueAmount = 0
          }
          else {
            this.revenueAmount = this.ordersumList[i].salesValue;
          }
        }
      }
    },
      error => {
      });
  }

  filterViewLastDays2() {
    this.filterHeading2 = 'Last 30 Days'
    if (this.filterLastDays2 == true) {
      this.filterLastDays2 = false;
      this.filterValChangeLastDays2('month');
    } else {
      this.filterLastDays2 = true;
    }
  }


  filterValChangeLastDays2(event) {
    this.Last30DaysFilterObj.days = null;
    this.Last30DaysFilterObj.month = null;
    if (event == 'all') {
      this.Last30DaysFilterObj.startTime = '';
      this.Last30DaysFilterObj.endTime = '';
      this.showStartEndDate = false;
    }
    else if (event == 'day') {
      this.Last30DaysFilterObj.days = 0;
      this.showStartEndDate = false;
      this.revenueFilter = 'Today';
      this.filterHeading2 = 'Today';

    } else if (event == 'week') {
      this.Last30DaysFilterObj.days = 7;
      this.showStartEndDate = false;
      this.revenueFilter = 'This Week';
      this.filterHeading2 = "Last Week's"

    }
    else if (event == 'month') {
      this.Last30DaysFilterObj.days = 30;
      this.showStartEndDate = false;
      this.revenueFilter = 'This Month';
      this.filterHeading2 = 'Last 30 Days';
    } else if (event == 'custom') {
      this.showStartEndDate = true;
      return;
    }
    this.getProductsCountFilter();
    this.getOrdersCountFilter();
  }

  getOrdersCountFilter() {
    this.reportsService.getOrdersCountFilter(this.Last30DaysFilterObj).subscribe((response) => {
      this.ordersCount = response;
    }, error => {

    });
  }

  getProductsCountFilter() {
    this.reportsService.getProductsCountFilter(this.Last30DaysFilterObj).subscribe((response) => {
      this.productCount = response;
    }, error => {

    });
  }

}
