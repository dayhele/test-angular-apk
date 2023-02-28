import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/assets/theme/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-section2',
  templateUrl: './section2.component.html',
  styleUrls: ['./section2.component.scss']
})
export class Section2Component {
  @Input() public isLigga: boolean = false;
  public environment: any;

  constructor(public theme: Theme, private router: Router) {
    this.environment = environment;
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
