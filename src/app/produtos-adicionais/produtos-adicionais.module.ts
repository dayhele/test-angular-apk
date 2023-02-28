import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProdutosAdicionaisRoutingModule } from './produtos-adicionais-routing.module';
import { ProdutosAdicionaisComponent } from './produtos-adicionais.component';
import { PlatformSelectorComponent } from './platform-selector/platform-selector.component';

@NgModule({
  declarations: [ProdutosAdicionaisComponent, PlatformSelectorComponent],
  imports: [CommonModule, ProdutosAdicionaisRoutingModule, MatExpansionModule]
})

export class ProdutosAdicionaisModule {}
