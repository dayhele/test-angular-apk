import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewCodeResponse, ValidateCodeResponse } from '../interfaces/code';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  constructor(private http: Http) {}

  public validate(code: string, call: string): Observable<any> {
    return this.http.post('v3/sms/activate', {
      code: code,
      call: call
    });
  }

  public resendNewCode(): Observable<NewCodeResponse> {
    return this.http.get('v3/sms/resend');
  }

  public userFirstAccess(user: any): Observable<any> {
    return this.http.post('v3/user_first_access', user);
  }
}
