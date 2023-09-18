import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingCalculationsRoutingModule } from './shipping-calculations-routing.module';
import { ShippingCalculationsComponent } from './shipping-calculations.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [ShippingCalculationsComponent],
  imports: [
    CommonModule,
    ShippingCalculationsRoutingModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
  ]
})
export class ShippingCalculationsModule { }
