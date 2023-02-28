import { RentSection } from './../interfaces/card-default';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SectionCardListData } from '../interfaces/card-home';
import { Http } from './http.service';
import { confirmAdyen, CouponResponse } from '../interfaces/adyen';

@Injectable({
  providedIn: 'root'
})
export class RentService {
  constructor(private http: Http) {}

  public getRentedList(
    id?: number,
    id_perfil?: number
  ): Observable<SectionCardListData> {
    return this.http.post('v3/list', {
      id_perfil,
      id,
      page: 1,
      size: 500
    });
  }

  public getRentedSectionList(
    id_perfil: number,
    id: number
  ): Observable<RentSection> {
    return this.http.post('v3/lists', { id_perfil: id_perfil, id: id });
  }

  public validateCoupom(data: confirmAdyen): Observable<CouponResponse> {
    return this.http.post('v3/rent/validarcupom', data);
  }
}
