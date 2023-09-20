import { Injectable } from '@angular/core';
import { LoginUserData, TokenVSAuth } from './service/models/account';
import { CurrentUserInfo } from './service/models/currentuserinfo';
import { CurrentUserLicenseInfo } from './service/models/currentuserlicenseinfo';
import { DomainInfo } from './service/models/domain';
import { CurrentUserSubscriptionInfo } from './service/models/currentUserSubscriptionInfo';

@Injectable()

export class Global {

    apiURL: string = 'https://localhost:7148'; // vsengine
    vsLoginToken: string; //accountToken
    userName: string;
    vsAccountToken: string; //engineToken
    productName: string;  //to check free trial
    loginUserData = new LoginUserData();
    loginUserToken = new TokenVSAuth();
    ipAddressDetails = 'https://iplist.cc/api/';
    ipApiUrl = 'http://www.geoplugin.net/json.gp'; //for https -> https://ssl.geoplugin.net/json.gp
    currency: string = '';
    productId: string = '';
    branchId: string = '';
    currentUserInfo = new CurrentUserInfo();
    productPageSizeDefaultValue: any = 300;
    homeFolder = '';
    homeCategoryFolder = '';

    // Image Urls to be delete after successful same DB stores
    imageUrlBase = '';
    imageUrlBaseStandard = '';
    imageUrlBaseSmall = '';
    imageUrlBaseLarge = '';

    ApplicationHosting = '';
    defaultPriceValue = '$';
    FlagSubOrFreeTrialExpired: any;
    businessImage: any;
    myAccountImage: any;
    pendingOrderCount: any = 0;
    totalActiveProducts: any = 0;
    totalTrialDays: any = 0;
    pendingEnquiryCount: any = 0;
    ipLookupUrl = 'https://ipapi.co/json/'; //Free for 30,000 Request initially
    flagLoggedIn: boolean = true;
    isStaffAccount: boolean = false;
    firstLastName: any = '';
    storeName: any = '';


}





