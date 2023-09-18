import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { UserService } from '../service/api/user.service';
import { GlobalService } from '../service/api/global.service';
import { Global } from '../global';
import { AccountDeletionComponent } from '../components/account-deletion/account-deletion.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MyaccountupdateComponent } from '../components/myaccountupdate/myaccountupdate.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  myAccount: FormGroup;
  myAcoountInfo: any = [];
  disabledUsername: boolean = true;
  selectedImage: any;
  imageSrc: any;
  selectImage: boolean = false;
  myAccountObj: any;
  myAccountImage: any;
  spinner: boolean;
  constructor(public matDialog: MatDialog, private userService: UserService, private globalService: GlobalService, public global: Global) {
    this.myAccount = new FormGroup({
      UserName: new FormControl(''),
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl(''),
      PhoneNumber: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
      Email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
    this.getAccountDetails();
  }

  updateMyAccount() {
    this.spinner = true;
    if (!this.myAccount.valid) {
      this.spinner = false;
      return;
    }
    const formData = new FormData();
    formData.append('Username', this.myAccount.get('UserName').value);
    formData.append('FirstName', this.myAccount.get('FirstName').value);
    formData.append('PhoneNumber', this.myAccount.get('PhoneNumber').value);
    formData.append('Email', this.myAccount.get('Email').value);
    if (this.myAccount.get('LastName').value) {
      formData.append('LastName', this.myAccount.get('LastName').value);
    }
    if (this.selectedImage) {
      const imageFile = this.selectedImage;
      let fileName = imageFile.name;
      formData.append('Imagefile', imageFile);
      formData.append('PictureName', fileName);
    }
    if (this.myAccount.get('PhoneNumber').value == this.myAcoountInfo.phoneNumber && this.myAccount.get('Email').value == this.myAcoountInfo.email) {
      this.userService.UpdateAccountDetails(formData).subscribe((response: any) => {
        this.spinner = false;
        if (response == 'Details Updated Successfully') {
          this.getMyAccountImage();
          this.globalService.displayPopupMessage('User Details is updated successfully', true);
        }
        else {
          this.globalService.displayPopupMessage(response, false);
        }
      }, error => {
        this.spinner = false;
        this.globalService.displayPopupMessage('Please retry, there seems to be a problem when updating User.', false);
      });
    }
    else {
      this.spinner = false;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "350px";
      dialogConfig.data = {
        FormDataNew: formData,
        PhoneNumber: this.myAccount.get('PhoneNumber').value,
        Email: this.myAccount.get('Email').value
      }
      let dialogRef = this.matDialog.open(MyaccountupdateComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(value => {
        if (value == true) {
          this.globalService.logout();
        }
      });
    }
  }

  getAccountDetails() {
    this.spinner = true;
    //api should bind the details with formGroup
    this.userService.GetAccountDetails().subscribe((response) => {
      this.spinner = false;
      if (response != null) {
        Object.assign(this.myAcoountInfo, response);
        this.myAccount.patchValue({
          UserName: this.myAcoountInfo.username,
          FirstName: this.myAcoountInfo.firstName,
          LastName: this.myAcoountInfo.lastName,
          PhoneNumber: this.myAcoountInfo.phoneNumber1,
          Email: this.myAcoountInfo.email
        });
        if (this.myAcoountInfo.pictureName) {
          this.selectImage = true;
          this.myAccountImage =  this.myAcoountInfo.pictureName;
        }
        else {
          this.selectImage = false;
        }
      }
      else {
        this.selectImage = false;
      }
    });
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "350px";
    let dialogRef = this.matDialog.open(ChangePasswordComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {

    });
  }

  async uploadImage(event) {
    this.selectedImage = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageSrc = event.target.result;
      if (this.imageSrc) {
        this.selectImage = true;
        this.myAccountImage = this.imageSrc;
      }
    };
    reader.readAsDataURL(this.selectedImage);
  }

  removeImage(i) {
    this.imageSrc = null;
    this.selectImage = false;
  }

  getMyAccountImage() {
    debugger
    this.userService.GetAccountDetails().subscribe((response) => {
      this.myAccountObj = {};
      Object.assign(this.myAccountObj, response);
      localStorage.setItem('currentUserInfo', JSON.stringify(response));
      if (this.myAccountObj.lastName == null || this.myAccountObj.lastName == undefined) {
        this.myAccountObj.lastName = "";
      }
      this.global.firstLastName = this.myAccountObj.firstName + ' ' + this.myAccountObj.lastName;
      if (this.myAccountObj.pictureName != null && this.myAccountObj.pictureName != "") {
        this.global.myAccountImage =  this.myAccountObj.pictureName;
      } else {
        this.global.myAccountImage = './assets/images/no-image.png';
      }

    }, error => {

    });
  }

  deleteAccount() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "450px";
    dialogConfig.panelClass = "custom-dialog-container"
    let dialogRef = this.matDialog.open(AccountDeletionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
    });
  }

  goback() {
    history.back();
  }

}
