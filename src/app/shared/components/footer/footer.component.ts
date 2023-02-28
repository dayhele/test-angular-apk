import { ProfileService } from 'src/app/shared/services/profile.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { environment } from '../../../../environments/environment';
import { CheckDeviceService } from '../../services/check-device.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public environment: any;
  public isLogged: boolean;
  public checkMobile: boolean = false;

  @Input() public profile: any = {};

  get isHome(): boolean {
    return this.router.url.split('/')[1] == 'welcome';
  }

  constructor(
    private router: Router,
    public theme: Theme,
    private checkDevice: CheckDeviceService,
    public profileService: ProfileService
  ) {
    this.environment = environment;
    this.isLogged = false;

    router.events.subscribe((val) => {
      this.getIsLogged();
    });

    this.checkMobile = this.checkDevice.isMobile();
  }

  ngOnInit(): void {
    this.getIsLogged();
  }

  private getIsLogged() {
    if (localStorage.getItem('token')) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public goToFacebook(): void {
    window.open(this.theme.socialMedia.linkFace);
  }

  public goToInstagram(): void {
    window.open(this.theme.socialMedia.linkInsta);
  }

  public goToLinkedin(): void {
    window.open(this.theme.socialMedia.linkLinkedin);
  }

  public goToYoutube(): void {
    window.open(this.theme.socialMedia.linkYoutube);
  }

  public goToGooglePlay(): void {
    window.open(this.theme.linkPlayStore);
  }

  public goToPlayStore(): void {
    window.open(this.theme.linkAppStore);
  }

  public goTo(): void {
    if (this.theme.client === 'watch')
      window.open('https://watchbr.com.br/a-watch-brasil/');
  }
}
