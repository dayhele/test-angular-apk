import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';

import { SharedModule } from '../shared/shared.module';
import { ActivateAccountRoutingModule } from './activate-account-routing.module';
import { ActivateAccountComponent } from './activate-account.component';

@NgModule({
  declarations: [
    ActivateAccountComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component
  ],
  imports: [CommonModule, ActivateAccountRoutingModule, SharedModule]
})
export class ActivateAccountModule {}
