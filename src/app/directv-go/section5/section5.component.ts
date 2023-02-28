import { Component } from '@angular/core';
import { CardData } from 'src/app/shared/interfaces/card';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section5',
  templateUrl: './section5.component.html',
  styleUrls: ['./section5.component.scss']
})
export class Section5Component {
  public sectionCards: CardData[];
  constructor() {
    this.sectionCards = [
      {
        imageUrl: environment.bucket + 'cards-for-directv-go/sucesso1.jpg'
      },
      {
        imageUrl: environment.bucket + 'cards-for-directv-go/sucesso2.jpg'
      },
      {
        imageUrl: environment.bucket + 'cards-for-directv-go/sucesso3.jpg'
      },
      {
        imageUrl: environment.bucket + 'cards-for-directv-go/sucesso4.jpg'
      },
      {
        imageUrl: environment.bucket + 'cards-for-directv-go/sucesso5.jpg'
      },
      {
        imageUrl: environment.bucket + 'cards-for-directv-go/sucesso6.jpg'
      },
      {
        imageUrl: environment.bucket + 'cards-for-directv-go/sucesso7.jpg'
      },
      {
        imageUrl: environment.bucket + 'cards-for-directv-go/sucesso8.jpg'
      },
      {
        imageUrl: environment.bucket + 'cards-for-directv-go/sucesso9.jpg'
      },
      {
        imageUrl: environment.bucket + 'cards-for-directv-go/sucesso10.jpg'
      },
      {
        imageUrl: environment.bucket + 'cards-for-directv-go/sucesso11.jpg'
      },
      {
        imageUrl: environment.bucket + 'cards-for-directv-go/sucesso12.jpg'
      }
    ];
  }
}
