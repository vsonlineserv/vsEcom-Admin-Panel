import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffRegistrationComponent } from './staff-registration.component';
import { StaffRegistrationRoutingModule } from './staff-registration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [StaffRegistrationComponent],
  imports: [
    CommonModule,
    StaffRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    FlexLayoutModule,
    MatIconModule,
    MatTableModule
  ]
})
export class StaffRegistrationModule { }
