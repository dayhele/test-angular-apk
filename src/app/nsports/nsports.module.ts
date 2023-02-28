import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsportsComponent } from './nsports.component';
import { NsportsRoutingModule } from './nsports-routing.module';
import { BannerComponent } from './general/banner/banner.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutsComponent } from './layouts/layouts.component';
import { NotIsSubscriberComponent } from './layouts/not-is-subscriber/not-is-subscriber.component';
import { SwiperModule } from 'swiper/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ExclusiveChannelsComponent } from './layouts/not-is-subscriber/exclusive-channels/exclusive-channels.component';
import { IsSubscriberComponent } from './layouts/is-subscriber/is-subscriber.component';
import { ImageBannerComponent } from './layouts/is-subscriber/image-banner/image-banner.component';
import { CardNsportsComponent } from './general/card-nsports/card-nsports.component';
import { MultiNsportsBannerComponent } from './layouts/not-is-subscriber/multi-nsports-banner/multi-nsports-banner.component';

@NgModule({
  declarations: [
    NsportsComponent,
    BannerComponent,
    LayoutsComponent,
    NotIsSubscriberComponent,
    ExclusiveChannelsComponent,
    IsSubscriberComponent,
    ImageBannerComponent,
    CardNsportsComponent,
    MultiNsportsBannerComponent
  ],
  imports: [
    CommonModule,
    NsportsRoutingModule,
    SharedModule,
    SwiperModule,
    NgxSkeletonLoaderModule
  ]
})
export class NsportsModule {}
