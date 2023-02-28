import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateAccountComponent } from './activate-account.component';

import { Step4Component } from './step4/step4.component';

const routes: Routes = [
  { path: '', component: ActivateAccountComponent },
  { path: 'first-registration', component: Step4Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivateAccountRoutingModule {}
