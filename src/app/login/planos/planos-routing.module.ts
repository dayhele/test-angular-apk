import { MultilserPlanosComponent } from './multilaser/multilaser-planos/multilaser-planos.component';
import { PlanosComponent } from './planos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PlanosComponent
  },
  {
    path: 'watch',
    component: PlanosComponent
  },
  {
    path: 'multi',
    component: MultilserPlanosComponent
  },
  {
    path: 'multi/:voucher',
    component: MultilserPlanosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanosRoutingModule {}
