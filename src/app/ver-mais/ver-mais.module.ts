import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerMaisRoutingModule } from './ver-mais-routing.module';
import { VerMaisComponent } from './ver-mais.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [VerMaisComponent],
  imports: [
    CommonModule,
    VerMaisRoutingModule,
    SharedModule,
    NgxSkeletonLoaderModule,
    InfiniteScrollModule
  ]
})
export class VerMaisModule {}
