import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  CardsForhome,
  SectionCardListData,
  CategoryRouteData,
  SectionSeasonListData,
  SectionNovelasData,
  MatchesByGenresListData
} from '../interfaces/card-home';
import { Http } from './http.service';
import { MatchesByChampionshipListData } from 'src/app/shared/interfaces/card-home';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  constructor(private http: Http) {}

  public getSectionList(
    idPerfil: number,
    id: number,
    gettvOd: boolean
  ): Observable<CardsForhome> {
    return this.http.post('v3/lists', {
      id_perfil: idPerfil,
      id: id,
      gettv_od: gettvOd
    });
  }

  public getSectionItensList(
    idPerfil: number,
    id: number,
    variance: number,
    page: number,
    size: number,
    tvod: boolean = false
  ): Observable<SectionCardListData> {
    let data: any = {
      id_perfil: idPerfil || 0,
      id: id,
      variance: variance,
      page: page,
      size: size,
      get_tvod: 0
    };

    if (tvod) data.get_tvod = 1;

    return this.http.post('v3/list', data);
  }

  public getSectionSeasonsList(
    idPerfil: number,
    id: number,
    variance: number,
    page: number,
    size: number,
    tvod: boolean = false
  ): Observable<SectionSeasonListData> {
    let data: any = {
      id_perfil: idPerfil,
      id: id,
      variance: variance,
      page: page,
      size: size,
      get_tvod: 0
    };

    if (tvod) data.get_tvod = 1;

    return this.http.post('v3/list', data);
  }

  public getSectionNovelasList(
    idPerfil: number,
    id: number,
    variance: number,
    page: number,
    size: number,
    tvod: boolean = false
  ): Observable<SectionNovelasData> {
    let data: any = {
      id_perfil: idPerfil,
      id: id,
      variance: variance,
      page: page,
      size: size,
      get_tvod: 0
    };

    if (tvod) data.get_tvod = 1;

    return this.http.post('v3/list', data);
  }

  public getCategoryRoute(
    idPerfil: number,
    idLista: number,
    id: number
  ): Observable<CategoryRouteData> {
    return this.http.post('v3/category_route', {
      id_perfil: idPerfil,
      id_lista: idLista,
      id: id
    });
  }

  public getNSportsAllPreviousMatches(
    idPerfil: number,
    limit: number,
  ): Observable<MatchesByGenresListData> {

    return this.http.post('v3/nsports/all-matches-by-genres', {
      id_perfil: idPerfil,
      limit
    });

  }

  public getNSportsMatchesByChampionship(
    idPerfil: number
  ): Observable<MatchesByChampionshipListData[]> {
    return this.http.post('v3/nsports/matches-by-championship', {
      id_perfil: idPerfil
    });
  }
}
