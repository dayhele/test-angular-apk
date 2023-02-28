import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardData } from 'src/app/shared/interfaces/card';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';

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
        imageUrl: environment.bucket + 'logos/tele-cine-directv-go.png'
      },
      {
        imageUrl: environment.bucket + 'logos/starzplay-directv-go.png'
      },
      {
        imageUrl: environment.bucket + 'logos/globo-directv-go.png'
      },
      {
        imageUrl: environment.bucket + 'logos/discobery-directv-go.png'
      }
    ];
  }

  public goTo(): void {
    if (this.theme.client === 'watch')
      window.open('https://watchbr.com.br/assinante/');
    else this.router.navigateByUrl('planos/multi');
  }
}
