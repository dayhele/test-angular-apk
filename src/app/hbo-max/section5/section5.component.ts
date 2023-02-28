import { CardData } from './../../shared/interfaces/card';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section5',
  templateUrl: './section5.component.html',
  styleUrls: ['./section5.component.scss']
})
export class Section5Component {
  public sectionCards: CardData[];
  public customIcon: string =
    'assets/hbo-max-cards-temp/secao-5/hbo-max-logo.png';

  constructor() {
    this.sectionCards = [
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/hbo5-1.png'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/hbo5-2.png'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/hbo5-3.png'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/hbo5-4.png'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/hbo5-5.png'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/hbo5-6.jpg'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/hbo5-7.png'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/hbo5-8.png'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/hbo5-9.jpg'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/hbo5-10.png'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/hbo5-11.jpg'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/hbo5-12.png'
      }
    ];
  }
}
