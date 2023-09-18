import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Global } from 'src/app/global';
import { CommonMessageComponent } from '../../components/common-message/common-message.component';
import { TokenVSAuth } from '../models/account';
import { CurrentUserInfo } from '../models/currentuserinfo';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public matDialog: MatDialog, private global: Global, private router: Router) { }

  displayPopupMessage(message, isSuccess) {
    const dialogConfig = new MatDialogConfig();
    let data = {
      message: message,
      isSuccess: isSuccess
    };
    dialogConfig.data = data;
    dialogConfig.width = '350px';
    let dialogRef = this.matDialog.open(CommonMessageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {

    });
  }

  displayPopupMessageLogin(message, isSuccess, value) {
    const dialogConfig = new MatDialogConfig();
    let data = {
      message: message,
      isSuccess: isSuccess,
      value: value
    };
    dialogConfig.data = data;
    dialogConfig.width = '350px';
    let dialogRef = this.matDialog.open(CommonMessageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {

    });
  }

  setexpirydismissdate(data) {
    localStorage.setItem('trialdismissdate', JSON.stringify(data));
  }

  FlagValidObj(obj) {
    if (obj !== null && obj !== undefined) {
      return true;
    }
    else {
      return false;
    }
  }


  SetToken(tokenObj) {
    const dateString = tokenObj.validDateUTC;
    tokenObj.validDateUTC = new Date(dateString).getTime();
    console.log(tokenObj.validDateUTC); 
    let datenow = new Date();
    let parseSec = Date.parse(datenow.toISOString());
    let datenowSec = parseSec + (tokenObj.validDateUTC * 1000);
    tokenObj.expiresUtc = new Date(datenowSec);
    localStorage.setItem('vsonlineuserToken', JSON.stringify(tokenObj));
    localStorage.setItem('flagIsAuthenticated', 'true');
    Object.assign(this.global.loginUserToken, tokenObj);
    this.global.loginUserToken.token = tokenObj.accessToken;
    this.global.loginUserToken.expires_in = tokenObj.validDateUTC;
    this.global.loginUserToken.expires_inUTC = tokenObj.expiresUtc;
  }

  GetIsFlagAuthenticated() {
    var result = JSON.parse(localStorage.getItem('flagIsAuthenticated'));
    if (result && result == 'false') {
      return false;
    }
    return true;
  }

  GetToken() {
    var result = JSON.parse(localStorage.getItem('vsonlineuserToken'));
    if (!result) {
      return false;
    }
    this.global.loginUserToken.token = result.access_token;
    this.global.loginUserToken.expires_in = result.expires_in;
    this.global.loginUserToken.expires_inUTC = result.expiresUtc;
    return true;
  }

  SetEngineToken(token) {
    localStorage.setItem('engineToken', token);
    this.global.vsAccountToken = localStorage.getItem('engineToken');
  }

  GetEngineToken() {
    var result = localStorage.getItem('engineToken');
    if (!result) {
      return false;
    }
    this.global.vsAccountToken = result;
    return true;
  }

  GetCurrentUserInfo() {
    var result = JSON.parse(localStorage.getItem('currentUserInfo'));
    if (!this.FlagValidObj(result)) {
      return false;
    }
    Object.assign(this.global.currentUserInfo, result);
    return true;
  }

  SetRetailerDetailsInStrorage(retailerDetails) {
    localStorage.setItem('StoreId', retailerDetails.storeId);
    localStorage.setItem('BranchId', retailerDetails.branches[0].branchId);
    localStorage.setItem('storeName', retailerDetails.storeName);
  }

  checkTokenValid() {
    if (this.checkIsAuthenticated()) {
      if (this.GetToken()) {
        let datenow = new Date();
        let dateUtcnow = new Date(datenow).toISOString();
        let sysDate = Date.parse(dateUtcnow);
        let tokenDate = Date.parse(this.global.loginUserToken.expires_inUTC);
        if (sysDate > tokenDate) {
          return false;
        }
        if (isNaN(tokenDate)) {
          return false;
        }
        return true;
      }
      return false;
    }
    return false;
  }

  checkIsAuthenticated() {
    if (this.GetIsFlagAuthenticated()) {
      return true;
    }
    return false;
  }

  checkTokenExist() {
    if (this.GetToken()) {
      return true;
    }
    return false;
  }

  async clearStorageDetails() {
    this.global.vsAccountToken = null;
    this.global.pendingOrderCount = 0;
    this.global.pendingEnquiryCount = 0;
    this.global.totalActiveProducts = 0;
  }

  ReloadAllComponents() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/dashboard']);
    });
  }

  logout() {
    this.global.flagLoggedIn = false;
    this.global.loginUserToken = new TokenVSAuth;
    this.global.currentUserInfo = new CurrentUserInfo;
    this.global.vsAccountToken = null;
    this.global.pendingOrderCount = 0;
    this.global.pendingEnquiryCount = 0;
    this.global.totalActiveProducts = 0;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
