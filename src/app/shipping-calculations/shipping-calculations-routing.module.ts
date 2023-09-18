import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShippingCalculationsComponent } from './shipping-calculations.component';


const routes: Routes = [
  {
    path: '', component: ShippingCalculationsComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingCalculationsRoutingModule { }
