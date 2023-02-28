import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SectionCardListData } from '../interfaces/card-home';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: Http) {}

  public getSearch(
    id_perfil: number,
    keyword: string,
    page: number = 1,
    size: number = 400,
    tvod: boolean = false
  ): Observable<any> {
    let data: any = {
      id_perfil,
      keyword,
      page,
      size,
      get_tvod: 0
    };

    if (tvod) data.get_tvod = 1;

    return this.http.post('v3/search', data);
  }

  public getCategory(
    id_perfil: number,
    id: number,
    page: number = 1,
    size: number = 400
  ): Observable<any> {
    return this.http.post('/v2/list', {
      id_perfil,
      id,
      page,
      size
    });
  }

  public getRecommended(
    idPerfil: number,
    id: number,
    page?: number,
    size?: number
  ): Observable<SectionCardListData> {
    return this.http.post('v2/list', {
      id_perfil: idPerfil,
      id: id,
      page: 1,
      size: size || 6,
      caller: 'TV'
    });
  }
}
