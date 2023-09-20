import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ForgotpasswordService } from '../service/api/forgotpassword.service';
import { GlobalService } from '../service/api/global.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  submitted = false;
  flagError = false;
  databaseDropDown: any[] = [];
  applicationdetails: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private forgotpasswordService: ForgotpasswordService,
    private globalService: GlobalService,) { }

  ngOnInit() {
    this.loadLoginForm();
    localStorage.clear();
  }

  loadLoginForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      userEmail: ['', [Validators.required]],
    });
  }

  Continue() {
    this.submitted = true;
    if (!this.forgotPasswordForm.valid) {
      this.submitted = false;
      return;
    }
    this.forgotpasswordService.sendVerificationEmail(this.forgotPasswordForm.value.userEmail)
      .subscribe((response) => {
        this.globalService.displayPopupMessage('OTP sent successfully' , true);
        let navigationExtras: NavigationExtras = {
          state: {
            email: this.forgotPasswordForm.value.userEmail
          }
        };
        this.router.navigate(['/reset-password'], navigationExtras);
        this.submitted = false;
      },
      error => {
        this.submitted = false;
      });
  }

  focusIn(event: any) {
    const allDivs = document.getElementsByClassName('input-active');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < allDivs.length; i++) {
     allDivs[i].classList.remove('input-group-active');
    }
    const active = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.className;
    event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('input-group-active');
  }

  focusOut() {
    const allDivs = document.getElementsByClassName('input-active');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < allDivs.length; i++) {
     allDivs[i].classList.remove('input-group-active');
    }
  }

}
