import { Injectable } from '@angular/core';
import { Http } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {
  constructor(private http: Http) {}

  public getStates() {
    return this.http.get(
      `v3/content/region/state-city?key=${environment.apiKey}`
    );
  }

  public searchStates(citys: string, states: string) {
    let city = citys || '';
    let state = states || '';

    return this.http.post(`/v3/content/isps?&key=${environment.apiKey}`, {
      city,
      state
    });
  }
}
