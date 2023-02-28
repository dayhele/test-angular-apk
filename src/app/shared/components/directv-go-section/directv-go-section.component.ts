import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { CardProperties } from '../../interfaces/card-default';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-directv-go-section',
  templateUrl: './directv-go-section.component.html',
  styleUrls: ['./directv-go-section.component.scss']
})
export class DirectvGoSectionComponent {
  @Input() public hasExploreButton: boolean = true;
  @Input() public hasNavigation: boolean = true;
  @Input() public allowTouchMove: boolean = true;
  @Input() public text: string = '';
  public dataCards: any = [
    {
      imageUrl: environment.bucket + 'directvgo/card-home-1.jpg'
    },
    {
      imageUrl: environment.bucket + 'directvgo/card-home-2.jpg'
    },
    {
      imageUrl: environment.bucket + 'directvgo/card-home-3.jpg'
    },
    {
      imageUrl: environment.bucket + 'directvgo/card-home-4.jpg'
    },
    {
      imageUrl: environment.bucket + 'directvgo/card-home-5.jpg'
    }
  ];

  public cardProperties: CardProperties = { orientation: 'vertical' };

  public environment: any;

  constructor(public theme: Theme, private router: Router) {
    this.environment = environment;
  }

  public goTo(path: string) {
    this.router.navigateByUrl(path);
  }
}
