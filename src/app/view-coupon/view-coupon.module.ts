import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCouponRoutingModule } from './view-coupon-routing.module';
import { ViewCouponComponent } from './view-coupon.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [ViewCouponComponent],
  imports: [
    CommonModule,
    ViewCouponRoutingModule,
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxPaginationModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatSlideToggleModule, 
    MatCheckboxModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule
  ]
})
export class ViewCouponModule { }
