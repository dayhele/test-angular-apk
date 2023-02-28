import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitucionalRoutingModule } from './institucional-routing.module';
import { InstitucionalComponent } from './institucional.component';
import { Section1Component } from './section1/section1.component';
import { Section2Component } from './section2/section2.component';
import { Section3Component } from './section3/section3.component';
import { Section4Component } from './section4/section4.component';
import { Section6Component } from './section6/section6.component';
import { Section5Component } from './section5/section5.component';
import { Section7Component } from './section7/section7.component';
import { Section8Component } from './section8/section8.component';
import { Section9Component } from './section9/section9.component';
import { SectionSlideComponent } from './section-slide/section-slide.component';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from "../shared/shared.module";
import {LOCALE_ID, DEFAULT_CURRENCY_CODE} from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

@NgModule({
    declarations: [
        InstitucionalComponent,
        Section1Component,
        Section2Component,
        Section3Component,
        Section4Component,
        Section5Component,
        Section6Component,
        Section7Component,
        Section8Component,
        Section9Component,
        SectionSlideComponent,
    ],
    imports: [CommonModule, SwiperModule, InstitucionalRoutingModule, SharedModule],
    providers: [
      {
          provide: LOCALE_ID,
          useValue: 'pt'
      },
      {
          provide:  DEFAULT_CURRENCY_CODE,
          useValue: 'BRL'
      },
  ]
})
export class InstitucionalModule {}
