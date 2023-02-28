import { Component } from '@angular/core';
import { CardData } from 'src/app/shared/interfaces/card';
import { CardProperties } from 'src/app/shared/interfaces/card-default';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section7',
  templateUrl: './section7.component.html',
  styleUrls: ['./section7.component.scss']
})
export class Section7Component {
  public sectionCards: CardData[] = [
    {
      imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/secao-7/kids-1.png'
    },
    {
      imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/secao-7/kids-2.jpg'
    },
    {
      imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/secao-7/kids-3.png'
    },
    {
      imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/secao-7/kids-4.png'
    },
    {
      imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/secao-7/kids-5.jpg'
    },
    {
      imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/secao-7/kids-6.png'
    },
    {
      imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/secao-7/kids-7.png'
    },
    {
      imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/secao-7/kids-8.png'
    },
    {
      imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/secao-7/kids-9.jpg'
    },
    {
      imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/secao-7/kids-10.jpg'
    },
    {
      imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/secao-7/kids-11.png'
    },
    {
      imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/secao-7/kids-12.jpg'
    }
  ];
  public cardProperties: CardProperties = { orientation: 'vertical' };

  constructor() {}
}
