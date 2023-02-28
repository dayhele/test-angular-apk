import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { HistoricComponent } from "../historic/historic.component";

const routes: Routes = [
  {
    path: '',
    component: AccountComponent
  },
  {
    path: 'historic',
    component: HistoricComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
