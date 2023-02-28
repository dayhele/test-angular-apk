import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountInfo } from '../interfaces/account-info';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountInfoService {
  constructor(private http: Http) {}

  public AccountInfo(): Observable<AccountInfo> {
    return this.http.post('v3/account/info', {});
  }
}
