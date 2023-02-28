import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSliderModule, MatTabsModule],
  exports: [
    MatSliderModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class MaterialModule {}
