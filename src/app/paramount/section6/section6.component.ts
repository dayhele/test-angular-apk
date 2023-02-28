import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardData } from 'src/app/shared/interfaces/card';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-section6',
  templateUrl: './section6.component.html',
  styleUrls: ['./section6.component.scss']
})
export class Section6Component {
  public sectionCard: CardData[];

  constructor(public theme: Theme, private router: Router) {
    this.sectionCard = [
      { imageUrl: 'assets/paramount/halo.png' },
      { imageUrl: 'assets/paramount/kamp-koral.png' },
      { imageUrl: 'assets/paramount/ta-dando-onda-2.png' },
      { imageUrl: 'assets/paramount/patrulha-canina.png' },
      { imageUrl: 'assets/paramount/everbody-hates-chris.png' }
    ];
  }
  public goTo(): void {
    if (this.theme.client === 'watch')
      window.open('https://watchbr.com.br/assinante/');
    else this.router.navigateByUrl('planos/' + this.theme.clientRoute);
  }
}
