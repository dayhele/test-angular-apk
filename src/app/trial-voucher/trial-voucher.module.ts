import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrialVoucherRoutingModule } from './trial-voucher-routing.module';
import { TrialVoucherComponent } from './trial-voucher.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { Section1Component } from './section1/section1.component';
import { Section2Component } from './section2/section2.component';
import { Section3Component } from './section3/section3.component';
import { Section4Component } from './section4/section4.component';
import { Section5Component } from './section5/section5.component';
import { Section6Component } from './section6/section6.component';
import { Section7Component } from './section7/section7.component';
import { Section8Component } from './section8/section8.component';
import { SharedModule } from '../shared/shared.module';
import { Section9Component } from './section-faq/section-faq.component';


@NgModule({
  declarations: [
    TrialVoucherComponent,
    SectionHeaderComponent,
    Section1Component,
    Section2Component,
    Section3Component,
    Section4Component,
    Section5Component,
    Section6Component,
    Section7Component,
    Section8Component,
    Section9Component
  ],
  imports: [
    CommonModule,
    TrialVoucherRoutingModule,
    SharedModule
  ]
})
export class TrialVoucherModule { }
