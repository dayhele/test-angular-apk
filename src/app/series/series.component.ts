import { Component } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Theme } from 'src/assets/theme/theme';
import { PlanAccessControlService } from '../shared/services/plan-access-control.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SectionService } from '../shared/services/section.service';
import { Cdnlist } from '../shared/interfaces/cdnlist';
import { MainStructure } from '../shared/interfaces/main-structure';
import { BuildUrlImageService } from '../shared/services/build-url-image.service';
import { DataList } from '../shared/interfaces/keep-watching';
import { HomeService } from '../shared/services/home.service';
import {
  SectionControlData,
} from '../shared/interfaces/card-home';
import { CardDefault } from '../shared/interfaces/card-default';
import { Movie } from '../shared/interfaces/movie';
import { MoviesSeriesService } from '../shared/services/movies-series.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent {
  public homeControl: CardDefault[];
  public homeControlData: SectionControlData[];
  public list$?: Observable<any>;
  public title: string = '';
  public isLoading: boolean = true;
  public isLoadingBanner: boolean = true;
  public hasCustomIcon: string = '';
  public showNoContentModal: boolean = false;
  public listId: number;
  public main: MainStructure;
  public data: DataList;
  public dataSerie: any;
  public serieMovie: Movie;
  public seriesData: Movie;

  public mediaType: string;
  public mediaTitle: string;
  public mediaId: number;

  public episodePosition: number[][];
  public episodeDuration: number[][];
  public environment: any;

  idPerfil: any;
  banner: any;
  classBanner: any;
  classBannerContainer: any;
  titlePage: any;
  description: any;
  icon: any;
  itens: Array<any>;
  isNovelas: boolean;

  constructor(
    private homeService: HomeService,
    private seriesService: MoviesSeriesService,
    private buildUrlImage: BuildUrlImageService,
    private activatedRoute: ActivatedRoute,
    private sectionService: SectionService,
    private profileService: ProfileService,
    public theme: Theme,
    public planAccessControlService: PlanAccessControlService
  ) {
    this.description = '';
    this.icon = '';
    this.itens = [];

    this.main = {};
    this.data = {};

    this.serieMovie = {};
    this.seriesData = {};
    this.episodePosition = [];
    this.episodeDuration = [];

    this.dataSerie = [];
    this.homeControl = [];
    this.homeControlData = [];
    this.listId = 0;
    this.idPerfil = parseInt(this.profileService.selectedProfile);

    this.mediaType = 'serie';
    this.mediaTitle = '';
    this.mediaId = 0;
    this.isNovelas = false;
    this.environment = environment;

  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.initPage();
    });
  }

  public initPage(): void {
    this.isLoading = true;
    this.isLoadingBanner = true;

    let _id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    let _category = String(
      this.activatedRoute.snapshot.paramMap.get('category')
    );
    let _idPerfil = parseInt(this.profileService.selectedProfile);
    if (isNaN(_idPerfil)) _idPerfil = 0;

    this.getVideos(_id, _category, _idPerfil);
    this.getMainInfo(_idPerfil);

  }

  public getVideos(_id: number, _category: string, _idPerfil: number): void {
    if (_category == 'curso' || _category == '') {
      this.classBanner = 'banner banner-default';
      this.classBannerContainer = 'banner__container';
      this.isNovelas = false;
      this.list$ = this.sectionService
        .getSectionSeasonsList(_idPerfil, _id, 0, 1, 9999)
        .pipe(
          map((res) => {
            this.icon = res.PageCustomIcon;
            this.description = res.PageCustomDescription;
            this.banner = res.PageCustomBanner;
            this.titlePage = res.PageCustomTitle;

            this.isLoading = false;
            this.isLoadingBanner = false;
            return res.list;
          })
        );
    } else if (_category == 'novelas') {
      this.classBanner = 'container__banner-novelas';
      this.classBannerContainer = 'container__banner-novelas__desc';
      this.isNovelas = true;
      this.list$ = this.sectionService
        .getSectionNovelasList(_idPerfil, _id, 0, 1, 9999)
        .pipe(
          map((res) => {
            this.icon = res.PageCustomIcon;
            this.description = res.PageCustomDescription;
            this.banner = res.PageCustomBanner;
            this.titlePage = res.PageCustomTitle;

            res.list?.forEach(async (data: any) => {
              this.seriesService
                .getDetailsNovelas(_idPerfil, data.id, 1, 10)
                .subscribe((item: any) => {
                  data.videos = item.videos;
                  data.year = data.videos[0].year;
                  data.serieId = data.id;
                  data.videos?.forEach((element: any) => {
                    element.cover = element.highlight;
                    element.serieId = data.id;
                    element.censorship = data.censorship;
                    element.route = `watch?id=${element.serieId}&type=serie&isLive=false&episodeId=${element.id}&isMarathon=false&position=${element.position}&playOnChromecast=false&isNovelas=${this.isNovelas}`;
                  });
                });

              data.serieId = data.id;
            });

            this.isLoading = false;
            this.isLoadingBanner = false;

            return res.list;
          })
        );
    }else{
    }
    //this.getMainInfo(_idPerfil);
  }

  public orderSectionData() {
    let counter = 1;
    this.homeControl.forEach((element: CardDefault) => {
      element.order = counter;
      counter++;
    });
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
    });
  }

  public buildImage(
    cdnId: number | undefined,
    imageName: string | undefined
  ): string {
    let urlCdn: Cdnlist | undefined = this.main?.cdnlist?.find(
      (cdn?: any) => cdn.id === cdnId
    );
    if (urlCdn && urlCdn.value && this.data.ks) {
      return urlCdn.value
        .replace('{image}', imageName!)
        .replace('{ks}', this.data.ks);
    }
    return '';
  }
}
