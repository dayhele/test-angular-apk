import { Component, Input } from '@angular/core';
import SwiperCore, { Autoplay } from 'swiper';
import { environment } from 'src/environments/environment';

SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-directv-channels-carousel',
  templateUrl: './directv-channels-carousel.component.html',
  styleUrls: ['./directv-channels-carousel.component.scss']
})
export class DirectvChannelsCarouselComponent {
  public channels: any;

  constructor() {
    this.channels = [
      {
        name: 'globo',
        imagePath: environment.bucket + 'logos/channels/globo.svg'
      },
      {
        name: 'espn',
        imagePath: environment.bucket + 'logos/channels/espn.svg'
      },
      {
        name: 'disney',
        imagePath: environment.bucket + 'logos/channels/disney.svg'
      },
      {
        name: 'animal planet',
        imagePath: environment.bucket + 'logos/channels/animal-planet.svg'
      },
      {
        name: 'h&h discovery',
        imagePath: environment.bucket + 'logos/channels/h%26h.svg'
      },
      {
        name: 'discovery turbo',
        imagePath: environment.bucket + 'logos/channels/discovery-turbo.svg'
      },
      {
        name: 'globo news',
        imagePath: environment.bucket + 'logos/channels/globo-news.svg'
      },
      {
        name: 'fox sports',
        imagePath: environment.bucket + 'logos/channels/fox-sports.svg'
      },
      {
        name: 'star+',
        imagePath: environment.bucket + 'logos/channels/star-plus.svg'
      },
      {
        name: 'cartoon network',
        imagePath: environment.bucket + 'logos/channels/cn.svg'
      },
      {
        name: 'gnt',
        imagePath: environment.bucket + 'logos/channels/gnt.svg'
      },
      {
        name: 'gloob',
        imagePath: environment.bucket + 'logos/channels/gloob.svg'
      },
      {
        name: 'canal off',
        imagePath: environment.bucket + 'logos/channels/off.svg'
      },
      {
        name: 'national geographic',
        imagePath:
          environment.bucket + 'logos/channels/national-geographic.svg'
      },
      {
        name: 'history',
        imagePath: environment.bucket + 'logos/channels/history-channel.svg'
      }
    ];
  }
}
