import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardData } from 'src/app/shared/interfaces/card';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-section4',
  templateUrl: './section4.component.html',
  styleUrls: ['./section4.component.scss']
})
export class Section4Component {
  public sectionCards: CardData[];
  constructor(public theme: Theme, private router: Router) {
    this.sectionCards = [
      {
        imageUrl: 'assets/logos/mtv-paramount.png'
      },
      {
        imageUrl: 'assets/logos/nickelodeon-paramount.png'
      },
      {
        imageUrl: 'assets/logos/nickjr-paramount.png'
      },
      {
        imageUrl: 'assets/logos/comedy-central-paramount.png'
      },
      {
        imageUrl: 'assets/logos/paramount-paramount.png'
      }
    ];
  }
  public goTo(): void {
    if (this.theme.client === 'watch')
      window.open('https://watchbr.com.br/assinante/');
    else this.router.navigateByUrl('planos/' + this.theme.clientRoute);
  }
}
