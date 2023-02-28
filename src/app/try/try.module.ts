import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TryComponent } from './try.component';
import { SharedModule } from '../shared/shared.module';
import { TryRoutingModule } from './try-routing.module';
import { SwiperModule } from 'swiper/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [TryComponent],
  imports: [
    CommonModule,
    SharedModule,
    TryRoutingModule,
    SwiperModule,
    NgxSkeletonLoaderModule
  ],
  providers: [DatePipe]
})
export class TryModule {}
