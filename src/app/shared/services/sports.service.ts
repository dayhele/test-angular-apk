import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageBanner } from '../interfaces/banners';
import { CardsForhome, SectionCardListData } from '../interfaces/card-home';
import { FullSection } from '../interfaces/full-section';
import { MainStructure } from '../interfaces/main-structure';
import { Http } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportsService {
  constructor(private http: Http) {}

  public getSportsBanner(): Observable<PageBanner> {
    return this.http.getExternal(
      'https://run.mocky.io/v3/ec4f7fef-9850-49f4-90e0-0f24da6b43e4'
    );
  }

  public getSportsData(id_perfil: number): Observable<CardsForhome> {
    return this.http.post('v3/lists', { id: 10070, id_perfil });
  }

  public getSportsSectionList(
    id_perfil: number,
    id: number
  ): Observable<SectionCardListData> {
    return this.http.post('v3/list', {
      id_perfil,
      id,
      page: 1,
      size: 12,
      caller: 'TV'
    });
  }

  public getSpecificSection(): Observable<FullSection> {
    return this.http.getExternal(
      'https://run.mocky.io/v3/fd2b5999-cf71-465e-b3bb-f693078678a4'
    );
  }

  public getMainList(idPerfil: number): Observable<MainStructure> {
    return this.http.post('v3/main', { id_perfil: idPerfil,client: environment.client, mobile: environment.app });
  }
}
