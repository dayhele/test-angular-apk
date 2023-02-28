import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParamountComponent } from './paramount.component';

const routes: Routes = [{ path: '', component: ParamountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParamountRoutingModule { }
