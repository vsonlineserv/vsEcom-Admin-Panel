import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrandsComponent } from './add-brands.component';

const routes: Routes = [
  {
    path: '', component: AddBrandsComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBrandsRoutingModule { }
