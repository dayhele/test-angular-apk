import { DetailsService } from './../../services/details.service';
import { Component, Input, OnInit } from '@angular/core';
import { CardData } from '../../interfaces/card';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent {
  @Input() public movieSerie: any = {};
  @Input() public idPerfil: number = 0;
  @Input() public type: string = '';
  @Input() public dataListFiltered: CardData[] = [];
  @Input() public dataList: CardData[] = [];

  constructor(private favoriteService: DetailsService) {}

  public toggleFavoriteState() {
    if (!this.movieSerie.type && this.movieSerie.tipo)
      this.movieSerie.type = this.movieSerie.tipo;

    this.movieSerie.favorite = !this.movieSerie.favorite;
    this.favoriteService
      .changeFavoriteState(
        this.idPerfil,
        this.movieSerie.id,
        this.movieSerie.type || this.type
      )
      .subscribe((result) => {
        if (result.action === 'deleted') {
          this.removeElementFromArray(this.dataList, this.movieSerie.id);
          this.removeElementFromArray(
            this.dataListFiltered,
            this.movieSerie.id
          );
        }
      });
  }

  private async removeElementFromArray(
    dataList: CardData[],
    movieSerieId: number
  ) {
    for (let index = 0; index < dataList.length; index++) {
      if (dataList[index].id === movieSerieId) {
        dataList.splice(index, 1);
        break;
      }
    }
  }
}
