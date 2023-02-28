import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AtivacaoService {
  public endpoint = 'v3/code/';

  constructor(private http: Http) {}

  public getActivateCode(): Observable<any> {
    return this.http.get(`${this.endpoint}recover/`);
  }

  public activateAccount(code: string): Observable<any> {
    return this.http.post(
      `${this.endpoint}validate?key=${environment.apiKey}`,
      {
        code: code
      }
    );
  }

  public redeemCode(email: string): Observable<any> {
    return this.http.get(
      `${this.endpoint}recover/${email}?key=${environment.apiKey}`
    );
  }
}
