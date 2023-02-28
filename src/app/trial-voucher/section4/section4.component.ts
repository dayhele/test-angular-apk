import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { environment } from 'src/environments/environment';

declare let window: any;
@Component({
  selector: 'app-section4',
  templateUrl: './section4.component.html',
  styleUrls: ['./section4.component.scss']
})
export class Section4Component implements OnInit {
  public environment: any;
  public checkMobile: boolean = false;

  @Input() public daysFree: string = '30';

  constructor(
    private checkDevice: CheckDeviceService
    ) {
    this.environment = environment;
    this.checkMobile = this.checkDevice.isMobile();
  }

  ngOnInit(): void {
  }
}
