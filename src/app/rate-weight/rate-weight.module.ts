import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RateWeightRoutingModule } from './rate-weight-routing.module';
import { RateWeightComponent } from './rate-weight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [RateWeightComponent],
  imports: [
    CommonModule,
    RateWeightRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ]
})
export class RateWeightModule { }
