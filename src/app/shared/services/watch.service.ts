import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WatchService {
  constructor(private route: Router) {}

  public watch(
    id: number,
    type: string,
    isLive?: boolean,
    episodeId?: number,
    isMarathon?: boolean,
    position?: number,
    playOnChromecast?: boolean,
    isNovelas?: boolean,
  ) {
    let queryParams = {
      id,
      type,
      isLive,
      episodeId,
      isMarathon,
      position,
      playOnChromecast,
      isNovelas
    };

    if (type === 'filme' && !queryParams.isLive) {
      delete queryParams.isLive;
      delete queryParams.episodeId;
      delete queryParams.isMarathon;
    }

    this.route.navigate([`/watch`], {
      queryParams
    });
  }
}
