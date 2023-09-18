import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingRoutingModule } from './shipping-routing.module';
import { ShippingComponent } from './shipping.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ShippingComponent],
  imports: [
    CommonModule,
    ShippingRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ShippingModule { }
