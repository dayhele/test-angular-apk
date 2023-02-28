import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectvgoComponent } from './directvgo.component';

const routes: Routes = [
  {
    path: '',
    component: DirectvgoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectvgoRoutingModule {}
