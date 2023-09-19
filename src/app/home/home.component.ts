import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { fromEvent, merge, Observable, Observer, of, Subject, Subscription } from 'rxjs';
import { Global } from '../global';
import { GlobalService } from '../service/api/global.service';
import { UserService } from '../service/api/user.service';
import { ProductService } from '../service/api/product.service';
import { SalesService } from '../service/api/sales.service';
import { Router } from '@angular/router';
import { ReportsService } from '../service/api/reports.service';
import { map, mapTo } from 'rxjs/operators';
import { animateText, onSideNavChange } from '../animation/animation';
import { AnimationService } from '../animation/animation.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class HomeComponent implements OnInit {

  title = 'vsadmin-client';
  opened = true;
  over;
  expandHeight = '48px';
  collapseHeight = '48px';
  displayMode = 'flat';
  watcher: Subscription;
  applicationdetails: any;
  userNameToDisplay: string;
  siteLinkToDisplay: string;
  currency: any;
  firstLastName: any;
  businessProfileObj: any;
  imageBusinessProfile: any;
  subscriptionDetailsObj: any;
  myAccountObj: any;
  imageMyAccount: any;
  myAccount: boolean;
  domainList: any = [];
  storeDomainId: any = [];
  selectedOption: any;
  loader: boolean = false;
  setInterval = null;
  interval: any;
  siteUrl: any;
  orderStatus: any = [];
  branchEnquiry: any = [];
  flagPendingOrderCount: boolean = false;
  pendingOrderCount: any;
  pendingEnquiryCount: any;
  productList: any = [];
  unpublishedProducts: any = [];
  totalActiveProducts: any;
  productSummary: any = [];
  public onSideNavChange: boolean = true;
  public sideNavState: boolean = true;
  public linkText: boolean = true;

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  connectionStatusMessage: string;
  connectionStatus: string;
  online$: Observable<boolean>;
  status: any;
  userAddressObj: any;
  selectedCountry: any;
  productName = 'vsecom';
  subscriptionModelObj: any = {};
  freeTrialEnded: boolean = false;

  @ViewChild('sidenav', { static: true }) myNav: MatSidenav;

  constructor(media: MediaObserver, private router: Router, private userService: UserService,
    public global: Global, private productService: ProductService, public matDialog: MatDialog,
    public globalService: GlobalService,private reportsService: ReportsService,
    private salesService: SalesService, private animationService: AnimationService) {
    // for side nav START
    this.over = 'side';
    this.watcher = media.asObservable().subscribe((changes: MediaChange[]) => changes.some((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    }));
    // END
    this.animationService.sideNavState$.subscribe(res => {
      console.log(res)
      this.onSideNavChange = res;
    })
    this.global.businessImage = '../assets/images/logo-placeholder.png';

  }

  ngOnInit() {
    this.global.flagLoggedIn = true;
    this.CheckApplicationData();
    this.pendingOrdersCount();
    this.getProductSummary();
    this.getBranchEnquiry();
    this.getMyAccountImage();

    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Back to online';
      this.connectionStatus = 'online';
      window.location.reload();
    }, error => {
      this.connectionStatus = 'offline';
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'Connection lost! You are not connected to internet';
      this.connectionStatus = 'offline';
    }, error => {
      this.connectionStatus = 'offline';
    }));

    this.checkOnlineStatus().subscribe(isOnline => {
      if (!isOnline) {
        this.connectionStatus = 'offline';
        this.connectionStatusMessage = 'Connection lost! You are not connected to internet';
      }
    });
  }

  async CheckApplicationData() {
    this.globalService.GetToken();
    this.globalService.GetEngineToken();
    let getNameDetails = JSON.parse(localStorage.getItem('currentUserInfo'));
    if (getNameDetails.lastName == null || getNameDetails.lastName == undefined) {
      getNameDetails.lastName = '';
    }
    this.global.firstLastName = getNameDetails.firstName + ' ' + getNameDetails.lastName;
    this.userNameToDisplay = localStorage.getItem('vsonlineuserName');
    this.siteLinkToDisplay = localStorage.getItem('siteName');
    this.global.userName = localStorage.getItem('vsonlineuserName');
    if (!this.globalService.GetCurrentUserInfo()) {
      console.log("Error getting current user info");
    }
    this.getCurrency();
  }



  navigate(component) {
    this.router.navigate(['/home/' + component + '']);
  }

  toggleSideNav() {
    this.myNav.toggle();
  }

  getCurrency() {
    this.productService.getCurrency().subscribe((response) => {
      this.currency = {};
      Object.assign(this.currency, response);
      this.global.currency = this.currency.symbol;
    },
      error => {
      });
  }

  getClientCountry() {
    this.userService.getUserAddress().subscribe((response) => {
      this.userAddressObj = {};
      Object.assign(this.userAddressObj, response);
      if (this.userAddressObj.country != null && this.userAddressObj.country != '') {
        this.selectedCountry = this.userAddressObj.country;
      }
      else {
        this.selectedCountry = 'AllOthers';
      }
    }, error => {
      this.selectedCountry = 'AllOthers';
    });
  }

  GetApplicationData() {
    if (this.global.imageUrlBase === undefined || this.global.imageUrlBase === null || this.global.imageUrlBase === '') {
      this.userService.GetApplicationData().subscribe((response) => {
        const applicationData: any = {};
        Object.assign(applicationData, response);
        this.global.imageUrlBase = applicationData.imageUrlBase;
        localStorage.setItem('imageUrlBase', applicationData.imageUrlBase + 'Images/')
        this.global.homeFolder = applicationData.homeFolder;
        this.global.homeCategoryFolder = applicationData.homeCategoryFolder;
        this.global.imageUrlBaseStandard = applicationData.imageUrlBaseStandard;
        this.global.imageUrlBaseSmall = applicationData.imageUrlBaseSmall;
        this.global.imageUrlBaseLarge = applicationData.imageUrlBaseLarge;
        this.global.ApplicationHosting = applicationData.ApplicationHosting;
      },
        error => {
        });
    } else {

    }
  }


  redirectUser() {
    this.router.navigate(['/home']);
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

  getBranchEnquiry() {
    this.reportsService.GetBranchEnquiry().subscribe((response) => {
      Object.assign(this.branchEnquiry, response);
      for (let i = 0; i < this.branchEnquiry.length; i++) {
        if (this.branchEnquiry[i].status == 'Pending') {
          if (this.branchEnquiry[i].enquiryCount > 0) {
            this.global.pendingEnquiryCount = this.branchEnquiry[i].enquiryCount;
          }
        }
      }
    },
      error => {
        //alert('Error');
      });
  }

  getProductSummary() {
    this.totalActiveProducts = 0;
    this.reportsService.GetProductSummary().subscribe((response) => {
      Object.assign(this.productSummary, response);
      for (let i = 0; i < this.productSummary.length; i++) {
        let details = [];
        details = this.productSummary[i];
        if (this.productSummary[i].ProductStatus == "Active") {
          this.global.totalActiveProducts = this.productSummary[i].TotalProducts;
        }
      }
    },
      error => {
        //alert('Error');
      });
  }
  onSinenavToggle() {
    // this.myNav.toggle();
    this.sideNavState = !this.sideNavState;
    if (this.sideNavState) {
      setTimeout(() => {
        this.linkText = this.sideNavState;
      }, 170);
    } else {
      setTimeout(() => {
        this.linkText = this.sideNavState;
      }, 0);
    }
    this.animationService.sideNavState$.next(this.sideNavState)
  }

  ngOnDestroy(): void {
    /**
    * Unsubscribe all subscriptions to avoid memory leak
    */
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  checkOnlineStatus() {
    return merge<any>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }

  getMyAccountImage() {
    this.userService.GetAccountDetails().subscribe((response) => {
      this.myAccountObj = {};
      Object.assign(this.myAccountObj, response);
      localStorage.setItem('currentUserInfo', JSON.stringify(response));
      if (this.myAccountObj.lastName == null || this.myAccountObj.lastName == undefined) {
        this.myAccountObj.lastName = "";
      }
      if (this.myAccountObj.isMerchant == false) {
        this.global.isStaffAccount = true;
      }
      this.global.firstLastName = this.myAccountObj.firstName + ' ' + this.myAccountObj.lastName;
      if (this.myAccountObj.pictureName != null && this.myAccountObj.pictureName != "") {
        this.global.myAccountImage = this.myAccountObj.pictureName;
      } else {
        this.global.myAccountImage = './assets/images/no-image.png';
      }
    }, error => {
    });
  }

}
