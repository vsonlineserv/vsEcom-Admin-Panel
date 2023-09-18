import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Global } from '../global';
import { UserService } from '../service/api/user.service';
import { GlobalService } from '../service/api/global.service';
import { TokenVSAuth } from '../service/models/account';
import { CurrentUserInfo } from '../service/models/currentuserinfo';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  flagError = false;
  databaseDropDown: any[] = [];
  applicationdetails: any;
  loader: boolean = false;
  loginPage: boolean = false;
  aboutChangeEvent: any;
  showVisibleIcon: boolean = false;
  iti: any;
  phoneValidationError: any;
  usernameEmail: boolean = false;
  usernamePhoneNo: boolean = false;
  usernamePhonenumberValue: boolean = false;
  showEmailIcon: boolean = false;
  constructor(private route: Router, private global: Global, private formBuilder: FormBuilder, private globalService: GlobalService,
    private userService: UserService, private dialogRef: MatDialog, private http: HttpClient) {
    this.dialogRef.closeAll();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    if (this.globalService.checkTokenValid()) {
      this.route.navigate(['home/dashboard'])
    }
    else {
      this.loginPage = true;
      this.loadLoginForm();
      localStorage.clear();
      this.global.loginUserToken = new TokenVSAuth;
      this.global.currentUserInfo = new CurrentUserInfo;
      this.global.vsAccountToken = null;
    }
  }

  loadLoginForm() {
    this.loginForm = this.formBuilder.group({
      Username: ['', [Validators.required, Validators.email]],
      UsernamePhone: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  showcountrycode(event) {
    let inputNum = event.currentTarget.value;
    if (inputNum.length >= 3) {
      this.showEmailIcon = false;
      let numberValue = Number(inputNum);
      if (Number.isInteger(numberValue)) {
        document.getElementById("phonenumber-input").style.display = "block";
        document.getElementById("email-input").style.display = "none";
        document.getElementById("logintelphone").focus();
        this.loginForm.patchValue({
          UsernamePhone: this.loginForm.value.Username,
          Username: ''
        });
        this.usernameEmail = false;
        this.usernamePhoneNo = true;
      }
      else {
        this.showEmailIcon = true;
      }
    }
    else {
      this.showEmailIcon = false;
    }
  }

  phoneInput(event) {
    let inputNum = event.currentTarget.value;
    if (inputNum.length >= 3) {
      let numberValue = Number(inputNum);
      if (!(Number.isInteger(numberValue))) {
        document.getElementById("phonenumber-input").style.display = "none";
        document.getElementById("email-input").style.display = "block";
        this.showEmailIcon = true;
        document.getElementById("loginemail").focus();
        this.loginForm.patchValue({
          Username: this.loginForm.value.UsernamePhone,
          UsernamePhone: ''
        });
        this.usernameEmail = true;
        this.usernamePhoneNo = false;
      }
      else {
        this.intelInputOnChange();
      }
    }

    else if (inputNum.length < 3) {
      document.getElementById("phonenumber-input").style.display = "none";
      document.getElementById("email-input").style.display = "block";
      document.getElementById("loginemail").focus();
      this.loginForm.patchValue({
        Username: this.loginForm.value.UsernamePhone,
        UsernamePhone: ''
      });
      this.usernameEmail = true;
      this.usernamePhoneNo = false;
    }
  }

  ngAfterViewInit() {
    this.getcountrycode();
    this.loadExternalScript("./assets/intelInputUtils.js").then();
  }

  getcountrycode() {
    let input = document.querySelector("#logintelphone");
    let httpForIntel = this.http;
    let intlGlobals = this.global;
    let locationBasedCountry;
    this.iti = intlTelInput(input,
      {
        initialCountry: "auto",
        preferredCountries: ['US', 'GB', 'IN', 'AE'],
        geoIpLookup: function (success, failure) {
          if (!locationBasedCountry) {
            httpForIntel.get(intlGlobals.ipLookupUrl).subscribe((response: any) => {
              localStorage.setItem('country', response.country_name)
              localStorage.setItem('pincode', response.postal)
              localStorage.setItem('state', response.region)
              localStorage.setItem('city', response.city)
              localStorage.setItem('latitude', response.latitude)
              localStorage.setItem('longitude', response.longitude)
              let countryCode = response.country_code;
              success(countryCode);
            }, error => {
              success("us");
            })
          }
        },
        separateDialCode: true
      });
  }

  async loginSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      if (this.loginForm.value.Username == '' && this.loginForm.value.UsernamePhone == '' && this.loginForm.value.Password == '') {
        this.usernameEmail = true;
        this.usernamePhoneNo = false;
        return;
      }
      else if (this.loginForm.value.UsernamePhone == '' && this.loginForm.value.Username == '') {
        this.usernameEmail = true;
        this.usernamePhoneNo = false;
        return;
      }
      else if (this.loginForm.value.Username == '' && this.loginForm.value.Password == '') {
        this.usernameEmail = false;
        this.usernamePhoneNo = true;
        return;
      }
      else if (this.loginForm.value.UsernamePhone == '' && this.loginForm.value.Password == '') {
        this.usernameEmail = true;
        this.usernamePhoneNo = false;
        return;
      }
      else if (this.loginForm.value.Username != '' && this.loginForm.value.Password != '') {
        if (!this.loginForm.controls['Password'].valid) {
          this.usernameEmail = true;
          this.usernamePhoneNo = false;
          return;
        }
      }
      else if (this.loginForm.value.UsernamePhone != '' && this.loginForm.value.Password != '') {
        if (!this.loginForm.controls['Password'].valid || !this.loginForm.controls['UsernamePhone'].valid) {
          this.usernameEmail = false;
          this.usernamePhoneNo = true;
          return;
        }
        else if (this.loginForm.controls['UsernamePhone'].valid && this.loginForm.controls['Password'].valid) {
          if (this.phoneValidationError) {
            return;
          }
          let userPhoneNum = Number(this.loginForm.value.UsernamePhone);
          if (Number.isInteger(userPhoneNum)) {
            this.loginForm.patchValue({
              Username: this.iti.getNumber()
            });
            this.usernamePhonenumberValue = true;
          }
        }
      }
    }
    this.loader = true;

    this.userService.getEcomEngineTokenUsingVSAuth(this.loginForm.value).then((response: any) => {
      let tokenObj: any = {};
      Object.assign(tokenObj, response)
      this.globalService.SetToken(tokenObj);
      this.globalService.SetEngineToken(response['accessToken']);
      this.redirectUser();
      this.loader = false;
    },
      error => {
        this.loader = false;
        this.globalService.displayPopupMessage(error.error, false);
        return;
      });
  }

  redirectUser() {
    this.route.navigate(['/home']);
  }

  focusIn(event: any) {
    const allDivs = document.getElementsByClassName('input-active');
    this.flagError = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < allDivs.length; i++) {
      allDivs[i].classList.remove('input-group-active');
    }
    const active = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.className;
    event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('input-group-active');
  }

  focusOut() {
    const allDivs = document.getElementsByClassName('input-active');
    this.flagError = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < allDivs.length; i++) {
      allDivs[i].classList.remove('input-group-active');
    }
  }

  visible() {
    let npw: any;
    npw = document.getElementById("newPassword");
    if (npw.type === "password") {
      npw.type = "text";
      this.showVisibleIcon = true;
    } else {
      npw.type = "password";
      this.showVisibleIcon = false;
    }
  }

  focusInphone(event: any) {
    const allDivs = document.getElementsByClassName('input-active');
    this.flagError = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < allDivs.length; i++) {
      allDivs[i].classList.remove('input-group-active');
    }
    event.currentTarget.parentElement.parentElement.parentElement.classList.add('input-group-active');
  }

  private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
    })
  }

  intelInputOnChange() {
    this.phoneValidationError = false;
    let isValid = this.iti.isValidNumber();
    let errorEnum = this.iti.getValidationError();
    if (!isValid) {
      //errorEnum 2-short, 3-long, 0-possible // we know this from util
      if (errorEnum == 2) {
        this.phoneValidationError = "Entered Number is too short";
      }
      else if (errorEnum == 3) {
        this.phoneValidationError = "Entered number is too long";
      }
      else {
        this.phoneValidationError = "Invalid number";
      }
    }
  }
}
