import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from 'src/app/global';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient, private global: Global) { }

  getProductsBasedOnCategory(parentCategoryId, subCategoryId) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetMyFilteredProductsPaging/' + parentCategoryId + '/' + subCategoryId + '/' + localStorage.getItem('StoreId') + '/' + 1 + '/' + this.global.productPageSizeDefaultValue, httpOptions);
  }

  getInboxMails() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetSellerInbox/', httpOptions);
  }

  getInboxMailsFilter(data) {
    if (data.searchString == undefined) {
      data.searchString = '';
    }

    let params = new HttpParams();
    params = params.append('days', data.days);
    params = params.append('month', data.month);
    params = params.append('startTime', data.startTime);
    params = params.append('endTime', data.endTime);
    params = params.append('notReplied', data.notReplied);
    params = params.append('searchString', data.searchString);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetSellerInboxByFilter?days=' + data.days + '&month=' + data.month + '&startTime=' + data.startTime + '&endTime=' + data.endTime + '&notReplied=' + data.notReplied + '&searchString=' + data.searchString, httpOptions);
  }

  replyToMail(mailId, reply) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/InboxReply/' + mailId + "?reply=" + reply + "&domainURL=", httpOptions);
  }
  getALLInventory() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetAllInventoryproduct', httpOptions);
  }

  addExistingQuantity(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.put(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/AddToExistingQuantity', data, httpOptions);
  }

  // ===== Not used methods =========

  updatePrice(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.put(this.global.apiURL + '/UpdateProductPrice', data, httpOptions);
  }

  suspendeProduct(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/RemoveProduct', data, httpOptions);
  }

  resumeProduct(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/ResumeProduct', data, httpOptions);
  }

}
