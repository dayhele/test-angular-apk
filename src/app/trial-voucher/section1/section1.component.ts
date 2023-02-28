import { Component, OnInit, Input } from '@angular/core';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-section1',
  templateUrl: './section1.component.html',
  styleUrls: ['./section1.component.scss']
})
export class Section1Component implements OnInit {
  public environment: any;
  public checkMobile: boolean = false;

  @Input() public daysFree: string = '30';

  constructor(private checkDevice: CheckDeviceService) {
    this.environment = environment;
    this.checkMobile = this.checkDevice.isMobile();
  }

  ngOnInit(): void {}
}
