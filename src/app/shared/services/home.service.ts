import { LoginService } from 'src/app/shared/services/login.service';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { DataList } from '../interfaces/keep-watching';
import { MainStructure } from '../interfaces/main-structure';

import { Http } from './http.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: Http, private loginService: LoginService) {
  }

  public getUnloggedToken(): Observable<any> {
    let httpParams = new HttpParams().append(
      'key',
      'b1aa9facd472bc233f07febdc04cb41cdc255b5a80624d67642990375e138afd'
    );
    return this.http.post('v3/get_user_token', httpParams);
  }

  public getMainList(idPerfil: number): Observable<MainStructure> {
    if (idPerfil !== 0){
      return this.http.post<any, MainStructure>('v3/main', {
        id_perfil: idPerfil || 0,
        client: environment.client,
        mobile: environment.app
      });
    }else{
      return new Observable<MainStructure>((ob) => {
        this.getUnloggedToken().subscribe((data) => {
          if (environment.app) {
            ob.complete();
            return;
          }
          this.loginService.tokenUnlogged = data.token;
          this.http
            .post<any, MainStructure>('v3/main', {
              id_perfil: idPerfil || 0,
              client: environment.client,
              mobile: environment.app
            })
            .subscribe((data: MainStructure) => {
              ob.next(data);
            });
        });
      });
    }
  }

  public getDataList(profileId: number): Observable<DataList> {
    return this.http.post('/v2/profile/data', { id_perfil: profileId || 0 });
  }
}
