import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewCouponComponent } from './view-coupon.component';


const routes: Routes = [
  {
    path: '', component: ViewCouponComponent, pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewCouponRoutingModule { }
