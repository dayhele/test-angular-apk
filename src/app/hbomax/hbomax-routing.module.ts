import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HbomaxComponent } from './hbomax.component';


const routes: Routes = [
  {
    path: '',
    component: HbomaxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HbomaxRoutingModule {}
