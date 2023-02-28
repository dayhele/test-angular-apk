import { SwiperModule } from 'swiper/angular';
import { Swiper } from 'swiper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HbomaxRoutingModule } from './hbomax-routing.module';
import { HbomaxComponent } from './hbomax.component';
@NgModule({
  declarations: [HbomaxComponent],
  imports: [CommonModule, HbomaxRoutingModule, SharedModule, SwiperModule]
})
export class HbomaxModule {}
