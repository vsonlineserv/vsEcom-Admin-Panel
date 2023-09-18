import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAddressRoutingModule } from './add-address-routing.module';
import { AddAddressComponent } from './add-address.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';

@NgModule({
  declarations: [AddAddressComponent],
  imports: [
    CommonModule,
    AddAddressRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatSelectFilterModule
  ]
})
export class AddAddressModule { }
