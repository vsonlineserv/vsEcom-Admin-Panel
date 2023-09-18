import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewShiprocketComponent } from './view-shiprocket.component';

const routes: Routes = [
  {
    path: '', component: ViewShiprocketComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewShiprocketRoutingModule { }
