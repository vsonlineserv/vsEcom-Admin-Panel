import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../global';
import { PaymentService } from '../service/api/payment.service';
import { ProductService } from '../service/api/product.service';
import { ReportsService } from '../service/api/reports.service';
import { UserService } from '../service/api/user.service';
import { SalesService } from '../service/api/sales.service';
import { GlobalService } from '../service/api/global.service';
import { ShareProductsComponent } from '../components/share-products/share-products.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  productSummary: any = [];
  showBusinessProfile: boolean;
  showCurrencyAndTax: boolean;
  showPayment: boolean;
  providersObj: any;
  branchEnquiry: any = [];
  displayAddProduct: boolean;
  displayAddDomain: boolean;
  imagesUrl: any = [];
  templateImages: any;
  imageObject: any = [];
  imageObject1: any = [];
  retailerDetails: any;
  templateDetailsObj: any;
  currentTemplateSrc: any;
  spinner: boolean;
  time = 0;
  interval: any;
  CustomersUserCount: any;
  TotalOrdersCount: any;
  TotalSalesCount: any;
  ActiveCarts: any;
  TotalWishlistCount: any;
  TotalCartCount: any;
  totalActiveProducts: any;
  totalInActiveProducts: any;
  totalPendingProducts: any;
  email: any;
  phoneNumber:any;
  ActivationStatus: any = [];
  verifyButton: boolean = true;
  leastSellingProducts: any = [];
  mostSellingProducts: any = [];
  view: any;
  orderStatus:any=[];
  pendingOrderCount:any=0;
  recentProductsList:any=[];
  recentOrderList:any=[];
  getTodayAndYesterdaysOrderList: any=[];
  getYesterdaysOrder:number = 0;
  getTodayOrder: number = 0;
  ordersList: any = [];

  constructor(private router: Router, private userService: UserService,
    public global: Global, private globalService: GlobalService,
    private reportsService: ReportsService, private matDialog: MatDialog,
    private paymentService: PaymentService, private productService: ProductService,private salesService:SalesService) {
  }

  ngOnInit() {
    this.loadInitialApplicationDetails();
  }

  loadInitialApplicationDetails() {
    this.getRetailerInfo();
  }

  getProductSummary() {
    this.totalActiveProducts = 0;
    this.totalInActiveProducts = 0;
    this.totalPendingProducts = 0;
    this.reportsService.GetProductSummary().subscribe((response) => {
      Object.assign(this.productSummary, response);
      for (let i = 0; i < this.productSummary.length; i++) {
        let details = [];
        details = this.productSummary[i];
        if(this.productSummary[i].productStatus == "Active"){
          this.totalActiveProducts = this.productSummary[i].totalProducts;
          this.global.totalActiveProducts = this.productSummary[i].totalProducts;
        }
        if(this.productSummary[i].productStatus == "Inactive"){
          this.totalPendingProducts = this.productSummary[i].totalProducts;
        }
        if(this.productSummary[i].productStatus == "Pending"){
          this.totalInActiveProducts = this.productSummary[i].totalProducts;
        }
      }
    },
      error => {
        //alert('Error');
      });
  }

  getPaymentDetails() {
    this.paymentService.getPaymentDetails().subscribe((response) => {
      let paymentInfo: any = {};
      Object.assign(paymentInfo, response);
      if (paymentInfo.Currency == null) {
        this.showCurrencyAndTax = true;
      }
    },
      error => {
        //alert('Error getting paymentDetails');
      });
  }

  getProviderDetails() {
    this.paymentService.getProviderDetails().subscribe((response) => {
      this.providersObj = {};
      Object.assign(this.providersObj, response);
      if ((this.providersObj.payPalSecretKey != null || this.providersObj.appleSecretKey != null ||
        this.providersObj.googleSecretKey != null || this.providersObj.razorSecretKey != null || this.providersObj.cardOnDeliveryEnbled == true  
      || this.providersObj.cashOnDeliveryEnabled == true || this.providersObj.otherSecretId != null)) {
        this.showPayment = false;
      }
      else {
        this.showPayment = true;
      }
    },
      error => {

      });
  }

  getBranchEnquiry() {
    this.reportsService.GetBranchEnquiry().subscribe((response) => {
      Object.assign(this.branchEnquiry, response);
    },
      error => {
        //alert('Error');
      });
  }

  getProductlistInfo() {
    this.productService.GetunpublishedProductlist().subscribe((response) => {
      let unpublishprodcts: any = [];
      unpublishprodcts = response;
      var unpublishproductslist = unpublishprodcts;
      if (unpublishproductslist != null && unpublishproductslist != "") {
        this.displayAddProduct = false;
      }
      else {
        this.productService.GetpublishedProductlist().subscribe((response) => {
          let publishprodcts: any = [];
          publishprodcts = response;
          var publishproductslist = publishprodcts;
          if (publishproductslist != null && publishproductslist != "") {
            this.displayAddProduct = false;
          }
          else {
            this.displayAddProduct = true;
          }
        },
          error => {
          });
      }
    },
      error => {
      });
  }

  getRetailerInfo() {
    this.userService.GetRetailerInfo().subscribe(response => {
      let retailerDetails = response;
      this.retailerDetails = {};
      Object.assign(this.retailerDetails, response);
      this.globalService.SetRetailerDetailsInStrorage(this.retailerDetails);
      this.getCurrency();
      this.getProductSummary();
      this.pendingOrdersCount();
      this.getBranchEnquiry();
      this.getProductlistInfo();
      this.getPaymentDetails();
      this.getProviderDetails();
      this.getCustomersUserCount();
      this.GetTotalOrdersSales();
      this.getWishlistCount();
      this.getCartCount();
      this.GetMostSellingProducts();
      this.GetLeastSellingProducts();
      this.getRecentProduct();
      this.getRecentOrders();
      this.getTodayAndYesterdaysOrder();

    },
      error => {

      });
  }

  getCustomersUserCount() {
    this.reportsService.getCustomersUserCount().subscribe((response) => {
      if (response) {
        this.CustomersUserCount = response['customersCount'];
      } else {
        this.CustomersUserCount = 0;
      }
    },
    error => {

    });
  }

  GetTotalOrdersSales() {
    this.reportsService.GetTotalOrdersSales().subscribe((response) => {
      let totalObj: any = {};
      Object.assign(totalObj, response);
      if (totalObj.OrderCount != 0 && totalObj.salesTotal != null) {
        this.TotalOrdersCount = totalObj.orderCount;
        this.TotalSalesCount = totalObj.salesTotal;
      } else {
        this.TotalSalesCount = 0;
        this.TotalOrdersCount = 0;
      }
    },
    error => {

    });
  }

  getWishlistCount() {
    this.reportsService.getWishlistCount().subscribe((response) => {
      if (response) {
        this.TotalWishlistCount = response['wishlistCount'];
      } else {
        this.TotalWishlistCount = 0;
      }
    },
    error => {

    });
  }

  getCartCount() {
    this.reportsService.getCartCount().subscribe((response) => {
      if (response) {
        this.TotalCartCount = response['cartCount'];
      } else {
        this.TotalCartCount = 0;
      }
    },
    error => {

    });
  }

  getCurrency() {
    this.productService.getCurrency().subscribe((response) => {
      let currency: any = {};
      Object.assign(currency, response);
      this.global.currency = currency.symbol;
    },
      error => {
        // below is commented because this api right now will not hit
        //this.globalService.displayPopupMessage('Error', false);
      });
  }

  GetMostSellingProducts() {
    this.reportsService.GetMostSellingProducts().subscribe((response:any) => {
      this.mostSellingProducts = response.map(datum => ({ name: datum.productName, value: datum.orderCount }));

      let mostSellingProducts=document.getElementById("mostSellingProducts");
      this.view = [mostSellingProducts.offsetWidth / 1.2, 150];
    },
    error => {

    });
  }

  GetLeastSellingProducts() {
    this.reportsService.GetLeastSellingProducts().subscribe((response:any) => {
      this.leastSellingProducts = response.map(datum => ({ name: datum.productName, value: datum.orderCount }));
    },
    error => {

    });
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

  axisFormat(val) {
    if (val % 1 === 0) {
      return val.toLocaleString();
    } else {
      return '';
    }
  }

  onResize(event) {
    let mostSellingProducts=document.getElementById("mostSellingProducts");
    this.view = [mostSellingProducts.offsetWidth/ 1.2, 150];
  }

  pendingOrdersCount() {
    this.salesService.GetorderCountStatus().subscribe((response) => {
      Object.assign(this.orderStatus, response);
      for (let i = 0; i < this.orderStatus.length; i++) {
        if (this.orderStatus[i].name == 'Pending') {
          if (this.orderStatus[i].count > 0) {
            this.global.pendingOrderCount = this.orderStatus[i].count;
          }
        }
      }
    },
      error => {
      });
  }

  getRecentProduct() {
    this.productService.GetRecentProducts().subscribe((response:any) => {
      Object.assign(this.recentProductsList, response) ;
    },
      error => {
      });
  }

  getRecentOrders() {
    this.productService.GetRecentOrders().subscribe((response:any) => {
      Object.assign(this.recentOrderList, response) ;
    },
      error => {
      });
  }

  onImgError(event) {
    event.target.src = './assets/images/no-image.png';
    // Do other stuff with the event.target
  }

  getTodayAndYesterdaysOrder() {
    this.reportsService.GetTodayAndYesterdaysOrder().subscribe((response) => {
      Object.assign(this.getTodayAndYesterdaysOrderList, response) ;
      if(this.getTodayAndYesterdaysOrderList.length != 0){
        this.getTodayOrder= this.getTodayAndYesterdaysOrderList[0].salesValue;
        if(this.getTodayOrder == null){
          this.getTodayOrder = 0;
        }
        this.getYesterdaysOrder = this.getTodayAndYesterdaysOrderList[1].salesValue;
        if(this.getYesterdaysOrder == null){
          this.getYesterdaysOrder = 0;
        }
      }
    }, 
      error => {
      });
  }
}

