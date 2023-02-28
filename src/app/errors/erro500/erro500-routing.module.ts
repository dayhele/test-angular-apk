import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Erro500Component } from './erro500.component';

const routes: Routes = [
  {
    path: '',
    component: Erro500Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Erro500RoutingModule {}
