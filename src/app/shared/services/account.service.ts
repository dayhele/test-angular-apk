import { MySubscriptions } from './../interfaces/my-subscriptions';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AccountData,
  AccountResponse,
  AccountUpdate,
  AccountUpdateResponse
} from '../interfaces/account';
import { Subscription } from '../interfaces/subscription';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: Http) {}

  public cancelAccount(): Observable<any> {
    return this.http.patch('v3/plan/cancel', {});
  }

  public cancelMarketplace(idPlan: number): Observable<any> {
    return this.http.post('v3/adyen/cancel_marketplace', {
      item_id: idPlan
    });
  }

  public getAccountData(email: string): Observable<AccountResponse> {
    return this.http.get(`v3/user?pEmail=${email}`);
  }

  public getAccountSubscribes(): Observable<MySubscriptions> {
    return this.http.get(`v3/subscribes`);
  }

  public updateAccountData(
    accountData: AccountUpdate
  ): Observable<AccountUpdateResponse> {
    let httpParams = new HttpParams().append(
      'key',
      'b1aa9facd472bc233f07febdc04cb41cdc255b5a80624d67642990375e138afd'
    );
    let _accountData = Object.assign({}, accountData);
    _accountData.pTelefone = `55${_accountData.pTelefone
      .replace(/ /g, '')
      .replace(/[^\w\s]/gi, '')}`;

    return this.http.patch('v3/user', _accountData, httpParams);
  }

  public getSelectedCard() {
    return this.http.get(`v3/credit-card`);
  }
}
