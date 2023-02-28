import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultilaserComponent } from './multilaser/multilaser.component';
import { TermsOfUseComponent } from './terms-of-use.component';

const routes: Routes = [
  {
    path: '',
    component: TermsOfUseComponent
  },
  {
    path: 'watch',
    component: TermsOfUseComponent
  },
  {
    path: 'multi',
    component: MultilaserComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsOfUseRoutingModule {}
