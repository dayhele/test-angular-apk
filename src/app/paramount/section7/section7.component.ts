import { Component } from '@angular/core';
import { CardData } from 'src/app/shared/interfaces/card';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section7',
  templateUrl: './section7.component.html',
  styleUrls: ['./section7.component.scss']
})
export class Section7Component {
  public sectionCards: CardData[];
  public environment: any;

  constructor() {
    this.environment = environment;
    this.sectionCards = [
      {
        imageUrl: 'assets/bg/omlyParamount1.png'
      },
      {
        imageUrl: 'assets/bg/omlyParamount2.png'
      },
      {
        imageUrl: 'assets/bg/omlyParamount3.png'
      },
      {
        imageUrl: 'assets/bg/omlyParamount4.png'
      },
      {
        imageUrl: 'assets/bg/omlyParamount5.png'
      },
      {
        imageUrl: 'assets/bg/omlyParamount6.png'
      },
      {
        imageUrl: 'assets/bg/omlyParamount7.png'
      },
      {
        imageUrl: 'assets/bg/omlyParamount8.png'
      }
    ];
  }
}
