import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesAndSeriesComponent } from './movies-and-series.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesAndSeriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesAndSeriesRoutingModule {}
