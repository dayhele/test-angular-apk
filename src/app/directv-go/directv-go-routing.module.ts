import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectvGoComponent } from './directv-go.component';

const routes: Routes = [{ path: '', component: DirectvGoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectvGoRoutingModule { }
