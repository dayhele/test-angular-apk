import { Device } from 'src/app/helpers/device';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';
import { EventsParams } from 'swiper/angular';
import { DetailedProgram } from '../../interfaces/program-details';
import { CheckDeviceService } from '../../services/check-device.service';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-now-section',
  templateUrl: './now-section.component.html',
  styleUrls: ['./now-section.component.scss']
})
export class NowSectionComponent {
  @Input() public data: DetailedProgram[];

  @Output() callNewChannels = new EventEmitter<string>();

  public isMobile: boolean = false;
  public checkMobile: boolean = false;

  constructor(private checkDevice: CheckDeviceService) {
    this.checkMobile = this.checkDevice.isMobile();
    this.isMobile = Device.isMobile();
    this.data = [];
  }

  onSwiper() {
    this.callNewChannels.next('next channels');
  }
}
