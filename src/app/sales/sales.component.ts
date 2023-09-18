import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SalesService } from '../service/api/sales.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { GlobalService } from '../service/api/global.service';
import { Global } from '../global';
import { ShareProductsComponent } from '../components/share-products/share-products.component';
import { DatePipe } from '@angular/common';
import { UpdateOrderStatusComponent } from '../components/update-order-status/update-order-status.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import PouchDB from 'node_modules/pouchdb';

export interface OrdersViewDetailed {
  Id: number;
  OrderId: number;
  OrderDateUtc: Date;
  Name: string;
  Quantity: number;
  Address1: string;
  Address2: string;
  PhoneNumber: string;
  UnitPriceInclTax: string;
  PriceInclTax: string;
  OrderItemStatus: string;
  PaymentMethodString: string;
}
export interface OrdersViewDefault {
  OrderId: number;
  OrderDateUtc: Date;
  FirstName: string;
  OrderCount: number;
  OrderTotal: number;
  OrderStatus: string;
  PaymentStatus: string;
  PaymentMethodString: string;
  Action: string;
}
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator1: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginator2: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  // sortList: QueryList<MatSort>;
  // @ViewChildren(MatSort) set matSort(ms: QueryList<MatSort>) {
  //   this.sortList = ms;
  //   if (this.dataSource1) {
  //     this.dataSource1.sort = this.sortList.toArray()[0];
  //   }
  //   if (this.dataSource2) {
  //     this.dataSource2.sort = this.sortList.toArray()[1];
  //   }
  // }
  displayedColumns1: string[] = ['Id', 'OrderDateUtc', 'Name'
    , 'Quantity', 'FirstName', 'UnitPriceInclTax', 'PriceInclTax'
    , 'OrderItemStatus', 'PaymentMethodString'];
  displayedColumns2: string[] = ['OrderId', 'OrderDateUtc', 'FirstName'
    , 'OrderCount', 'OrderTotal', 'OrderStatus', 'PaymentStatus', 'PaymentMethodString', 'Action'];
  dataSource1: MatTableDataSource<OrdersViewDetailed>;
  dataSource2: MatTableDataSource<OrdersViewDefault>;
  OrderStatusList: any = [];
  pendingOrdersList: any = [];
  selected: string;
  selectedStatus: string;
  order = {
    status: 0
  };
  noProductShowHide: any = 1;
  searchOrderFilter: any;
  salesFilterObj: any = {
    days: 0,
    month: 0,
    notReplied: false,
    startTime: '',
    endTime: '',
    searchString: ''
  };
  downloadCSVObj: any = {
    statusId: 0,
    startTime: '',
    endTime: '',
    days: '',
    searchString: ''
  };
  showStartEndDate: boolean = false;
  startDateFilter: any = '';
  enddateFilter: any = '';
  selectedOption: string;
  currency: any;
  showDetailedView: boolean = false;
  showListView: boolean = false;
  showCardView: boolean = false;
  page: number = 1;
  pendingOrdersListForDetailedView: [];
  pageNumber1: number = 1;
  totalPages1: number;
  pageNumber2: number = 1;
  totalPages2: number;
  listViewIcon: boolean = false;
  gridViewIcon: boolean = false;
  
  pouchDb: any;

  constructor(private salesService: SalesService, private router: Router, private globalService: GlobalService,
    public global: Global, private matDialog: MatDialog) {
      this.pouchDb = new PouchDB('my_database');
      this.gridViewIcon = true;
      this.showListView = true;
  }

  ngOnInit() {
    this.currency = this.global.currency;
    this.globalService.GetEngineToken();
    this.getOrderStatus();
    this.getOrdersForDefaultView();
  }

  addDocument(data: any) {
    this.pouchDb.put(data).then(function (response) {
      // handle response
    }).catch(function (err) {
      // handle error
    });
  }

  getDocument() {
    this.pouchDb.get('1').then(function (doc) {
      // handle doc
    }).catch(function (err) {
      // handle error
    });
  }

  getOrderStatus() {
    this.salesService.getOrderStatus().subscribe((response) => {
      this.OrderStatusList = [];
      Object.assign(this.OrderStatusList, response);
      this.selected = 'all';
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  goback() {
    history.back();
  }

  shareProducts() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      ProductName: '',
      ProductId: ''
    };
    dialogConfig.width = "450px";
    dialogConfig.panelClass = "custom-dialog-container"
    let dialogRef = this.matDialog.open(ShareProductsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
    });
  }

  changingViews(value) {
    if (value == 'cardView') {
      this.listViewIcon = true;
      this.gridViewIcon = false;
      this.showCardView = true;
      this.showDetailedView = false;
      this.showListView = false;
      if (this.order.status || this.salesFilterObj.startTime || this.salesFilterObj.days || this.salesFilterObj.searchString) {
        this.filterOrderStatusForDefaultView();
      }
    }
    else if (value == 'listView') {
      this.listViewIcon = false;
      this.gridViewIcon = true;
      this.showListView = true;
      this.showCardView = false;
      this.showDetailedView = false;
      if (this.order.status || this.salesFilterObj.startTime || this.salesFilterObj.days || this.salesFilterObj.searchString) {
        this.filterOrderStatusForDefaultView();
      }
      else {
        this.getOrdersForDefaultView();
      }
    }
    else {
      this.getOrdersForDetailedView();
      this.showDetailedView = true;
      this.showListView = false;
      this.showCardView = false;
    }
  }

  getOrdersForDetailedView() {
    this.salesService.getOrdersForDetailedView('', '', '').subscribe((response) => {
      this.pendingOrdersListForDetailedView = [];
      Object.assign(this.pendingOrdersListForDetailedView, response);
      this.dataSource1 = new MatTableDataSource<OrdersViewDetailed>(this.pendingOrdersListForDetailedView);
      this.paginator1.pageSize = 25;
      this.dataSource1.paginator = this.paginator1;
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  getOrdersForDefaultView() {
    this.salesService.getOrdersForDefaultView('', '', '').subscribe((response) => {
      this.pendingOrdersList = [];
      Object.assign(this.pendingOrdersList, response);
      this.addDocument(this.pendingOrdersList);
      this.dataSource2 = new MatTableDataSource<OrdersViewDefault>(this.pendingOrdersList);
      this.noProductShowHide = this.pendingOrdersList.length;
      this.paginator2.pageSize = 25;
      this.dataSource2.paginator = this.paginator2;
      this.dataSource2.sort = this.sort;
      this.getDocument();
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  searchOrders(event) {
    this.searchOrderFilter = event.target.value;
    if (this.showDetailedView) {
      this.searchOrdersForDetailedView();
    }
    else {
      this.searchOrdersForDefaultView();
    }

  }

  searchOrdersForDetailedView() {
    if (this.salesFilterObj.days == 0) {
      this.salesFilterObj.days = null;
    }
    this.salesFilterObj.searchString = this.searchOrderFilter;
    this.salesService.getOrderSearchNew('', this.order.status, this.salesFilterObj.startTime, this.salesFilterObj.endTime, this.salesFilterObj.days, this.salesFilterObj.searchString).subscribe((response) => {
      this.pendingOrdersListForDetailedView = [];
      Object.assign(this.pendingOrdersListForDetailedView, response);
      this.dataSource1 = new MatTableDataSource<OrdersViewDetailed>(this.pendingOrdersListForDetailedView);
      this.paginator1.pageSize = 25;
      this.dataSource1.paginator = this.paginator1;
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  searchOrdersForDefaultView() {
    if (this.salesFilterObj.days == 0) {
      this.salesFilterObj.days = null;
    }
    this.salesFilterObj.searchString = this.searchOrderFilter;
    this.salesService.getOrderSearchNew('', this.order.status, this.salesFilterObj.startTime, this.salesFilterObj.endTime, this.salesFilterObj.days, this.salesFilterObj.searchString).subscribe((response) => {
      this.pendingOrdersList = [];
      Object.assign(this.pendingOrdersList, response);
      this.dataSource2 = new MatTableDataSource<OrdersViewDefault>(this.pendingOrdersList);
      this.paginator2.pageSize = 25;
      this.dataSource2.paginator = this.paginator2;
      this.dataSource2.sort = this.sort;
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  filterOrderStatus(value) {
    if (value == 'All') {
      if (this.showDetailedView) {
        this.getOrdersForDetailedView();
      }
      else {
        this.getOrdersForDefaultView();
      }
    }
    else {
      if (this.showDetailedView) {
        this.filterOrderStatusForDetailedView();
      }
      else {
        this.filterOrderStatusForDefaultView();
      }
    }
  }

  filterOrderStatusForDetailedView() {
    if (this.salesFilterObj.days == 0) {
      this.salesFilterObj.days = null;
    }
    this.salesService.getOrderSearchNew('', this.order.status, this.salesFilterObj.startTime, this.salesFilterObj.endTime, this.salesFilterObj.days, this.salesFilterObj.searchString).subscribe((response) => {
      this.pendingOrdersListForDetailedView = [];
      Object.assign(this.pendingOrdersListForDetailedView, response);
      this.dataSource1 = new MatTableDataSource<OrdersViewDetailed>(this.pendingOrdersListForDetailedView);
      this.paginator1.pageSize = 25;
      this.dataSource1.paginator = this.paginator1;
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  filterOrderStatusForDefaultView() {
    if (this.salesFilterObj.days == 0) {
      this.salesFilterObj.days = null;
    }
    this.salesService.getOrderSearchNew('', this.order.status, this.salesFilterObj.startTime, this.salesFilterObj.endTime, this.salesFilterObj.days, this.salesFilterObj.searchString).subscribe((response) => {
      this.pendingOrdersList = [];
      Object.assign(this.pendingOrdersList, response);
      this.dataSource2 = new MatTableDataSource<OrdersViewDefault>(this.pendingOrdersList);
      this.paginator2.pageSize = 25;
      this.dataSource2.paginator = this.paginator2;
      this.dataSource2.sort = this.sort;
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  getPageNumber1(event) {
    this.pageNumber1 = event.pageIndex + 1;
    this.totalPages1 = Math.ceil(this.paginator1.length / this.paginator1.pageSize);
  }

  getPageNumber2(event) {
    this.pageNumber2 = event.pageIndex + 1;
    this.totalPages2 = Math.ceil(this.paginator2.length / this.paginator2.pageSize);
  }

  ordersFilter(event) {
    this.salesFilterObj.days = null;
    if (event.checked || event.checked == false) {
      this.salesFilterObj.notReplied = event.checked;
    }
    if (event == 'all') {
      this.salesFilterObj.startTime = '';
      this.salesFilterObj.endTime = '';
      this.showStartEndDate = false;
    } else if (event == 'week') {
      this.salesFilterObj.days = 7;
      this.showStartEndDate = false;
    } else if (event == 'month') {
      this.salesFilterObj.days = 30;
      this.showStartEndDate = false;
    } else if (event == 'custom') {
      this.showStartEndDate = true;
      return;
    } else if (event.checked) {

    }
    if (this.showDetailedView) {
      this.getOrdersByFilterForDetailedView();
    }
    else {
      this.getOrdersByFilterDefaultView();
    }
  }

  dateFilter() {
    if (this.startDateFilter != '' && this.enddateFilter != '') {
      this.salesFilterObj.startTime = new Date(this.startDateFilter).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).toString();
      this.salesFilterObj.endTime = new Date(this.enddateFilter).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).toString();
      if (this.showDetailedView) {
        this.getOrdersByFilterForDetailedView();
      }
      else {
        this.getOrdersByFilterDefaultView();
      }
    }
  }

  getOrdersByFilterForDetailedView() {
    this.salesService.getOrderSearchNew('', this.order.status, this.salesFilterObj.startTime, this.salesFilterObj.endTime, this.salesFilterObj.days, this.salesFilterObj.searchString).subscribe((response) => {
      this.pendingOrdersListForDetailedView = [];
      Object.assign(this.pendingOrdersListForDetailedView, response);
      this.dataSource1 = new MatTableDataSource<OrdersViewDetailed>(this.pendingOrdersListForDetailedView);
      this.paginator1.pageSize = 25;
      this.dataSource1.paginator = this.paginator1;
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  getOrdersByFilterDefaultView() {
    this.salesService.getOrderSearchNew('', this.order.status, this.salesFilterObj.startTime, this.salesFilterObj.endTime, this.salesFilterObj.days, this.salesFilterObj.searchString).subscribe((response) => {
      this.pendingOrdersList = [];
      Object.assign(this.pendingOrdersList, response);
      this.dataSource2 = new MatTableDataSource<OrdersViewDefault>(this.pendingOrdersList);
      this.paginator2.pageSize = 25;
      this.dataSource2.paginator = this.paginator2;
      this.dataSource2.sort = this.sort;
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  navigateOrderDetailsPage(id) {
    let navigationExtras: NavigationExtras = {
      state: {
        orderId: id
      }
    };
    this.router.navigate(['/home/order-details'], navigationExtras);
  }

  findOrderDate(val) {
    const userLocale = navigator.language;
    const datePipe = new DatePipe(userLocale);
    let l1 = new Date().toISOString();
    let l2 = val + 'Z';
    let l3 = l2.split("T");
    let l4 = l1.split("T");
    if (l3[0] === l4[0]) {
      let todayPipedDate = datePipe.transform(l2, 'hh:mm a');
      return "Today, " + todayPipedDate
    }
    else {
      let pipedDate = datePipe.transform(val + 'Z', 'MMM dd,yyyy, hh:mm a');
      return pipedDate;
    }
  }

  OpenUpdateOrderStatusPopup(orderId, currentOrderStatus, brandOrderId, event) {
    let requestedOrderStatus: any;
    if (event && event.target) {
      var requestedOrderStatusId = event.target.value
    }
    else {
      var requestedOrderStatusId = event
    }
    for (let i = 0; i < this.OrderStatusList.length; i++) {
      if (this.OrderStatusList[i].id == requestedOrderStatusId) {
        requestedOrderStatus = this.OrderStatusList[i].name;
      }
    }
    const dialogConfig = new MatDialogConfig();
    let data = {
      orderId: orderId,
      currentOrderStatus: currentOrderStatus,
      requestedOrderStatus: requestedOrderStatus,
      requestedOrderStatusId: requestedOrderStatusId,
      fromSalesPage: true,
      brandOrderId: brandOrderId
    };
    dialogConfig.data = data;
    dialogConfig.width = "450px";
    dialogConfig.height = "fit-content";
    let dialogRef = this.matDialog.open(UpdateOrderStatusComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.getOrderStatus();
        this.getOrdersForDefaultView();
      }
    });
  }

  downloadcsvFile() {
    this.downloadCSVObj.statusId = this.order.status;
    this.downloadCSVObj.startTime = this.salesFilterObj.startTime;
    this.downloadCSVObj.endTime = this.salesFilterObj.endTime;
    this.downloadCSVObj.searchString = this.salesFilterObj.searchString;
    this.downloadCSVObj.days = this.salesFilterObj.days;
    if (this.salesFilterObj.days == 0) {
      this.downloadCSVObj.days = null;
    }

    this.salesService.DownloadcsvFile(this.downloadCSVObj).subscribe(response =>
      this.downLoadFile(response, "text/xlsx"));
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "SalesReport.xlsx";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  handlePageEvent(event) {
    this.page = event.pageIndex + 1;
  }

}
