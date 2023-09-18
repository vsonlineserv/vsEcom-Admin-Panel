import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateWeightComponent } from './rate-weight.component';


const routes: Routes = [
  {
    path: '', component: RateWeightComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RateWeightRoutingModule { }
