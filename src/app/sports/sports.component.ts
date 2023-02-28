import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import { formatSectionList } from '../../utils/formatSectionList';
import { sortPageSectionsByOrder } from '../../utils/sortPageSectionsByOrder';
import { PageComponent } from '../core/page/page/page.component';
import { PageBanner } from '../shared/interfaces/banners';
import { CardDefault } from '../shared/interfaces/card-default';
import {
  CardsForhome,
  CardsForSports,
  SectionCardListData,
  SectionControlData
} from '../shared/interfaces/card-home';
import { Cdnlist } from '../shared/interfaces/cdnlist';
import { FullSection } from '../shared/interfaces/full-section';
import { MainStructure } from '../shared/interfaces/main-structure';
import { Movie } from '../shared/interfaces/movie';

import { MoviesSeriesService } from '../shared/services/movies-series.service';
import { ProfileService } from '../shared/services/profile.service';
import { SportsService } from '../shared/services/sports.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit {
  public sportsData: SectionControlData[];
  public sportsControl: CardDefault[];
  public idPerfil: number;
  public main: MainStructure;
  public isLoading: boolean;
  public cdnList: Cdnlist;
  public movieList: Movie[];
  public screen_x: number;
  public fullSection: FullSection;
  public pageBanner: PageBanner;
  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
  }
  constructor(
    private sportsService: SportsService,
    private profileService: ProfileService,
    private moviesSeriesService: MoviesSeriesService,
    private pageComponent: PageComponent
  ) {
    this.sportsData = [];
    this.sportsControl = [];
    this.main = {};
    this.isLoading = true;
    this.cdnList = {};
    this.movieList = [];
    this.screen_x = 0;
    this.idPerfil = 0;
    this.fullSection = {};
    this.pageBanner = {};
  }

  ngOnInit(): void {
    if (window) this.screen_x = window.innerWidth;

    const isLogged = parseInt(this.profileService.selectedProfile);

    if (isLogged) {
      this.idPerfil = isLogged;
      this.getMainInfo(this.idPerfil);
    }

    this.getSportsData();
    this.getSportsBanner();
    this.getSpecificSection();
  }

  public orderSectionData() {
    let counter = 1;
    this.sportsControl.forEach((element: CardDefault) => {
      element.order = counter;
      counter++;
    });
    this.getSectionsData();
  }

  public getSectionsData() {
    let counter = 1;

    this.sportsControl.forEach((item: CardDefault) => {
      this.sportsService
        .getSportsSectionList(this.idPerfil, item.id!)
        .subscribe({
          next: (sectionData: SectionCardListData) => {
            this.sportsData = formatSectionList(
              sectionData,
              item,
              this.main,
              this.sportsData
            );
          },
          error: (error) => console.warn(error),
          complete: () => {
            if (counter === this.sportsControl.length) {
              this.sportsData.sort(sortPageSectionsByOrder);
              this.isLoading = false;
            } else counter++;
          }
        });
    });
  }

  public getSportsData() {
    this.sportsService
      .getSportsData(this.idPerfil)
      .subscribe((data: CardsForhome) => {
        this.sportsControl = data.lists!;
        this.orderSectionData();
      });
  }

  public getSpecificSection() {
    this.sportsService
      .getSpecificSection()
      .subscribe((data: FullSection) => (this.fullSection = data));
  }

  public getSportsBanner() {
    this.sportsService
      .getSportsBanner()
      .subscribe((data: PageBanner) => (this.pageBanner = data));
  }

  public getMainInfo(idPerfil: number): void {
    this.sportsService
      .getMainList(idPerfil)
      .subscribe((data: MainStructure) => {
        this.main = data;

        this.cdnList = data.cdnlist;

        this.mapBanner();
      });
  }

  private mapBanner(): void {
    this.main.banners?.map((banner) => {
      this.loadMovie(banner?.id, banner?.type);
    });
  }

  public loadMovie(id: number | undefined, type: string | undefined) {
    if (id && type) {
      this.moviesSeriesService
        .getDetails(this.idPerfil, id, type)
        .subscribe((movie) => {
          this.movieList.push(movie);
        });
    }
  }
}
