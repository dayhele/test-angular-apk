import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';

@Component({
  selector: 'app-section3',
  templateUrl: './section3.component.html',
  styleUrls: ['./section3.component.scss']
})
export class Section3Component {
  public checkMobile: boolean = false;

  @Input() public daysFree: string = '30';

  constructor(private checkDevice: CheckDeviceService){
    this.checkMobile = this.checkDevice.isMobile();
  }

}
