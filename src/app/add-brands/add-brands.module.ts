import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBrandsRoutingModule } from './add-brands-routing.module';
import { AddBrandsComponent } from './add-brands.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [AddBrandsComponent],
  imports: [
    CommonModule,
    AddBrandsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class AddBrandsModule { }
