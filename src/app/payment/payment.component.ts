import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../service/api/payment.service';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../service/api/global.service';
import { Global } from '../global';
import { MatSelect } from '@angular/material/select';
import { Currency, Currencies } from '../service/models/currency';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  //**Currency Filter functions Start */
  protected currencyList: Currency[] = Currencies;
  // public selectedCurrency: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  public filteredCurrency: ReplaySubject<Currency[]> = new ReplaySubject<Currency[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();
  filteredSearch: any;
  percentage: any = [];
  //**Currency Filter functions End */
  providersObj: any;
  paymentForm: FormGroup;
  paymentResponseObj: any;
  paymentSubmitted= false;
  currencySubmitted = false;
  payPalForm: FormGroup;
  payPalSubmitted= false;
  appleForm: FormGroup;
  appleSubmitted= false;
  googleForm: FormGroup;
  googleSubmitted = false;
  razorForm: FormGroup;
  razorSubmitted = false;
  otherForm: FormGroup;
  otherSubmitted = false;
  loader: boolean = false;
  isDisabled: boolean = true;
  icon: boolean;
  cashOptions: FormGroup;
  cashoptionSubmitted = false;
  currencyForm: FormGroup;

  constructor(private paymentService: PaymentService, private globalService: GlobalService, private global: Global) { }

  ngOnDestroy(): void {
    this.setInitialValue();
  }
  ngAfterViewInit(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit() {
    this.globalService.GetEngineToken();
    //**Currency Filter functions Start */
    // this.percentage = [{ name: "Percentage", value: "percentage" }, { name: "Flat", value: "flat" }];
    this.percentage = [{ name: "Percentage", value: "percentage" }];
    //this.selectedCurrency.setValue(this.currencyList);

    this.filteredCurrency.next(this.currencyList.slice());
    //**Currency Filter functions End */
    this.currencyForm = new FormGroup({
      selectedCurrency: new FormControl('', Validators.required)
    });
    this.paymentForm = new FormGroup({
      tax: new FormControl('',[Validators.required]  ),
      taxValue: new FormControl('',Validators.required)
    });
    this.payPalForm = new FormGroup({
      PayPalSecretKey: new FormControl('', Validators.required),
      PayPalSecretId: new FormControl('', Validators.required),
      PayPalFlagEnabled: new FormControl(false)
    });
    this.appleForm = new FormGroup({
      AppleSecretKey: new FormControl('', Validators.required),
      AppleSecretId: new FormControl('', Validators.required),
      AppleFlagEnabled: new FormControl('')
    });
    this.googleForm = new FormGroup({
      GoogleSecretKey: new FormControl('', Validators.required),
      GoogleSecretId: new FormControl('', Validators.required),
      GoogleFlagEnabled: new FormControl('')
    });
    this.razorForm = new FormGroup({
      RazorSecretKey: new FormControl('', Validators.required),
      RazorSecretId: new FormControl('', Validators.required),
      RazorFlagEnabled: new FormControl(false)
    });
    this.otherForm = new FormGroup({
      Provider: new FormControl('', Validators.required),
      OtherSecretKey: new FormControl('', Validators.required),
      OtherSecretId: new FormControl('', Validators.required),
      OtherFlagEnabled: new FormControl(false)
    });
    this.cashOptions = new FormGroup({
      CashOnDeliveryEnabled: new FormControl(''),
      CardOnDeliveryEnbled: new FormControl(''),
      PayUEnabled: new FormControl('')
    });
    this.getProviderDetails();
    this.getPaymentDetails();

  }

  //**Currency Filter functions Start */
  protected setInitialValue() {
    this.filteredCurrency
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Currency, b: Currency) => a && b && a.currencyname === b.currencyname;
      });
  }

  filterMyOptions(search) {
    this.filterCurrency(search);
  }

  protected filterCurrency(text) {
    if (!this.currencyList) {
      return;
    }
    // get the search keyword
    let search = text;
    if (!search) {
      this.filteredCurrency.next(this.currencyList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredCurrency.next(
      this.currencyList.filter(bank => bank.name.toLowerCase().indexOf(search) > -1 || bank.currencyname.toLowerCase().indexOf(search) > -1)
    );
  }
  //**Currency Filter functions End */

  /**Payment Details  Functions Start */
  getPaymentDetails() {
    this.loader = true;
    this.paymentService.getPaymentDetails().subscribe((response) => {
      if (response != null) {
        this.loader = false;
        this.paymentResponseObj = {};
        Object.assign(this.paymentResponseObj, response);
        this.paymentForm.patchValue({
          tax: this.paymentResponseObj.taxType,
          taxValue: this.paymentResponseObj.value
        });
        let index = this.currencyList.findIndex(a => a.currencyname == this.paymentResponseObj.currency);
        this.currencyForm.get('selectedCurrency').setValue(this.currencyList[index]);
      }
    },
      error => {
        //alert('Error getting paymentDetails');
      });
  }

  onBlur(event: any) {
    let value = event.target.value;
    console.log('Initial value:', value);
    if (value.endsWith('.')) {
      value += '0';
      console.log('Modified value:', value);
      event.target.value = value;
      this.paymentForm.value.tax=event.target.value;
      console.log(this.paymentForm.value.tax)
    }
  }

  updatePaymentDetails() {
    this.paymentSubmitted = true;
    if(!this.paymentForm.valid||this.paymentForm.value.tax==='') {
      return;
    }
    this.paymentService.updatePaymentDetails(this.paymentForm.value).subscribe((response) => {
      this.getPaymentDetails();
      this.globalService.displayPopupMessage('Currency Details Updated Successfully', true);
    },
    error => {
      this.globalService.displayPopupMessage('Error updating Tax Details', false);
    });
  }


  updateCurrencyDetails() {
    this.currencySubmitted = true;
    if(!this.currencyForm.valid) {
      return;
    }
    this.currencyForm.patchValue({
      selectedCurrency: this.currencyForm.get('selectedCurrency').value, 
    });
    this.paymentService.updateCurrencyDetails(this.currencyForm.value).subscribe((response) => {
      this.getPaymentDetails();
      this.globalService.displayPopupMessage('Currency Details Updated Successfully', true);
    },
    error => {
      this.globalService.displayPopupMessage("Currency can't be changed once an order is placed", false);
    });
  }

  // try

  ///////////
  /**Payment Details  Functions End */

  /**PROVIDERS Details  Functions Start */
  getProviderDetails() {
    this.loader = true;
    this.paymentService.getProviderDetails().subscribe((response) => {
      this.providersObj = {};
      this.loader = false;
      Object.assign(this.providersObj, response);
      if(this.providersObj.payPalSecretKey != null) {
        this.payPalForm.setValue({
          PayPalSecretKey: this.providersObj.payPalSecretKey,
          PayPalSecretId: this.providersObj.payPalSecretId,
          PayPalFlagEnabled: this.providersObj.payPalFlagEnabled
        });
      }
      if(this.providersObj.appleSecretKey != null) {
        this.appleForm.setValue({
          AppleSecretKey: this.providersObj.appleSecretKey,
          AppleSecretId: this.providersObj.appleSecretId,
          AppleFlagEnabled: this.providersObj.appleFlagEnabled
        });
      }
      if(this.providersObj.googleSecretKey != null) {
        this.googleForm.setValue({
          GoogleSecretKey: this.providersObj.googleSecretKey,
          GoogleSecretId: this.providersObj.googleSecretId,
          GoogleFlagEnabled: this.providersObj.googleFlagEnabled
        });
      }
      if(this.providersObj.razorSecretKey != null) {
        this.razorForm.setValue({
          RazorSecretKey: this.providersObj.razorSecretKey,
          RazorSecretId: this.providersObj.razorSecretId,
          RazorFlagEnabled: this.providersObj.razorFlagEnabled
        });
      }
      if(this.providersObj.otherSecretId != null) {
        this.otherForm.setValue({
          Provider: this.providersObj.provider,
          OtherSecretKey: this.providersObj.otherSecretKey,
          OtherSecretId: this.providersObj.otherSecretId,
          OtherFlagEnabled: this.providersObj.otherFlagEnabled
        });
      }
      this.cashOptions.setValue({
        CashOnDeliveryEnabled: this.providersObj.cashOnDeliveryEnabled,
        CardOnDeliveryEnbled: this.providersObj.cardOnDeliveryEnbled,
        PayUEnabled: this.providersObj.payUEnabled
      });
    },
    error => {

    });
  }
  updatePayPalDetails() {
    this.payPalSubmitted = true;
    if(!this.payPalForm.valid) {
      return;
    }
    this.paymentService.updateProviderDetails(this.payPalForm.value).subscribe((response) => {
       // this.getProviderDetails();
      this.getandUpdateDetails();
      this.globalService.displayPopupMessage('PayPal Details Updated Successfully', true);
    },
    error => {
      this.globalService.displayPopupMessage(error.error,false);
    });
  }

  updateAppleDetails() {
     
    this.appleSubmitted = true;
    if(!this.appleForm.valid) {
      return;
    }
    this.paymentService.updateProviderDetails(this.appleForm.value).subscribe((response) => {
      this.getProviderDetails();
      this.globalService.displayPopupMessage('Apple Details Updated Successfully', true);
    },
    error => {
      this.globalService.displayPopupMessage('Error updating Apple Details', false);
    });
  }

  updateGoogleDetails() {
    this.googleSubmitted = true;
    if(!this.googleForm.valid) {
      return;
    }
    this.paymentService.updateProviderDetails(this.googleForm.value).subscribe((response) => {
      this.getProviderDetails();
      this.globalService.displayPopupMessage('Google Details Updated Successfully', true);
    },
    error => {
      this.globalService.displayPopupMessage('Error updating Google Details', false);
    });
  }

  updateRazorDetails() {
    this.razorSubmitted = true;
    if(!this.razorForm.valid) {
      return;
    }
    this.paymentService.updateProviderDetails(this.razorForm.value).subscribe((response) => {
      // this.getProviderDetails();
      this.getandUpdateDetails();
      this.globalService.displayPopupMessage('Razor Details Updated Successfully', true);
    },
    error => {
      this.globalService.displayPopupMessage(error.error, false);
    });
  }

  updateOtherDetails() {
    this.otherSubmitted = true;
    if(!this.otherForm.valid) {
      return;
    }
    this.paymentService.updateProviderDetails(this.otherForm.value).subscribe((response) => {
      this.getProviderDetails();
      this.globalService.displayPopupMessage('Provider Details Updated Successfully', true);
    },
    error => {
      this.globalService.displayPopupMessage('Error updating Provider Details', false);
    });
  }
  updateCashOptionDetails() {
    this.cashoptionSubmitted = true;
    this.paymentService.CashOptionDetails(this.cashOptions.value).subscribe((response) => {
      this.getProviderDetails();
      this.globalService.displayPopupMessage('Details Updated Successfully', true);
    },
    error => {
      this.globalService.displayPopupMessage('Error updating Details', false);
    });
  }

  click() {
    this.icon = !this.icon;
  }
  getandUpdateDetails(){
    this.paymentService.getProviderDetails().subscribe((response) => {
      this.providersObj = {};
      this.loader = false;
      Object.assign(this.providersObj, response);
      if(this.providersObj.payPalSecretKey != null) {
        this.payPalForm.setValue({
          PayPalSecretKey: this.providersObj.payPalSecretKey,
          PayPalSecretId: this.providersObj.payPalSecretId,
          PayPalFlagEnabled: this.providersObj.payPalFlagEnabled
        });
      }
      if(this.providersObj.appleSecretKey != null) {
        this.appleForm.setValue({
          AppleSecretKey: this.providersObj.appleSecretKey,
          AppleSecretId: this.providersObj.appleSecretId,
          AppleFlagEnabled: this.providersObj.appleFlagEnabled
        });
      }
      if(this.providersObj.googleSecretKey != null) {
        this.googleForm.setValue({
          GoogleSecretKey: this.providersObj.googleSecretKey,
          GoogleSecretId: this.providersObj.googleSecretId,
          GoogleFlagEnabled: this.providersObj.googleFlagEnabled
        });
      }
      if(this.providersObj.razorSecretKey != null) {
        this.razorForm.setValue({
          RazorSecretKey: this.providersObj.razorSecretKey,
          RazorSecretId: this.providersObj.razorSecretId,
          RazorFlagEnabled: this.providersObj.razorFlagEnabled
        });
      }
      if(this.providersObj.otherSecretId != null) {
        this.otherForm.setValue({
          Provider: this.providersObj.provider,
          OtherSecretKey: this.providersObj.otherSecretKey,
          OtherSecretId: this.providersObj.otherSecretId,
          OtherFlagEnabled: this.providersObj.otherFlagEnabled
        });
      }
      this.cashOptions.setValue({
        CashOnDeliveryEnabled: this.providersObj.cashOnDeliveryEnabled,
        CardOnDeliveryEnbled: this.providersObj.cardOnDeliveryEnbled,
        PayUEnabled: this.providersObj.payUEnabled
      });
    
    },
    error => {
      // this.globalService.displayPopupMessage('Error updating PayPal Details', false);
     });
  }
  goback() {
    history.back();
  }

}
