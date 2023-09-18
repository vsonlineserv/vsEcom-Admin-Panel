import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { UserService } from 'src/app/service/api/user.service';

@Component({
  selector: 'app-myaccountupdate',
  templateUrl: './myaccountupdate.component.html',
  styleUrls: ['./myaccountupdate.component.scss']
})
export class MyaccountupdateComponent implements OnInit {

  oldMail: any;
  newMail: any;
  oldPhoneNumber: any;
  newPhoneNumber: any;
  myAcoountInfo: any = [];
  emailShow: boolean;
  phoneNumberShow: boolean;


  constructor(public dialogRef: MatDialogRef<MyaccountupdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private globalService: GlobalService) { 

    }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.getAccountDetails();
    this.data
  }

  getAccountDetails() {
    this.userService.GetAccountDetails().subscribe((response) => {
      if (response != null) {
        Object.assign(this.myAcoountInfo, response);
        this.oldMail = this.myAcoountInfo.email;
        this.oldPhoneNumber = this.myAcoountInfo.phoneNumber;
        this.newMail =  this.data.Email;
        this.newPhoneNumber =  this.data.PhoneNumber;
        if(this.oldMail != this.newMail){
          this.emailShow = true;
        }
        if(this.oldPhoneNumber != this.newPhoneNumber){
          this.phoneNumberShow = true;
        }
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  update() {
    this.userService.UpdateAccountDetails(this.data.FormDataNew).subscribe((response) => {
      if (response == 'Details Updated Successfully') {
        this.globalService.displayPopupMessage('User Details is updated successfully', true);
        this.dialogRef.close(true);
      }
      else {
        this.globalService.displayPopupMessage(response, false);
      }
    }, error => {
      this.globalService.displayPopupMessage('Please retry, there seems to be a problem when updating User.', false);
    });
  }

}
