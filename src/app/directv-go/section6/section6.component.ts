import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardProperties } from 'src/app/shared/interfaces/card-default';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section6',
  templateUrl: './section6.component.html',
  styleUrls: ['./section6.component.scss']
})
export class Section6Component {
  public dataCards: any = [
    {
      imageUrl: environment.bucket + 'directv-go-cards/exclusive/1.jpg'
    },
    {
      imageUrl: environment.bucket + 'directv-go-cards/exclusive/2.jpg'
    },
    {
      imageUrl: environment.bucket + 'directv-go-cards/exclusive/3.jpg'
    },
    {
      imageUrl: environment.bucket + 'directv-go-cards/exclusive/4.jpg'
    },
    {
      imageUrl: environment.bucket + 'directv-go-cards/exclusive/5.jpg'
    },
    {
      imageUrl: environment.bucket + 'directv-go-cards/exclusive/6.jpg'
    },
    {
      imageUrl: environment.bucket + 'directv-go-cards/exclusive/7.jpg'
    },
    {
      imageUrl: environment.bucket + 'directv-go-cards/exclusive/8.jpg'
    },
    {
      imageUrl: environment.bucket + 'directv-go-cards/exclusive/9.jpg'
    },
    {
      imageUrl: environment.bucket + 'directv-go-cards/exclusive/10.jpg'
    },
    {
      imageUrl: environment.bucket + 'directv-go-cards/exclusive/11.jpg'
    },
    {
      imageUrl: environment.bucket + 'directv-go-cards/exclusive/12.jpg'
    }
  ];

  public cardProperties: CardProperties = { orientation: 'vertical' };

  constructor(public theme: Theme, private router: Router) {}

  public goTo(): void {
    if (this.theme.client === 'watch')
      window.open('https://watchbr.com.br/assinante/');
    else this.router.navigateByUrl('planos/multi');
  }
}
