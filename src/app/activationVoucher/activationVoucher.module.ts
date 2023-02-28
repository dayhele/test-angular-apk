import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ActivationVoucherRoutingModule } from './activationVoucher-routing.module';
import { ActivationVoucherComponent } from './activationVoucher.component';

@NgModule({
  declarations: [ActivationVoucherComponent],
  imports: [CommonModule, ActivationVoucherRoutingModule, SharedModule]
})
export class ActivationVoucherModule {}
