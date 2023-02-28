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
  public environment: any;

  constructor() {
    this.environment = environment;

    this.sectionCards = [
      {
        imageUrl: 'assets/bg/lançamento1.png'
      },
      {
        imageUrl: 'assets/bg/lançamento2.png'
      },
      {
        imageUrl: 'assets/bg/lançamento3.png'
      },
      {
        imageUrl: 'assets/bg/lançamento4.png'
      },
      {
        imageUrl: 'assets/bg/lançamento5.png'
      },
      {
        imageUrl: 'assets/bg/lançamento6.png'
      },
      {
        imageUrl: 'assets/bg/lançamento7.png'
      },
      {
        imageUrl: 'assets/bg/lançamento8.png'
      },
      {
        imageUrl: 'assets/bg/lançamento9.png'
      }
    ];
  }
}
