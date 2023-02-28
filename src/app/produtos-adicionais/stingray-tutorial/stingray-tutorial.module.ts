import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StingrayTutorialRoutingModule } from './stingray-tutorial-routing.module';
import { StingrayTutorialComponent } from './stingray-tutorial.component';
import { StingrayAppComponent } from './stingray-app/stingray-app.component';
import { StingrayWebComponent } from './stingray-web/stingray-web.component';
import { StingraySmartTvComponent } from './stingray-smart-tv/stingray-smart-tv.component';


@NgModule({
  declarations: [
    StingrayTutorialComponent,
    StingrayAppComponent,
    StingrayWebComponent,
    StingraySmartTvComponent
  ],
  imports: [
    CommonModule,
    StingrayTutorialRoutingModule
  ]
})
export class StingrayTutorialModule { }
