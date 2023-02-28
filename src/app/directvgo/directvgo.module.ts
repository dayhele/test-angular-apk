import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DirectvgoRoutingModule } from './directvgo-routing.module';
import { DirectvgoComponent } from './directvgo.component';

@NgModule({
  declarations: [DirectvgoComponent],
  imports: [CommonModule, DirectvgoRoutingModule, SharedModule]
})
export class DirectvgoModule {}
