import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaComponent } from './media/media.component';
import { MediaPlanComponent } from './media-plan/media-plan.component';
import { RentComponent } from './rent.component';

const routes: Routes = [
  {
    path: '',
    component: RentComponent
  },
  {
    path: 'media/:id/:type',
    component: MediaComponent
  },
  {
    path: 'media-plan/:id',
    component: MediaPlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRoutingModule {}
