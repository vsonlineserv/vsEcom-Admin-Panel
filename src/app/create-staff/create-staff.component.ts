import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../service/api/global.service';
import { UserService } from '../service/api/user.service';
import { Global } from '../global';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StaffExistComponent } from '../components/staff-exist/staff-exist.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.scss']
})
export class CreateStaffComponent implements OnInit {

  @ViewChild('f', { static: false }) myNgForm;
  spinner: boolean = false;
  staffForm: FormGroup;
  permissionList: any = [];
  general: any = {
    name: 'GENERAL',
    permissions: []
  };
  category: any = {
    name: 'CATEGORY',
    permissions: []
  };
  products: any = {
    name: 'PRODUCT',
    permissions: []
  };
  orders: any = {
    name: 'ORDERS',
    permissions: []
  };
  inventory: any = {
    name: 'INVENTORY',
    permissions: []
  };
  discount: any = {
    name: 'DISCOUNT',
    permissions: []
  };
  enquiry: any = {
    name: 'ENQUIRY',
    permissions: []
  };
  payments: any = {
    name: 'PAYMENTS',
    permissions: []
  };
  shipping: any = {
    name: 'SHIPPING ',
    permissions: []
  };
  allComplete: boolean = false;
  submitted: boolean = false;

  constructor(private globalService: GlobalService, private global: Global, private userService: UserService, private matDialog: MatDialog, private router: Router) {
    this.staffForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      ConfirmPassword: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required]),
      PermissionList: new FormControl([]),
      ExistingAuthId: new FormControl(''),
    });
  }

  ngOnInit() {
    this.getPermissionsList();
  }

  getPermissionsList() {
    this.spinner = true;
    this.userService.GetPermissionsList().subscribe((response: any) => {
      Object.assign(this.permissionList, response);
      for (let i = 0; i < this.permissionList.length; i++) {
        if (this.permissionList[i].permission.includes('Category')) {
          this.category.permissions.push(this.permissionList[i]);
        }
        else if (this.permissionList[i].permission.includes('Product')) {
          this.products.permissions.push(this.permissionList[i]);
        }
        else if (this.permissionList[i].permission.includes('Orders')) {
          this.orders.permissions.push(this.permissionList[i]);
        }
        else if (this.permissionList[i].permission.includes('Inventory')) {
          this.inventory.permissions.push(this.permissionList[i]);
        }
        else if (this.permissionList[i].permission.includes('Discount')) {
          this.discount.permissions.push(this.permissionList[i]);
        }
        else if (this.permissionList[i].permission.includes('Enquiries')) {
          this.enquiry.permissions.push(this.permissionList[i]);
        }
        else if (this.permissionList[i].permission.includes('Payment')) {
          this.payments.permissions.push(this.permissionList[i]);
        }
        else if (this.permissionList[i].permission.includes('Shipping')) {
          this.shipping.permissions.push(this.permissionList[i]);
        }
        else if (this.permissionList[i].permission.includes('General')) {
          this.general.permissions.push(this.permissionList[i]);
        }
        this.spinner = false;
      }
    }, error => {
      this.spinner = false;
    })
  }

  checkEmailExist() {
    this.spinner = true;
    this.submitted = true;
    if (!this.staffForm.valid) {
      this.spinner = false;
      this.submitted = false;
      return;
    }
    if (this.staffForm.value.Password !== this.staffForm.value.ConfirmPassword) { 
      this.spinner = false;
      this.submitted = false;
      this.globalService.displayPopupMessage('Password and Confirm Password does not match', false)
      return;
    }
    this.userService.CheckEmailExists(this.staffForm.value).subscribe((response) => {
      if (response == 'false') {
        this.createStaffAccount();
      }
      else {
        if (response != null) {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.width = "450px";
          dialogConfig.height = "fit-content";
          let dialogRef = this.matDialog.open(StaffExistComponent, dialogConfig);
          dialogRef.afterClosed().subscribe(value => {
            if (value) {
              this.staffForm.patchValue({
                ExistingAuthId: response.toString(),
              });
              this.createStaffAccount();
            }
            else {
              this.spinner = false;
              this.submitted = false;
              this.globalService.displayPopupMessage('Please add a staff account with different credentials', false)
            }
          });
        }
        else {
          this.createStaffAccount();
        }
      }
    }, error => {
      this.spinner = false;
      this.submitted = false;
      this.globalService.displayPopupMessage('Please retry, there seems to be a problem when adding Staff Account.', false);
    });

  }

  createStaffAccount() {
    this.userService.registerStaff(this.staffForm.value).subscribe((response) => {
      this.spinner = false;
      this.globalService.displayPopupMessage(response, true);
      this.router.navigate(['/home/staff-registration']);
    }, error => {
      this.spinner = false;
      this.submitted = false;
      this.globalService.displayPopupMessage('Please retry, there seems to be a problem when adding Staff Account.', false);
    });
  }


  checkedEvent(id: any) {
    this.staffForm.value.PermissionList.push(id);
  }

  goback() {
    history.back();
  }
}
