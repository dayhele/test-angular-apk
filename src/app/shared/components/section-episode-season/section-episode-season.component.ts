import { Device } from 'src/app/helpers/device';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
  ElementRef
} from '@angular/core';
import { CardData, CardProperties } from '../../interfaces/card';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { KeepWatching } from '../../interfaces/keep-watching';
import { Theme } from 'src/assets/theme/theme';
import { CheckDeviceService } from '../../services/check-device.service';
import { ProgressService } from '../../services/progress.service';
import { BuildUrlImageService } from '../../../shared/services/build-url-image.service';
import { Movie } from '../../interfaces/movie';
import { ProfileService } from '../../services/profile.service';
import { MoviesSeriesService } from '../../../shared/services/movies-series.service';
import { MainStructure } from '../../interfaces/main-structure';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination, Navigation, Virtual } from 'swiper';

SwiperCore.use([Pagination, Navigation, Virtual])

@Component({
  selector: 'app-section-episode-season',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './section-episode-season.component.html',
  styleUrls: ['./section-episode-season.component.scss']
})
export class SectionEpisodeSeasonComponent implements OnChanges {
  @ViewChild('swiperRef', { static: false }) swiper!: SwiperComponent;
  @ViewChild('loadMoreVideos') loadMoreVideos!: ElementRef;

  public checkMobile: boolean = false;

  @Input() public title: string = '';
  @Input() public subtitle: string = '';
  @Input() public viewMore: string = '';
  @Input() public idPerfil: number = 0;
  @Input() public serieId: number = 0;

  @Input() public hasAwesomenessLogo: boolean = false;
  @Input() public hasCustomIcon: string = '';
  @Input() public properties: CardProperties = {};
  @Input() public data: CardData[] = [];
  @Input() public rented: string = '';

  @Input() public verMais: boolean = false;
  @Input() public section: any = {};
  @Input() public id: number = 0;
  @Input() public isInfinity: boolean = false;
  @Input() public keepWatchingList: KeepWatching[] = [];

  @Input() public goToWatch: boolean = false;

  @Input() public isParamount: boolean = false;
  @Input() public hasParamount: boolean = false;
  @Input() public hasSectionIcon: boolean = false;
  @Output() public hasntParamountEvent: EventEmitter<any> = new EventEmitter();

  public environment: any = environment;
  public isMobile: boolean = false;
  public episodePosition: any[] = [];
  public episodeDuration: any[] = [];
  public serieMovie: Movie;
  public mediaType: string;
  public isload: boolean = false;
  public isMoreVideos: boolean = false;
  public isLoadMorVideos: boolean = false;
  public main: MainStructure = {};
  public moreVideos: number = 1;
  public isNovelas: boolean = false;

  constructor(
    private router: Router,
    public theme: Theme,
    private progressService: ProgressService,
    private profileService: ProfileService,
    private seriesService: MoviesSeriesService,
    private buildUrlImage: BuildUrlImageService,
    private activatedRoute: ActivatedRoute,
    public checkDevice: CheckDeviceService
  ) {
    this.checkMobile = this.checkDevice.isMobile();
    this.isMobile = Device.isMobile();
    this.idPerfil = parseInt(this.profileService.selectedProfile);
    this.serieMovie = {};
    this.mediaType = 'serie';
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.swiper.swiperRef.slideTo(0, 0);
    }, 1000 * 5);
  }


  ngOnChanges(): void {
    if(this.activatedRoute.snapshot.paramMap.get('category') != 'curso'){
      this.isNovelas = true;
    }
    this.buildRoute();
    if (isNaN(this.idPerfil)) this.idPerfil = 0;
    this.progressService
      .getProgress(this.idPerfil, this.mediaType, this.serieId)
      .subscribe((data) => {
        for (let i = 0; i < data.seasons.length; i++) {
          this.episodePosition[i] = [];
          this.episodeDuration[i] = [];
          for (let j = 0; j < data.seasons[i].episodes.length; j++) {
            this.episodePosition[i].push(data.seasons[i].episodes[j].position);
            this.episodeDuration[i].push(data.seasons[i].episodes[j].duration);
          }
        }
      });
    this.isload = false;
  }


  onSwiper(swiper: any) {
    let _episode: any = 0;
    if(this.data != undefined)
      this.data.forEach(async (data: any) => {
        if (data.completed == true) _episode = data.order;
      });

      swiper.activeIndex = _episode;
  }

  onClickSwiper(swiper: any) {
    if (
      swiper[0].isEnd &&
      this.activatedRoute.snapshot.paramMap.get('category') != 'curso'
    ) {
      this.moreVideos = this.moreVideos + 1;
      this.getMoreVideos(this.idPerfil, this.serieId, this.moreVideos);
    }
  }

  getMoreVideos(_idPerfil: number, _id: number, _count: number) {
    this.seriesService
      .getDetailsNovelas(_idPerfil, _id, this.data.length/20+1, 20)
      .subscribe((item: any) => {
        if (item.current_page <= item.pages) {
          this.moreVideos = item.current_page;
          item.videos.forEach(async (element: any) => {
            element.cover = element.highlight;
            element.serieId = _id;
            element.censorship = element.censorship;

            element.imageUrl = await this.buildUrlImage.buildUrlImage(
              element?.cdn,
              element?.cover
            );

            element.route = `watch?id=${element.serieId}&type=serie&isLive=false&episodeId=${element.id}&isMarathon=false&position=${element.position}&playOnChromecast=false&isNovelas=${this.isNovelas}`;
            this.data.push(element);
          });
          this.swiper.swiperRef.slideTo(this.data.length-10, 0);
        }
      });
  }

  private buildRoute(): void {
    if(this.data != undefined)
      this.data.forEach(async (element) => {
        let _now = new Date();
        let _expireDate = new Date(element.expire!);
        let _diffTime = Math.round((Number(_expireDate) - Number(_now)) / 1000);

        element.expired = _diffTime < 0;

        if (this.goToWatch) {
          if(this.idPerfil == 0) element.route = `/welcome/find`;
          else element.route = `watch?id=${element.serieId}&type=serie&isLive=false&episodeId=${element.id}&isMarathon=false&position=${element.position}&playOnChromecast=false&isNovelas=${this.isNovelas}`;
        } else
          element.route = `/details/${element.id}/${element.type}/${this.isParamount}`;
      });
  }

  public viewMoreClick(): void {
    this.router.navigateByUrl(this.viewMore);
  }

  public hasntParamount(): void {
    this.hasntParamountEvent.emit();
  }

}
