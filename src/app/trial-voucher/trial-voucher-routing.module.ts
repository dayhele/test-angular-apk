import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrialVoucherComponent } from './trial-voucher.component';

const routes: Routes = [{ path: '', component: TrialVoucherComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrialVoucherRoutingModule { }
