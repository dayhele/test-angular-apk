import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  constructor(private http: Http) {}

  public removePin(): Observable<any> {
    return this.http.getExternal(
      'https://run.mocky.io/v3/c4060c1b-b787-4b8b-89cd-f77df3d569a9'
    );
  }

  public verifyPin(id_perfil: number, pin: number): Observable<any> {
    return this.http.post('/v2/pin/check', { id_perfil: id_perfil, pin: pin });
  }

  public sendPin(id_perfis: number, pin: number): Observable<any> {
    return this.http.put('v3/profile', { id_perfis, pin });
  }

  public forgotPass(id_perfil: number, email: string): Observable<any> {
    return this.http.post('/v2/pin/forgot-pass', {
      id_perfil: id_perfil,
      email: email
    });
  }
}
