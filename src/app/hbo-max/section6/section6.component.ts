import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardData } from 'src/app/shared/interfaces/card';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section6',
  templateUrl: './section6.component.html',
  styleUrls: ['./section6.component.scss']
})
export class Section6Component {
  public sectionCard: CardData[];
  @Input() public isLigga: boolean = false;

  constructor(public theme: Theme, private router: Router) {
    this.sectionCard = [
      {
        imageUrl:
          environment.bucket +
          'hbo-max/hbo-max-temp/secao-5/todo-mundo-odeia-o-chris.png'
      },
      {
        imageUrl:
          environment.bucket +
          'hbo-max/hbo-max-temp/secao-5/homem-aranha-svl.png'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/uncharted.png'
      },
      {
        imageUrl:
          environment.bucket + 'hbo-max/hbo-max-temp/secao-5/selena-chef.png'
      },
      {
        imageUrl:
          environment.bucket +
          'hbo-max/hbo-max-temp/secao-5/sera-isso-amor.png'
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
