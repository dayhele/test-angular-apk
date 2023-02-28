import { SplashService } from './shared/services/splash.service';
import { BehaviorSubject } from 'rxjs';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, NgZone } from '@angular/core';

import { App as CapacitorApp } from '@capacitor/app';
import {
  state,
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':leave', [animate('400ms', style({ opacity: 0 }))])
    ])
  ]
})
export class AppComponent {
  public environment = environment;
  splash: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private checkDeviceService: CheckDeviceService,
    public theme: Theme,
    private splashService: SplashService,
    private loginService: LoginService,
    private ngZone: NgZone
  ) {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) CapacitorApp.exitApp();
      else if (this.loginService.token) window.history.back();
      else
        this.ngZone.run(() => {
          this.router.navigate(['..'], { relativeTo: this.route });
        });
    });
    if (environment.app) {
      this.splash = this.splashService.state;
      this.splashService.showSplash();
    }

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (window.location.pathname !== '/') return;

        // redireciona pra login caso mobile da watch ou aplicativo
        if (
          this.checkDeviceService.isMobile() &&
          environment.client === 'watch' &&
          !environment.app
        )
          this.router.navigate(['/login']);
        else if (environment.app) this.router.navigate(['/enter']);
        else {
          switch (environment.client) {
            case 'watch':
              this.router.navigate([
                this.loginService.token ? 'home' : 'welcome'
              ]);
              break;

            case 'multilaser':
              this.router.navigate([
                this.loginService.token ? 'home' : 'institucional'
              ]);
              break;

            default:
              this.router.navigate(['login']);
              break;
          }
        }
      }
    });
  }
}
