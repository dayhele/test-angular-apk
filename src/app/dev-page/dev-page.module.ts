import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevPageRoutingModule } from './dev-page-routing.module';
import { DevPageComponent } from './dev-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DevPageComponent],
  imports: [CommonModule, DevPageRoutingModule, SharedModule]
})
export class DevPageModule {}
