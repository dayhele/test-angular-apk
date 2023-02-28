import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ExpiredRoutingModule } from './expired-routing.module';
import { ExpiredComponent } from './expired.component';

@NgModule({
  declarations: [ExpiredComponent],
  imports: [CommonModule, ExpiredRoutingModule, SharedModule]
})
export class ExpiredModule {}
