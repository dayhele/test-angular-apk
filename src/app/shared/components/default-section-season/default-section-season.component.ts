import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { CardData, CardProperties } from '../../interfaces/card';
import { BuildUrlImageService } from '../../../shared/services/build-url-image.service';
import { HomeService } from '../../services/home.service';
import { MainStructure } from '../../interfaces/main-structure';
import { DataList, KeepWatching } from '../../interfaces/keep-watching';
import { Cdnlist } from '../../interfaces/cdnlist';
import { ProgressService } from '../../services/progress.service';
import { WatchService } from '../../services/watch.service';
import { MoviesSeriesService } from '../../../shared/services/movies-series.service';
import { EpisodeData, Movie } from '../../../shared/interfaces/movie';
import { environment } from '../../../../environments/environment';
import { PageComponent } from '../../../core/page/page/page.component';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-default-section-season',
  templateUrl: './default-section-season.component.html',
  styleUrls: ['./default-section-season.component.scss']
})
export class DefaultSectionSeasonComponent {
  @Input() public seasonTitle?: string;
  @Input() public seasonImg?: string;
  @Input() public seasonDescricao: string;
  @Input() public seasonYear: string;
  @Input() public seasonIdSerie?: number;
  @Input() public seasonIdSeason?: number;
  @Input() public isUnloggedSession?: boolean;
  @Input() public isNovelas?: boolean;
  @Input() public seasonVideos?: CardData[] = [];
  @Input() public bannerPageUrl?: string;

  idPerfil: any;
  idList: any;
  seasonproperties: CardProperties = {};
  public main: MainStructure;
  public data: DataList;
  public environment: any;

  public episodePosition: number[] = [];
  public episodeDuration: number[] = [];
  public position: number;
  public duration: number;
  public seasonSelectedIndex: number;

  public mediaTitle: string;
  public mediaType: string;
  public serieMovie: Movie;
  public seriesData: Movie;

  constructor(
    private watchService: WatchService,
    private seriesService: MoviesSeriesService,
    private homeService: HomeService,
    private buildUrlImage: BuildUrlImageService,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private progressService: ProgressService,
    private pageComponent: PageComponent,
    private route: Router,
    public theme: Theme,
  ) {
    this.main = {};
    this.data = {};
    this.serieMovie = {};
    this.seriesData = {};
    this.mediaTitle = '';
    this.mediaType = 'serie';
    this.environment = environment;

    this.position = 0;
    this.duration = 0;
    this.seasonSelectedIndex = 0;

    this.seasonTitle = '';
    this.seasonDescricao = '';
    this.seasonYear = '';
    this.seasonIdSerie = 0;
    this.seasonIdSeason = 0;
    this.idPerfil = parseInt(this.profileService.selectedProfile);
    this.idList = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.seasonproperties = {
      orientation: 'vertical',
      channelLogo: false,
      hasWatchLogo: false,
      smallCard: false,
      movieLogo: true,
      indicativeAge: false,
      movieTitle: false,
      hasProgressBar: false,
      sportTitle: false,
      isLive: false,
      secondDescription: false,
      day: false,
      rentable: false,
      rentMovieTitle: false
    };
  }

  ngOnChanges(): void {
    if(isNaN(this.idPerfil)){
      this.isUnloggedSession = true;
      this.idPerfil = 0;
    }
    this.seasonVideos?.forEach(async (element) => {
      element.imageUrl = await this.buildUrlImage.buildUrlImage(
        element.cdn,
        element.cover
      );
    });

    this.getMainInfo(this.idPerfil);
    this.getProgress();
  }

  private getMainInfo(idPerfil: number): void {
    this.homeService.getMainList(idPerfil).subscribe((data: MainStructure) => {
      this.main = data;
      this.getDataInfo(idPerfil);
    });
  }

  private getDataInfo(profileId: number): void {
    this.homeService.getDataList(profileId).subscribe((res: DataList) => {
      this.data = res;
      this.loadSeriesData(
        profileId,
        res,
        Number(this.seasonIdSerie),
        this.mediaType
      );
    });
  }

  public loadSeriesData(
    profileId: number,
    res: DataList,
    contentId: number,
    type: string
  ): void {
    this.seriesService

      .getDetails(profileId, contentId, type)
      .subscribe((item) => {
        this.seriesData = item;

        if (item.title) this.mediaTitle = item.title;

        if (this.seriesData.finalPrice) {
          this.seriesData.toRent = true;
          this.pageComponent.setScreenRent(true);
        } else this.seriesData.toRent = false;

        if (this.mediaType === 'serie' && res.keep_watching) {
          const episodeNumber = res.keep_watching.find(
            (s: KeepWatching) => s.id === item.id
          );
          if (episodeNumber) {
            this.parseEpisode(item, episodeNumber);
          } else {
            this.serieMovie = {
              ...item.seasons![0].videos![0],
              censorship: item.censorship,
              genres: item.genres,
              director: item.director,
              warning: item.warning
            };
          }
        } else {
          this.serieMovie = item;
        }
      });
  }

  public parseEpisode(content: Movie, episodeNumber: KeepWatching) {
    let episodeBody: EpisodeData = <EpisodeData>{};

    content.seasons?.forEach((video) => {
      const episode = video.videos?.find(
        (ep: EpisodeData) => ep.id === episodeNumber.episode
      );
      if (episode) episodeBody = episode;
    });

    this.serieMovie = {
      ...episodeBody,
      censorship: content.censorship,
      genres: content.genres,
      director: content.director,
      position: episodeNumber.position
    };
  }

  public toMinutes(timeSeconds: number): string {
    let time = 0;

    if (timeSeconds) {
      time = Math.floor(timeSeconds / 60);
      return time + 'min.';
    }
    return '';
  }

  public watch(): void {
    if (this.mediaType === 'serie') {
      if(this.isUnloggedSession){
        this.route.navigateByUrl('welcome/find');
      }else{
        if(this.idList == '10058'){
          this.watchService.watch(
            Number(this.seasonIdSerie),
            this.mediaType,
            false,
            this.serieMovie.id,
            false,
            this.position,
            false,
            true
          );
        }else{
          this.watchService.watch(
            Number(this.seasonIdSerie),
            this.mediaType,
            false,
            this.serieMovie.id
          );
        }
      }
    } else {
      this.watchService.watch(Number(this.seasonIdSerie), this.mediaType);
    }
  }

  public getProgress(): void {
    this.progressService
      .getProgress(this.idPerfil, this.mediaType, this.seasonIdSerie)
      .subscribe((data) => {
        if (this.mediaType === 'serie') {
          for (let i = 0; i < data.seasons.length; i++) {
            this.episodePosition = [];
            this.episodeDuration = [];
            for (let j = 0; j < data.seasons[i].episodes.length; j++) {
              this.episodePosition.push(data.seasons[i].episodes[j].position);
              this.episodeDuration.push(data.seasons[i].episodes[j].duration);
            }
          }
        } else {
          this.serieMovie.position = data.position;
          this.serieMovie.duration = data.duration;
        }
      });
  }
}
