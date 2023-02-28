import { Device } from 'src/app/helpers/device';
import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../interfaces/profile';
import { CheckDeviceService } from '../../services/check-device.service';

@Component({
  selector: 'app-channels-section',
  templateUrl: './channels-section.component.html',
  styleUrls: ['./channels-section.component.scss']
})
export class ChannelsSectionComponent {
  @Input() public channels: any;
  @Input() public profileAgeBracket: number;
  @Input() public profile: Profile;
  @Input() public title: string = '';
  @Input() public disableClick: boolean = false;

  public isMobile: boolean = false;
  public checkMobile: boolean = false;

  constructor(private checkDevice: CheckDeviceService) {
    this.checkMobile = this.checkDevice.isMobile();
    this.isMobile = Device.isMobile();
    this.channels = {};
    this.profileAgeBracket = 0;
    this.profile = {};
  }
}
