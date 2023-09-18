import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreeShippingRoutingModule } from './free-shipping-routing.module';
import { FreeShippingComponent } from './free-shipping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FreeShippingComponent],
  imports: [
    CommonModule,
    FreeShippingRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule
  ]
})
export class FreeShippingModule { }
