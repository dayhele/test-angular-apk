import { Component, Input } from '@angular/core';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section2',
  templateUrl: './section2.component.html',
  styleUrls: ['./section2.component.scss']
})
export class Section2Component {
  public environment: any;
  public checkMobile: boolean = false;

  @Input() public daysFree: string = '30';

  constructor(private checkDevice: CheckDeviceService) {
    this.environment = environment;
    this.checkMobile = this.checkDevice.isMobile();
  }
}
