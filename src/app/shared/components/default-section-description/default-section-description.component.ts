import { Device } from 'src/app/helpers/device';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardListData } from '../../interfaces/card-home';
import { CardProperties } from '../../interfaces/card-default';
import { Ticket } from '../../interfaces/subscribes';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';
import SwiperCore, { Navigation } from 'swiper';
import { CheckDeviceService } from '../../services/check-device.service';
import { PlanAccessControlService } from '../../services/plan-access-control.service';
import { url } from './url';
SwiperCore.use([Navigation]);

@Component({
  selector: 'app-default-section-description',
  templateUrl: './default-section-description.component.html',
  styleUrls: ['./default-section-description.component.scss']
})
export class DefaultSectionDescriptionComponent {
  public environment: any;

  @Input() public sectionTitle?: string;
  @Input() public sectionDescription?: string;
  @Input() public sectionButtonText?: string;
  @Input() public cardProperties?: CardProperties;
  @Input() public data?: CardListData[];
  @Input() public hbo?: boolean = false;
  @Input() public tickets: Ticket[];
  @Input() public hasHBO: boolean = false;
  @Input() public disableClick: boolean = false;
  @Output() public hasntHBOEvent: EventEmitter<any> = new EventEmitter();
  @Output() public cardClick: EventEmitter<any> = new EventEmitter();
  public isMobile: boolean = false;
  public checkMobile: boolean = false;

  constructor(
    private route: Router,
    public theme: Theme,
    private checkDevice: CheckDeviceService
  ) {
    this.checkMobile = this.checkDevice.isMobile();
    this.isMobile = Device.isMobile();
    this.environment = environment;
    this.sectionTitle = '';

    this.sectionDescription = '';

    this.sectionButtonText = '';

    this.cardProperties = {};

    this.data = [];

    this.tickets = [];
  }

  public checkIfIsSubscribed(type: string): void {
    if (this.hbo && this.hasHBO) {
      window.open(url, '_blank');
      return;
    } else if (!this.hasHBO) {
      this.hasntHBOEvent.emit();
      return;
    }

    this.route.navigate([`/${type}`]);
  }
}
