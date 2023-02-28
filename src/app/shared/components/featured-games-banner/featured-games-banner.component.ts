import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PageBanner } from '../../interfaces/banners';
import { Theme } from 'src/assets/theme/theme';
import { Device } from 'src/app/helpers/device';
import { CheckDeviceService } from '../../services/check-device.service';

@Component({
  selector: 'app-featured-games-banner',
  templateUrl: './featured-games-banner.component.html',
  styleUrls: ['./featured-games-banner.component.scss']
})
export class FeaturedGamesBannerComponent {
  public environment: any;
  public isMobile: boolean;
  public checkMobile: boolean = false;

  @Input() public data?: PageBanner;

  constructor(public theme: Theme, private checkDevice: CheckDeviceService) {
    this.checkMobile = this.checkDevice.isMobile();
    this.data = {};
    this.environment = environment;
    this.isMobile = false;
  }

  ngOnInit(): void {
    this.isMobile = this.isMobileCheck();
  }

  private isMobileCheck(): boolean {
    return Device.isMobile();
  }
}
