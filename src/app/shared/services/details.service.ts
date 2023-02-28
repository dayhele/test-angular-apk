import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../interfaces/movie';
import { MediaPlan } from '../interfaces/plan';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  constructor(private http: Http) {}

  public changeFavoriteState(
    id_perfil: number,
    id: string,
    tipo: string
  ): Observable<any> {
    return this.http.post('/v2/favorito', {
      id_perfil,
      id,
      tipo
    });
  }

  public getFavoriteState(
    profileId: number,
    id: string,
    typeSerie: string
  ): Observable<any> {
    return this.http.get('/v2/favorite', {
      id_perfil: profileId,
      item_id: id,
      item_type: typeSerie
    });
  }

  public getDetails(
    profileId: string,
    id: number,
    typeSerie: string
  ): Observable<Movie> {
    return this.http.post('v3/title', {
      id_perfil: profileId || 0,
      id: id,
      tipo: typeSerie
    });
  }

  public getDetailsPlan(id: number): Observable<MediaPlan> {
    return this.http.post(
      'v3/getplanbyid?key=b1aa9facd472bc233f07febdc04cb41cdc255b5a80624d67642990375e138afd',
      {
        id: id
      }
    );
  }
}
