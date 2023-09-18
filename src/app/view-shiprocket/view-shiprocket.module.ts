import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewShiprocketRoutingModule } from './view-shiprocket-routing.module';
import { ViewShiprocketComponent } from './view-shiprocket.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ViewShiprocketComponent],
  imports: [
    CommonModule,
    ViewShiprocketRoutingModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    MatCardModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    NgxPaginationModule
  ]
})
export class ViewShiprocketModule { }
