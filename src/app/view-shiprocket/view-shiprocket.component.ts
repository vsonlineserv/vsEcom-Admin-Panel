import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ShiprocketComponent } from '../components/shiprocket/shiprocket.component';
import { Global } from '../global';
import { ShippingService } from '../service/api/shipping.service';

export interface UserDetails {
  id: number;
  email: string,
}

@Component({
  selector: 'app-view-shiprocket',
  templateUrl: './view-shiprocket.component.html',
  styleUrls: ['./view-shiprocket.component.scss']
})

export class ViewShiprocketComponent implements OnInit {

  apiUserDetails: any = [];
  dataSource: MatTableDataSource<UserDetails>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: string[] = ['Email', 'Action'];
  licenseDetailsId: any;
  spinner: boolean = false;
  noUsersFound: boolean = false;

  constructor(public global: Global, private matDialog: MatDialog, private shippingService: ShippingService) { }

  ngOnInit() {
    this.getShiprocketUser();
  }

  getShiprocketUser() {
    this.spinner = true;
    this.shippingService.getApiUser().subscribe((response: any) => {
      if (response == "User Not Found") {
        this.noUsersFound = true;
        this.spinner = false;
      }
      else {
        let userData = JSON.parse(response);
        let userList = new Array();
        userList.push(userData);
        Object.assign(this.apiUserDetails, userList);
        this.dataSource = new MatTableDataSource<UserDetails>(this.apiUserDetails);
        this.spinner = false;
      }
    }, error => {
      this.spinner = false;
    });
  }

  addShiprocketUser() {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(ShiprocketComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.getShiprocketUser();
      }
    });
  }

  updateShiprocketUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "fromUpdate";
    let dialogRef = this.matDialog.open(ShiprocketComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.getShiprocketUser();
      }
    });
  }

  goback() {
    history.back();
  }

}
