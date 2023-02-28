import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpcoesComponent } from './opcoes.component';

const routes: Routes = [{ path: '', component: OpcoesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpcoesRoutingModule {}
