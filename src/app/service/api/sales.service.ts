import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from 'src/app/global';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private httpClient: HttpClient, private global: Global) { }

  getOrderStatus() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/GetOrderStatus', httpOptions);
  }

  UpdateOrderStatus(subOrderId, OrderId, statusId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    let orderStatusUpdate = { subOrderId: subOrderId, orderId: OrderId, statusId: statusId };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UpdateOrderStatus/', orderStatusUpdate, httpOptions);
  }

  printOrderDetails(OrderId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/PrintOrderDetails/' + OrderId, httpOptions);
  }

  GetorderCountStatus() {
    let branch = localStorage.getItem('BranchId');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetOrdersCountByStatus', httpOptions);
  }

  getOrdersForDetailedView(branch, pageSize, pageNo) {
    pageSize = 10000;
    pageNo = 1;
    let params = new HttpParams();
    params = params.append('PageSize', pageSize);
    params = params.append('PageNo', pageNo);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      params: params
    };

    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetPendingOrderHistory', httpOptions);
  }

  getOrdersForDefaultView(branch, pageSize, pageNo) {
    pageSize = 10000;
    pageNo = 1;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
    };

    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetPendingOrderHistory/' + pageSize + '/' + pageNo, httpOptions);
  }

  getOrderSearchNew(branch, orderStatus, startTime, endTime, days, searchString) {
    branch = localStorage.getItem('BranchId');
    let params = new HttpParams();
    params = params.append('searchString', searchString);
    params = params.append('Status', orderStatus);
    if (days != null) {
      params = params.append('days', days);
    }
    params = params.append('startTime', startTime);
    params = params.append('endTime', endTime);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      params: params
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetOrdersSearch/', httpOptions);
  }

  GetEachOrderDetails(orderId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetOrderDetails/' + orderId, httpOptions);
  }

  UpdateOrderStatusForAll(OrderId, statusId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    let orderStatusUpdate = { orderId: OrderId, statusId: statusId };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UpdateOrderStatus/', orderStatusUpdate, httpOptions);
  }

  DownloadcsvFile(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'arraybuffer' as 'json'
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetExcelReport/' + '?Status=' + data.statusId + '&searchString=' + data.searchString + '&days=' + data.days + '&startTime=' + data.startTime + '&endTime=' + data.endTime, httpOptions);
  }

  UpdateOrderConfirmation(orderId, flagConfirmationStatus) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/UpdateOrderConfirmationStatus/' + orderId + '/' + flagConfirmationStatus, httpOptions);
  }

}
