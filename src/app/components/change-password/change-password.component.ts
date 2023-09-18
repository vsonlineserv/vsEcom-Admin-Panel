import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Global } from 'src/app/global';
import { ForgotpasswordService } from 'src/app/service/api/forgotpassword.service';
import { GlobalService } from 'src/app/service/api/global.service';
import { UserService } from 'src/app/service/api/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePassword: FormGroup;
  showVisibleIcon: boolean = false;
  showVisibleIcon1: boolean = false;
  showVisibleIcon2: boolean = false;
  

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, private forgotpasswordService: ForgotpasswordService,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private globals: Global,
    private globalService: GlobalService) {
    this.changePassword = new FormGroup({
      CurrentPassword: new FormControl('', Validators.required),
      NewPassword: new FormControl('', Validators.required),
      ConfirmPassword: new FormControl('', Validators.required),
      UserName: new FormControl(''),
      StoreReferenceId: new FormControl('')
    });
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
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
    let npw : any;
    npw = document.getElementById("newPassword2");
    if (npw.type === "password") {
      npw.type = "text";
      this.showVisibleIcon1 = true;
    } else {
      npw.type = "password";
      this.showVisibleIcon1 = false;
    }
  }
  visible3() {
    let npw : any;
    npw = document.getElementById("newPassword3");
    if (npw.type === "password") {
      npw.type = "text";
      this.showVisibleIcon2 = true;
    } else {
      npw.type = "password";
      this.showVisibleIcon2 = false;
    }
  }
  updatePassowrd() {
 
    this.forgotpasswordService.ChangePassword(this.changePassword.value).subscribe((response) => {
      if (response == true) {
        this.globalService.displayPopupMessage('Password changed successfully', true);
      }
      else {
        this.globalService.displayPopupMessage('please verify your password', false);
      }
    },
      error => {
      })
  }

}
