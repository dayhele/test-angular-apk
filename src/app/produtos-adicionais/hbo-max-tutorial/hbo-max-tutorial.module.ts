import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HboMaxTutorialRoutingModule } from './hbo-max-tutorial-routing.module';
import { HboMaxTutorialComponent } from './hbo-max-tutorial.component';
import { HboMaxWebComponent } from './hbo-max-web/hbo-max-web.component';
import { HboMaxAppComponent } from './hbo-max-app/hbo-max-app.component';
import { HboMaxSmartTvComponent } from './hbo-max-smart-tv/hbo-max-smart-tv.component';

@NgModule({
  declarations: [HboMaxTutorialComponent, HboMaxWebComponent, HboMaxAppComponent, HboMaxSmartTvComponent],
  imports: [CommonModule, HboMaxTutorialRoutingModule]
})
export class HboMaxTutorialModule {}
