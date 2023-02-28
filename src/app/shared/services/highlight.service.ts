import { BestMoments } from './../interfaces/best-moments';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from './http.service';
import { CardsForhome, SectionCardListData } from '../interfaces/card-home';
import { MainStructure } from '../interfaces/main-structure';
import { PageBanner } from '../interfaces/banners';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {
  constructor(private http: Http) {}

  public getBestMomentsBanner(): Observable<PageBanner> {
    return this.http.getExternal(
      'https://run.mocky.io/v3/020cbf4f-4938-419b-af02-018030ebce0c'
    );
  }

  public getBestMomentsData(
    id_perfil: number,
    id: number
  ): Observable<CardsForhome> {
    return this.http.post('v3/lists', { id_perfil, id, api: true });
  }

  public getBestMomentsSectionList(
    id: number,
    id_perfil: number,
    variance: number,
    page: number,
    size: number
  ): Observable<SectionCardListData> {
    return this.http.post('v3/list', { id, id_perfil, variance, page, size });
  }

  public getMainList(idPerfil: number): Observable<MainStructure> {
    return this.http.post('v3/main', { id_perfil: idPerfil,client: environment.client,mobile: environment.app});
  }
}
