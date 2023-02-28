import { ActivatedRoute } from '@angular/router';
import { CardSportsHighlights } from './../shared/interfaces/card-sports-highlights';
import { HighlightService } from './../shared/services/highlight.service';
import { Component, HostListener, OnInit } from '@angular/core';

import {
  SectionControlData,
  CardsForhome,
  SectionCardListData
} from '../shared/interfaces/card-home';
import { ProfileService } from '../shared/services/profile.service';
import { MainStructure } from '../shared/interfaces/main-structure';
import { Cdnlist } from '../shared/interfaces/cdnlist';
import { MoviesSeriesService } from '../shared/services/movies-series.service';
import { Movie } from '../shared/interfaces/movie';
import { PageBanner } from '../shared/interfaces/banners';
import { sortPageSectionsByOrder } from '../../utils/sortPageSectionsByOrder';
import { formatSectionList } from '../../utils/formatSectionList';
import { PageComponent } from '../core/page/page/page.component';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styleUrls: ['./highlights.component.scss']
})
export class HighlightsComponent implements OnInit {
  public highlightData: SectionControlData[];
  public highlightsControl: CardSportsHighlights[];
  public id_perfil: number;
  public id: number;
  public main: MainStructure;
  public isLoading: boolean;
  public cdnList: Cdnlist;
  public movieList: Movie[];
  public screen_x: number;
  public pageBanner: PageBanner;

  @HostListener('window: resize', ['$event'])
  public onResize() {
    this.screen_x = window.innerWidth;
  }
  constructor(
    private highlightService: HighlightService,
    private profileService: ProfileService,
    private moviesSeriesService: MoviesSeriesService,
    private route: ActivatedRoute,
    private pageComponent: PageComponent
  ) {
    this.highlightData = [];
    this.highlightsControl = [];
    this.main = {};
    this.isLoading = true;
    this.cdnList = {};
    this.movieList = [];
    this.screen_x = 0;
    this.id_perfil = 0;
    this.pageBanner = {};
    this.id = 0;

    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
  }

  ngOnInit(): void {
    if (window) this.screen_x = window.innerWidth;

    const isLogged = parseInt(this.profileService.selectedProfile);

    if (isLogged) {
      this.id_perfil = isLogged;
      this.getMainInfo(this.id_perfil);
    }

    this.getHighlightsData();
    this.getHighlightBanner();
  }

  public orderSectionData() {
    let counter = 1;
    this.highlightsControl.forEach((element: CardSportsHighlights) => {
      element.order = counter;
      counter++;
    });
    this.getSectionsData();
  }

  public getSectionsData() {
    let counter = 1;

    this.highlightsControl.forEach((item: CardSportsHighlights) => {
      this.highlightService
        .getBestMomentsSectionList(item.id!, this.id_perfil, 4, 1, 500)
        .subscribe(
          (sectionData: SectionCardListData) => {
            this.highlightData = formatSectionList(
              sectionData,
              item,
              this.main,
              this.highlightData
            );
          },
          (error) => console.warn(error),
          () => {
            if (counter === this.highlightsControl.length) {
              this.highlightData.sort(sortPageSectionsByOrder);
              this.isLoading = false;
            } else counter++;
          }
        );
    });
  }

  public getHighlightsData() {
    this.highlightService
      .getBestMomentsData(this.id_perfil, this.id)
      .subscribe((data: CardsForhome) => {
        this.highlightsControl = data.lists!;
        this.orderSectionData();
      });
  }

  public getHighlightBanner() {
    this.highlightService
      .getBestMomentsBanner()
      .subscribe((data: PageBanner) => (this.pageBanner = data));
  }

  public getMainInfo(id_perfil: number): void {
    this.highlightService
      .getMainList(id_perfil)
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
        .getDetails(this.id_perfil, id, type)
        .subscribe((movie) => {
          this.movieList.push(movie);
        });
    }
  }
}
