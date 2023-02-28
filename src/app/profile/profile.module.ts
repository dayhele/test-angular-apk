import { ControleParentalPinComponent } from './edit/controle-parental-pin/controle-parental-pin.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileSelectComponent } from './profile-select/profile-select.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatExpansionModule } from '@angular/material/expansion';
import { AgeClassificationListComponent } from './shared/age-classification-list/age-classification-list.component';
@NgModule({
  declarations: [
    EditComponent,
    ProfileSelectComponent,
    CreateComponent,
        ControleParentalPinComponent,
        AgeClassificationListComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    PipesModule,
    MatSlideToggleModule,
    MatExpansionModule
  ]
})
export class ProfileModule {}
