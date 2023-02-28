import { RetentionComponent } from './retention.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RetentionRoutingModule } from './retention-routing.module';

@NgModule({
  declarations: [RetentionComponent],
  imports: [CommonModule, RetentionRoutingModule, SharedModule]
})
export class RetentionModule {}
