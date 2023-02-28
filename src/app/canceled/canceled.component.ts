import { Component, OnInit } from '@angular/core';
import { Device } from './../helpers/device';
import { Theme } from 'src/assets/theme/theme';
import { CheckDeviceService } from '../shared/services/check-device.service';

@Component({
  selector: 'app-canceled',
  templateUrl: './canceled.component.html',
  styleUrls: ['./canceled.component.scss']
})
export class CanceledComponent implements OnInit {
  public isMobile: boolean = false;
  public checkMobile: boolean = false;

  constructor(public theme: Theme, private checkDevice: CheckDeviceService) {
    this.checkMobile = this.checkDevice.isMobile();
  }

  ngOnInit(): void {
    this.isMobile = Device.isMobile();
  }
}
