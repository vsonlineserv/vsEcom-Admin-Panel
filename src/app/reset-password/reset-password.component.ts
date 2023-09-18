import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotpasswordService } from '../service/api/forgotpassword.service';
import { Global } from '../global';
import { GlobalService } from '../service/api/global.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  code: any;
  email: any;
  resetPasswordForm: FormGroup;
  submitted = false;
  flagError = false;
  databaseDropDown: any[] = [];
  applicationdetails: any;
  showVisibleIcon: boolean = false;
  showVisibleIcon2: boolean = false;
  constructor(private formBuilder: FormBuilder, private Globals: Global, private forgotpasswordService: ForgotpasswordService,
    private route: ActivatedRoute, private router: Router,private globalService: GlobalService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.email = this.router.getCurrentNavigation().extras.state['email'];
      }
      this.code = params['code'];
      if(!this.email){
        this.email = params['email']
      }
    });
   }

  ngOnInit() {
    this.loadForm();
    localStorage.clear();
  }

  loadForm() {
    this.resetPasswordForm = this.formBuilder.group({
      ResetCode: ['', Validators.required],
      NewPassword: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.resetPasswordForm.patchValue({
      ResetCode: this.code
    });
  }

  resetPassword() {

    this.submitted = true;
    if (!this.resetPasswordForm.valid) {
      return;
    }
    const formData = new FormData();
    formData.append('username', this.email);
    formData.append('newPassword', this.resetPasswordForm.value.NewPassword);
    formData.append('passwordResetToken', this.resetPasswordForm.value.ResetCode);
    this.forgotpasswordService.resetPassword(formData).subscribe((response) => {
      if(response == true){
        this.globalService.displayPopupMessage('Password is changed successfully', true);
        this.router.navigate(['/login']);
      }
      else{
        this.globalService.displayPopupMessage('please verify your password reset code', false);
      }
    },
    error => {

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

  visible() {
    let npw : any;
    npw = document.getElementById("newPassword");
    if (npw.type === "password") {
      npw.type = "text";
      this.showVisibleIcon = true;
    } else {
      npw.type = "password";
      this.showVisibleIcon = false;
    }
  }

  visible2() {
    let cpw : any;
    cpw = document.getElementById("confirmPassword");
    if (cpw.type === "password") {
      cpw.type = "text";
      this.showVisibleIcon2 = true;
    } else {
      cpw.type = "password";
      this.showVisibleIcon2 = false;
    }
  }
}

