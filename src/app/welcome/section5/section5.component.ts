import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardData } from 'src/app/shared/interfaces/card';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section5',
  templateUrl: './section5.component.html',
  styleUrls: ['./section5.component.scss']
})
export class Section5Component {
  public goTo(): void {
    if (this.theme.client === 'watch')
      window.open('https://watchbr.com.br/assinante/');
    else this.router.navigateByUrl('planos/multi');
  }

  public environment: any;

  public sectionCards: CardData[];
  constructor(public theme: Theme, private router: Router) {
    this.environment = environment;

    this.sectionCards = [
      {
        imageUrl: 'assets/welcome/deslogada_1.png'
      },
      {
        imageUrl: 'assets/welcome/deslogada_2.png'
      },
      {
        imageUrl: 'assets/welcome/deslogada_3.png'
      },
      {
        imageUrl: 'assets/welcome/deslogada_4.png'
      },
      {
        imageUrl: 'assets/welcome/deslogada_5.png'
      },
      {
        imageUrl: 'assets/welcome/deslogada_6.png'
      },
      {
        imageUrl: 'assets/welcome/deslogada_7.png'
      },
      {
        imageUrl: 'assets/welcome/deslogada_8.png'
      }
    ];
  }
}
