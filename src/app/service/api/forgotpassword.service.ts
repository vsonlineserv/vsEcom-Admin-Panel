import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from 'src/app/global';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private httpClient: HttpClient, private Globals: Global) { }

  sendVerificationEmail(username) {
    const httpOptions = {
      responseType: 'text' as 'json'
    }
    return this.httpClient.get(this.Globals.apiURL + '/ForgotPassword/'+ username, httpOptions);
  }

  ChangePassword(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': "Bearer " + this.Globals.vsAccountToken
      })
    }
    return this.httpClient.post(this.Globals.apiURL + '/ChangePasswordMerchant', data, httpOptions);
  }

  resetPassword(data) {
    return this.httpClient.post(this.Globals.apiURL + '/ResetPassword', data);
  }

}
