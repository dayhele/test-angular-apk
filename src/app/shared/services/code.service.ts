import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewCodeResponse, ValidateCodeResponse } from '../interfaces/code';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private httpParams: HttpParams;

  constructor(private http: Http) {
    this.httpParams = new HttpParams().append(
      'key',
      'b1aa9facd472bc233f07febdc04cb41cdc255b5a80624d67642990375e138afd'
    );
  }

  public validate(
    code: string,
    type: string
  ): Observable<ValidateCodeResponse> {
    return this.http.post(
      'v3/voucher/validate',
      {
        voucher: type === 'voucher' ? code : undefined,
        cupom: type === 'cupom' ? code : undefined
      },
      this.httpParams
    );
  }

  public sendNewCode(): Observable<NewCodeResponse> {
    return this.http.get('v3/code/new');
  }
}
