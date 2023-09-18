import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/service/api/global.service';
import { ProductService } from 'src/app/service/api/product.service';
import { UserService } from 'src/app/service/api/user.service';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.scss']
})
export class DeleteCustomerComponent implements OnInit {

  UserId: any;

  constructor(public dialogRef: MatDialogRef<DeleteCustomerComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private globalService: GlobalService) { }

  ngOnInit() {
    this.UserId = this.data.UserId
  }

  close() {
    this.dialogRef.close(false);
  }

  deleteCustomer() {
    this.userService.DeleteCustomerById(this.UserId).subscribe(response => {
      this.globalService.displayPopupMessage('Customer Deleted Successfully', true);
      this.dialogRef.close(true);
    }, error => {
      this.globalService.displayPopupMessage('Error Deleting Customer', false);
    });
  }
}
