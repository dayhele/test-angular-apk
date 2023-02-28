import { Cdnlist } from './../shared/interfaces/cdnlist';
import { SearchService } from './../shared/services/search.service';
import {
  CardListData,
  SectionCardListData
} from './../shared/interfaces/card-home';
import { SectionSearchResultsCounter } from './../shared/interfaces/section-search-results-counter';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MainStructure } from '../shared/interfaces/main-structure';
import { Submenu } from '../shared/interfaces/submenu';
import { HomeService } from '../shared/services/home.service';
import { ProfileService } from '../shared/services/profile.service';
import { PageComponent } from '../core/page/page/page.component';
import { SectionService } from '../shared/services/section.service';

@Component({
  selector: 'app-search-mobile',
  templateUrl: './search-mobile.component.html',
  styleUrls: ['./search-mobile.component.scss']
})
export class SearchMobileComponent implements OnInit {
  public searchTerm: string;
  public categories: Submenu[];
  public categoriesLoaded: boolean;

  public keyword: string;
  public resultsFeedback: SectionSearchResultsCounter;
  public resultsLoaded: boolean;
  public resultsRecommended: SectionCardListData;
  public svodCard: CardListData[];
  public rentCard: CardListData[];
  public loading: boolean;
  public searchLoading: boolean;
  public idPerfil: number;
  public main: MainStructure;
  public data: Data;
  public type: string | null;
  public idCategoria: string = '';
  public category: boolean;
  public listPage = 0;
  public clickedRent: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private sectionService: SectionService,
    private profileService: ProfileService,
    private homeService: HomeService,
    private pageComponent: PageComponent
  ) {
    this.searchTerm = '';
    this.categories = [];
    this.categoriesLoaded = false;
    this.category = false;
    this.keyword = '';
    this.resultsFeedback = {};
    this.resultsLoaded = false;
    this.resultsRecommended = {};
    this.svodCard = [];
    this.rentCard = [];
    this.searchLoading = false;
    this.loading = false;
    this.idPerfil = 0;
    this.main = {};
    this.data = [];
    this.type = '';

    this.clickedRent = false;

    this.calcItensPerPage();
  }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe(
      (params) => (this.type = params.get('type'))
    );
    const isLogged = parseInt(this.profileService.selectedProfile);
    if (isLogged) {
      this.idPerfil = isLogged;

      this.getMainInfo(this.idPerfil);
    }

    this.getCategories();
  }

  public getCategories(): void {
    let idPerfil = parseInt(this.profileService.selectedProfile);

    this.homeService.getMainList(idPerfil).subscribe((data: MainStructure) => {
      data.menu?.forEach((menu) => {
        if (menu.id === 2) {
          this.categories = menu.submenu ? menu.submenu : [];
          this.categoriesLoaded = true;
        }
      });
    });
  }

  private getQueryParams(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.keyword = params['keyword'];
      this.idCategoria = params['idCategoria'];
      this.svodCard = [];
      this.rentCard = [];
      this.getSearchList();
    });
  }

  public chipSearch(term: string): void {
    this.resultsLoaded = false;
    this.searchTerm = term;
    this.keyword = term;
    this.idCategoria='';
    this.category = true;
    this.svodCard = [];
    this.rentCard = [];
    this.listPage = 0;
    this.getSearchList();
  }

  private getMainInfo(idPerfil: number): void {
    this.homeService.getMainList(idPerfil).subscribe((data: MainStructure) => {
      this.main = data;
      this.getDataInfo(idPerfil);
    });
  }

  private getDataInfo(profileId: number): void {
    this.homeService.getDataList(profileId).subscribe((res) => {
      this.data = res;
      this.loading = false;
      this.getQueryParams();
    });
  }
  itensPerPage = 0;
  private calcItensPerPage() {
    // cálculo de quantos itens são exibidos por tela
    // padding lateral = 40px
    // largura card = 100px
    // gap entre cards = 12px

    let _colItens = 0;
    _colItens = window.innerWidth - 40;
    _colItens = _colItens / (100 + 12);
    _colItens = Math.floor(_colItens);

    // altura card = 155px
    // padding  = 96px
    // altura title = 80px
    // padding bottom title = 40px

    let _lineItens = 0;
    _lineItens = window.innerHeight - 96 - 80 - 40;
    _lineItens = _lineItens / (155 + 12);
    _lineItens = Math.ceil(_lineItens) + 2;

    // o x2 é pra trazer mais itens pois tem vários items q não são TVOD, mas não da pra saber quantos
    this.itensPerPage = _colItens * _lineItens * 2;
  }

  private totalPages: number = 999;

  onScrollDown() {
    if (this.listPage < this.totalPages && (this.svodCard.length > 0 || this.rentCard.length > 0)) this.getSearchList();
  }

  private getSearchList(): void {
    this.listPage++;

    if (this.keyword) {
      this.searchLoading = true;

      if (this.idCategoria) {
        this.sectionService
          .getSectionItensList(
            this.idPerfil,
            Number(this.idCategoria),
            4,
            this.listPage,
            this.itensPerPage
          )
          .subscribe(
            (result) => {
              this.searchLoading = false;
              this.totalPages = result.pages!;
              result.list
                ?.filter((item) => item.type === this.type)
                .map((item) =>
                  this.svodCard.push({
                    ...item,
                    rentable: false,
                    rentMovieTitle: true
                  })
                );

              this.resultsFeedback = {
                results: this.svodCard.length,
                searchTerm: this.keyword
              };

              this.resultsLoaded = true;
            },
            (err) => {
              this.searchLoading = false;

              this.resultsFeedback = {
                results: 0,
                searchTerm: this.keyword
              };

              this.loadRecommendedList();
            }
          );
      } else {
        this.searchService
          .getSearch(
            this.idPerfil,
            this.keyword,
            this.listPage,
            this.itensPerPage
          )
          .subscribe(
            (result) => {
              this.searchLoading = false;
              let countTVOD = 0;

              this.totalPages = result.pages!;

              for (let resultItem of result.list) {
                if (resultItem.availability === 'TVOD') {
                  countTVOD++;
                }
              }

              this.resultsFeedback = {
                results: result.total - countTVOD,
                searchTerm: this.keyword
              };

              this.resultsLoaded = true;

              this.prepareCardImages(result);
              this.separeCards(result.list);
            },
            (err) => {
              this.searchLoading = false;

              this.resultsFeedback = {
                results: 0,
                searchTerm: this.keyword
              };

              this.loadRecommendedList();
            }
          );
      }
    }
  }

  private loadRecommendedList(): void {
    this.searchService
      .getRecommended(this.idPerfil, 61)
      .subscribe((data: SectionCardListData) => {
        this.resultsRecommended = data;

        this.prepareCardImages(this.resultsRecommended);
      });
  }

  public prepareCardImages(result: SectionCardListData) {
    result.list?.forEach((item: CardListData) => {
      item.imageUrl = this.buildImage(item.cdn, item.cover);
    });

    this.resultsLoaded = true;
  }

  private separeCards(cardsResult: CardListData[]): void {
    if (cardsResult.length > 0) {
      cardsResult.map((item) => {
        if (
          ((item.tipo === this.type && item.availability === 'SVOD') ||
            item.type == this.type ||
            this.type === 'todos') &&
          item.availability !== 'TVOD'
        ) {
          this.svodCard.push({
            ...item,
            rentable: true,
            rentMovieTitle: true
          });
        } else if (
          item.availability !== 'SVOD' &&
          item.availability !== 'TVOD'
        ) {
          this.rentCard.push({
            ...item,
            type: item.tipo
          });
        }
      });
    }
  }

  public buildImage(
    cdnId: number | undefined,
    imageName: string | undefined
  ): string {
    let urlCdn: Cdnlist | undefined = this.main?.cdnlist?.find(
      (cdn?: any) => cdn.id === cdnId
    );
    return urlCdn!
      .value!.replace('{image}', imageName!)
      .replace('{ks}', this.data['ks']);
  }

  public onSubmit(): void {
    this.resultsLoaded = false;
    this.category = false;
    this.listPage = 0;
    this.router.navigate(['/search-mob/todos'], {
      queryParams: { keyword: this.keyword }
    });
  }

  public search(e: string): void {
    this.keyword = e;
    this.category = false;
  }
}
