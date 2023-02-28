import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StingrayAppComponent } from './stingray-app/stingray-app.component';
import { StingraySmartTvComponent } from './stingray-smart-tv/stingray-smart-tv.component';
import { StingrayTutorialComponent } from './stingray-tutorial.component';
import { StingrayWebComponent } from './stingray-web/stingray-web.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'web'
  },
  {
    path: '',
    component: StingrayTutorialComponent,
    children: [
      {
        path: 'app',
        component: StingrayAppComponent
      },
      {
        path: 'web',
        component: StingrayWebComponent
      },
      {
        path: 'smart-tv',
        component: StingraySmartTvComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StingrayTutorialRoutingModule {}
