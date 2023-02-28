import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardProperties } from '../../interfaces/card-default';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hbo-max-section',
  templateUrl: './hbo-max-section.component.html',
  styleUrls: ['./hbo-max-section.component.scss']
})
export class HboMaxSectionComponent {
  @Input() public hasExploreButton: boolean = true;
  @Input() public hasNavigation: boolean = true;
  @Input() public allowTouchMove: boolean = true;
  @Input() public text: string = '';
  public dataCards: any = [
    {
      imageUrl: environment.bucket + 'icons/hbo-temp/secao-5/hbo5-1.png'
    },
    {
      imageUrl: environment.bucket + 'icons/hbo-temp/secao-5/hbo5-2.png'
    },
    {
      imageUrl: environment.bucket + 'icons/hbo-temp/secao-5/hbo5-3.png'
    },
    {
      imageUrl: environment.bucket + 'icons/hbo-temp/secao-5/hbo5-4.png'
    },
    {
      imageUrl: environment.bucket + 'icons/hbo-temp/secao-5/hbo5-5.png'
    },
    {
      imageUrl: environment.bucket + 'icons/hbo-temp/secao-5/uncharted.png'
    },
    {
      imageUrl: environment.bucket + 'icons/hbo-temp/secao-5/hbo5-7.png'
    },
    {
      imageUrl: environment.bucket + 'icons/hbo-temp/secao-5/hbo5-8.png'
    },
    {
      imageUrl: environment.bucket + 'icons/hbo-temp/secao-5/hbo5-9.jpg'
    },
    {
      imageUrl: environment.bucket + 'icons/hbo-temp/secao-5/hbo5-10.png'
    },
    {
      imageUrl: environment.bucket + 'icons/hbo-temp/secao-5/hbo5-11.jpg'
    },
    {
      imageUrl: environment.bucket + 'icons/hbo-temp/secao-5/hbo5-12.png'
    }
  ];

  public cardProperties: CardProperties = { orientation: 'vertical' };

  public environment: any;

  constructor(private router: Router, public theme: Theme) {
    this.environment = environment;
  }

  public goTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
