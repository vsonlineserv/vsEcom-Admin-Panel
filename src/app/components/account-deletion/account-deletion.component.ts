import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { UserService } from 'src/app/service/api/user.service';

@Component({
  selector: 'app-account-deletion',
  templateUrl: './account-deletion.component.html',
  styleUrls: ['./account-deletion.component.scss']
})
export class AccountDeletionComponent implements OnInit {

  showDelete: boolean = false;
  keyword: any;

  constructor(public dialogRef: MatDialogRef<AccountDeletionComponent>, private userService: UserService, private globalService: GlobalService) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  onInputChange(event: any) {
    if (event.target.value == 'DELETE') {
      this.showDelete = true;
    }
    else {
      this.showDelete = false;
    }
  }

  deleteAccount() {
    this.userService.deleteAccount(this.keyword).subscribe(response => {
      this.dialogRef.close();
      this.globalService.logout();
    }, error => {
      this.globalService.displayPopupMessage('Error while deleting account, Please try again later', false);
    })
  }

}
