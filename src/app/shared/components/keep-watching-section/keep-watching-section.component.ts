import { Device } from 'src/app/helpers/device';
import { Component, Input } from '@angular/core';
import { CardProperties } from '../../interfaces/card-default';
import { CardListData } from '../../interfaces/card-home';
import { CheckDeviceService } from '../../services/check-device.service';

@Component({
  selector: 'app-keep-watching-section',
  templateUrl: './keep-watching-section.component.html',
  styleUrls: ['./keep-watching-section.component.scss']
})
export class KeepWatchingSectionComponent {
  @Input() public sectionTitle?: string;
  @Input() public sectionButtonText?: string;
  @Input() public cardProperties?: CardProperties;
  @Input() public data?: CardListData[];

  public isMobile: boolean = false;
  public checkMobile: boolean = false;

  constructor(private checkDevice: CheckDeviceService) {
    this.checkMobile = this.checkDevice.isMobile();
    this.isMobile = Device.isMobile();
    this.sectionTitle = '';

    this.sectionButtonText = '';

    this.cardProperties = {};

    this.data = [];
  }
}
