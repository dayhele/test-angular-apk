import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CanceledRoutingModule } from './canceled-routing.module';
import { CanceledComponent } from './canceled.component';

@NgModule({
  declarations: [CanceledComponent],
  imports: [CommonModule, CanceledRoutingModule, SharedModule]
})
export class CanceledModule {}
