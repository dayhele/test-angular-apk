import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LibertadoresService {
  constructor(private http: Http) {}

  public getPhases(): Observable<any> {
    return this.http.get('v3/conmebol-libertadores/phases');
  }
  public getPhase(id_perfil: number, genre_id: number): Observable<any> {
    let payload: any = { id_perfil, genre_id };
    return this.http.post('v3/conmebol-libertadores/phase', payload);
  }

  public getMatches(id_perfil: number): Observable<any> {
    let payload: any = { id_perfil };
    return this.http.post(
      'v3/conmebol-libertadores/live-is-coming-matches',
      payload
    );
  }
  public getList(id_perfil: number): Observable<any> {
    let payload = {
      id_perfil,
      id: 10090,
      page: 1,
      size: 12,
      variance: 4
    };
    return this.http.post('v3/list', payload);
  }
}
