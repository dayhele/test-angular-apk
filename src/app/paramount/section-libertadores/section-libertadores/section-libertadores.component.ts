import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';

@Component({
  selector: 'app-section-libertadores',
  templateUrl: './section-libertadores.component.html',
  styleUrls: ['./section-libertadores.component.scss']
})
export class SectionLibertadoresComponent {
  constructor(public theme: Theme, public router: Router) { }

  public goTo(): void {
    if (this.theme.client === 'watch')
      window.location.href = 'https://watchbr.com.br/assinante/';
    else this.router.navigateByUrl('planos/' + this.theme.clientRoute);
  }


}
