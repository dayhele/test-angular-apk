import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterForm } from '../interfaces/register-form';
import { RegisterResponse } from '../interfaces/register-response';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly endpoint: string = 'v3/user';
  constructor(private http: Http) { }

  public registerUser(user: RegisterForm): Observable<RegisterResponse> {
    let httpParams = new HttpParams().append(
      'key',
      'b1aa9facd472bc233f07febdc04cb41cdc255b5a80624d67642990375e138afd'
    );

    let _user = Object.assign({}, user);
    _user.pTelefone = `55${_user.pTelefone.replace(/ /g, "").replace(/[^\w\s]/gi, '')}`;

    return this.http.post(`${this.endpoint}`, _user, httpParams);
  }
}
