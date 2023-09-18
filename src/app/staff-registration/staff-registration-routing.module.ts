import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffRegistrationComponent } from './staff-registration.component';


const routes: Routes = [
  {
    path: '', component: StaffRegistrationComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRegistrationRoutingModule { }
