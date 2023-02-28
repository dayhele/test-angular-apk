import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CheckoutAdyen,
  CheckoutAdyenResponse,
  confirmAdyen,
  confirmAdyenResponse,
  MediaFinalizeResponse,
  SessionAdyen,
  SessionAdyenResponse
} from '../interfaces/adyen';

import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private httpParams1: HttpParams;

  constructor(private http: Http) {
    this.httpParams1 = new HttpParams();
  }

  public getCheckoutAdyen(
    isMedia: boolean,
    checkoutAdyen: CheckoutAdyen
  ): Observable<CheckoutAdyenResponse> {
    this.httpParams1 = new HttpParams().append(
      'Token',
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY3ODA0MiwiaXNzIjoiaHR0cHM6Ly9obWwud2F0Y2gudHYuYnIvL2F1dGgvbG9naW4iLCJpYXQiOjE2NTEyNTAzNTAsImV4cCI6MTY2NjgwMjM1MCwibmJmIjoxNjUxMjUwMzUwLCJqdGkiOiJUOVE0NnQ0ZE1XVEtVdEczIn0.fb3JAM5TbCdmT76mmPONxTIEuCZr0E3et-du4CT2Vyo'
    );

    if (isMedia) return this.http.post('v3/rent/choose', checkoutAdyen);
    else
      return this.http.post(
        'v3/adyen/checkout',
        checkoutAdyen,
        this.buildParams(isMedia)
      );
  }

  public getCheckoutAdyenPlan(
    checkoutAdyen: CheckoutAdyen
  ): Observable<CheckoutAdyenResponse> {
    // this.httpParams1 = new HttpParams().append(
    //   'Token',
    //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY3ODA0MiwiaXNzIjoiaHR0cHM6Ly9obWwud2F0Y2gudHYuYnIvL2F1dGgvbG9naW4iLCJpYXQiOjE2NTEyNTAzNTAsImV4cCI6MTY2NjgwMjM1MCwibmJmIjoxNjUxMjUwMzUwLCJqdGkiOiJUOVE0NnQ0ZE1XVEtVdEczIn0.fb3JAM5TbCdmT76mmPONxTIEuCZr0E3et-du4CT2Vyo'
    // );

    return this.http.post(
      'v3/adyen/checkout_marketplace?key=b1aa9facd472bc233f07febdc04cb41cdc255b5a80624d67642990375e138afd',
      checkoutAdyen
    );
  }

  public getSessionAdyen(
    sessionAdyen: SessionAdyen
  ): Observable<SessionAdyenResponse> {
    return this.http.post(
      'v3/adyen/session',
      sessionAdyen,
      this.buildParams(false)
    );
  }

  public getPaymentAdyenReturn(
    isMedia: boolean,
    confirmAdyen: confirmAdyen
  ): Observable<confirmAdyenResponse> {
    if (isMedia)
      return this.http.post(
        'v3/rent/finalize',
        confirmAdyen,
        this.buildParams(isMedia)
      );
    else
      return this.http.post(
        'v3/adyen/return',
        confirmAdyen,
        this.buildParams(isMedia)
      );
  }

  public mediaFinalize(
    item_id: number,
    cupom: string
  ): Observable<MediaFinalizeResponse> {
    return this.http.post('v3/rent/finalize', { item_id, cupom });
  }

  private buildParams(isMedia: boolean): HttpParams {
    if (isMedia) {
      return new HttpParams().append('Token', localStorage.getItem('token')!);
    } else {
      return new HttpParams().append(
        'key',
        'b1aa9facd472bc233f07febdc04cb41cdc255b5a80624d67642990375e138afd'
      );
    }
  }
}
