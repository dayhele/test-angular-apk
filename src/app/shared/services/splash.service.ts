import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SplashService {
  public state: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showSplash() {
    this.state.next(true);
  }

  hideSplash() {
    this.state.next(false);
  }
}
