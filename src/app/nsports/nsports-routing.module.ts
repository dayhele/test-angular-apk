import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NsportsComponent } from './nsports.component';

const routes: Routes = [
  {
    path: '',
    component: NsportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NsportsRoutingModule {}
