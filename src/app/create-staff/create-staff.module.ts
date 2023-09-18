import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateStaffRoutingModule } from './create-staff-routing.module';
import { CreateStaffComponent } from './create-staff.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [CreateStaffComponent],
  imports: [
    CommonModule,
    CreateStaffRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCheckboxModule,
  ]
})
export class CreateStaffModule { }
