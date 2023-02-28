import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateComponent } from './activate/activate.component';
import { DevicesRoutingModule } from './devices-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ActivateComponent],
  imports: [CommonModule, DevicesRoutingModule, SharedModule]
})
export class DevicesModule {}
