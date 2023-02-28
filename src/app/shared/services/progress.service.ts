import { Injectable } from '@angular/core';
import { Http } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  constructor(private http: Http) {}

  public getProgress(
    id_perfil?: number,
    tipo?: string,
    id?: number
  ): Observable<any> {
    return this.http.post('v3/progress', { id_perfil, tipo, id });
  }

  public sendProgress(
    id_perfil?: number,
    id_sambavideos?: string,
    posicao?: number
  ): Observable<any> {
    return this.http.post('/assistindo', {
      id_perfil,
      id_sambavideos,
      posicao
    });
  }
}
