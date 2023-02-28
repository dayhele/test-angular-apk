import { CardProperties } from './../../shared/interfaces/card-default';
import { CardData } from './../../shared/interfaces/card';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section7',
  templateUrl: './section7.component.html',
  styleUrls: ['./section7.component.scss']
})
export class Section7Component {
  public sectionCards: CardData[];
  public cardProperties: CardProperties;

  constructor() {
    this.cardProperties = { orientation: 'vertical' };
    this.sectionCards = [
      {
        imageUrl: environment.bucket + 'directv-go-cards/dtv-1.png'
      },
      {
        imageUrl: environment.bucket + 'directv-go-cards/dtv-2.png'
      },
      {
        imageUrl: environment.bucket + 'directv-go-cards/dtv-3.png'
      },
      {
        imageUrl: environment.bucket + 'directv-go-cards/dtv-4.png'
      },
      {
        imageUrl: environment.bucket + 'directv-go-cards/dtv-5.png'
      },
      {
        imageUrl: environment.bucket + 'directv-go-cards/dtv-6.png'
      },
      {
        imageUrl: environment.bucket + 'directv-go-cards/dtv-7.png'
      },
      {
        imageUrl: environment.bucket + 'directv-go-cards/dtv-8.png'
      },
      {
        imageUrl: environment.bucket + 'directv-go-cards/dtv-9.png'
      },
      {
        imageUrl: environment.bucket + 'directv-go-cards/dtv-10.png'
      },
      {
        imageUrl: environment.bucket + 'directv-go-cards/dtv-11.png'
      },
      {
        imageUrl: environment.bucket + 'directv-go-cards/dtv-12.png'
      }
    ];
  }
}
