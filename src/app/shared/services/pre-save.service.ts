import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardData } from '../interfaces/card';
import { PreSaves } from '../interfaces/pre-saves';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PreSaveService {
  constructor(private http: Http) {}

  public rememberMe(id_perfil: number, id_pre_save: number): Observable<any> {
    return this.http.post('v3/pre-save/remember-me', {
      id_perfil,
      id_pre_save
    });
  }

  public getAllPreSaves(id_perfil: number): Observable<PreSaves[]> {
    return this.http.post('v3/pre-save/get-all', {
      id_perfil
    });
  }
}
