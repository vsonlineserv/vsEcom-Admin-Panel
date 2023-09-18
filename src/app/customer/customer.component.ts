import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { DeleteCustomerComponent } from '../components/delete-customer/delete-customer.component';
import { UserService } from '../service/api/user.service';

export interface AllCustomerDetails {
  Name: string;
  Email: string;
  PhoneNumber: string;
  Action: string
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {
  
  displayedColumns: string[] = ['Name', 'Email', 'PhoneNumber', 'Action'];
  dataSource: MatTableDataSource<AllCustomerDetails>;
  allCustomerDetails: any = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  pageNumber: any;
  totalPages: number;
  searchCustomerName: string = '';
  customerList: any = [];
  productStatus: string = 'all';

  constructor(public matDialog: MatDialog, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCustomerDetails();
  }

  getAllCustomerDetails() {
    this.userService.GetAllCustomerDetails().subscribe((response) => {
      this.allCustomerDetails = [];
      Object.assign(this.allCustomerDetails, response);
      this.dataSource = new MatTableDataSource<AllCustomerDetails>(this.allCustomerDetails);
      this.dataSource.paginator = this.paginator;
    })
  }

  getPageNumber(event) {
    this.pageNumber = event.pageIndex + 1;
    this.totalPages = Math.ceil(this.paginator.length / this.paginator.pageSize);
  }

  editCustomer(id) {
    let navigationExtras: NavigationExtras = {
      state: {
        UserId: id
      }
    };
    this.router.navigate(['/home/add-customer'], navigationExtras);
  }

  deleteCustomer(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      UserId: id
    };
    let dialogRef = this.matDialog.open(DeleteCustomerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.getAllCustomerDetails();
      }
    });
  }
  
  searchCustomer(event) {
    if (event && event.target) {
      this.searchCustomerName = event.target.value;
    }
    else {
      this.searchCustomerName = event;
    }
    this.userService.SearchCustomer(this.searchCustomerName).subscribe((response) => {
      this.allCustomerDetails = []
      let searchedCustomerList: any = [];
      Object.assign(searchedCustomerList, response);
      for (var i = 0; i < searchedCustomerList.length; i++) {
        let searchedCustomer: any = {};
        searchedCustomer.firstName = searchedCustomerList[i].firstName
        searchedCustomer.lastName = searchedCustomerList[i].lastName
        searchedCustomer.email = searchedCustomerList[i].email
        searchedCustomer.phoneNumber1 = searchedCustomerList[i].phoneNumber1
        this.allCustomerDetails.push(searchedCustomer)
      }
      this.dataSource = new MatTableDataSource<AllCustomerDetails>(this.allCustomerDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  goback() {
    history.back();
  }

}
