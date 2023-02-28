import { Device } from 'src/app/helpers/device';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';
import { DetailedProgram } from '../../interfaces/program-details';
import { CheckDeviceService } from '../../services/check-device.service';
import { NowService } from '../../services/now.service';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-most-watched-channels',
  templateUrl: './most-watched-channels.component.html',
  styleUrls: ['./most-watched-channels.component.scss']
})
export class MostWatchedChannelsComponent implements OnInit {
  @Output() callNewChannels = new EventEmitter<string>();
  @Input() dataFromHome: any = [];

  public data: DetailedProgram[];
  public isMobile: boolean = false;
  public checkMobile: boolean = false;
  public isLoaded: boolean = false;

  constructor(
    private checkDevice: CheckDeviceService,
    private now: NowService
  ) {
    this.checkMobile = this.checkDevice.isMobile();
    this.isMobile = Device.isMobile();
    this.data = [];
  }

  ngOnInit(): void {
    //this.getEssentials();
    this.setData();
  }

  onSwiper() {
    this.callNewChannels.next('next channels');
  }
  getChanelList() {
    this.now.getMostWatched().subscribe({
      next: (res) => (this.data = res.list),
      error: (err) => console.error(err),
      complete: () => (this.isLoaded = true)
    });
  }

  updateList() {
    setInterval(() => {
      this.getChanelList();
    }, 600000);
  }

  getEssentials() {
    this.getChanelList();
    this.updateList();
  }

  setData() {
    this.isLoaded = true;
    this.data = this.dataFromHome;
    this.updateList();
  }
}
