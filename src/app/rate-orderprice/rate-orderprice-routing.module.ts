import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateOrderpriceComponent } from './rate-orderprice.component';


const routes: Routes = [
  {
    path: '', component: RateOrderpriceComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RateOrderpriceRoutingModule { }
