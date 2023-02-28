import { Injectable } from '@angular/core';
import { PaymentMethodsResponse } from '../interfaces/payment-methods-response';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {
  constructor(private http: Http) {}

  public getPaymentMethods() {
    return this.http.getExternal<PaymentMethodsResponse>(
      'https://run.mocky.io/v3/66be87b8-1e90-4f48-8a88-245936e83585'
    );
  }
}
