import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardData } from 'src/app/shared/interfaces/card';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exclusive-channels',
  templateUrl: './exclusive-channels.component.html',
  styleUrls: ['./exclusive-channels.component.scss']
})
export class ExclusiveChannelsComponent {
  public sectionCards: CardData[];


  constructor(public theme: Theme, private router: Router) {
    this.sectionCards = [
      {
        imageUrl: environment.bucket + 'nsports/channel-image1.svg'
      },
      {
        imageUrl: environment.bucket + 'nsports/channel-image2.svg'
      },
      {
        imageUrl: environment.bucket + 'nsports/channel-image3.svg'
      },
      {
        imageUrl: environment.bucket + 'nsports/channel-image4.svg'
      }
    ];
  }

  public goTo(): void {
    if (this.theme.client === 'watch')
      window.open('https://watchbr.com.br/assinante/');
    else this.router.navigateByUrl('planos/' + this.theme.clientRoute);
  }
}
