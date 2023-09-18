import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewProductsComponent } from './view-products.component';


const routes: Routes = [
  {
    path: '', component: ViewProductsComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProductsRoutingModule { }
