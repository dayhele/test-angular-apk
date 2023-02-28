import { Component, OnInit } from '@angular/core';
import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { environment } from 'src/environments/environment';

type ChannelLogo = {
  imageUrl: string;
};
@Component({
  selector: 'app-section8',
  templateUrl: './section8.component.html',
  styleUrls: ['./section8.component.scss']
})
export class Section8Component implements OnInit {
  public environment = environment;
  public checkMobile: boolean = false;
  constructor(private checkDevice: CheckDeviceService) {
    this.environment = environment;
    this.checkMobile = this.checkDevice.isMobile();
  }

  ngOnInit(): void {}
}
