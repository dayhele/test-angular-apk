import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpcoesRoutingModule } from './opcoes-routing.module';
import { OpcoesComponent } from './opcoes.component';


@NgModule({
  declarations: [
    OpcoesComponent
  ],
  imports: [
    CommonModule,
    OpcoesRoutingModule,
    SharedModule
  ]
})
export class OpcoesModule { }
