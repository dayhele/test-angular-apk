import { WatchService } from './watch.service';
import { Injectable } from '@angular/core';
import { EpisodeData, SeriesSeasons } from '../../shared/interfaces/movie';
import { BuildUrlImageService } from '../../shared/services/build-url-image.service';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NextEpisodeService {
  public serieId: number;
  public seasons: SeriesSeasons[];
  public seasonIndex: number;
  public seasonOrder: number;
  public episodeIndex: number;
  public nextSeasonIndex: number;
  public nextSeasonOrder: number = 0;
  public nextEpisodeIndex: number;
  public isNovelas: boolean;

  public nextEpisode: EpisodeData;

  constructor(
    private buildUrlImageSerice: BuildUrlImageService,
    private watchService: WatchService,
    private router: ActivatedRoute,
  ) {
    this.serieId = 0;
    this.seasons = [];
    this.seasonIndex = 0;
    this.seasonOrder = 0;
    this.episodeIndex = 0;
    this.nextSeasonIndex = 0;
    this.nextEpisodeIndex = 0;
    this.isNovelas = false;

    this.nextEpisode = {};
  }

  public checkNextEpisode(): boolean {
    let targetSeason = this.seasonIndex;
    let targetEpisode = this.episodeIndex + 1;
    if (targetEpisode + 1 <= this.seasons[targetSeason]?.videos?.length!) {
      this.nextSeasonIndex = this.seasonIndex;
      this.nextSeasonOrder = this.seasonOrder;
      this.nextEpisodeIndex = targetEpisode;
      return true;
    } else {
      targetEpisode = 0;
      targetSeason += 1;
      if (targetEpisode <= this.seasons[targetSeason]?.videos?.length!) {
        this.nextSeasonIndex = targetSeason;
        this.nextEpisodeIndex = targetEpisode;

        return true;
      } else {
        return false;
      }
    }
  }

  public async getNextEpisode(): Promise<EpisodeData> {
    let nextEpisode =
      this.seasons![this.nextSeasonIndex].videos![this.nextEpisodeIndex];
    this.nextEpisode.imageUrl = await this.buildUrlImageSerice.buildUrlImage(
      nextEpisode.cdn,
      nextEpisode.highlight
    );

    this.nextEpisode = {
      title: nextEpisode.title,
      synopsis: nextEpisode.synopsis,
      imageUrl: await this.buildUrlImageSerice.buildUrlImage(
        nextEpisode.cdn,
        nextEpisode.highlight
      )
    };

    return this.nextEpisode;
  }

  public playEpisode(playOnChromecast: boolean = false): void {
    var novela: boolean = false;
    this.router.queryParamMap
      .subscribe((params) => {
        if(params.get('isNovelas') != null){
          if(params.get('isNovelas') == "true"){
            novela = true;
          }
        }
      }
    );

    this.watchService.watch(
      this.serieId,
      'serie',
      false,
      this.seasons![this.nextSeasonIndex].videos![this.nextEpisodeIndex].id,
      true,
      0,
      playOnChromecast,
      novela
    );

  }
}
