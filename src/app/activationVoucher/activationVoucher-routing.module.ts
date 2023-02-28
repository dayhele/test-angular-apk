import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationVoucherComponent } from './activationVoucher.component';

const routes: Routes = [
  {
    path: '',
    component: ActivationVoucherComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivationVoucherRoutingModule {}
