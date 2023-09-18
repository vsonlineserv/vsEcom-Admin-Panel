import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTrackingComponent } from './view-tracking.component';

const routes: Routes = [
  {
    path: '', component: ViewTrackingComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewTrackingRoutingModule { }
