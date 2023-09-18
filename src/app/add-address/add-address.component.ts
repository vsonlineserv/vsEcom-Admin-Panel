import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/api/user.service';
import { CommonMessageComponent } from '../components/common-message/common-message.component';
import { GlobalService } from '../service/api/global.service';
import { Router } from '@angular/router';
import { countries } from '../service/models/country-data-store';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  public countries:any = countries
  addressForm: FormGroup;
  userAddressObj: any;
  spinner: boolean;
  businessProfileObj: any;
  selected:any;
  public filteredCountries = this.countries.slice();

  constructor(private userservice: UserService, public matDialog: MatDialog, private globalService: GlobalService, private router: Router ) {
    this.addressForm = new FormGroup({
      Phonenumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      Zipcode: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('[0-9]*')]),
      City: new FormControl('', Validators.required),
      State: new FormControl('', Validators.required),
      Address1: new FormControl('', Validators.required),
      Address2: new FormControl(''),
      Country: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.getAddress();
  }

  updateAddress() {
    this.spinner = true;
    if (!this.addressForm.valid) {
      this.spinner = false;
      return;
    }
    //api to update the address
    this.userservice.updateAddress(this.addressForm.value).subscribe((response) => {
      this.spinner = false;
      this.globalService.displayPopupMessage('Address is updated successfully', true);
    }, error => {
      this.spinner = false;
      this.globalService.displayPopupMessage('Please retry, there seems to be a problem when updating address.', false);
    });
  }

  getAddress() {
    this.spinner = true;
    this.userservice.getUserAddress().subscribe((response) => {
      this.spinner = false;
      this.userAddressObj = {};
      Object.assign(this.userAddressObj, response);
      // ** form control should be later changed to this.userAddressObj.fieldName
      if (this.userAddressObj.phonenumber != null) {
        this.addressForm.patchValue({
          Phonenumber: this.userAddressObj.phonenumber,
          Zipcode: this.userAddressObj.zipcode,
          City: this.userAddressObj.city,
          State: this.userAddressObj.state,
          Address1: this.userAddressObj.address1,
          Country: this.userAddressObj.country
        });
      }
      if (this.userAddressObj.address2 != null || this.userAddressObj.address2 != undefined) {
        this.addressForm.patchValue({
          Address2: this.userAddressObj.address2
        });
      }
    }, error => {

    });
  }

  goback() {
    history.back();
  }

}
