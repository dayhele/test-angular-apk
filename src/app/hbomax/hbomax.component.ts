import { Device } from 'src/app/helpers/device';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { CheckDeviceService } from '../shared/services/check-device.service';
import { Theme } from 'src/assets/theme/theme';
@Component({
  selector: 'app-hbomax',
  templateUrl: './hbomax.component.html',
  styleUrls: ['./hbomax.component.scss']
})
export class HbomaxComponent {
  public environment: any;
  public isMobile: boolean = false;
  public checkMobile: boolean = false;

  constructor(public theme: Theme, checkDevice: CheckDeviceService) {
    this.checkMobile = checkDevice.isMobile();
    this.isMobile = Device.isMobile();
    this.environment = environment;
  }
}
