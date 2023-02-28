import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentRoutingModule } from './rent-routing.module';
import { MediaComponent } from './media/media.component';
import { MediaPlanComponent } from './media-plan/media-plan.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MediaComponent, MediaPlanComponent],
  imports: [CommonModule, RentRoutingModule, SharedModule]
})
export class RentModule {}
