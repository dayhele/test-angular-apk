import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
//import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar';

declare let document: any;

@Injectable({
  providedIn: 'root'
})
export class WatchService {
  private document = document;

  constructor(private route: Router) {}

  private isFullScreen: boolean = false;

  public checkAppleDevice(): boolean {
    return (
      window.navigator.platform.toLowerCase().includes('mac') ||
      window.navigator.platform.toLowerCase().includes('iphone') ||
      window.navigator.platform.toLowerCase().includes('ipod') ||
      window.navigator.platform.toLowerCase().includes('ipad')
    );
  }

  public checkMacOs(): boolean {
    return (
      window.navigator.platform.toLowerCase().includes('iphone') ||
      window.navigator.platform.toLowerCase().includes('ipod') ||
      window.navigator.platform.toLowerCase().includes('ipad')
    );
  }

  public mobileApple(): boolean {
    return (
      window.navigator.platform.toLowerCase().includes('iphone') ||
      window.navigator.platform.toLowerCase().includes('ipod') ||
      window.navigator.platform.toLowerCase().includes('ipad')
    );
  }

  fullScreen(fullScreen?: boolean): void {
    StatusBar.getInfo()
      .then((info) => {
        if (!info.visible || fullScreen === false || this.isFullScreen) {
          StatusBar.show();
          //NavigationBar.show();
        } else if (
          info.visible &&
          (fullScreen === true || !this.isFullScreen)
        ) {
          StatusBar.hide();
          //NavigationBar.hide();
        }
      })
      .catch((err) => {
        if (fullScreen === false || this.isFullScreen) {
          this.isFullScreen = false;
          if (this.document.exitFullscreen) {
            this.document.exitFullscreen();
          } else if (this.document.mozCancelFullScreen) {
            this.document.mozCancelFullScreen();
          } else if (this.document.webkitExitFullscreen) {
            this.document.webkitExitFullscreen();
          } else if (this.document.msExitFullscreen) {
            this.isFullScreen = false;
          }
        } else {
          this.isFullScreen = true;
          if (!document.fullscreenElement)
            if (this.document.documentElement.requestFullscreen) {
              this.document.documentElement.requestFullscreen();
            } else if (this.document.documentElement.mozRequestFullScreen) {
              this.document.documentElement.mozRequestFullScreen();
            } else if (this.document.documentElement.webkitRequestFullscreen) {
              this.document.documentElement.webkitRequestFullscreen();
            } else if (this.document.documentElement.msRequestFullscreen) {
              this.document.documentElement.msRequestFullscreen();
            }
        }
      });
  }

  public watch(
    id: number,
    type: string,
    isLive?: boolean,
    episodeId?: number,
    isMarathon?: boolean,
    position?: number,
    playOnChromecast?: boolean,
    isNovelas?: boolean
  ) {
    let queryParams = {
      id,
      type,
      isLive,
      episodeId,
      isMarathon,
      position,
      playOnChromecast,
      isNovelas
    };

    if (type === 'filme' && !isLive) {
      delete queryParams.isLive;
      delete queryParams.episodeId;
      delete queryParams.isMarathon;
    }
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([`/watch`], {
        queryParams
      });
    });
  }
}
