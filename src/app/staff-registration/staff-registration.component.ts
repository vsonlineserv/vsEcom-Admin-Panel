import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Global } from '../global';
import { GlobalService } from '../service/api/global.service';
import { UserService } from '../service/api/user.service';

export interface StaffDetails {
  id: number;
  staffIdentifier: string;
  licenseId: string;
  role: string;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  isDeleted: boolean;
}

@Component({
  selector: 'app-staff-registration',
  templateUrl: './staff-registration.component.html',
  styleUrls: ['./staff-registration.component.scss']
})
export class StaffRegistrationComponent implements OnInit {

  staffAccountList: any = [];
  dataSource: MatTableDataSource<StaffDetails>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['Name', 'Email', 'PhoneNumber', 'Action'];
  licenseDetailsId: any;
  spinner: boolean = false;

  constructor(public matDialog: MatDialog, private userService: UserService, private globalService: GlobalService, public global: Global, private router: Router) {
  }

  ngOnInit() {
    this.getAllStaffAccount();
  }

  openAddStaffAccount() {
    this.router.navigate(['home/create-staff'])
  }

  getAllStaffAccount() {
    this.spinner = true;
    this.userService.getAllStaffAccount().subscribe((response) => {
      this.staffAccountList = [];
      Object.assign(this.staffAccountList, response);
      this.dataSource = new MatTableDataSource<StaffDetails>(this.staffAccountList);
      this.spinner = false;
    }, error => {
      this.spinner = false;
    });
  }

  goback() {
    history.back();
  }

  deleteStaffAccount(staffIdentifier) {
    this.spinner = true;
    this.userService.deleteStaffAccount(staffIdentifier).subscribe((response) => {
      this.getAllStaffAccount();
      this.globalService.displayPopupMessage('Staff Account Deleted Successfully', true);
    }, error => {
      this.spinner = false;
      this.globalService.displayPopupMessage('Please retry, there seems to be a problem when deleting Staff Account.', false);
    });
  }

}
