import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AddShippingComponent } from '../components/add-shipping/add-shipping.component';
import { DeliveryStatusComponent } from '../components/delivery-status/delivery-status.component';
import { PaymentStatusComponent } from '../components/payment-status/payment-status.component';
import { UpdateOrderStatusComponent } from '../components/update-order-status/update-order-status.component';
import { Global } from '../global';
import { GlobalService } from '../service/api/global.service';
import { SalesService } from '../service/api/sales.service';
import { ShippingService } from '../service/api/shipping.service';
import { OrderConfirmationPopupComponent } from '../components/order-confirmation-popup/order-confirmation-popup.component';

export interface ShipmentDetails {
  orderId: string;
  shipmentId: number;
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})

export class OrderDetailsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['ORDERID', 'SHIPMENTID', 'ACTION'];
  dataSource: MatTableDataSource<ShipmentDetails>;
  OrderId: any;
  orderDetails: any = [];
  shipmentDetails: any = [];
  orderDetailsId: any;
  selected: any;
  itemCount: any = 0;
  orderItems: any = [];
  OrderStatusList: any = [];
  shippingOrderService: any = [];
  shiprocketEnabled: boolean = false;
  isShipmentDetailsFounded: boolean = false;
  paidStatus: boolean = false;
  usersCurrentTab: number = 1;
  shippedOrderDetails: any;
  deliveredStatus: boolean = false;
  trackingByShipmentList: any = {};
  flagOrderConfirmed: boolean = false;
  loader: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private salesService: SalesService,
    private globalService: GlobalService, public global: Global, private matDialog: MatDialog, private shippingService: ShippingService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.OrderId = this.router.getCurrentNavigation().extras.state['orderId'];
        localStorage.setItem('OrderId', this.OrderId)
      }
    });
  }

  ngOnInit() {
    this.orderDetailsId = localStorage.getItem('OrderId');
    this.getOrderStatus();
    this.getOrderDetails();
    this.isShiprocketEnabled();
  }

  goback() {
    history.back();
  }

  getOrderDetails() {
    this.loader = true;
    this.salesService.GetEachOrderDetails(this.orderDetailsId).subscribe((response) => {
      Object.assign(this.orderDetails, response)
      this.selected = this.orderDetails.OrderStatus;
      if (this.orderDetails) {
        this.itemCount = this.orderDetails.length;
        for (var i = 0; i < this.orderDetails.length; i++) {
          if (this.orderDetails[i].paymentStatusId == 3) {
            this.paidStatus = true;
          }
          if (this.orderDetails[i].orderItemStatusId == 20) {
            this.deliveredStatus = true;
          }
          if (this.orderDetails[i].flagConfirmStatus) {
            this.flagOrderConfirmed = true;
          }
          let orderItem: any = {};
          orderItem.name = this.orderDetails[i].name;
          orderItem.sku = this.orderDetails[i].name.replace(/\s/g, "").toLowerCase() + this.orderDetails[i].id;
          orderItem.units = this.orderDetails[i].quantity;
          orderItem.selling_price = this.orderDetails[i].priceInclTax.toString();
          this.orderItems.push(orderItem);
        }
      }
      this.loader = false;
    },
      error => {
        this.loader = false;
      });
  }

  onImgError(event) {
    event.target.src = './assets/images/no-image.png';
    // Do other stuff with the event.target
  }

  getOrderStatus() {
    this.loader = true;
    this.salesService.getOrderStatus().subscribe((response) => {
      this.OrderStatusList = [];
      Object.assign(this.OrderStatusList, response);
      this.loader = false;
    },
      error => {
        this.loader = false;
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

  isShiprocketEnabled() {
    this.loader = true;
    this.shippingService.getApiUser().subscribe((response: any) => {
      if (response != "User Not Found") {
        this.shiprocketEnabled = true;
        this.getShipmentDetails();
      }
      this.loader = false;
    }, error => {
      this.loader = false;
    });
  }

  OpenUpdateOrderStatusPopup(orderId, currentOrderStatus, brandOrderId, event) {
    let requestedOrderStatus: any;
    let requestedOrderStatusId = event.target.value
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
      fromSalesPage: false,
      brandOrderId: brandOrderId
    };
    dialogConfig.data = data;
    dialogConfig.width = "450px";
    dialogConfig.height = "fit-content";
    let dialogRef = this.matDialog.open(UpdateOrderStatusComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.getOrderStatus();
        this.getOrderDetails();
      }
    });
  }

  createShippingOrder() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    let dialogRef = this.matDialog.open(AddShippingComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value.createOrder) {
        this.createShiprocketOrder(value);
      }
    });
  }

  createShiprocketOrder(orderDetails: any) {
    let paymentMethod: any = '';
    if (this.orderDetails[0].paymentMethod == 1 && this.orderDetails[0].paymentMethod == 2) {
      paymentMethod = 'COD';
    }
    else {
      paymentMethod = 'Prepaid';
    }
    let shippingOrderDetails = {
      order_id: this.orderDetails[0].orderId.toString(),
      order_date: this.orderDetails[0].orderDateUtc,
      billing_customer_name: this.orderDetails[0].firstName,
      billing_last_name: this.orderDetails[0].lastName,
      billing_address: this.orderDetails[0].address1,
      billing_address_2: this.orderDetails[0].address2,
      billing_city: this.orderDetails[0].city,
      billing_pincode: this.orderDetails[0].postalCode,
      billing_state: this.orderDetails[0].state,
      billing_country: this.orderDetails[0].country,
      billing_email: this.orderDetails[0].email,
      billing_phone: this.orderDetails[0].phoneNumber,
      shipping_customer_name: this.orderDetails[0].firstName,
      shipping_email: this.orderDetails[0].email,
      shipping_address: this.orderDetails[0].address1,
      shipping_city: this.orderDetails[0].city,
      shipping_state: this.orderDetails[0].state,
      shipping_country: this.orderDetails[0].country,
      shipping_pincode: this.orderDetails[0].postalCode,
      shipping_phone: this.orderDetails[0].phoneNumber,
      sub_total: this.orderDetails[0].orderTotal,
      order_items: this.orderItems,
      payment_method: paymentMethod,
      pickup_location: orderDetails.pickupLocation,
      length: orderDetails.length,
      breadth: orderDetails.breadth,
      height: orderDetails.height,
      weight: orderDetails.weight,
      shipping_is_billing: false,
      comment: '',
      shipping_charges: '',
      giftwrap_charges: '',
      transaction_charges: '',
      total_discount: ''
    };
    this.shippingService.CreateShiprocketOrder(shippingOrderDetails).subscribe((response) => {
      this.shippedOrderDetails = [];
      Object.assign(this.shippedOrderDetails, response);
      this.globalService.displayPopupMessage('Order created successfully with shiprocket', true);
      this.getOrderDetails();
      this.getShipmentDetails();
    },
      error => {
        this.globalService.displayPopupMessage('There is an some error occurred in creating your order with shiprocket', false);
      });
  }

  openPaymentStatusPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = this.orderDetails[0].orderId;
    let dialogRef = this.matDialog.open(PaymentStatusComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.getOrderDetails();
      }
    });
  }

  openDeliveredStatusPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = this.orderDetails[0].orderId;
    let dialogRef = this.matDialog.open(DeliveryStatusComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.getOrderDetails();
      }
    });
  }

  getShipmentDetails() {
    this.shippingService.getShipmentDetails(this.orderDetailsId).subscribe((response: any) => {
      if (response == "Order Not Found") {
        this.isShipmentDetailsFounded = false;
      }
      else {
        this.usersCurrentTab = 2;
        this.isShipmentDetailsFounded = true;
        let userData = JSON.parse(response);
        let userList = new Array();
        userList.push(userData);
        Object.assign(this.shipmentDetails, userList);
        this.dataSource = new MatTableDataSource<ShipmentDetails>(this.shipmentDetails);
      }
    },
      error => {
        this.globalService.displayPopupMessage('Error', false);
      });
  }


  viewTrackingDetails(shipmentId: number) {
    this.shippingService.getTrackingByShipmentID(shipmentId).subscribe((response: any) => {
      Object.assign(this.trackingByShipmentList, response);
      if(this.trackingByShipmentList.tracking_data.error){
        this.globalService.displayPopupMessage('Your order has not been shipped yet', false);
      }
      else{
        let navigationExtras: NavigationExtras = {
          state: {
            trackingByShipmentList: this.trackingByShipmentList
          }
        };
        this.router.navigate(['/home/view-tracking'], navigationExtras);
      }
    },
    error => {
        this.globalService.displayPopupMessage('Error', false);
    });
  }

  orderConfirmationPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    let dialogRef = this.matDialog.open(OrderConfirmationPopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.updateOrderConfirmation(value);
      }
    });
  }

  updateOrderConfirmation(flagConfirmationStatus: any) {
    this.salesService.UpdateOrderConfirmation(this.orderDetailsId, flagConfirmationStatus).subscribe((response) => {
      this.getOrderDetails() 
      this.globalService.displayPopupMessage('Order has been confirmed successfully', true);
    },
      error => {
        this.globalService.displayPopupMessage('There is an some error occurred confirming your order', false);
      });
  }

}
