import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShippingPickupComponent } from './shipping-pickup.component';


const routes: Routes = [
  {
    path: '', component: ShippingPickupComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingPickupRoutingModule { }
