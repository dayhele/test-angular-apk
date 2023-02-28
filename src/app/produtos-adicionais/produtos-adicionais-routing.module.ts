import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosAdicionaisComponent } from './produtos-adicionais.component';

const routes: Routes = [
  {
    path: '',
    component: ProdutosAdicionaisComponent,
    children: [
      {
        path: 'hbo-max-tutorial',
        loadChildren: () =>
          import('./hbo-max-tutorial/hbo-max-tutorial.module').then(
            (m) => m.HboMaxTutorialModule
          )
      },
      {
        path: 'stingray-tutorial',
        loadChildren: () =>
          import('./stingray-tutorial/stingray-tutorial.module').then(
            (m) => m.StingrayTutorialModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosAdicionaisRoutingModule {}
