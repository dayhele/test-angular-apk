import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerMaisComponent } from './ver-mais.component';

const routes: Routes = [
  { path: ':id/:title', component: VerMaisComponent },
  { path: ':id/:title/:hasCustomIcon', component: VerMaisComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerMaisRoutingModule {}
