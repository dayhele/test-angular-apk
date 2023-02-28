import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NowComponent } from './now.component';
import { SharedModule } from '../shared/shared.module';
import { NowRoutingModule } from './now-routing.module';
import { SwiperModule } from 'swiper/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DirectivesModule } from '../directives/directives.module';
@NgModule({
  declarations: [NowComponent],
  imports: [
    CommonModule,
    SharedModule,
    NowRoutingModule,
    SwiperModule,
    NgxSkeletonLoaderModule,
    InfiniteScrollModule,
    DirectivesModule
  ]
})
export class NowModule {}
