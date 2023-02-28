import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightsComponent } from './highlights.component';
import { SharedModule } from '../shared/shared.module';
import { HighlightsRoutingModule } from './highlights-routing.module';
import { SwiperModule } from 'swiper/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [HighlightsComponent],
  imports: [
    CommonModule,
    SharedModule,
    HighlightsRoutingModule,
    SwiperModule,
    NgxSkeletonLoaderModule
  ]
})
export class HighlightsModule {}
