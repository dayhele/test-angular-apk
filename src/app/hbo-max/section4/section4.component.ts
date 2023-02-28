import { Component, Input } from '@angular/core';
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
  @Input() public isLigga: boolean = false;

  constructor(public theme: Theme, private router: Router) {
    this.sectionCards = [
      {
        imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/max.png'
      },
      {
        imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/warner.png'
      },
      {
        imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/cn.png'
      },
      {
        imageUrl: environment.bucket + 'hbo-max/hbo-max-temp/dc.png'
      }
    ];
  }

  public goTo(): void {
    if (this.theme.header.ligga && this.isLigga) {
      this.router.navigateByUrl('rent/media-plan/1');
    } else {
      if (this.theme.client === 'watch')
        window.open('https://watchbr.com.br/assinante/');
      else this.router.navigateByUrl('planos/' + this.theme.clientRoute);
    }
  }
}
