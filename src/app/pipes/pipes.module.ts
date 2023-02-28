import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeResourceUrlPipe } from './safe-resource-url.pipe';

@NgModule({
  declarations: [SafeResourceUrlPipe],
  exports: [SafeResourceUrlPipe],
  imports: [CommonModule]
})
export class PipesModule {}
