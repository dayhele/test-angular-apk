import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewHereComponent } from './new-here.component';

const routes: Routes = [{ path: '', component: NewHereComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewHereRoutingModule { }
