import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PageComponent } from '../core/page/page/page.component';
import {
  CardListData,
  SectionCardListData
} from '../shared/interfaces/card-home';
import { Cdnlist } from '../shared/interfaces/cdnlist';
import { MainStructure } from '../shared/interfaces/main-structure';
import { SectionSearchResultsCounter } from '../shared/interfaces/section-search-results-counter';
import { CheckDeviceService } from '../shared/services/check-device.service';
import { HomeService } from '../shared/services/home.service';
import { ProfileService } from '../shared/services/profile.service';
import { SearchService } from '../shared/services/search.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public keyword: string = '';
  public main: MainStructure;
  public idPerfil: number;
  public data: Data;
  public loading: boolean;
  public movieCards: CardListData[];
  public serieCards: CardListData[];
  public resultCards: CardListData[];
  public searchLoading: boolean;
  public resultsFeedback: SectionSearchResultsCounter;
  public resultsLoaded: boolean;
  public resultsRecommended: SectionCardListData;
  public category: string;
  public isMobile: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private homeService: HomeService,
    private profileService: ProfileService,
    private pageComponent: PageComponent,
    private location: Location,
    private checkDeviceService: CheckDeviceService
  ) {
    this.main = {};
    this.idPerfil = 0;
    this.data = [];
    this.category = '';
    this.loading = false;
    this.movieCards = [];
    this.serieCards = [];
    this.resultCards = [];
    this.searchLoading = false;

    this.resultsFeedback = {};
    this.resultsLoaded = false;
    this.resultsRecommended = {};
  }

  ngOnInit(): void {
    this.isMobile = this.checkDeviceService.isMobile();
    this.loading = true;
    const isLogged = parseInt(this.profileService.selectedProfile);
    if (isLogged) {
      this.idPerfil = isLogged;

      this.getMainInfo(this.idPerfil);

      this.searchLoading = true;
    }
  }

  private getQueryParams(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.keyword = params['keyword'];
      this.category = params['category'];

      this.movieCards = [];
      this.serieCards = [];
      this.getSearchList();
    });
  }

  private getSearchList(): void {
    this.resultCards = [];
    this.resultsFeedback = {};
    this.resultsLoaded = true;
    this.searchLoading = true;

    if (this.keyword || this.category) {
      this.searchService
        .getSearch(
          this.idPerfil,
          this.category || this.keyword,
          1,
          400,
          !this.isMobile
        )
        .subscribe({
          next: (result) => {
            let countTVOD = 0;

            for (let resultItem of result.list) {
              if (this.isMobile && resultItem.availability === 'TVOD') {
                countTVOD++;
              }
            }

            this.searchLoading = false;

            this.resultsFeedback = {
              results: this.isMobile ? result.total - countTVOD : result.total,
              searchTerm:
                this.keyword == undefined ? this.category : this.keyword
            };

            this.resultsLoaded = true;

            this.resultCards = [];

            this.separeCards(result.list.splice(0, 30));

            setTimeout(() => {
              this.separeCards(result.list.splice(30, result.list.length));
            }, 2000);
          },
          error: (err) => {
            this.searchLoading = false;

            this.resultsFeedback = {
              results: 0,
              searchTerm:
                this.keyword == undefined ? this.category : this.keyword
            };

            this.searchService
              .getRecommended(this.idPerfil, 61)
              .subscribe((data: SectionCardListData) => {
                this.resultsRecommended = data;

                this.prepareCardImages();
              });
          }
        });
    } else {
      this.location.back();
    }
  }

  public prepareCardImages() {
    this.resultsRecommended.list?.forEach((item: CardListData) => {
      item.imageUrl = this.buildUrlImage(item.cdn, item.cover);
    });

    this.resultsLoaded = true;
  }

  private separeCards(cardsResult: CardListData[]): void {
    if (cardsResult.length > 0) {
      cardsResult.map((item) => {
        if (this.checkDeviceService.isMobile() && item.availability === 'TVOD')
          return;

        if (item.isNSports) {
          item.imageUrl = `${environment.imageServiceNSports}/${item?.cover}`;
        } else {
          item.imageUrl = this.buildUrlImage(item?.cdn, item?.cover);
        }

        this.resultCards.push({
          ...item,
          rentable: true,
          rentMovieTitle: true
        });
      });
    }
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
      case 12:
        return `${environment.libertadoresImageService}/${imageName}`;
      default:
        return url!.value!.replace('{image}', imageName!);
    }
  }

  private getMainInfo(idPerfil: number): void {
    this.homeService.getMainList(idPerfil).subscribe((data: MainStructure) => {
      this.main = data;

      this.getQueryParams();

      this.getDataInfo(idPerfil);
    });
  }

  private getDataInfo(profileId: number): void {
    this.homeService.getDataList(profileId).subscribe((res) => {
      this.data = res;
      this.loading = false;
    });
  }
}
