import { Device } from 'src/app/helpers/device';
import { Component, Input, OnInit } from '@angular/core';
import { CheckDeviceService } from '../../services/check-device.service';

@Component({
  selector: 'app-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.scss']
})
export class CorouselComponent {
  @Input() public channels?: any;

  public isMobile: boolean = false;
  public checkMobile: boolean = false;

  constructor(private checkDevice: CheckDeviceService) {
    this.checkMobile = this.checkDevice.isMobile();
    this.isMobile = Device.isMobile();
  }
}
