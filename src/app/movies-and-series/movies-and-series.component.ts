import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PageComponent } from '../core/page/page/page.component';
import { CardProperties } from '../shared/interfaces/card-default';
import { SectionCardListData } from '../shared/interfaces/card-home';
import { Cdnlist } from '../shared/interfaces/cdnlist';
import {
  DataList,
  KeepWatching,
  MyList
} from '../shared/interfaces/keep-watching';
import { MainStructure } from '../shared/interfaces/main-structure';
import { EpisodeData, Movie, SeriesMovies } from '../shared/interfaces/movie';
import { BuildUrlImageService } from '../shared/services/build-url-image.service';
import { HomeService } from '../shared/services/home.service';
import { MoviesSeriesService } from '../shared/services/movies-series.service';
import { SectionService } from '../shared/services/section.service';
import { DetailsService } from './../shared/services/details.service';
import { ProfileService } from './../shared/services/profile.service';
import { ProgressService } from './../shared/services/progress.service';

@Component({
  selector: 'app-movies-and-series',
  templateUrl: './movies-and-series.component.html',
  styleUrls: ['./movies-and-series.component.scss']
})
export class MoviesAndSeriesComponent implements OnInit, OnDestroy {
  public mediaId: number;
  public mediaType: string;
  public seriesData: Movie;
  public seriesDataLoaded: boolean;
  public seasonSelectedIndex: number;
  public cardProperties: CardProperties;
  public idPerfil: number;
  public resultsLoaded: boolean;
  public resultsRecommended: SectionCardListData;
  public data: DataList;
  public main: MainStructure;

  public serieMovie: Movie;

  public mediaLoaded: boolean;
  public mediaTitle: string;

  public favoriteState: boolean;
  private favoriteList: MyList[];

  public episodePosition: number[][];
  public episodeDuration: number[][];

  public firstTime: boolean = true;
  public isEmptySugestions: boolean = false;

  public showNoContentModal: boolean = false;

  public isParamount: boolean = false;

  public isParamountFreemium: boolean = false;
  public isNSportsPayment: boolean = false;

  constructor(
    private buildUrlImage: BuildUrlImageService,
    private seriesService: MoviesSeriesService,
    private profileService: ProfileService,
    private homeService: HomeService,
    private sectionService: SectionService,
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private progressService: ProgressService,
    private pageComponent: PageComponent,
    private cd: ChangeDetectorRef
  ) {
    this.mediaId = 0;
    this.mediaTitle = '';
    this.mediaType = '';
    this.seriesData = {};
    this.seriesDataLoaded = false;
    this.seasonSelectedIndex = 0;
    this.idPerfil = 0;
    this.resultsRecommended = {};
    this.resultsLoaded = false;
    this.data = {};
    this.main = {};

    this.main = {};
    this.data = {};
    this.serieMovie = {};

    this.episodePosition = [];
    this.episodeDuration = [];

    this.cardProperties = {
      orientation: 'vertical',
      movieLogo: true,
      hasProgressBar: true
    };

    this.mediaLoaded = false;

    this.favoriteState = false;
    this.favoriteList = [];
  }

  ngOnInit(): void {
    const isLogged = parseInt(this.profileService.selectedProfile);
    this.idPerfil = isLogged || 0;

    this.route.paramMap.subscribe((params) => {
      this.mediaLoaded = false;

      this.mediaId = Number(params.get('id'));
      this.mediaType = String(params.get('type'));

      if (params.get('isParamount') === 'true') this.isParamount = true;

      if (this.mediaType === 'serie' || this.mediaType === 'filme')
        this.getMainInfo(this.idPerfil);

      this.getFavoritesList();
      if (this.mediaType === 'serie') this.getProgress();

      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });

    try {
      window.screen.orientation.lock('portrait');
    } catch {}
  }

  ngOnDestroy(): void {
    this.pageComponent.setScreenRent(false);
  }

  public getProgress(): void {
    this.progressService
      .getProgress(this.idPerfil, this.mediaType, this.mediaId)
      .subscribe((data) => {
        if (this.mediaType === 'serie') {
          for (let i = 0; i < data.seasons.length; i++) {
            this.episodePosition[i] = [];
            this.episodeDuration[i] = [];
            for (let j = 0; j < data.seasons[i].episodes.length; j++) {
              this.episodePosition[i].push(
                data.seasons[i].episodes[j].position
              );
              this.episodeDuration[i].push(
                data.seasons[i].episodes[j].duration
              );
            }
          }
        } else {
          this.serieMovie.position = data.position;
          this.serieMovie.duration = data.duration;
        }
      });
  }

  public getFavoritesList(): void {
    this.favoriteState = false;

    this.homeService.getDataList(this.idPerfil).subscribe((data) => {
      this.favoriteList = data.my_list!;

      this.getFavoriteState();
    });
  }

  public getFavoriteState(): void {
    let index = this.favoriteList.find(
      (favoriteItem) => favoriteItem.id === this.mediaId
    );

    if (index) this.favoriteState = true;
    else this.favoriteState = false;
  }

  public changeFavoriteState(): void {
    let mediaType = '';
    if (this.mediaType === 'filme') mediaType = 'movie';
    else mediaType = 'show';

    this.detailsService
      .changeFavoriteState(this.idPerfil, this.mediaId.toString(), mediaType)
      .subscribe((data) => {});
  }

  public getRecommended(profileId: number): void {
    this.isEmptySugestions = false;
    this.sectionService
      .getSectionItensList(profileId, 61, 4, 1, 6)
      .subscribe((data: SectionCardListData) => {
        if (data.list?.length === 0) this.isEmptySugestions = true;
        this.resultsRecommended = data;
        this.prepareCardImages();
      });
  }

  public prepareCardImages() {
    this.resultsRecommended.list?.forEach(async (element) => {
      element.imageUrl = await this.buildUrlImage.buildUrlImage(
        element.cdn,
        element.cover
      );
    });

    this.resultsLoaded = true;
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
        if (Number(this.seriesData.finalPrice) > 0) {
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

          this.serieMovie.titleHasContentIsComing = item.titleHasContentIsComing;
          this.serieMovie.newContentDescription = item.newContentDescription;
          this.loadSeasonSelected(0);
        } else {
          this.serieMovie = item;
          this.getProgress();
        }

        this.mediaLoaded = true;
        this.firstTime = false;
        this.isParamountFreemium = item.isParamountFreemium;
        this.isNSportsPayment = item.isNSportsPayment;
        this.serieMovie.isParamountFreemium = this.isParamountFreemium;
        this.serieMovie.isNSportsPayment = this.isNSportsPayment;
        this.cd.detectChanges();
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

  public loadSeasonSelected(index: number): void {
    this.seasonSelectedIndex = index;

    this.buildImages();
  }

  public buildImages(): void {
    this.seriesData.seasons![this.seasonSelectedIndex].videos!.forEach(
      async (element) => {
        element.imageUrl = await this.buildUrlImage.buildUrlImage(
          element.cdn,
          element.highlight
        );
      }
    );

    this.seriesDataLoaded = true;
  }

  public buildImage(
    cdnId: number | undefined,
    imageName: string | undefined
  ): string {
    let urlCdn: Cdnlist | undefined = this.main?.cdnlist?.find(
      (cdn?: any) => cdn.id === cdnId
    );

    if (this.serieMovie.isNSportsMatch) {
      return `${environment.imageServiceNSports}/${this.serieMovie.highlight}`;
    }
    if (this.serieMovie.isConmebolLibertadoresMatch) {
      return `${environment.libertadoresImageService}/${this.serieMovie.highlight}`;
    }

    if (urlCdn && urlCdn.value && this.data.ks) {
      return urlCdn.value
        .replace('{image}', imageName!)
        .replace('{ks}', this.data.ks);
    }
    return '';
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
      this.seriesDataLoaded = false;

      this.loadSeriesData(profileId, res, this.mediaId, this.mediaType);
      this.getRecommended(profileId);
    });
  }
}
