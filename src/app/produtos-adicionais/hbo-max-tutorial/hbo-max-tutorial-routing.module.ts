import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HboMaxAppComponent } from './hbo-max-app/hbo-max-app.component';
import { HboMaxSmartTvComponent } from './hbo-max-smart-tv/hbo-max-smart-tv.component';
import { HboMaxTutorialComponent } from './hbo-max-tutorial.component';
import { HboMaxWebComponent } from './hbo-max-web/hbo-max-web.component';
const routes: Routes = [
  {
    path: '',
    component: HboMaxTutorialComponent,
    children: [
      {
        path: 'app',
        component: HboMaxAppComponent
      },
      {
        path: 'smart-tv',
        component: HboMaxSmartTvComponent
      },
      {
        path: 'web',
        component: HboMaxWebComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HboMaxTutorialRoutingModule {}
