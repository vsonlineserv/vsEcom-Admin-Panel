import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../service/api/global.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  constructor(private router: Router, private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.GetEngineToken();
  }

  addShipping() {
    this.router.navigate(['/home/shipping-calculations']);
  }

  addDelivery() {
    this.router.navigate(['/home/shipping-pickup']);
  }

  addShiprocket() {
    this.router.navigate(['/home/view-shiprocket']);
  }

  goback() {
    history.back();
  }

}
