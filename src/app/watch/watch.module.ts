import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WatchRoutingModule } from './watch-routing.module';
import { WatchComponent } from './watch.component';
import { SharedModule } from '../shared/shared.module';
import { NextEpisodeComponent } from './next-episode/next-episode.component';
import { ModalChromecastComponent } from './modal-chromecast/modal-chromecast.component';

@NgModule({
  declarations: [
    WatchComponent,
    NextEpisodeComponent,
    ModalChromecastComponent
  ],
  imports: [CommonModule, WatchRoutingModule, SharedModule]
})
export class WatchModule {}
