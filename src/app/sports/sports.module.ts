import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from '../shared/shared.module';
import { SportsRoutingModule } from './sports-routing.module';
import { SportsComponent } from './sports.component';

@NgModule({
  declarations: [SportsComponent],
  imports: [
    CommonModule,
    SportsRoutingModule,
    SharedModule,
    SwiperModule,
    NgxSkeletonLoaderModule
  ]
})
export class SportsModule {}
