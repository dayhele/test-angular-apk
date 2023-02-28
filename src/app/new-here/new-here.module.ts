import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewHereRoutingModule } from './new-here-routing.module';
import { NewHereComponent } from './new-here.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NewHereComponent
  ],
  imports: [
    CommonModule,
    NewHereRoutingModule,
    SharedModule
  ]
})
export class NewHereModule { }
