import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxChartsModule }from '@swimlane/ngx-charts';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgImageSliderModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
