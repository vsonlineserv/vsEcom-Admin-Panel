import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Global } from 'src/app/global';
import { GlobalService } from 'src/app/service/api/global.service';
import { SalesService } from 'src/app/service/api/sales.service';

export interface UpdateOrderStatusView {
  OrderId: number;
  OrderDateUtc: Date;
  FirstName: string;
  OrderCount: number;
  OrderTotal: number;
}

@Component({
  selector: 'app-update-order-status',
  templateUrl: './update-order-status.component.html',
  styleUrls: ['./update-order-status.component.scss']
})

export class UpdateOrderStatusComponent implements OnInit {

  OrderId: any;
  OrderStatusId: any;
  orderStatusView: any = [];
  dataSource: MatTableDataSource<UpdateOrderStatusView>;
  displayedColumns: string[] = ['OrderId', 'OrderDateUtc', 'FirstName'
  , 'OrderCount', 'OrderTotal'];
  itemCount: number;
  OrderStatusList: any = [];
  RequestedOrderStatus: any;
  RequestedOrderStatusId: any;
  CurrentOrderStatus: any;
  brandOrderId: any;
  FromSalesPage: boolean = true;

  constructor(public dialogRef: MatDialogRef<UpdateOrderStatusComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private salesService: SalesService, 
  private globalService: GlobalService, public global: Global) { }

  ngOnInit() {
    this.FromSalesPage = this.data.fromSalesPage;
    this.OrderId = this.data.orderId;
    this.RequestedOrderStatus = this.data.requestedOrderStatus;
    this.RequestedOrderStatusId = this.data.requestedOrderStatusId;
    this.CurrentOrderStatus = this.data.currentOrderStatus;
    this.brandOrderId = this.data.brandOrderId;
    this.getOrderDetails();
    this.getOrderStatus();
  }

  close() {
    this.dialogRef.close(false);
  }

  changeOrderStatus() {
    this.salesService.UpdateOrderStatusForAll(this.OrderId, this.RequestedOrderStatusId).subscribe((reponse) => {
      this.dialogRef.close(true);
      this.globalService.displayPopupMessage('Order status changed successfully', true);
    },
      error => {
        this.dialogRef.close(false);
        this.globalService.displayPopupMessage('Error in changing order status', false);
      });
  }

  getOrderDetails() {
    this.salesService.GetEachOrderDetails(this.OrderId).subscribe((response) => {
      this.orderStatusView = [];
      Object.assign(this.orderStatusView, response);
      this.dataSource = new MatTableDataSource<UpdateOrderStatusView>(this.orderStatusView);
      if (this.orderStatusView) {
        this.itemCount = this.orderStatusView.length;
      }
    },
      error => {
      });
  }

  getOrderStatus() {
    this.salesService.getOrderStatus().subscribe((response) => {
      this.OrderStatusList = [];
      Object.assign(this.OrderStatusList, response);
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }

  findOrderDate(val) {
    const userLocale = navigator.language;
    const datePipe = new DatePipe(userLocale);
    var l1 = new Date().toISOString();
    var l2 = val + 'Z';
    var l3 = l2.split("T");
    var l4 = l1.split("T");
    if (l3[0] === l4[0]) {
      let todayPipedDate = datePipe.transform(l2, 'hh:mm a');
      return "Today, " + todayPipedDate
    }
    else {
      let pipedDate = datePipe.transform(val + 'Z', 'MMM dd,yyyy, hh:mm a');
      return pipedDate;
    }
  }

}
