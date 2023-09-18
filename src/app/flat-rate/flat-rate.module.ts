import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlatRateRoutingModule } from './flat-rate-routing.module';
import { FlatRateComponent } from './flat-rate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FlatRateComponent],
  imports: [
    CommonModule,
    FlatRateRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class FlatRateModule { }
