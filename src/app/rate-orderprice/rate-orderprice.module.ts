import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RateOrderpriceRoutingModule } from './rate-orderprice-routing.module';
import { RateOrderpriceComponent } from './rate-orderprice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [RateOrderpriceComponent],
  imports: [
    CommonModule,
    RateOrderpriceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ]
})
export class RateOrderpriceModule { }
