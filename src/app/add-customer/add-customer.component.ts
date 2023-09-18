import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/api/product.service';
import { StoreService } from '../service/api/store.service';
import { GlobalService } from 'src/app/service/api/global.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { UserService } from '../service/api/user.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customerForm: FormGroup;
  dialogRef: any;
  UserIdEdit: any;
  showUpdate: boolean;
  updateCustomerObj: any;
  customerDetails: any = [];
  updateDetails: any;
  showVisibleIcon: boolean = false;

  constructor(private userService: UserService, public globalService: GlobalService, public matDialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.customerForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      LastName: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required]),
      ConfirmPassword: new FormControl('', [Validators.required]),
      PhoneNumber1: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)])
    })
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.UserIdEdit = this.router.getCurrentNavigation().extras.state['UserId'];
      }
    });
  }

  ngOnInit() {
    if (this.UserIdEdit > 0) {
      this.GetMyCustomerDetails(this.UserIdEdit);
      this.showUpdate = true;
    }
  }

  addcustomer() {
    if (!this.customerForm.valid) {
      return;
    }
    let data = {
      "FirstName": this.customerForm.get('FirstName').value,
      "LastName": this.customerForm.get('LastName').value,
      "Email": this.customerForm.get('Email').value,
      "Password": this.customerForm.get('Password').value,
      "PhoneNumber1": this.customerForm.get('PhoneNumber1').value,
      "StoreId": localStorage.getItem('StoreId')
    }
    this.userService.AddCustomer(data).subscribe((response) => {
      Object.assign(this.customerDetails, response);
      if (this.customerDetails.statusString == "AlreadyExist") {
        this.globalService.displayPopupMessage('Customer already exits', true);

      }
      else {
        this.globalService.displayPopupMessage('Customer added  successfully', true);
      }
    }, error => {
      this.globalService.displayPopupMessage(error['error'], false);
    });
  }

  UpdateCustomerById() {
    if (!this.customerForm.valid) {
      return;
    }
    let data = {
      "UserId": this.updateCustomerObj.userId,
      "FirstName": this.customerForm.get('FirstName').value,
      "LastName": this.customerForm.get('LastName').value,
      "Email": this.customerForm.get('Email').value,
      "PhoneNumber1": this.customerForm.get('PhoneNumber1').value,
      "StoreId": localStorage.getItem('StoreId')
    }
    this.userService.UpdateCustomerById(data).subscribe((response) => {
      Object.assign(this.updateDetails, response);
      if (this.updateDetails.statusString == 'Success') {
        this.globalService.displayPopupMessage('Customer Updated Successfully', true);
        this.router.navigate(['/home/customer']);
      }
      else {
        this.globalService.displayPopupMessage('Customer Already Exist', true);
      }
    }, error => {
      this.globalService.displayPopupMessage(error['error'], false);
    })
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

  GetMyCustomerDetails(UserIdEdit) {
    this.userService.GetMyCustomerDetails(UserIdEdit).subscribe((response) => {
      this.updateCustomerObj = {};
      Object.assign(this.updateCustomerObj, response);
      this.customerForm.patchValue({
        FirstName: this.updateCustomerObj.firstName,
        LastName: this.updateCustomerObj.lastName,
        Email: this.updateCustomerObj.email,
        PhoneNumber1: this.updateCustomerObj.phoneNumber1
      })
    })
  }

  goback() {
    history.back()
  }

}

