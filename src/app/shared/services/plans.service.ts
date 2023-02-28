import { Plan } from './../interfaces/plan';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from './http.service';
import { UserPlanInfo } from '../interfaces/user-plan-info';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  constructor(private http: Http) {}

  public getPlans(): Observable<Plan[]> {
    return this.http.get('v3/planos');
  }

  public changePlan(newPlan: number): Observable<any> {
    return this.http.patch('v3/plan/update-plan', { newPlan });
  }

  public getCurrentPlan(): Observable<any> {
    return this.http.post('v3/plan/info', {});
  }

  public getChannels(): Observable<any> {
    return this.http.post('v3/channelsoff', { page: 1, size: 500 });
  }

  public getChannelsOff(): Observable<any> {
    return this.http.get('v3/channelsoffmultiv3');
  }

  public getStingray(id: string): Observable<any> {
    return this.http.getExternal(
      'https://watch.tv.br/Stingray/validateToken?token=' + id
    );
  }
}
