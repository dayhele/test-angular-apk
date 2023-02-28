import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterRoutingModule } from './enter-routing.module';
import { EnterComponent } from './enter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EnterComponent
  ],
  imports: [
    CommonModule,
    EnterRoutingModule,
    SharedModule
  ]
})
export class EnterModule { }
