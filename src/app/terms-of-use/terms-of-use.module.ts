import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsOfUseRoutingModule } from './terms-of-use-routing.module';
import { TermsOfUseComponent } from './terms-of-use.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MultilaserComponent } from './multilaser/multilaser.component';

@NgModule({
  declarations: [TermsOfUseComponent, MultilaserComponent],
  imports: [
    CommonModule,
    TermsOfUseRoutingModule,
    SharedModule,
    NgxSkeletonLoaderModule
  ]
})
export class TermsOfUseModule {}
