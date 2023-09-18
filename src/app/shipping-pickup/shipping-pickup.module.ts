import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingPickupRoutingModule } from './shipping-pickup-routing.module';
import { ShippingPickupComponent } from './shipping-pickup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ShippingPickupComponent],
  imports: [
    CommonModule,
    ShippingPickupRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule
  ]
})
export class ShippingPickupModule { }
