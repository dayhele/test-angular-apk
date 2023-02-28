import { Profile } from 'src/app/shared/interfaces/profile';
import { Http } from './../../shared/services/http.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PinService {
  constructor(private http: Http) {}

  public createPin(profile: Profile, pin: string): Observable<any> {
    let _profile = { ...profile };
    _profile.pin = pin;
    return this.http.put('v3/profile', _profile);
  }

  public verifyPin(id_perfil: number, pin: string): Observable<any> {
    return this.http.post('/v2/pin/check', {
      id_perfil,
      pin
    });
  }

  public forgotPin(id_perfil: number, email: string): Observable<any> {
    return this.http.post('/v2/pin/forgot-pass', {
      id_perfil: id_perfil,
      email: email
    });
  }
}
