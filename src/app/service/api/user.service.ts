import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../../global'
import { LoginModal, UserRegistrationModal, StaffAccountRegistrationModal } from '../models/account';
import { GlobalService } from './global.service';
import { forkJoin } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private global: Global, private route: Router, private globalService: GlobalService) { }

  getUserAddress() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId')  + '/GetAddress', httpOptions);
  }

  updateAddress(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId')  + '/UpdateAddress', data, httpOptions);
  }


  GetAccountDetails() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/GetUser', httpOptions);
  }

  UpdateAccountDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.loginUserToken.token
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.post(this.global.vsEcomClientAdminUrl + '/Account/UpdateUserDetails', data, httpOptions);
  }

  getEcomEngineTokenUsingVSAuth(login: LoginModal) {
    var details = "grant_type=vs-license&tokenOrigin=vsecommerce" + "&username=" + login.Username.trim() + "&password=" + login.Password.trim();
    return this.httpClient.post(this.global.apiURL + '/token/vsoauth', details, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).toPromise();
  }

  GetApplicationData() {
    return this.httpClient.get(this.global.apiURL + '/GetApplicationData');
  }


  // End for login services //
  
  GetRetailerInfo() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/GetRetailerInfo', httpOptions);
  }

  getContactInfo() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.loginUserToken.token
      })
    };
    return this.httpClient.get(this.global.vsEcomClientAdminUrl + '/Settings/GetSiteContactInfo?domainId=', httpOptions);
  }

  GetStoreCategories() {
    return this.httpClient.get(this.global.vsEcomClientAdminUrl + '/Login/GetStoreCategories');
  }

  updateDiscountCoupon(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.put(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UpdateDiscountDetails/', data, httpOptions);
  }

  addDiscountCoupon(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/AddDiscount', data, httpOptions);
  }

  getUserCoupon() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Discount', httpOptions);
  }

  GetCouponById(Id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Discount/' + Id, httpOptions);
  }


  getDiscountCouponsByFilter(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetDiscountsByFilter', data, httpOptions);
  }

  getAllStaffAccount() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetAllStaffAccount', httpOptions);
  }

  deleteStaffAccount(staffIdentifier) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.delete(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/DeleteStaffAccount/'+ staffIdentifier , httpOptions);
  }

  reverseGeocodingWithGoogle(latitude, longitude) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=GOOGLE KEY FOR LAT & LONG');
  }

  getUserLocation() {
    return this.httpClient.get(this.global.ipLookupUrl);
  }

  deleteAccount(keyword: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.loginUserToken.token
      })
    };
    return this.httpClient.delete(this.global.vsEcomClientAdminUrl + '/Account/DeleteAccount?domainId=' + '&keyword=' + keyword, httpOptions);
  }

  ipLookup() {
    return this.httpClient.get(this.global.ipLookupUrl);
  }

  GetPermissionsList() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/GetPermissions', httpOptions);
  }

  CheckEmailExists(staffRegister: StaffAccountRegistrationModal) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.post<any>(this.global.apiURL + '/Seller/' + localStorage.getItem('StoreId') + "/CheckEmailExists",
      {
        Email: staffRegister.Email,
        Password: staffRegister.Password,
        FirstName: staffRegister.FirstName,
        LastName: staffRegister.LastName,
        PhoneNumber: staffRegister.PhoneNumber,
        ConfirmPassword: staffRegister.Password,
        StoreId: Number(localStorage.getItem('StoreId')),
        BranchId: Number(localStorage.getItem('BranchId')),
      }, httpOptions);
  }

  registerStaff(staffRegister: StaffAccountRegistrationModal) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.post<any>(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + "/RegisterStaff",
      {
        Email: staffRegister.Email,
        Password: staffRegister.Password,
        FirstName: staffRegister.FirstName,
        LastName: staffRegister.LastName,
        PhoneNumber: staffRegister.PhoneNumber,
        ConfirmPassword: staffRegister.Password,
        StoreId: Number(localStorage.getItem('StoreId')),
        BranchId: Number(localStorage.getItem('BranchId')),
        PermissionIds: staffRegister.PermissionList,
      }, httpOptions);
  }

  AddCustomer(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'

    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('StoreId') + '/Customer', data, httpOptions)
  }

  GetAllCustomerDetails() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),

    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('StoreId') + '/Customer', httpOptions)
  }

  UpdateCustomerById(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
    };
    return this.httpClient.put(this.global.apiURL + '/seller/' + localStorage.getItem('StoreId') + '/Customer', data, httpOptions)
  }

  GetMyCustomerDetails(UserId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('StoreId') + '/Customer/' + UserId, httpOptions);
  }

  SearchCustomer(searchString: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('StoreId') + '/SearchCustomer/' + searchString, httpOptions);
  }

  DeleteCustomerById(UserId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.delete(this.global.apiURL + '/Seller/' + localStorage.getItem('StoreId') + '/Customer/' + UserId, httpOptions);
  }

}
