import { Component, OnInit } from '@angular/core';
import { buildUrlImage } from '../../utils/buildUrlImage';
import { PageComponent } from '../core/page/page/page.component';
import {
  CardListData,
  SectionCardListData
} from '../shared/interfaces/card-home';
import { Cdnlist } from '../shared/interfaces/cdnlist';
import { MainStructure } from '../shared/interfaces/main-structure';
import { Submenu } from '../shared/interfaces/submenu';
import { CheckDeviceService } from '../shared/services/check-device.service';
import { HomeService } from '../shared/services/home.service';
import { ProfileService } from '../shared/services/profile.service';
import { SectionService } from '../shared/services/section.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public favoriteCards: CardListData[];
  public favoriteCardsFilter: CardListData[];
  public isLoading: boolean;

  public main: MainStructure;
  public idPerfil: number;
  public cdnList: Cdnlist;

  public categories: Submenu[];

  public isMobile: boolean = false;

  constructor(
    private homeService: HomeService,
    private sectionService: SectionService,
    private profileService: ProfileService,
    private pageComponent: PageComponent,
    private checkDeviceService: CheckDeviceService
  ) {
    this.favoriteCards = [];
    this.favoriteCardsFilter = [];
    this.isLoading = true;

    this.main = {};
    this.cdnList = {};
    this.idPerfil = 0;

    this.categories = [];
  }

  ngOnInit(): void {
    const isLogged = parseInt(this.profileService.selectedProfile);

    if (isLogged) {
      this.idPerfil = isLogged;
      this.getMainInfo(this.idPerfil);
      this.isMobile = this.checkDeviceService.isMobile();
    }
  }

  public getMainInfo(idPerfil: number): void {
    this.homeService.getMainList(idPerfil).subscribe((data: MainStructure) => {
      this.main = data;

      this.cdnList = data.cdnlist;
      this.getListOfFilms(idPerfil, 22);

      data.menu?.forEach((menu) => {
        if (menu.id === 2) {
          this.categories = menu.submenu || [];
        }
      });
    });
  }

  private getListOfFilms(profileId: number, listId: number): void {
    this.sectionService
      .getSectionItensList(profileId, listId, 4, 1, 80, !this.isMobile)
      .subscribe((list: SectionCardListData) => {
        if (list && list.list) {
          this.favoriteCards = this.imagePath(list.list);
          this.favoriteCardsFilter = this.favoriteCards;
          this.isLoading = false;
        }
      });
  }

  private imagePath(list: CardListData[]): CardListData[] {
    const cards = list;
    return cards.map((item) => {
      return {
        ...item,
        imageUrl: buildUrlImage(item?.cdn, item?.cover, this.main)
      };
    });
  }

  public applyFilter(categorie: string) {
    if (categorie === 'Todos') this.favoriteCardsFilter = this.favoriteCards;
    else {
      this.favoriteCardsFilter = [];

      let system = this;

      this.favoriteCards.forEach(function (item) {
        if (item.genres?.includes(categorie))
          system.favoriteCardsFilter.push(item);
      });
    }
  }
}
