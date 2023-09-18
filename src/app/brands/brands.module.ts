import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsRoutingModule } from './brands-routing.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrandsComponent } from './brands.component';


@NgModule({
  declarations: [BrandsComponent],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule ,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule
  ]
})
export class BrandsModule { }
