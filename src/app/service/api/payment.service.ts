import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from 'src/app/global';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient, private global: Global) { }

  getCurrency() {
    return this.httpClient.get('../../../assets/currencyNewWeb.json');
  }

  getPaymentDetails() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Currency/', httpOptions);
  }

  updatePaymentDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    let CurrencyDetails = {
      TaxType: data.tax,
      Value: data.taxValue,
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Tax', CurrencyDetails, httpOptions);
  }

  updateCurrencyDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'text' as 'json'
    };
    let currencyName = data.selectedCurrency.name.split(' ');
    let CurrencyDetails = {
      Code: data.selectedCurrency.currencyname,
      Symbol: data.selectedCurrency.symbol,
      Currency: currencyName[0],
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Currency', CurrencyDetails, httpOptions);
  }

  updateEnableDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    let currencyName = data.selectedCurrency.name.split(' ');
    let CurrencyDetails = {
      Code: data.selectedCurrency.currencyname,
      Symbol: data.selectedCurrency.symbol,
      Currency: currencyName[0],
      TaxType: data.tax,
      Value: data.taxValue
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/Currency', CurrencyDetails, httpOptions);
  }

  getProviderDetails() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/GetProviderDetails', httpOptions);
  }

  updateProviderDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      }),
      responseType: 'json' as 'text' 
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/EditPaymentDetails', data, httpOptions);
  }

  CashOptionDetails(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.post(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/CashOptionDetails', data, httpOptions);
  }
  
  changePaymentStatus(orderId: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.global.vsAccountToken
      })
    };
    return this.httpClient.get(this.global.apiURL + '/Seller/' + localStorage.getItem('BranchId') + '/ChangePaymentStatus/' + orderId, httpOptions);
  }
}
