import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/helpers/device';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section1',
  templateUrl: './section1.component.html',
  styleUrls: ['./section1.component.scss']
})
export class Section1Component {

  public environment: any;
  public checkMobile: boolean = false;

  constructor(private checkDevice: CheckDeviceService) {
    this.environment = environment;
    this.checkMobile = this.checkDevice.isMobile();
  }

}
