import { Theme } from 'src/assets/theme/theme';
import { SplashService } from './../shared/services/splash.service';
import { CheckDeviceService } from './../shared/services/check-device.service';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-splash-app',
  templateUrl: './splash-app.component.html',
  styleUrls: ['./splash-app.component.scss']
})
export class SplashAppComponent {
  activeLogo1: boolean = false;
  activeLogo2: boolean = false;
  activeProgressBar: boolean = false;
  public environment: any;

  constructor(
    public checkDeviceService: CheckDeviceService,
    private splashService: SplashService,
    public theme: Theme
  ) {
    this.environment = environment;
    setTimeout(() => this.startAnimation(), 1000);
  }

  startAnimation(): void {
    if (!this.theme.client) {
      setTimeout(() => this.startAnimation(), 100);
      return;
    }

    if (this.theme.client === 'watch') {
      this.activeLogo2 = true;
      setTimeout(() => {
        this.activeLogo1 = true;
        setTimeout(() => {
          this.activeProgressBar = true;
          setTimeout(() => {
            this.splashService.hideSplash();
          }, 2500);
        }, 1000);
      }, 1000);
    } else if (this.theme.client === 'multilaser') {
      this.activeLogo2 = true;
      setTimeout(() => {
        this.activeProgressBar = true;
        setTimeout(() => {
          this.splashService.hideSplash();
        }, 2500);
      }, 1000);
    }
  }
}
