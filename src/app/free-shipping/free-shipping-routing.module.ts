import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreeShippingComponent } from './free-shipping.component';


const routes: Routes = [
  {
    path: '', component: FreeShippingComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreeShippingRoutingModule { }
