import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HboMaxComponent } from './hbo-max.component';

const routes: Routes = [{ path: '', component: HboMaxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HboMaxRoutingModule { }
