import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesAndSeriesComponent } from './movies-and-series.component';
import { SharedModule } from '../shared/shared.module';
import { MoviesAndSeriesRoutingModule } from './movies-and-series-routing.module';

@NgModule({
  declarations: [MoviesAndSeriesComponent],
  imports: [CommonModule, SharedModule, MoviesAndSeriesRoutingModule]
})
export class MoviesAndSeriesModule {}
