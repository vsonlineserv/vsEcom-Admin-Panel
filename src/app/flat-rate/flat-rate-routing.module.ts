import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlatRateComponent } from './flat-rate.component';


const routes: Routes = [
  {
    path: '', component: FlatRateComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlatRateRoutingModule { }
