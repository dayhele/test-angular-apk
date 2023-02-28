import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../interfaces/user-data';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {
  constructor(private http: Http) {}

  public AccountInfo(): Observable<UserData> {
    return this.http.post('v3/UserData', {});
  }
}
