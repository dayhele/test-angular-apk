import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-banner',
  templateUrl: './image-banner.component.html',
  styleUrls: ['./image-banner.component.scss']
})
export class ImageBannerComponent {

  @Input() imageBanner: string;

  constructor() {
    this.imageBanner = '';
  }

}
