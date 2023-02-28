import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Data, Router } from '@angular/router';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { formatSectionList } from '../../utils/formatSectionList';
import { sortPageSectionsByOrder } from '../../utils/sortPageSectionsByOrder';
import { Banners } from '../shared/interfaces/banners';
import { CardDefault } from '../shared/interfaces/card-default';
import {
  CardsForhome,
  CategoryRouteData,
  SectionCardListData,
  SectionControlData
} from '../shared/interfaces/card-home';
import { Cdnlist } from '../shared/interfaces/cdnlist';
import { KeepWatching } from '../shared/interfaces/keep-watching';
import { MainStructure } from '../shared/interfaces/main-structure';
import { Movie } from '../shared/interfaces/movie';
import { MyList } from '../shared/interfaces/my-list';
import { Ticket } from '../shared/interfaces/subscribes';
import { HomeService } from '../shared/services/home.service';
import { MoviesSeriesService } from '../shared/services/movies-series.service';
import { ProfileService } from '../shared/services/profile.service';
import { SectionService } from '../shared/services/section.service';
import { Theme } from 'src/assets/theme/theme';
import { AccountService } from '../shared/services/account.service';
import { PlansService } from '../shared/services/plans.service';
import { DatePipe } from '@angular/common';
import { HomeControlType } from '../shared/enums/homeControlType';
import { Profile } from '../shared/interfaces/profile';
import { PlanAccessControlService } from '../shared/services/plan-access-control.service';
import { CheckDeviceService } from '../shared/services/check-device.service';
import { LoadingController } from '../shared/interfaces/loading-controller';
import { forkJoin, Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CheckSubscription } from '../shared/services/check-subscription.service';
SwiperCore.use([Pagination, Autoplay]);

declare let openSSOStingrayMusicPlayer: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
  }
  public homeControl: CardDefault[];
  public homeControlData: SectionControlData[];
  public keepWatchingList: KeepWatching[] = [];

  public screen_x: number;
  public main: MainStructure;
  public idPerfil: number;
  public data: Data;
  public path: string;
  public banners: Banners;
  public cdnList: Cdnlist;
  public movieList: Movie[];

  public isLoadingComingSoon: boolean;

  public tickets: Ticket[];

  public isMobile: boolean;
  public clickedRent: boolean;
  public isLigga: boolean = false;

  public isWatchForYou = {
    orientation: 'horizontal',
    smallCard: true,
    imageUrl:
      'https://dev.azure.com/SoftWilliansITSolutions/8b921151-be6c-4565-9a26-b6eb3fa8f293/_apis/wit/attachments/04b39048-8ffe-47e6-b0e8-4857e0415649?fileName=WPV_HBO_Horizontal.png&download=true&api-version=5.0-preview.2'
  };

  public showNoContentModal: boolean = false;

  public favoriteState: boolean;
  private favoriteList: MyList[];
  public profile: Profile;
  public profileAgeBracket: number;

  public checkMobile: boolean = false;

  public loadingController: LoadingController = {
    homeCarouselLoaded: false
  };

  public homeStructure: CardsForhome = {};

  public sections: any = [];
  public sectionsData: any = [];

  public firstGroupLoaded: boolean = false;
  public lastGroupLoaded: boolean = false;
  public actualGroupLoading: number = 1;
  public isAmericaNet: boolean;
  public americanet: boolean;

  public tokenStingray: any = '';

  public SocialIdUolBanca: any = '';
  public urlUolBanca: any = '';

  public hasUolBanca: boolean = true;
  public hasStingray: boolean = true;
  public hasHbo: boolean = true;

  public dataIsWatchForYou: any = [];
  public environment: any;
  public timer: any;

  public sectionsLoadCount: number = 1;
  @ViewChildren('sectionsLoadRef') sectionsLoadRef!: QueryList<ElementRef>;
  public ignoreCallForIds: number[] = [1, 60, 14];

  constructor(
    private route: Router,
    private homeService: HomeService,
    private sectionService: SectionService,
    private profileService: ProfileService,
    private moviesSeriesService: MoviesSeriesService,
    private accountService: AccountService,
    private plansService: PlansService,
    public theme: Theme,
    private datePipe: DatePipe,
    public planAccessControlService: PlanAccessControlService,
    public checkDeviceService: CheckDeviceService,
    private checkDevice: CheckDeviceService,
    private CheckSubscription: CheckSubscription,
    private cd: ChangeDetectorRef
  ) {
    this.checkMobile = this.checkDevice.isMobile();
    this.homeControl = [];
    this.homeControlData = [];
    this.screen_x = 0;
    this.main = {};
    this.data = [];
    this.banners = {};
    this.cdnList = {};
    this.idPerfil = 0;
    this.movieList = [];
    this.path = this.route.url;
    this.profileAgeBracket = 0;
    this.profile = {};

    this.tickets = [];

    this.isLoadingComingSoon = true;

    this.isMobile = false;
    this.clickedRent = false;
    this.isAmericaNet = false;
    this.americanet = this.theme.header.americanet;

    this.favoriteState = false;
    this.favoriteList = [];
    this.environment = environment;
  }

  ngOnInit(): void {
    this.CheckSubscription.check();
    try {
      window.screen.orientation.lock('portrait');
    } catch {}

    if (window) this.screen_x = window.innerWidth;
    this.isMobile = this.checkDevice.isMobile();
    if (this.isMobile) {
      this.ignoreCallForIds.push(18); // isKids
      this.ignoreCallForIds.push(59); // isRented
      this.ignoreCallForIds.push(10058); // isNovelas
      this.ignoreCallForIds.push(65); // isToRent
      this.ignoreCallForIds.push(10059); // isDirectvGo
      this.ignoreCallForIds.push(10060); // isHBO
      //this.ignoreCallForIds.push(10003); // isHighlights
    }

    const isLogged = parseInt(this.profileService.selectedProfile);

    this.profileService.profilesObservable.subscribe((profiles) => {
      this.profile = profiles.success?.data!.find((profile) => {
        return profile.id_perfis === this.idPerfil;
      })!;
    });

    if (isLogged) {
      this.idPerfil = isLogged;
      this.redirectAmericaNet(this.idPerfil);
      this.getFavoritesList();
    }

    this.getSubscribes();
    this.setAgeBracket();
    this.loadStingray();
    this.loadUolBanca();

    if (this.theme.client === 'watch') {
      this.dataIsWatchForYou = [
        {
          title: 'hbomax',
          imageUrl: this.planAccessControlService.hasHBO
            ? this.theme.home.hboMaxSmall
            : this.theme.home.hboMax,
          small: this.planAccessControlService.hasHBO
        },
        {
          title: 'stingray',
          imageUrl: this.planAccessControlService.hasStingrayMusic
            ? this.theme.home.stingraySmall
            : this.theme.home.stingray,
          small: this.planAccessControlService.hasStingrayMusic
        },
        {
          title: 'uolbanca',
          imageUrl: this.planAccessControlService.hasUolBanca
            ? this.theme.home.uolbancaSmall
            : this.theme.home.uolbanca,
          small: this.planAccessControlService.hasUolBanca
        }
      ];
    } else {
      this.dataIsWatchForYou = [
        {
          title: 'stingray',
          imageUrl: this.planAccessControlService.hasStingrayMusic
            ? this.theme.home.stingraySmall
            : this.theme.home.stingray,
          small: this.planAccessControlService.hasStingrayMusic
        }
      ];
    }
    //this.forceScroll();
  }

  // public forceScroll(): void {
  //   if (this.checkMobile === true) {
  //     this.timer = setTimeout(() => {
  //       window.scrollTo(0, 1);
  //     }, 8000);
  //   }
  // }

  @HostListener('window:scroll', ['$event'])
  public onViewportScroll() {
    //window.clearTimeout(this.timer);
    if (this.firstGroupLoaded) {
      this.sectionsLoadRef.forEach((ref) => {
        let refIndex: number = ref.nativeElement.dataset.index;
        if (this.homeControl[refIndex].loadStatus == 0 && window.scrollY >= ref.nativeElement.getBoundingClientRect().top) {
          this.homeControl[refIndex].loadStatus = 1;
          let _this = this;
          if (this.ignoreCallForIds.includes(this.homeControl[refIndex].id!)) {
            this.sectionsLoadCount++;
            this.homeControl[refIndex].loadStatus = 2;
            _this.cd.detectChanges();
            return;
          }
          this.getLastGroupSectionData(this.homeControl[refIndex], function(isSuccess: boolean) {
            if (isSuccess) {
              _this.homeControl[refIndex].loadStatus = 2;
              _this.cd.detectChanges();
            }
          });
        }
      });
    }
  }

  private loadStingray(): void {
    this.plansService.getCurrentPlan().subscribe((data) => {
      this.tokenStingray =
        data.Result?.Result?.token_stingray || data.Result?.token_stingray;

      if (!this.tokenStingray) {
        this.planAccessControlService.hasStingrayMusic = false;
        return;
      }

      this.planAccessControlService.hasStingrayMusic = true;

      const script = window['document'].createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute(
        'src',
        'https://playerlauncher.stingray.com/webplayer.js'
      );
      window['document'].body.appendChild(script);
    });
  }

  private loadUolBanca(): void {
    this.accountService.getAccountSubscribes().subscribe((_subscribes) => {
      this.SocialIdUolBanca =
        _subscribes.success?.marketPlace?.SocialIdUolBanca;
      if (this.SocialIdUolBanca != '')
        this.urlUolBanca =
          'https://painel.banca.leiamais.uol.com.br/banca/loginappuol?state=nouser-webbrowser&user=' +
          this.SocialIdUolBanca;

      this.hasUolBanca = _subscribes.success?.marketPlace?.uolbanca!;
      this.hasStingray = _subscribes.success?.marketPlace?.stingraymusic!;

      // Desativado por enquanto #29548
      //this.hasHbo = _subscribes.success?.marketPlace?.hbo!;
    });
  }

  cardClick(card: any) {
    switch (card.title) {
      case 'stingray':
        if (this.planAccessControlService.hasStingrayMusic) this.openStingray();
        break;

      case 'uolbanca':
        if (this.planAccessControlService.hasUolBanca) this.openUolBanca();
        break;

      case 'directvgo':
        if (this.planAccessControlService.hasDirectvGO)
          window.open('https://www.directvgo.com/br/iniciar-sessao');
        else this.route.navigateByUrl('directvgo');
        break;
    }
  }

  openStingray(): void {
    openSSOStingrayMusicPlayer(this.tokenStingray, 1235);
  }

  openUolBanca(): any {
    if (this.urlUolBanca != '')
      window.open(this.urlUolBanca.toString(), '_blank');

    this.route.navigateByUrl('/home');
  }

  public goToHBOLandingPage(): void {
    this.route.navigateByUrl('/hbomax');
  }

  public getFavoritesList(): void {
    this.favoriteState = false;

    this.homeService.getDataList(this.idPerfil).subscribe((data) => {
      this.favoriteList = data.my_list!;
      this.keepWatchingList = data.keep_watching!;

      this.getMainInfo(this.idPerfil);
    });
  }

  public getHomeStructure(): void {
    this.cd.detectChanges();
    this.sectionService
      .getSectionList(this.idPerfil, 4, false)
      .subscribe((data: CardsForhome) => {
        data.lists = data.lists?.sort((a, b) => a.order! - b.order!);

        this.homeStructure = data;
        this.homeControl = data.lists!;
        this.homeControl.map((hc) => {
          hc.loadStatus = 0;
          return hc;
        });

        let firstSection = data.lists![1];
        let SecondSection = data.lists![2];

        let _sections = [];

        if (firstSection) _sections.push(firstSection);
        if (SecondSection) _sections.push(SecondSection);

        let _this = this;
        if (this.isMobile || environment.app) {
          this.getLastGroupSectionData(this.homeControl[3], function(isSuccess: boolean) {
            if (isSuccess) {
              _this.homeControl[3].loadStatus = 2;
              _this.actualGroupLoading++;
              _this.cd.detectChanges();
            }
          })
          this.getLastGroupSectionData(this.homeControl[4], function(isSuccess: boolean) {
            if (isSuccess) {
              _this.homeControl[4].loadStatus = 2;
              _this.actualGroupLoading++;
              _this.cd.detectChanges();
            }
          })
          this.getLastGroupSectionData(this.homeControl[5], function(isSuccess: boolean) {
            if (isSuccess) {
              _this.homeControl[5].loadStatus = 2;
              _this.firstGroupLoaded = true;
              _this.actualGroupLoading++;
              _this.cd.detectChanges();
            }
          })
        } else {
          this.getFirstGroupSectionsData(_sections);
          //this.getLastGroupSectionsData();
        }
      });
  }

  public getFirstGroupSectionsData(_sections: any): void {
    let _requests: Observable<any>[] = [];
    _sections.forEach((element: any) => {
      _requests.push(
        this.sectionService.getSectionItensList(
          this.idPerfil,
          element.id,
          4,
          1,
          element.type === 'isLiveChannels' ? 99 : 12
        )
      );

      this.cd.detectChanges();
      this.sections.push(element);
    });

    this.cd.detectChanges();

    forkJoin(_requests).subscribe((data) => {
      data.forEach((element) => {
        this.sectionsData.push(element);
      });

      this.firstGroupLoaded = true;
      this.actualGroupLoading++;
      this.cd.detectChanges();
    });
  }

  public redirectAmericaNet(idPerfil: number): void {
    this.homeService.getMainList(idPerfil).subscribe((data: MainStructure) => {
      this.isAmericaNet = data.isAmericanet!;

      if (this.theme.header.americanet && this.isAmericaNet) {
        this.route.navigateByUrl('/now');
      }
    });
  }

  public getLastGroupSectionsData() {
    let counter = 1;

    this.homeControl.forEach((homeCardItem: CardDefault) => {
      let size = 12;
      if (homeCardItem.type === HomeControlType.isLiveChannels) {
        counter++;
        return;
      }

      this.sectionService
        .getSectionItensList(this.idPerfil, homeCardItem.id!, 4, 1, size)
        .subscribe(
          (sectionData: SectionCardListData) => {
            if (
              sectionData.list?.length === 0 &&
              homeCardItem.type !== 'isCarouselMain' &&
              homeCardItem.cardProperties?.orientation !== 'full'
            )
              return;

            this.homeControlData = formatSectionList(
              sectionData,
              homeCardItem,
              this.main,
              this.homeControlData
            );

            // TODO : solução paleativa para o favorito
            this.homeControlData.forEach((itens: any) => {
              itens.data.forEach((movie: any) => {
                let checkFavorite = this.favoriteList.find(
                  (favoriteItem) => favoriteItem.id === movie.id
                );

                if (itens.type === 'isKeepWatching') {
                  let checkKeepWatchingItem = this.keepWatchingList.find(
                    (keepWatchingItem) => keepWatchingItem.id === movie.id
                  );

                  if (checkKeepWatchingItem)
                    movie.serieId = checkKeepWatchingItem.episode;
                }

                if (checkFavorite) movie.favorite = true;
                else movie.favorite = false;
              });

              this.cd.detectChanges();
            });
            this.lastGroupLoaded = true;

            this.cd.detectChanges();
          },
          (error) => console.warn(error),
          () => {
            this.cd.detectChanges();
            this.homeControlData.sort(sortPageSectionsByOrder);
            if (counter === this.homeControl.length) {
              this.homeControlData.sort(sortPageSectionsByOrder);
              this.homeControlData.forEach(
                (homeControlItem: SectionControlData) => {
                  if (
                    homeControlItem.type === 'isSuggestions' ||
                    homeControlItem.type === 'isWatchForYou' ||
                    homeControlItem.type === 'isSpecificAdvertising' ||
                    homeControlItem.type === 'isComingSoon' ||
                    homeControlItem.type === 'isJump'
                  ) {
                    this.sectionService
                      .getCategoryRoute(this.idPerfil, 4, homeControlItem.id!)
                      .subscribe((categoryData: CategoryRouteData) => {
                        homeControlItem.categoryData = categoryData;
                      });
                  }
                }
              );
              this.lastGroupLoaded = true;

              this.cd.detectChanges();
            } else counter++;
          }
        );
    });
  }

  public getLastGroupSectionData(
    homeCardItem: CardDefault,
    callback: Function
  ) {
    let size = 12;
    let page = 1;
    let variance = 4;
    let list: string[] = [
      HomeControlType.isLiveChannels,
    ];
    if (list.includes(<string>homeCardItem.type)) {
      callback(true);
      return;
    }
    this.sectionService
      .getSectionItensList(
        this.idPerfil,
        homeCardItem.id!,
        variance,
        page,
        size
      )
      .subscribe(
        (sectionData: SectionCardListData) => {
          if (
            sectionData.list?.length === 0 &&
            homeCardItem.type !== HomeControlType.isCarouselMain &&
            homeCardItem.cardProperties?.orientation !== 'full'
          )
            return;
          this.homeControlData = formatSectionList(
            sectionData,
            homeCardItem,
            this.main,
            this.homeControlData
          );
          this.homeControl.forEach((hc) => {
            if (hc.id === homeCardItem.id) {
              hc.data =
                this.homeControlData[this.homeControlData.length - 1].data;
              hc.cardProperties =
                this.homeControlData[
                  this.homeControlData.length - 1
                ].cardProperties;
            }
          });
          // TODO : solução paleativa para o favorito
          this.homeControlData.forEach((items: any) => {
            items.data.forEach((movie: any) => {
              let checkFavorite = this.favoriteList.find(
                (favoriteItem) => favoriteItem.id === movie.id
              );
              if (items.type === HomeControlType.isKeepWatching) {
                let checkKeepWatchingItem = this.keepWatchingList.find(
                  (keepWatchingItem) => keepWatchingItem.id === movie.id
                );
                if (checkKeepWatchingItem)
                  movie.serieId = checkKeepWatchingItem.episode;
              }
              movie.favorite = !!checkFavorite;
            });
            this.cd.detectChanges();
          });
          this.cd.detectChanges();
        },
        (error) => console.warn(error),
        () => {
          this.cd.detectChanges();
          if (this.sectionsLoadCount === this.homeControl.length) {
            this.homeControlData.sort(sortPageSectionsByOrder);
            this.getCategoryRoute();
            this.cd.detectChanges();
          } else {
            this.homeControlData.sort(sortPageSectionsByOrder);
            this.sectionsLoadCount++;
          }
          callback(true);
        }
      );
  }

  public getCategoryRoute() {
    this.homeControlData.forEach((homeControlItem: SectionControlData) => {
      let list: string[] = [
        HomeControlType.isSuggestions,
        HomeControlType.isWatchForYou,
        HomeControlType.isSpecificAdvertising,
        HomeControlType.isComingSoon,
        HomeControlType.isJump
      ];
      if (list.includes(<string>homeControlItem.type)) {
        this.sectionService
          .getCategoryRoute(this.idPerfil, 4, homeControlItem.id!)
          .subscribe((categoryData: CategoryRouteData) => {
            homeControlItem.categoryData = categoryData;
          });
      }
    });
  }

  public getMainInfo(idPerfil: number): void {
    this.homeService.getMainList(idPerfil).subscribe((data: MainStructure) => {
      this.main = data;

      this.getHomeStructure();

      //  TODO: solução paleativa enquanto não puxa o "favorito" no banner
      data.banners?.forEach((movie: Banners) => {
        let checkFavorite = this.favoriteList.find(
          (favoriteItem) => favoriteItem.id === movie.id
        );

        if (checkFavorite) movie.favorite = true;
        else movie.favorite = false;
      });

      this.cd.detectChanges();
      this.cdnList = data.cdnlist;
      this.isLigga = data.isLigga!;

      this.mapBanner();
    });
  }

  public loadMovie(id: number | undefined, type: string | undefined) {
    if (id && type) {
      this.moviesSeriesService
        .getDetails(this.idPerfil, id, type)
        .subscribe((movie) => {
          let checkFavorite = this.favoriteList.find(
            (favoriteItem) => favoriteItem.id === movie.id
          );

          if (checkFavorite) movie.favorite = true;
          else movie.favorite = false;

          this.movieList.push(movie);
          this.loadingController.homeCarouselLoaded = true;
        });
    }
  }

  private mapBanner(): void {
    this.main.banners?.map((banner) => {
      this.loadMovie(banner?.id, banner?.type);
    });
  }

  public buildUrlImage(
    cdnId: number | undefined,
    imageName: string | undefined
  ): string {
    const url: Cdnlist | undefined = this.main?.cdnlist?.find(
      (cdn: any) => cdnId === cdn.id
    );

    switch (cdnId) {
      case 1:
        return url!.value!.replace('{image}/ks/{ks}', imageName!);

      default:
        return url!.value!.replace('{image}', imageName!);
    }
  }

  public redirectTo(id: number): void {
    this.route.navigateByUrl('highlights/' + id);
  }

  public getSubscribes(): void {
    this.profileService.getSubscribes().subscribe({
      next: (subscribes) => {
        if (
          subscribes?.success?.data?.tickets &&
          subscribes.success.data.tickets.length > 0
        ) {
          this.tickets = subscribes.success.data.tickets;
        }
      }
    });
  }

  public orderByActive(cards: any[]) {
    return cards.sort((a, b) => (a.small ? (a.title > b.title ? 1 : -1) : 1));
  }

  public setAgeBracket(): void {
    this.profileService.profilesObservable.subscribe((profiles) => {
      this.profile = profiles.success?.data!.find((profile) => {
        return profile.id_perfis === this.idPerfil;
      })!;
      this.profileAgeBracket = Number(this.profile?.age_bracket) || 18;
    });

    this.cd.detectChanges();
  }

  private addTimeCurrentDate(sum: number): string {
    let currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + sum);

    return this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm')!;
  }

  public getSkeletonInfo(src: string = 'highlights', type: string = 'count') {
    let screenW: number = this.screen_x;
    let obj: any = {
      width: 0,
      height: 0,
      space: { left: 0, right: 0 },
      margin: { right: 0, left: 0 }
    };
    switch (src) {
      case 'highlights':
        obj.height = 472;
        if (screenW <= 900) obj.height = screenW / 1.64;
        break;
      case 'channels':
        obj.width = obj.height = 152;
        if (screenW <= 600) obj.width = 117;
        obj.margin.right = 0.8 * 16;
        obj.space.left = obj.space.right = 3.5 * 16;
        break;
    }
    switch (type) {
      case 'width':
        return obj.width;
      case 'height':
        return obj.height;
      case 'marginRight':
        return obj.margin.right;
    }
    let x =
      (screenW - (obj.space.left + obj.space.right)) /
      (obj.width + obj.margin.left + obj.margin.right);
    return Math.floor(x);
  }
}
