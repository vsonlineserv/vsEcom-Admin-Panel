import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../global';
import { PaymentService } from '../service/api/payment.service';
import { SalesService } from '../service/api/sales.service';
import { UserService } from '../service/api/user.service';
import { GlobalService } from '../service/api/global.service';

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.scss']
})
export class PrintOrderComponent implements OnInit {
  orderId: any;
  printorderDetails: any = [];
  address: any;
  taxDetails: any;
  constructor(private route: ActivatedRoute, private router: Router, private salesService: SalesService,
    private global: Global, private globalService: GlobalService, private userservice: UserService, private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.globalService.GetEngineToken();
    this.globalService.GetToken();

    //this.global.apiURL = 'http://' + localStorage.getItem('siteName') + '.vsecommerce.com/'+ localStorage.getItem('siteName') + 'api/api';
    this.global.vsLoginToken = this.global.loginUserToken.token; //accountToken
    this.global.userName = localStorage.getItem('vsonlineuserName');
    this.global.vsAccountToken = localStorage.getItem('engineToken'); //engineToken
    if (document.URL.indexOf("?") > 0) {
      let splitURL = document.URL.split("?");
      let splitParams = splitURL[1].split("&");
      let singleURLParam = splitParams[0].split('=');
      if (singleURLParam[0] == "id") {
        this.orderId = singleURLParam[1];
      }
    }
    this.salesService.printOrderDetails(this.orderId).subscribe((reponse) => {
      Object.assign(this.printorderDetails, reponse);
    },
      error => {
      });
    this.getAddress();
    this.getPaymentDetails();
  }

  getAddress() {
    this.userservice.getUserAddress().subscribe((response) => {
      this.address = {};
      Object.assign(this.address, response);
      if (response != null && response != '' && response != undefined) {
        Object.assign(this.address, response);
      }
    }, error => {

    });
  }

  printOrder() {
    document.getElementById('printBtn').style.display = 'none';
    window.print();
    document.getElementById('printBtn').style.display = 'block';
  }

  getPaymentDetails() {
    this.paymentService.getPaymentDetails().subscribe((response) => {
      if (response != null) {
        this.taxDetails = {};
        Object.assign(this.taxDetails, response);
      }
    },
      error => {
      });
  }

}
