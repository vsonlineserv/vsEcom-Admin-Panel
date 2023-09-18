import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStaffComponent } from './create-staff.component';

const routes: Routes = [
  {
    path: '', component: CreateStaffComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateStaffRoutingModule { }
