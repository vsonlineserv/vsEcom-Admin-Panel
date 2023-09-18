import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from 'src/app/global';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient: HttpClient, private Globals: Global) { }

  GetOrdersummaryList() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetOrdersSummary', httpOptions);
  }

  GetSellingProductList() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetOrderSummaryByProduct/', httpOptions);
  }

  GetSellingProductListFilter(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetOrderSummaryByProduct?' + 'days=' + data.days + '&startTime=' + data.startTime + '&endTime=' + data.endTime, httpOptions);
  }

  GetOrderStatusList() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetOrderCountSplitByStatus/', httpOptions);
  }

  GetOrderStatusListFilter(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetOrderCountSplitByStatus?' + 'days=' + data.days + '&startTime=' + data.startTime + '&endTime=' + data.endTime, httpOptions);
  }

  GetProductSummary() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetBranchProductSummary', httpOptions);
  }

  GetBranchEnquiry() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetBranchEnquirySummary', httpOptions);
  }

  GetBranchEnquiryFilter(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetBranchEnquirySummary?' + 'days=' + data.days + '&startTime=' + data.startTime + '&endTime=' + data.endTime, httpOptions);
  }

  getCustomersUserCount() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/TotalCustomersUserCount', httpOptions);
  }

  GetTotalOrdersSales() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken,
        responseType: 'text' as 'json'
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/TotalOrdersSales', httpOptions);
  }

  getWishlistCount() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken,
        responseType: 'text' as 'json'
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/TotalWishlistCount', httpOptions);
  }

  getCartCount() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken,
        responseType: 'text' as 'json'
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/TotalCartCount', httpOptions);
  }

  getUserCount() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken,
        responseType: 'text' as 'json'
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/TotalCreatedDateCount', httpOptions);
  }

  GetUserCountFilter(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken,
        responseType: 'text' as 'json'
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/TotalCreatedDateCount?' + 'days=' + data.days + '&startTime=' + data.startTime + '&endTime=' + data.endTime, httpOptions);
  }

  GetMostSellingProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetMostSellingProducts', httpOptions);
  }

  GetLeastSellingProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetLeastSellingProducts', httpOptions);
  }

  GetTodayAndYesterdaysOrder() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/getTodayAndYesterdaysOrder/', httpOptions);
  }

  GetOrderSummaryByCategory() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetOrderSummaryByCategory/', httpOptions);
  }

  GetTopCategoriesFilter(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken,
        responseType: 'text' as 'json'
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetOrderSummaryByCategory?' + 'days=' + data.days + '&startTime=' + data.startTime + '&endTime=' + data.endTime, httpOptions);
  }

  getOrdersCountFilter(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken,
        responseType: 'text' as 'json'
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetOrdersCountByFilter?' + 'days=' + data.days + '&startTime=' + data.startTime + '&endTime=' + data.endTime, httpOptions);
  }

  getProductsCountFilter(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Globals.vsAccountToken,
        responseType: 'text' as 'json'
      })
    };
    return this.httpClient.get(this.Globals.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetProductsCountByFilter?' + 'days=' + data.days + '&startTime=' + data.startTime + '&endTime=' + data.endTime, httpOptions);
  }

}