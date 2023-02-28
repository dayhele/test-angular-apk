import { Device } from 'src/app/helpers/device';
import { Component, Input } from '@angular/core';
import { CardListData } from '../../interfaces/card-home';
import SwiperCore, { Navigation } from 'swiper';
import { CardProperties } from '../../interfaces/card-default';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CheckDeviceService } from '../../services/check-device.service';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-default-section',
  templateUrl: './default-section.component.html',
  styleUrls: ['./default-section.component.scss']
})
export class DefaulSectionComponent {
  @Input() public hasAwesomenessLogo?: boolean;
  @Input() public sectionTitle?: string;
  @Input() public sectionSubtitle?: string;
  @Input() public sectionButtonText?: string;
  @Input() public cardProperties?: CardProperties;
  @Input() public categoryTitle?: string;
  @Input() public data?: CardListData[];

  public environment: any;

  public isMobile: boolean = false;

  public checkMobile: boolean = false;

  constructor(private router: Router, private checkDevice: CheckDeviceService) {
    this.checkMobile = this.checkDevice.isMobile();
    this.isMobile = Device.isMobile();
    this.hasAwesomenessLogo = false;

    this.sectionTitle = '';

    this.sectionButtonText = '';

    this.cardProperties = {};

    this.data = [];

    this.environment = environment;
  }

  public goTo(url: string): void {
    this.router.navigateByUrl(`/search?keyword=${url}`);
  }
}
