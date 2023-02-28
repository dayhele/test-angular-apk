import { Component } from '@angular/core';
import { Theme } from 'src/assets/theme/theme';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { environment } from 'src/environments/environment';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-section4',
  templateUrl: './section4.component.html',
  styleUrls: ['./section4.component.scss']
})
export class Section4Component {
  public isMobile: boolean = false;
  public checkMobile: boolean = false;
  public environment: any;

  constructor(public theme: Theme) {
    this.environment = environment;
  }
}
