import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevPageComponent } from './dev-page.component';

const routes: Routes = [{ path: '', component: DevPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevPageRoutingModule { }
