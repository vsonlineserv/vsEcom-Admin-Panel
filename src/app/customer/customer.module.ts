import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [CustomerComponent],
    imports: [
      CommonModule,
      CustomerRoutingModule,
      MatSelectModule,
      MatInputModule,
      MatSortModule,
      MatPaginatorModule,
      MatTableModule ,
      FormsModule,
      MatIconModule,
      MatTableModule
    ]
  })
  export class CustomerModule{
    
  }