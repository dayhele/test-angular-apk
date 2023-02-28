import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { SeriesRoutingModule } from './series-routing.module';
import { SeriesComponent } from './series.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [SeriesComponent],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    SharedModule,
    SwiperModule,
    NgxSkeletonLoaderModule
  ]
})
export class SeriesModule {}
