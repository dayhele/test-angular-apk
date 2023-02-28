import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Erro500RoutingModule } from './erro500-routing.module';
import { Erro500Component } from './erro500.component';

@NgModule({
  declarations: [Erro500Component],
  imports: [CommonModule, Erro500RoutingModule, SharedModule]
})
export class Erro500Module {}
